import { NextResponse } from "next/server"
import QRCode from "qrcode"
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.QR_SECRET_KEY || "default-secret-key"

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

    const qrCode = await QRCode.toDataURL(encryptedPayload)

    return NextResponse.json({ qrCode: qrCode.split(",")[1] })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}