
CREATE TYPE "Role" AS ENUM ('attendee', 'organizer');

CREATE TABLE "User" (
    "id"        TEXT        NOT NULL,
    "nom"       TEXT        NOT NULL,
    "prenom"    TEXT        NOT NULL,
    "email"     TEXT        NOT NULL,
    "password"  TEXT        NOT NULL,
    "role"      "Role"      NOT NULL DEFAULT 'attendee',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "User_email_key" ON "User"("email");