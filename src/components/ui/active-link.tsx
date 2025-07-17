"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { cn } from "@/lib/utils";

type ActiveLinkProps = LinkProps & {
  children: React.ReactElement;
  className?: string;
}

export function ActiveLink({ children, ...props }: ActiveLinkProps) {
  const pathname = usePathname()
  const child = React.Children.only(children)
  const isActive = pathname === props.href

  return (
    <Link {...props} legacyBehavior>
        {React.cloneElement(child, {
            ...child.props,
            "data-active": isActive,
            className: cn(child.props.className, { "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground": isActive })
        })}
    </Link>
  )
}