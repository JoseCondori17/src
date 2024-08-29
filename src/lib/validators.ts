import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Correo electronico es necesario'
  }),
  password: z.string().min(1, { message: 'Contraseña es necesario' })
})

export const RegisterFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string()
})

export const NewProductSchema = z.object({
  id: z.number(),
  productName: z.string(),
  productDescription: z.string(),
  category: z.string(),
  size_small: z.number(),
  size_medium: z.number(),
  size_large: z.number(),
})

export const OrderSchema = z.object({
  id: z.number(),
  create_at: z.date(),
  items: z.object({
    productName: z.string(),
    size: z.string(),
    quantity: z.number(),
    price: z.number(),
  }),
  subTotal: z.number(),
  total: z.number(),
  paymentMethod: z.string(),
})


export type Login = z.infer<typeof LoginFormSchema>;
export type Register = z.infer<typeof RegisterFormSchema>;
export type NewProduct = z.infer<typeof NewProductSchema>;
export type Order = z.infer<typeof OrderSchema>;