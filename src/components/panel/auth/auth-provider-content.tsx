'use client'
import { AuthProvider } from "@/context/auth-context";

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProviderContent({children}: AuthProviderProps){
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );  
}