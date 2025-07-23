import prisma from '#prisma/client';

export default async function getBooksWithComments(req, res) {
    const books = await prisma.books.findMany({
        include: {
            comments: {
                include: {
                    user: true,
                },
            },
        },
    });
    res.json(books);
}