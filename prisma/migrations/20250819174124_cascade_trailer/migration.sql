-- DropForeignKey
ALTER TABLE "Trailer" DROP CONSTRAINT "Trailer_movieId_fkey";

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
