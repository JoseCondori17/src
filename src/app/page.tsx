import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <Button asChild>
        <Link href={'/auth/sign-in'}>Empezar</Link>
      </Button>      
    </main>
  );
}
