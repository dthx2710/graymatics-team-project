-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "access_level" VARCHAR,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT,
    "company" TEXT,
    "gender" TEXT,
    "group" TEXT,
    "phone" VARCHAR,
    "role" TEXT,
    "country" TEXT,
    "description" TEXT,
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "location" TEXT,
    "type" TEXT,
    "name" TEXT,
    "thumbnail" TEXT,
    "description" TEXT,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "assigned_analytics" TEXT,
    "cam_id" TEXT,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Camera" (
    "cam_name" TEXT,
    "cam_location" TEXT,
    "rstp_link" TEXT,
    "is_assigned" BOOLEAN,
    "user_id" TEXT NOT NULL,
    "analytics" TEXT,
    "cam_id" TEXT NOT NULL,
    "other_id" TEXT,
    "src" TEXT,

    CONSTRAINT "Camera_pkey" PRIMARY KEY ("cam_id")
);

-- CreateTable
CREATE TABLE "DetectedAnalytics" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "detected_at" TIMESTAMPTZ(6),

    CONSTRAINT "DetectedAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartData" (
    "id" TEXT NOT NULL,
    "chartType" TEXT,
    "objectData" JSON,

    CONSTRAINT "ChartData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR,
    "date" DATE,
    "time" TIME(6),
    "camera" VARCHAR,
    "severity" VARCHAR,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heatmap" (
    "id" BIGSERIAL NOT NULL,
    "retail_store_section" VARCHAR,
    "customer_count" BIGINT,
    "time" TIME(6),

    CONSTRAINT "Heatmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "occurance" TEXT,
    "status" TEXT,
    "type_of_alert" TEXT,
    "assigned_to" TEXT,
    "assigned_by" TEXT,
    "severity" TEXT,
    "reviewed" TEXT,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
