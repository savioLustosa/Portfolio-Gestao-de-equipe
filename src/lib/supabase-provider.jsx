"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = createContext(null);

export function SupabaseProvider({ children }) {
  // Inicialização mockada para evitar erros sem variáveis de ambiente
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
  
  const [supabase] = useState(() => createClient(supabaseUrl, supabaseKey));

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("useSupabase must be used within a SupabaseProvider");
  return context;
};
