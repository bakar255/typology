-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "price" REAL,
    "currency" TEXT,
    "imageUrl" TEXT,
    "productUrl" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_externalId_key" ON "Product"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productUrl_key" ON "Product"("productUrl");
