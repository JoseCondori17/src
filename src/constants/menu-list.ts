import { 
  DeliveryBox01Icon,
  ShoppingCart01Icon,
  TaskDone01Icon,
  HugeiconsProps,
} from "hugeicons-react";

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.FC<HugeiconsProps>;
};

export function getMenuList(pathname: string, role: string | null) : Menu[] { 

  const menuList = [
    /* { href: "/pos/summary", label: "Resumen", active: pathname.includes("/pos/summary"), icon: DashboardSpeed01Icon }, */
    { href: "/pos/menu", label: "Menu", active: pathname.includes("/pos/menu"), icon: ShoppingCart01Icon },
    { href: "/pos/orders", label: "Ordenes", active: pathname.includes("/pos/orders"), icon: TaskDone01Icon },
    { href: "/pos/products", label: "Productos", active: pathname.includes("/pos/products"), icon: DeliveryBox01Icon },
  ]

  if (role === 'admin'){
    return [
      ...menuList,/* 
      { href: "/pos/orders", label: "Ordenes", active: pathname.includes("/pos/orders"), icon: TaskDone01Icon },
      { href: "/pos/products", label: "Productos", active: pathname.includes("/pos/products"), icon: DeliveryBox01Icon }, */
    ]
  }

  return menuList;
}