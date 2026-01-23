export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/3iceDemo' : '';
  return `${basePath}${path}`;
}
