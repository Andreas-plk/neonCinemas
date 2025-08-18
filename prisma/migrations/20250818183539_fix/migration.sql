/*
  Warnings:

  - You are about to drop the `MovieGenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "MovieGenre" DROP CONSTRAINT "MovieGenre_movieId_fkey";

-- DropTable
DROP TABLE "MovieGenre";

-- CreateTable
CREATE TABLE "_MovieGenres" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieGenres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieGenres_B_index" ON "_MovieGenres"("B");

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieGenres" ADD CONSTRAINT "_MovieGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
