# Backend Migration
# ===============

## API Route Pages
### API Routes
The API routes are located at `gray-app/pages/api`. The API routes are written in TypeScript. Please check their [documentation](https://nextjs.org/docs/api-routes/introduction) for more information.

### Documentation Page
**File:** `pages/doc/index.tsx`  
**Description:** This file contains the OpenAPI documentation of our pages/api serverless function routes. It imports a strict-formatted json file from [`./gray-app/src/Doc/api_doc.json`](https://github.com/UofG-CS/project-TP-group04/blob/master/gray-app/src/Doc/api_doc.json)

## Database
### Supabase
We are using [Supabase](https://supabase.io/) as our database. You can create your own database by following the instructions on their website. You will need to create a new project and a new database. You will also need to create a new service account and a new API key. You will need to replace the values in the `.env` file with your own values. For now, you can use our existing database for testing purposes. Please contact us if you need access to our database.

### Supabase API
The Supabase API is located at `gray-app/lib/supabase`. This is the API that is used to interact with the Supabase database. It is written in TypeScript. We are mainly using this over prisma client for our CRUD functions, but you can use either or both concurrently. We included both for this flexibility purposes. Please check their [documentation](https://supabase.io/docs/reference/javascript/supabase-client) for more information.

## NextAuth
NextAuth is used for authentication. It is configured in `gray-app/pages/api/auth/[...nextauth].ts`. Please check their [documentation](https://next-auth.js.org/) for more information. The main login provider we are using is the prisma adapter which is configured to be connected to our supabase postgresql database, and this is flexible enough to be configured to any other forms of datastore sources. The nextauth middleware is also configured to use the JWT token for authentication purposes.

## Prisma
### Prisma Schema
The Prisma schema is located at `gray-app/prisma/schema.prisma`. This file contains the database schema for the application. It is used to generate the database client, which is used to interact with the database. The schema is written in a custom DSL, which is similar to SQL. The schema is used to generate the database client, which is used to interact with the database. The schema is written in a custom DSL, which is similar to SQL. The schema is used to generate the database client, which is used to interact with the database. The schema is written in a custom DSL, which is similar to SQL. Please check their [documentation](https://www.prisma.io/docs/concepts/components/prisma-schema) for more information.

### Prisma Client
The Prisma client is located at `gray-app/lib/prisma`. This is the generated client that is used to interact with the database. It is generated from the Prisma schema using `npx prisma generate`. Please check their [documentation](https://www.prisma.io/docs/concepts/components/prisma-client) for more information.

### Prisma Migrate
Prisma Migrate is used to manage database migrations. It is used to create and apply migrations. It is also used to reset the database. Please check their [documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate) for more information.

## Environment Variables
The environment variables are located at `gray-app/.env`. Sample file is `gray-app/.env.sample`. This file contains the environment variables for the application. It is used to configure the database connection, the NextAuth configuration, and the Supabase configuration. Please check their [documentation](https://nextjs.org/docs/basic-features/environment-variables) for more information. If email login is desired, the SMTP server configuration needs to be added to the .env file.