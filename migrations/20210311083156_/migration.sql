/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGitHub` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[uniqueName]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - Added the required column `uniqueName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `UserGitHub` DROP FOREIGN KEY `UserGitHub_ibfk_1`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN     `uniqueName` VARCHAR(191) NOT NULL,
    ADD COLUMN     `displayname` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `UserGitHub`;

-- CreateIndex
CREATE UNIQUE INDEX `User.uniqueName_unique` ON `User`(`uniqueName`);
