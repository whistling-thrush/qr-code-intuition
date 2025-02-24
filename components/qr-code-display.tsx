"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function QRCodeDisplay() {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(true)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const qrCode = searchParams.get("qr")
    if (qrCode) {
      setQrCodeData(qrCode)
      validateQRCode(qrCode)
    }
  }, [searchParams])

  useEffect(() => {
    if (timeLeft === null) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null || prevTime <= 0) {
          clearInterval(timer)
          setIsValid(false)
          return null
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const validateQRCode = async (qrCode: string) => {
    try {
      const response = await fetch("/api/validate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrCode }),
      })

      if (response.ok) {
        const { isValid, validityPeriod } = await response.json()
        setIsValid(isValid)
        setTimeLeft(validityPeriod)
      } else {
        setIsValid(false)
      }
    } catch (error) {
      console.error("Error validating QR code:", error)
      setIsValid(false)
    }
  }

  if (!qrCodeData) {
    return <div>No QR code data available.</div>
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Image src={`data:image/png;base64,${qrCodeData}`} alt="QR Code" width={200} height={200} />
      </div>
      <div className={`text-lg font-semibold ${isValid ? "text-green-600" : "text-red-600"}`}>
        {isValid ? "Valid" : "Invalid"} QR Code
      </div>
      {isValid && timeLeft !== null && (
        <div className="text-sm">
          Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      )}
    </div>
  )
}