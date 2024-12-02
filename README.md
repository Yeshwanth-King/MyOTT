# Next.js with Supabase App

This project is built with [Next.js](https://nextjs.org) using the App Router. It integrates with [Supabase](https://supabase.com) for backend services like authentication and storage (Bucket). The app is deployed on [Vercel](https://vercel.com).

## Features

- **Next.js App Router** for modern, file-based routing.
- **Supabase Authentication** for user management.
- **Supabase Buckets** for file storage.
- Deployed seamlessly using Vercel.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm, yarn, pnpm, or bun (choose your package manager)

### Environment Variables

Create a `.env.local` file in the root of your project and add the following Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-supabase-url` and `your-anon-key` with the credentials from your Supabase project.

## Installation

Install dependencies:

```bash
npm install

# or

yarn install

# or

pnpm install

# or

bun install
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Supabase Integration

### Authentication

This app uses Supabase Auth for user login/signup. Users can authenticate using their email and password or third-party providers (if configured).

### Buckets

Supabase Buckets are used for file storage. Ensure the correct policies are applied to allow file uploads and downloads.

## Deployment

This app is deployed on Vercel. To deploy your version:

1. Push your project to a Git repository (e.g., GitHub).
2. Link the repository to Vercel.
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel dashboard.
4. Deploy the app.

You can view the live app here: [My OTT](https://my-ott-zeta.vercel.app/)

## Learn More

To learn more about the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Get started with Supabase.
- [Vercel Deployment Docs](https://vercel.com/docs) - Deploy Next.js apps with Vercel.

Feel free to modify this README to fit your project's specific needs!
