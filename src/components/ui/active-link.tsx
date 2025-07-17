"use client"

import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { cloneElement, isValidElement } from "react"

type ActiveLinkProps = LinkProps & {
  children: (props: { isActive: boolean }) => React.ReactNode
}

export function ActiveLink({ children, ...props }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === props.href

  const child = children({ isActive });

  if (!isValidElement(child)) {
    return null;
  }
  
  return (
    <Link {...props} legacyBehavior passHref>
      {cloneElement(child, {
        "data-active": isActive,
      })}
    </Link>
  )
}
