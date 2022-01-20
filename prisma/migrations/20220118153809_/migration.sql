/*
  Warnings:

  - You are about to drop the column `target` on the `Note` table. All the data in the column will be lost.
  - Added the required column `end` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "target",
ADD COLUMN     "end" INTEGER NOT NULL,
ADD COLUMN     "start" INTEGER NOT NULL;
