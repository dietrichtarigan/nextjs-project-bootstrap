"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Event } from "@/lib/types"

interface CalendarEvent extends Event {
  date: string // ISO string
  time: string
}

interface EventCalendarProps {
  events: CalendarEvent[]
  className?: string
}

export function EventCalendar({ events, className = "" }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "list">("month")

  // Helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })
  }

  // Navigation functions
  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
  }

  // Filter events for the selected month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  // Generate calendar grid
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedDate)
    const firstDay = getFirstDayOfMonth(selectedDate)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = currentMonthEvents.filter(
        event => new Date(event.date).getDate() === day
      )

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 overflow-hidden ${
            dayEvents.length > 0 ? "bg-gray-50" : ""
          }`}
        >
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate"
                title={`${event.title} - ${formatTime(event.time)}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className={className}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setView(view === "month" ? "list" : "month")}>
            <i className={`fas fa-${view === "month" ? "list" : "calendar"} mr-2`}></i>
            {view === "month" ? "List View" : "Calendar View"}
          </Button>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <i className="fas fa-chevron-left"></i>
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>
        </div>
      </div>

      {view === "month" ? (
        /* Calendar Grid */
        <div className="grid grid-cols-7 gap-px">
          {/* Weekday headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-medium bg-gray-50">
              {day}
            </div>
          ))}
          {generateCalendarDays()}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {currentMonthEvents.length > 0 ? (
            currentMonthEvents
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-600">{formatTime(event.time)}</p>
                        {event.location && (
                          <p className="text-sm text-gray-600">
                            <i className="fas fa-location-dot mr-1"></i>
                            {event.location}
                          </p>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No events scheduled for {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
