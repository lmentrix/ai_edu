# OAuth Setup Guide

This guide will help you set up Google and GitHub OAuth for your application using Better Auth.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add the following authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret
8. Add them to your `.env.local` file:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

## GitHub OAuth Setup

1. Go to your GitHub account settings
2. Navigate to "Developer settings" > "OAuth Apps"
3. Click "New OAuth App"
4. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` (development) or your production URL
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (development) or `https://yourdomain.com/api/auth/callback/github` (production)
5. Click "Register application"
6. Copy the Client ID and generate a new Client Secret
7. Add them to your `.env.local` file:
   ```
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   ```

## Testing the OAuth Flow

1. After configuring the environment variables, restart your development server
2. Navigate to `/sign-in` or `/sign-up`
3. Click on the Google or GitHub buttons to test the OAuth flow
4. You should be redirected to the respective OAuth provider and then back to your application

## Important Notes

- Make sure your redirect URIs exactly match what's configured in your OAuth provider settings
- For production, always use HTTPS URLs
- Keep your client secrets secure and never commit them to version control
- The `.env.local` file should be added to `.gitignore` (which it already is in this project)