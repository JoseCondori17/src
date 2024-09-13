'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/validators";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { LoginDefaultValues } from "@/constants/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function FormSignIn() {
  const { login } = useAuth()
  const router = useRouter();
  const initialValues = LoginDefaultValues;
  const formSignIn = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof LoginFormSchema>){
    if (values.email == 'admin@gmail.com' && values.password == 'adminPASS2024V1'){
      router.push("/pos/menu");
      const user = {email: values.email, role: 'admin'};
      login(user);
    } else if (values.email == 'UNDEFINED_USER' && values.password == '$s53d&#14s1'){
      router.push("/pos/menu");
      const user = {email: values.email, role: 'employee'};
      login(user);
    }
  }

  return (
    <Form {...formSignIn}>
      <form onSubmit={formSignIn.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField 
          control={formSignIn.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@dominio.com" {...field} autoComplete="off"/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField 
          control={formSignIn.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off"/>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" size={'lg'} className="w-full">Iniciar sesión</Button>
      </form>
    </Form>
  );
}