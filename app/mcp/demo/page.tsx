'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MCPDemoPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/mcp-demo') }, [router])
  return null
}
