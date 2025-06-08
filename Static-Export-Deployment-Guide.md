# Static Export Deployment Guide for Next.js Project

This guide explains how to prepare and deploy your Next.js project as a static site, suitable for hosting on platforms like ArenHost shared hosting.

## Step 1: Verify Project Compatibility

- Ensure your project does not use server-side rendering features like `getServerSideProps` or API routes.
- Your project should be fully static or client-side rendered.

## Step 2: Update next.config.js (if needed)

- Your current `next.config.js` is compatible with static export.
- If you have dynamic routes, ensure they are handled with `getStaticPaths` and `getStaticProps`.

## Step 3: Build and Export Static Files

Run the following commands in your project root:

```bash
npm run build
npx next export
```

- This will generate a static version of your site in the `out/` directory.

## Step 4: Upload Static Files to ArenHost

- Use FTP, SFTP, or the ArenHost file manager to upload the contents of the `out/` directory to your web root directory on ArenHost.
- Ensure the `index.html` file is at the root of your hosting directory.

## Step 5: Domain and SSL Setup

- Use ArenHost’s control panel to manage your domain DNS settings.
- Ensure your domain points to your ArenHost server IP.
- ArenHost provides free SSL; enable it via their control panel for HTTPS.

## Step 6: Verify Deployment

- Visit your domain in a browser.
- Your static Next.js site should load correctly.
- Check for any broken links or missing assets.

## Notes

- Static export does not support server-side features or API routes.
- For dynamic functionality, consider client-side rendering or external APIs.
- For full Next.js SSR support, consider deploying on Vercel or a Node.js capable host.

---

This completes the static export deployment guide for your Next.js project.
