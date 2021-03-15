/*
  Warnings:

  - You are about to drop the column `displayname` on the `User` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `displayname`,
    ADD COLUMN     `displayName` VARCHAR(191) NOT NULL,
    ADD COLUMN     `picture` VARCHAR(191) NOT NULL;
