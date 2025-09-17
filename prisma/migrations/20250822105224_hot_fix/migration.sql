/*
  Warnings:

  - You are about to drop the column `locatiion` on the `Cinema` table. All the data in the column will be lost.
  - Added the required column `location` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "locatiion",
ADD COLUMN     "location" TEXT NOT NULL;
