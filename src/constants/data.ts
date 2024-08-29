
// Product options
export const statusesProducts = {
  category: [
    {
      value: "drink",
      label: "Bebidas",
      color: "bg-green-100"
    },
    {
      value: "fritters",
      label: "Churros",
      color: "bg-red-100"
    },
    {
      value: "ice-cream",
      label: "Helados",
      color: "bg-orange-100"
    },
    {
      value: "food",
      label: "Comida",
      color: "bg-gray-100"
    },
  ]
}

export const filtersProducts = [
  {
    value: 'category',
    label: 'Categoria',
  }
]

// Orders options
export const statusesOrders = {
  paymentMethod: [
    {
      value: "cash",
      label: "Efectivo",
      color: "bg-green-100"
    },
    {
      value: "card",
      label: "Tarjeta",
      color: "bg-red-100"
    },
    {
      value: "phone",
      label: "Telefono",
      color: "bg-orange-100"
    },
  ],
  created_at: [],
}

export const filtersOrders = [
  {
    value: 'paymentMethod',
    label: 'Metodo de pago',
  },
  /* {
    value: 'created_at',
    label: 'Fecha'
  } */
]