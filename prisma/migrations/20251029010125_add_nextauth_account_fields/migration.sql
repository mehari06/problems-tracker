/*
  Warnings:

  - The `accessTokenExpires` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `idToken` VARCHAR(191) NULL,
    ADD COLUMN `scope` VARCHAR(191) NULL,
    ADD COLUMN `tokenType` VARCHAR(191) NULL,
    DROP COLUMN `accessTokenExpires`,
    ADD COLUMN `accessTokenExpires` INTEGER NULL;
