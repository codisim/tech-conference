/*
  Warnings:

  - You are about to drop the column `verified` on the `organizers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrganizerStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "organizers" DROP COLUMN "verified",
ADD COLUMN     "status" "OrganizerStatus" NOT NULL DEFAULT 'PENDING';
