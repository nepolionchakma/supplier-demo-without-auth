const conf = {
  supabase_url: String(import.meta.env.VITE_SUPABASE_URL),
  supabase_key: String(import.meta.env.VITE_SUPABASE_KEY),
  supabase_admin_key: String(import.meta.env.VITE_SUPABASE_ADMIN_KEY),
};
export default conf;
