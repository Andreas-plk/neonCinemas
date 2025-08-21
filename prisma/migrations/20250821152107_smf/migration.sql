/*
  Warnings:

  - You are about to drop the column `room` on the `Screening` table. All the data in the column will be lost.
  - Added the required column `locatiion` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cinema" ADD COLUMN     "locatiion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Screening" DROP COLUMN "room";
