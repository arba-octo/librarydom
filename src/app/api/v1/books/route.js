import { NextResponse } from 'next/server';
import prisma from '#prisma/client';
import {bookZodSchema} from "@/lib/zod";

// GET: получить все книги
export async function GET() {
    try {
        const books = await prisma.books.findMany();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST-отправка в базу новой книги, и если в книге содержится название новой серии, то и добавдение в базу новой серии
export async function POST(request) {
    const body = await request.json();
    // Валидация через Zod
    const parseResult = bookZodSchema.safeParse(body);
    if (!parseResult.success) {
        return NextResponse.json(
            { error: parseResult.error.errors.map(e => e.message).join('; ') },
            { status: 400 }
        );
    }
    const {
        title,
        author,
        seriesId,
        typeId,
        pages,
        age,
        faceImg,
        tocImg,
        exampleImg,
        statusFree,
        occupiedTo,
        ownerId,
        userId,
        firstSelfReading,
        checked,
        seriesName
    } = parseResult.data;

    // 1. Найти или создать серию (по названию)
    let series = await prisma.series.findUnique({
        where: { name: seriesName },
    });

    if (!series) {
        series = await prisma.series.create({
            data: { name: seriesName },
        });
    }

    // 2. Создать книгу с привязкой к серии
    const book = await prisma.book.create({
        data: {
            title,
            seriesId: series.id,
            ...otherFields, // сюда можно добавить другие поля книги
        },
    });

    return NextResponse.json(book, { status: 201 });
}

// Удаляет книгу из серии, если это была последняя книга — серия тоже удаляется
export async function DELETE(request, { params }) {
    const { bookId } = params;
    const body = await request.json();
    const { seriesId } = body;

    // Если у книги нет серии (seriesId не передан или null)
    if (!seriesId) {
        await prisma.book.delete({
            where: { id: Number(bookId) },
        });
        return NextResponse.json({ message: 'Книга удалена (серии не было)' });
    }

    // Обычная логика, если серия есть
    await prisma.book.delete({
        where: {
            id: Number(bookId),
            seriesId: Number(seriesId),
        },
    });

    const booksLeft = await prisma.book.count({
        where: { seriesId: Number(seriesId) },
    });

    if (booksLeft === 0) {
        await prisma.series.delete({
            where: { id: Number(seriesId) },
        });
        return NextResponse.json({ message: 'Книга и серия удалены' });
    }

    return NextResponse.json({ message: 'Книга удалена, серия осталась' });
}