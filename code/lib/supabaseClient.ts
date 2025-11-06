import { createClient } from "@supabase/supabase-js";

// ⚠️ COLE SEUS DADOS AQUI DIRETO:
const supabaseUrl = "https://dzdwvyfhtpxlsotxsdda.supabase.co";
const supabaseAnonKey = "Nk5544$_";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
