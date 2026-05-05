import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === 'true' && Boolean(repo);
const explicitBasePath = process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH;
const inferredBasePath = isGitHubPagesBuild ? `/${repo}` : '';
const rawBasePath = explicitBasePath ?? inferredBasePath;
const basePath = rawBasePath
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default withMDX(config);
