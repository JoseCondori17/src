'use client'
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { getMenuList } from "@/constants/menu-list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Logout01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export function Menu() {
  const pathname = usePathname();
  const { isAuthenticated, user, role } = useAuth();
  const menuList = getMenuList(pathname, role);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col items-start space-y-1 px-2">
          {
            menuList.map((item, index) => (
              <li key={index} className="w-full ">
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <Link href={ item.href }>
                        <div className={
                          cn("w-full flex justify-center items-center hover:bg-gray-200 rounded-lg p-3",
                          item.active ? 'bg-primary text-white hover:bg-primary hover:text-white' : ''
                        )}>
                          { <item.icon className="size-5"></item.icon> }
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{ item.label }</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))
          }
          <li className="w-full flex items-end">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="w-full">
                  <div className="w-full flex justify-center items-center hover:bg-gray-200 rounded-lg p-3">  
                    <Link href={'/auth/sign-in'}>
                      <Logout01Icon size={18}></Logout01Icon>
                    </Link>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Cerrar sesión</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}