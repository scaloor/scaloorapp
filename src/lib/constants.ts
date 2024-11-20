export const urlSafePattern = /[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]/;
export const funnelNamePattern = /^[A-Za-z0-9\s]+$/;
export const domainNamePattern = /^[A-Za-z0-9\s-]+$/;

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const BLACKLISTED_DOMAINS = [
    'app.scaloor.com',
    'mail.scaloor.com',
    'cms.scaloor.com',
    'admin.scaloor.com',
    'api.scaloor.com',
    'docs.scaloor.com',
    'cam.scaloor.com',
]

export const validDomainRegex = new RegExp(
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
  );

export const SCALOOR_BUCKET = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/scaloor-bucket`
