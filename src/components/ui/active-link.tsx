"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode;
}

export function ActiveLink({ children, ...props }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  const child = React.Children.only(children)

  if (!React.isValidElement(child)) {
    return null;
  }
  
  return (
    <Link {...props}>
      {React.cloneElement(child, { "data-active": isActive, isActive: isActive })}
    </Link>
  )
}
