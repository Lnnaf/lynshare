/*
  Warnings:

  - The primary key for the `post_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `post_category` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `post_category` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `post_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `post_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_postId_fkey";

-- AlterTable
ALTER TABLE "post_category" DROP CONSTRAINT "post_category_pkey",
DROP COLUMN "categoryId",
DROP COLUMN "postId",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD CONSTRAINT "post_category_pkey" PRIMARY KEY ("post_id", "category_id");

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_category" ADD CONSTRAINT "post_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
