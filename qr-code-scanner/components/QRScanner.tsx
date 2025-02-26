"use client"

import { useState, useEffect, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import CryptoJS from "crypto-js"

export default function QRScanner() {
  const [data, setData] = useState<string | null>(null)
  const [decryptedData, setDecryptedData] = useState<string | null>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, /* verbose= */ false)

    scannerRef.current.render(onScanSuccess, onScanFailure)

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error("Failed to clear scanner", error)
        })
      }
    }
  }, [])

  const onScanSuccess = (decodedText: string) => {
    setData(decodedText)
    try {
      const decrypted = CryptoJS.AES.decrypt(decodedText, "secret_key").toString(CryptoJS.enc.Utf8)
      setDecryptedData(decrypted)
    } catch (error) {
      console.error("Decryption failed:", error)
      setDecryptedData("Decryption failed")
    }
  }

  const onScanFailure = (error: string) => {
    console.warn(`QR code scan error: ${error}`)
  }

  return (
    <div className="w-full max-w-md">
      <div id="qr-reader" className="w-full"></div>
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Scanned Data:</h2>
          <p className="break-all">{data}</p>
        </div>
      )}
      {decryptedData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Decrypted Data:</h2>
          <p className="break-all">{decryptedData}</p>
        </div>
      )}
    </div>
  )
}