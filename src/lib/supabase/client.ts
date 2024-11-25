import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from('scaloor-bucket').upload(`${path}`, file)
  console.log("Uploaded file:", data, error)
  return { data, error }
}

export async function deleteFile(path: string) {
  const { storage } = createClient();
  console.log("Storage:", storage)
  console.log("Deleting file:", path)
  const { data, error } = await storage.from('scaloor-bucket').remove([path])
  console.log("Error:", error)
  console.log("Data:", data)
  return { data, error }
}

