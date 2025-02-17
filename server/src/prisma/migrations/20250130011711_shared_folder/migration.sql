-- CreateTable
CREATE TABLE "shared_folders" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "folderId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shared_folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shared_folders" ADD CONSTRAINT "shared_folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_folders" ADD CONSTRAINT "shared_folders_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
