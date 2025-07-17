"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { cn } from "@/lib/utils";

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function ActiveLink({ children, className, asChild, ...props }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link 
      {...props} 
      className={cn(className, { "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground": isActive })}
      data-active={isActive}
    >
      {children}
    </Link>
  )
}
