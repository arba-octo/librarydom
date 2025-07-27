import prisma from '#prisma/client';

export async function getBooks() {
    return prisma.books.findMany({
        include: {
            comments: {
                include: {
                    user: true
                }
            }
        }
    });
}