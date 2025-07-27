import prisma from '#prisma/client';
import { NextResponse } from "next/server";

export async function GET() {
    const books = await prisma.books.findMany({
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
        },
    });
    return NextResponse.json(books);
}