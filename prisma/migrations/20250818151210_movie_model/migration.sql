-- CreateTable
CREATE TABLE "Movie" (
    "Id" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT,
    "poster_path" TEXT,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "overview" TEXT,
    "release_date" TIMESTAMP(3),
    "runtime" INTEGER,
    "status" TEXT,
    "tagline" TEXT,
    "popularity" DOUBLE PRECISION,
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "video" BOOLEAN NOT NULL,
    "playingNow" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movieId" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "Screening" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Screening_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "type" TEXT,
    "official" BOOLEAN,
    "published" TIMESTAMP(3),
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Trailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trailer_movieId_key" ON "Trailer"("movieId");

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD CONSTRAINT "Trailer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
