"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { subscribeToNewsletter } from "@/lib/api"

interface NewsletterSignupProps {
  className?: string
  variant?: "default" | "compact"
}

export function NewsletterSignup({ className = "", variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    try {
      await subscribeToNewsletter(email)
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
    } catch (error) {
      console.error("Newsletter signup error:", error)
      toast.error("Failed to subscribe. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
        <p className="text-sm text-gray-600">
          Stay updated with the latest opportunities, articles, and events in physics.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            By subscribing, you agree to receive our newsletter and accept our privacy policy.
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
        </Button>
      </form>
    </div>
  )
}
