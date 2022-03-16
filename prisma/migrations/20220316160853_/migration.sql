/*
  Warnings:

  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardToLesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_deckId_fkey";

-- DropForeignKey
ALTER TABLE "_CardToLesson" DROP CONSTRAINT "_CardToLesson_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToLesson" DROP CONSTRAINT "_CardToLesson_B_fkey";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "_CardToLesson";
