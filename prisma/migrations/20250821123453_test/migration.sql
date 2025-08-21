/*
  Warnings:

  - You are about to drop the column `location` on the `Screening` table. All the data in the column will be lost.
  - Added the required column `cinema` to the `Screening` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Screening` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Screening" DROP COLUMN "location",
ADD COLUMN     "cinema" TEXT NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "screeningId" TEXT NOT NULL,
    "userId" TEXT,
    "selectedSeats" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
