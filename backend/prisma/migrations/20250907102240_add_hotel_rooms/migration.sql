/*
  Warnings:

  - You are about to drop the column `rooms` on the `Hotel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hotel_id]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.
  - The required column `hotel_id` was added to the `Hotel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Hotel` DROP COLUMN `rooms`,
    ADD COLUMN `hotel_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `HotelRooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel_room_id` VARCHAR(191) NOT NULL,
    `hotel_id` VARCHAR(191) NOT NULL,
    `hotel_rooms_number` VARCHAR(191) NOT NULL,
    `hotel_room_image` VARCHAR(191) NOT NULL,
    `hotel_room_status` VARCHAR(191) NOT NULL,
    `hotel_room_availability` VARCHAR(191) NOT NULL,
    `hotel_room_price` DOUBLE NOT NULL,
    `hotel_room_features` VARCHAR(191) NOT NULL,
    `hotel_room_types` VARCHAR(191) NOT NULL,
    `hotel_room_description` VARCHAR(191) NOT NULL,
    `hotel_room_capacity` INTEGER NOT NULL,
    `hotel_room_available_from` DATETIME(3) NOT NULL,
    `hotel_room_available_to` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HotelRooms_hotel_room_id_key`(`hotel_room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Hotel_hotel_id_key` ON `Hotel`(`hotel_id`);

-- AddForeignKey
ALTER TABLE `HotelRooms` ADD CONSTRAINT `HotelRooms_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `Hotel`(`hotel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
