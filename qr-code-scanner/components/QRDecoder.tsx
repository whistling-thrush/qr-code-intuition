"use client"

import { useState, useEffect } from "react"
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.QR_SECRET_KEY || "default-secret-key"

export default function QRDecoder() {
  const [encryptedPayload, setEncryptedPayload] = useState<string | null>(null)
  const [decryptedData, setDecryptedData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const payload = urlParams.get("encryptedPayload")

    if (payload) {
      setEncryptedPayload(payload)
      decryptPayload(payload)
    } else {
      setError("No encrypted payload found in URL")
    }
  }, [])

  const decryptPayload = (payload: string) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(payload, SECRET_KEY).toString(CryptoJS.enc.Utf8)
      if (decrypted) {
        setDecryptedData(decrypted)
      } else {
        setError("Decryption failed: Invalid payload or key")
      }
    } catch (error) {
      console.error("Decryption failed:", error)
      setError("Decryption failed: An error occurred")
    }
  }

  return (
    <div className="w-full max-w-md">
      {error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <>
          {encryptedPayload && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Encrypted Payload:</h2>
              <p className="break-all">{encryptedPayload}</p>
            </div>
          )}
          {decryptedData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Decrypted Data:</h2>
              <p className="break-all">{decryptedData}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}