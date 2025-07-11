/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_bookId_fkey";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "seriesId" INTEGER,
    "typeId" INTEGER,
    "pages" INTEGER NOT NULL,
    "age" INTEGER[],
    "faceImg" TEXT NOT NULL,
    "tocImg" TEXT[],
    "exampleImg" TEXT NOT NULL,
    "statusFree" BOOLEAN NOT NULL,
    "occupiedTo" TIMESTAMP(3),
    "ownerId" INTEGER NOT NULL,
    "userId" INTEGER,
    "firstSelfReading" BOOLEAN NOT NULL,
    "checked" BOOLEAN NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
