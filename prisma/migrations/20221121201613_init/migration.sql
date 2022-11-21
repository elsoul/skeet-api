/*
  Warnings:

  - You are about to drop the column `icon_url` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "icon_url",
ADD COLUMN     "iconUrl" TEXT;
