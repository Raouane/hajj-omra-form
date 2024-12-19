// Initialisation du client Supabase
const supabaseUrl = 'VOTRE_URL_SUPABASE'  // À remplacer par votre URL Supabase
const supabaseKey = 'VOTRE_CLE_ANON_PUBLIC'  // À remplacer par votre clé anon/public
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

export { supabase }
