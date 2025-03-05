"use client"

import { useState, useEffect } from "react"
import CryptoJS from "crypto-js"

const SECRET_KEY = "intuition@2025"

export function QRDecoder() {
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
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {error ? (
        <div className="text-red-500 font-semibold p-4 bg-red-50 rounded-md">{error}</div>
      ) : (
        <>
          {encryptedPayload && decryptedData ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">Decrypted Data</h2>
              <div className="p-4 bg-gray-50 rounded-md">
                <pre className="whitespace-pre-wrap break-words text-sm">{decryptedData}</pre>
              </div>

              {/* Try to parse as JSON and display in a more structured way */}
              {(() => {
                try {
                  const jsonData = JSON.parse(decryptedData)
                  return (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-700">Parsed Data</h3>
                      <div className="mt-2 space-y-2">
                        {Object.entries(jsonData).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium text-gray-600 w-1/3">{key}:</span>
                            <span className="text-gray-800">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                } catch {
                  // Not valid JSON, just show as text (already done above)
                  return null
                }
              })()}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Decrypting data...</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

