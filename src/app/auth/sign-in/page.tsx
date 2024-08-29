import { AuthContentLayout } from "@/components/panel/auth/auth-content-layout";
import { FormSignIn } from "@/components/forms/form-sign-in";

export default function SignIn(){
  return (
    <AuthContentLayout title="Iniciar sesión" description="Ingresa tu correo electrónico para iniciar sesión">
      <FormSignIn></FormSignIn>
    </AuthContentLayout>
  );
}