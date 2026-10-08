-- CreateEnum
CREATE TYPE "GroceryCategory" AS ENUM ('FRUIT', 'VEGETABLE', 'LEAFY_VEGETABLE', 'ROOT_VEGETABLE', 'GRAIN', 'LEGUME', 'HERB', 'SPICE', 'NUT_SEED', 'MUSHROOM', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductClass" AS ENUM ('GROCERY', 'RESTRICTED_LOCAL_PRODUCT');

-- CreateEnum
CREATE TYPE "NutritionSource" AS ENUM ('USDA', 'FAO', 'OTHER');

-- CreateEnum
CREATE TYPE "ImageSource" AS ENUM ('USDA', 'WIKIMEDIA', 'OTHER');

-- CreateTable
CREATE TABLE "Grocery" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "category" "GroceryCategory" NOT NULL,
    "productClass" "ProductClass" NOT NULL DEFAULT 'GROCERY',
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "growingEnvironment" TEXT NOT NULL,
    "harvestingProcess" TEXT NOT NULL,
    "howToChoose" TEXT[],
    "howToStore" TEXT[],
    "commonUses" TEXT[],
    "seasonality" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grocery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryAlias" (
    "id" TEXT NOT NULL,
    "groceryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isLocalName" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "countryCode" TEXT,

    CONSTRAINT "GroceryAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryNutrition" (
    "id" TEXT NOT NULL,
    "groceryId" TEXT NOT NULL,
    "basis" TEXT NOT NULL DEFAULT 'Per 100 g',
    "calories" DOUBLE PRECISION,
    "proteinGrams" DOUBLE PRECISION,
    "carbohydratesGrams" DOUBLE PRECISION,
    "fatGrams" DOUBLE PRECISION,
    "fibreGrams" DOUBLE PRECISION,
    "sugarGrams" DOUBLE PRECISION,
    "vitamins" JSONB NOT NULL,
    "minerals" JSONB NOT NULL,
    "benefits" TEXT[],
    "source" "NutritionSource",
    "sourceId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroceryNutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryImage" (
    "id" TEXT NOT NULL,
    "groceryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "source" "ImageSource",
    "sourceUrl" TEXT,
    "author" TEXT,
    "license" TEXT,
    "attribution" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroceryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grocery_slug_key" ON "Grocery"("slug");

-- CreateIndex
CREATE INDEX "Grocery_name_idx" ON "Grocery"("name");

-- CreateIndex
CREATE INDEX "Grocery_category_idx" ON "Grocery"("category");

-- CreateIndex
CREATE INDEX "Grocery_isPublished_idx" ON "Grocery"("isPublished");

-- CreateIndex
CREATE INDEX "GroceryAlias_name_idx" ON "GroceryAlias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryAlias_groceryId_name_key" ON "GroceryAlias"("groceryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "GroceryNutrition_groceryId_key" ON "GroceryNutrition"("groceryId");

-- CreateIndex
CREATE INDEX "GroceryImage_groceryId_idx" ON "GroceryImage"("groceryId");

-- AddForeignKey
ALTER TABLE "GroceryAlias" ADD CONSTRAINT "GroceryAlias_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "Grocery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryNutrition" ADD CONSTRAINT "GroceryNutrition_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "Grocery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryImage" ADD CONSTRAINT "GroceryImage_groceryId_fkey" FOREIGN KEY ("groceryId") REFERENCES "Grocery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
