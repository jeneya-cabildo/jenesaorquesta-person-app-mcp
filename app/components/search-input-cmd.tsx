'use client'

import * as React from "react"
import { useRouter } from 'next/navigation'
import { SearchCommand } from "@/components/search-command"
import { searchUsers } from '@/app/actions/actions'
import { User } from "../actions/schemas"

export default function SearchInput() {
  const router = useRouter()

  const handleSearch = async (query: string): Promise<User[]> => {
    if (!query.trim()) return []
    return searchUsers(query)
  }

  const handleSelect = (user: User) => {
    router.push(`?userId=${user.id}`)
  }

  return (
    <SearchCommand<User>
      onSearch={handleSearch}
      onItemSelect={handleSelect}
      getItemId={(user) => user.id}
      getItemLabel={(user) => user.name}
      placeholder="Search people by name or email..."
      noResultsText="No people found."
    />
  )
}
