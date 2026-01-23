// Helper function to get correct asset path for GitHub Pages
export function getAssetPath(path: string): string {
  // In production (GitHub Pages), add basePath
  const basePath = process.env.NODE_ENV === 'production' ? '/3iceDemo' : '';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
