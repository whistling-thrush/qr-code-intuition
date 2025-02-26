import { NextResponse } from "next/server"
import QRCode from "qrcode"
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.QR_SECRET_KEY || "default-secret-key"
const DOMAIN = ""

export async function POST(req: Request) {
  try {
    const { userId, purpose } = await req.json()

    const payload = {
      userId,
      purpose,
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substring(7),
    }

    const encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), SECRET_KEY).toString()

    // Create the URL with the encryptedPayload as a query parameter
    const url = `https://${DOMAIN}/payload?encryptedPayload=${encodeURIComponent(encryptedPayload)}`

    const qrCode = await QRCode.toDataURL(url)

    return NextResponse.json({ qrCode: qrCode.split(",")[1], encryptedPayload })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}