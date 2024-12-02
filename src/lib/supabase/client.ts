import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function uploadFile(file: File, path: string) {
  const { storage } = createClient();
  const { data, error } = await storage.from('scaloor-bucket').upload(`${path}`, file)
  console.log("Uploading file:", path, file)
  return { data, error }
}

export async function deleteFile(path: string) {
  const { storage } = createClient();
  const { data, error } = await storage.from('scaloor-bucket').remove([path])
  console.log("Deleting file:", path)
  return { data, error }
}

