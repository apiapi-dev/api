-- CreateTable
CREATE TABLE "api" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "respository" TEXT,
    "documentation" TEXT,
    "homepage" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "api_id" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    PRIMARY KEY ("api_id","tag")
);

-- AddForeignKey
ALTER TABLE "tag" ADD FOREIGN KEY("api_id")REFERENCES "api"("id") ON DELETE CASCADE ON UPDATE CASCADE;
