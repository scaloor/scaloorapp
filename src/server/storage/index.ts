/* import { createClient } from '@supabase/supabase-js'

const supabase = createClient(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`, `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);

async function uploadFile(file: File) {
    const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
    if (error) {
        // Handle error
        console.error(error);
    } else {
        // Handle success
    }
}

export async function handleImageUpload(file: File) {
    
} */