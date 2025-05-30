import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Newsletter Section */}
        <div className="py-12 border-b">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest opportunities and career insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About HIMAFI</h4>
            <p className="text-gray-600">
              HIMAFI Career Center helps physics students discover opportunities and build successful careers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/opportunities" className="text-gray-600 hover:text-gray-900">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="text-gray-600 hover:text-gray-900">
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/articles?category=career-tips" className="text-gray-600 hover:text-gray-900">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link href="/articles?category=research" className="text-gray-600 hover:text-gray-900">
                  Research Insights
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-gray-600 hover:text-gray-900">
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-gray-900">
                  Events Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Physics Department Building</li>
              <li>Room 301</li>
              <li>career@himafi.org</li>
              <li>Office Hours: 9:00 AM - 4:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t text-center text-gray-600 text-sm">
          <p>© {currentYear} HIMAFI Career Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
