'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MCPSetupPage() {
  const router = useRouter()
  useEffect(() => { router.replace('/mcp-setup') }, [router])
  return null
}
