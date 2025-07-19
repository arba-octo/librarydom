/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Types" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Books_key_key" ON "Books"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_key_key" ON "Comments"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Types_key_key" ON "Types"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
