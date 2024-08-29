export interface OrderItem {
  productName: string
  size: string
  quantity: number
  price: number
}

export interface Order {
  items: OrderItem[]
  paymentMethod: string
  subTotal: number
  total: number
}

export interface Sales {
  id: number
  created_at: Date
  orders: Order[]
}