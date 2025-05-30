"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type SearchResult = {
  id: string
  title: string
  type: "article" | "opportunity" | "alumni"
  subtitle?: string
  url: string
}

interface SearchProps {
  placeholder?: string
  className?: string
}

export function Search({ placeholder = "Search...", className = "" }: SearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a search with a timeout
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock results with explicit typing
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Career Paths in Quantum Computing",
          type: "article" as const,
          subtitle: "Article • 5 min read",
          url: "/articles/career-paths-quantum-computing"
        },
        {
          id: "2",
          title: "Summer Research Internship at CERN",
          type: "opportunity" as const,
          subtitle: "Internship • Deadline: May 30, 2024",
          url: "/opportunities/cern-summer-research"
        },
        {
          id: "3",
          title: "Dr. Sarah Chen",
          type: "alumni" as const,
          subtitle: "Quantum Computing Researcher at IBM",
          url: "/alumni/sarah-chen"
        }
      ].filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(mockResults)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setShowResults(true)
    handleSearch(value)
  }

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url)
    setShowResults(false)
    setQuery("")
  }

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "article":
        return "fas fa-newspaper"
      case "opportunity":
        return "fas fa-briefcase"
      case "alumni":
        return "fas fa-user-graduate"
      default:
        return "fas fa-search"
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pr-10"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          ) : (
            <i className="fas fa-search text-gray-400"></i>
          )}
        </div>
      </div>

      {/* Search Results */}
      {showResults && (query || results.length > 0) && (
        <Card className="absolute z-50 w-full mt-2 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-gray-100"
                    onClick={() => handleResultClick(result)}
                  >
                    <i className={`${getResultIcon(result.type)} w-5 mr-2`}></i>
                    <div>
                      <div className="font-medium">{result.title}</div>
                      {result.subtitle && (
                        <div className="text-sm text-gray-500">{result.subtitle}</div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            ) : query ? (
              <div className="p-4 text-center text-gray-500">
                No results found for "{query}"
              </div>
            ) : null}
          </div>
        </Card>
      )}
    </div>
  )
}
