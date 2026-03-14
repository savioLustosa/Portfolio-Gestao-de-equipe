import { SupabaseProvider } from "@/lib/supabase-provider";
import App from "./App";

export default function Page() {
  return (
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  );
}
