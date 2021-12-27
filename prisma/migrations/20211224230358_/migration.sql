/*
  Warnings:

  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_cardId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "easiness" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN     "interval" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repetition" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Response";
