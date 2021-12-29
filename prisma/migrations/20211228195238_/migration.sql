/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `easiness` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `repetition` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "dueDate",
DROP COLUMN "easiness",
DROP COLUMN "interval",
DROP COLUMN "repetition";
