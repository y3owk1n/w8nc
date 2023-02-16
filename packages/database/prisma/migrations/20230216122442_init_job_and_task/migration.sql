-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('CRON', 'SCHEDULE');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'INACTIVE', 'SUCCESS');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "JobType" NOT NULL,
    "date" TIMESTAMP(3),
    "cron" TEXT,
    "data" JSONB NOT NULL,
    "retry" INTEGER,
    "headers" JSONB,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "reqHeaders" JSONB NOT NULL,
    "resHeaders" JSONB NOT NULL,
    "resStatus" INTEGER NOT NULL,
    "resMethod" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Job_id_url_type_date_cron_data_retry_headers_status_created_idx" ON "Job"("id", "url", "type", "date", "cron", "data", "retry", "headers", "status", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Task_id_url_data_reqHeaders_resHeaders_resStatus_resMethod__idx" ON "Task"("id", "url", "data", "reqHeaders", "resHeaders", "resStatus", "resMethod", "status", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
