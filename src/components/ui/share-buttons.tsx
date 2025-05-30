"use client"

interface ShareData {
  title: string
  text: string
  url: string
}

const platforms = [
  {
    name: "Twitter",
    icon: "fab fa-twitter",
    color: "bg-[#1DA1F2] hover:bg-[#1a8cd8]"
  },
  {
    name: "Facebook",
    icon: "fab fa-facebook-f",
    color: "bg-[#4267B2] hover:bg-[#365899]"
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    color: "bg-[#0077b5] hover:bg-[#006399]"
  },
  {
    name: "WhatsApp",
    icon: "fab fa-whatsapp",
    color: "bg-[#25D366] hover:bg-[#20bd5a]"
  },
  {
    name: "Telegram",
    icon: "fab fa-telegram-plane",
    color: "bg-[#0088cc] hover:bg-[#0077b3]"
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    color: "bg-gray-600 hover:bg-gray-700"
  }
]

const shareOnSocialMedia = async (platform: string, data: ShareData) => {
  const encodedTitle = encodeURIComponent(data.title)
  const encodedText = encodeURIComponent(data.text)
  const encodedUrl = encodeURIComponent(data.url)

  let shareUrl = ""

  switch (platform.toLowerCase()) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
      break
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      break
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      break
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
      break
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
      break
    case "email":
      shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`
      break
    default:
      // Use Web Share API if available
      if (navigator.share) {
        try {
          await navigator.share(data)
          return true
        } catch (error) {
          console.error("Error sharing:", error)
          return false
        }
      }
      return false
  }

  // Open share URL in a new window
  window.open(shareUrl, "_blank", "noopener,noreferrer")
  return true
}

interface ShareButtonsProps {
  data: ShareData
}

export function ShareButtons({ data }: ShareButtonsProps) {
  return (
    <div className="flex space-x-2">
      {platforms.map((platform) => (
        <button
          key={platform.name}
          onClick={() => shareOnSocialMedia(platform.name, data)}
          className={`${platform.color} text-white p-2 rounded-full transition-colors duration-200`}
          aria-label={`Share on ${platform.name}`}
        >
          <i className={platform.icon}></i>
        </button>
      ))}
    </div>
  )
}

export function generateShareData(
  type: "article" | "opportunity" | "event",
  data: {
    title: string
    description?: string
    url: string
  }
): ShareData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://career.himafi.org"
  const url = data.url.startsWith("http") ? data.url : `${baseUrl}${data.url}`

  let text = ""
  switch (type) {
    case "article":
      text = `Check out this article: ${data.title}`
      break
    case "opportunity":
      text = `New opportunity alert: ${data.title}`
      break
    case "event":
      text = `Join us for: ${data.title}`
      break
  }

  if (data.description) {
    text += `\n\n${data.description}`
  }

  return {
    title: data.title,
    text,
    url
  }
}

export type { ShareData }
