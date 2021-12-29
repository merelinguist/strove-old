/*
  Warnings:

  - A unique constraint covering the columns `[hashedToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_key" ON "Token"("hashedToken");
