import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';

// GET: получить все книги
export async function GET() {
    try {
        const books = await prisma.books.findMany();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: добавить новую книгу
export async function POST(request) {
    try {
        const data = await request.json();
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
        } = data;
        const newBook = await prisma.books.create({
            data: {
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
            },
        });
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

// DELETE: удалить книгу по id из query-параметра (?id=1)
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: 'Некорректный id' }, { status: 400 });
        }
        await prisma.books.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Книга удалена' }, { status: 200 });
    } catch (error) {
        // Prisma ошибка внешнего ключа
        if (error.code === 'P2003' || error.message.includes('Foreign key constraint')) {
            return NextResponse.json({ error: 'Сначала удалите связанные комментарии' }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}