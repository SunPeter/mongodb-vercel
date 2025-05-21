# MongoDB Starter – Developer Directory

A developer directory built on [Next.js](https://nextjs.org/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database), deployed on [Vercel](https://vercel.com/) with the [Vercel + MongoDB integration](https://vercel.com/integrations/mongodbatlas).

![](/public/og.png)

Featured on the [MongoDB World](https://www.mongodb.com/world-2022) keynote.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fmongodb-starter&project-name=mongodb-nextjs&repo-name=mongodb-nextjs&demo-title=MongoDB%20Developer%20Directory&demo-description=Log%20in%20with%20GitHub%20to%20create%20a%20directory%20of%20contacts.&demo-url=https%3A%2F%2Fmongodb.vercel.app%2F&demo-image=https%3A%2F%2Fmongodb.vercel.app%2Fog.png&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH&env=NEXTAUTH_SECRET&envDescription=Generate%20one%20at%20https%3A%2F%2Fgenerate-secret.now.sh%2F32&envLink=https://next-auth.js.org/deployment#vercel)

## Prerequisites

Before you begin, ensure you have the following installed and set up:

- **Node.js**: It's recommended to use a version that matches the `engines` field in `package.json`. If not specified, the latest LTS version is a good choice.
- **pnpm**: This project uses pnpm as the package manager due to the presence of a `pnpm-lock.yaml` file.
- **MongoDB Atlas Account**: You'll need a MongoDB Atlas account to get a `MONGODB_URI` connection string.
- **GitHub Account & OAuth App**: For authentication with NextAuth.js, you'll need a GitHub account and a GitHub OAuth application to obtain `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

## Getting Started / Local Development Setup

Follow these steps to get the project running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vercel/mongodb-starter # Replace with the actual repository URL if different
    ```
2.  **Install dependencies:**
    Navigate to the project directory and install the required packages using pnpm.
    ```bash
    cd mongodb-starter # Or your cloned directory name
    pnpm install
    ```
3.  **Set up environment variables:**
    Copy the example environment file to a new local environment file:
    ```bash
    cp .env.example .env.local
    ```
    Then, open `.env.local` and fill in the necessary values:
    - `MONGODB_URI`: Your MongoDB connection string from Atlas.
    - `GITHUB_CLIENT_ID`: Your GitHub OAuth App's Client ID.
    - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App's Client Secret.
    - `NEXTAUTH_SECRET`: A secret string used to sign tokens. You can generate one at `https://generate-secret.now.sh/32`.
    - `NEXTAUTH_URL`: For local development, this can typically be kept as `http://localhost:3000/api/auth`.

4.  **Seed the database (optional but recommended):**
    This script (`scripts/setup.mjs`) will populate your database with initial data if it's empty.
    ```bash
    pnpm setup
    ```
5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application should now be running at `http://localhost:3000`.

## Project Structure

Here's an overview of the key directories and files in this project:

-   `/components`: Contains reusable UI components used throughout the application.
-   `/lib`: Includes helper functions, utility code, API service definitions, the MongoDB database connection setup (`mongodb.ts`), and custom React hooks.
-   `/pages`: Holds the Next.js pages and API routes.
    -   `/pages/api`: Contains server-side API endpoints.
-   `/public`: Stores static assets like images, fonts, etc., that are served directly.
-   `/scripts`: Contains utility scripts for various tasks, such as `setup.mjs` for database seeding.
-   `/styles`: Includes global stylesheets and the Tailwind CSS configuration.

## Available Scripts

This project uses `pnpm` as the package manager. Here are some of the available scripts:

-   `pnpm dev`: Starts the Next.js development server with hot reloading.
-   `pnpm build`: Builds the application for production. This process also includes database seeding via `pnpm setup` if the database is empty.
-   `pnpm start`: Starts the Next.js production server after a successful build.
-   `pnpm lint`: Lints the codebase using ESLint to check for code quality and style issues.
-   `pnpm setup`: A utility script that seeds the database with initial data. This is typically run during the build process or manually for initial setup.

### Demo

https://mongodb.vercel.app

### Vercel + MongoDB Integration

https://vercel.com/integrations/mongodbatlas

### Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Vercel](https://vercel.com/)
