/*
  Warnings:

  - You are about to drop the column `answerId` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_answerId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "answerId";

-- CreateTable
CREATE TABLE "_CardToLesson" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToLesson_AB_unique" ON "_CardToLesson"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToLesson_B_index" ON "_CardToLesson"("B");

-- AddForeignKey
ALTER TABLE "_CardToLesson" ADD FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToLesson" ADD FOREIGN KEY ("B") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
