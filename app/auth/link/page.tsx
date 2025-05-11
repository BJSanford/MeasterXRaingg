"use client"

import dynamic from "next/dynamic"

const LinkAccountClient = dynamic(() => import("./LinkAccountClient"), { ssr: false })

export default function LinkAccountPage() {
  return <LinkAccountClient />
}
