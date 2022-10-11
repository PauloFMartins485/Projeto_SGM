-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "papel" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "hashedpass" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musics" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR NOT NULL,
    "tom" VARCHAR NOT NULL,
    "cifra" VARCHAR NOT NULL,
    "categoria" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "repertoryId" INTEGER,

    CONSTRAINT "Musics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repertory" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "local" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "Repertory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Musics" ADD CONSTRAINT "Musics_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musics" ADD CONSTRAINT "Musics_repertoryId_fkey" FOREIGN KEY ("repertoryId") REFERENCES "Repertory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repertory" ADD CONSTRAINT "Repertory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
