import { createClient } from "@supabase/supabase-js";

const supabase_url: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const url : string = supabase_url!;
const anon: string = anon_key!;

const supabase = createClient(url , anon);

export {
    supabase
}