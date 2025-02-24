"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QRCodeGenerator() {
  const [userId, setUserId] = useState("")
  const [purpose, setPurpose] = useState("food")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, purpose }),
      })

      if (response.ok) {
        const { qrCode } = await response.json()
        router.push(`/display?qr=${encodeURIComponent(qrCode)}`)
      } else {
        console.error("Failed to generate QR code")
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <Input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Purpose
        </label>
        <Select value={purpose} onValueChange={setPurpose}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="swag">Swag</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Generate QR Code</Button>
    </form>
  )
}