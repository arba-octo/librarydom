/*
  Warnings:

  - You are about to drop the column `comments` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `telegramm` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `whatsup` on the `Users` table. All the data in the column will be lost.
  - Added the required column `telegram` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsUp` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_seriesId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "comments",
ADD COLUMN     "typeId" INTEGER,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "seriesId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "telegramm",
DROP COLUMN "whatsup",
ADD COLUMN     "telegram" BOOLEAN NOT NULL,
ADD COLUMN     "whatsUp" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
