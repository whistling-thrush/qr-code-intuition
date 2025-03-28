import { NextResponse } from "next/server"
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.QR_SECRET_KEY || "default-secret-key"

const TIME_SLOTS = {
  food: [
    { start: 12 * 60, end: 14 * 60 }, // Lunch: 12:00 PM - 2:00 PM
    { start: 18 * 60, end: 20 * 60 }, // Dinner: 6:00 PM - 8:00 PM
    { start: 8 * 60, end: 10 * 60 }, // Breakfast: 8:00 AM - 10:00 AM
    { start: 20 * 60, end: 23 * 59},
    { start: 15 * 60, end: 18 * 60},
  ],
  swag: [
  ],
}

export async function POST(req: Request) {
  try {
    const { qrCode } = await req.json()
    const decryptedBytes = CryptoJS.AES.decrypt(qrCode, SECRET_KEY)
    const decryptedPayload = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))

    const { purpose, timestamp } = decryptedPayload

    const now = new Date()
    const qrTimestamp = new Date(timestamp)

    // Check if QR code is not older than 24 hours
    if (now.getTime() - qrTimestamp.getTime() > 24 * 60 * 60 * 1000) {
      return NextResponse.json({ isValid: false })
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const validSlot = TIME_SLOTS[purpose as keyof typeof TIME_SLOTS].find(
      (slot) => currentMinutes >= slot.start - 5 && currentMinutes <= slot.end + 15,
    )

    if (!validSlot) {
      return NextResponse.json({ isValid: false })
    }

    const validityPeriod = validSlot.end + 15 - currentMinutes

    return NextResponse.json({ isValid: true, validityPeriod: validityPeriod * 60 })
  } catch (error) {
    console.error("Error validating QR code:", error)
    return NextResponse.json({ error: "Failed to validate QR code" }, { status: 500 })
  }
}