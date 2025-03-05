"use client"

import { useState, useCallback } from "react"
import { QrReader } from "react-qr-reader"
import { AlertCircle, Camera, CheckCircle2, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface QrResult {
  getText(): string
}

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null)
  const router = useRouter()

  const handleScan = useCallback(
    (result: QrResult | null) => {
      if (result) {
        const text = result.getText()
        setScannedData(text)
        setIsScanning(false)
        setError(null)

        // Redirect to decoder page with the encrypted payload
        router.push(`/decode?encryptedPayload=${encodeURIComponent(text)}`)
      }
    },
    [router],
  )

  const handleError = useCallback((error: Error) => {
    console.error("QR Scanner error:", error)
    if (error.message.includes("Permission denied")) {
      setError("Camera permission was denied. Please grant access to your camera and try again.")
      setPermissionGranted(false)
    } else if (error.message.includes("Requested device not found")) {
      setError("No camera found. Please make sure your device has a camera and try again.")
    } else {
      setError(`Scanner error: ${error.message}`)
    }
    setIsScanning(false)
  }, [])

  const startScanning = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      setPermissionGranted(true)
      setIsScanning(true)
      setScannedData(null)
      setError(null)
    } catch (error) {
      if (error instanceof Error) {
        handleError(error)
      }
    }
  }, [handleError])

  const resetScanner = useCallback(() => {
    setIsScanning(false)
    setScannedData(null)
    setError(null)
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="mt-2">
              {error}
              {permissionGranted === false && (
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.permissions) {
                        navigator.permissions.query({ name: "camera" as PermissionName }).then((result) => {
                          if (result.state === "denied") {
                            window.location.reload()
                          }
                        })
                      }
                    }}
                  >
                    Grant Camera Permission
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {isScanning ? (
          <div className="overflow-hidden rounded-lg aspect-square bg-gray-50">
            <QrReader
              constraints={{
                facingMode: "environment",
                aspectRatio: 1,
                width: { min: 360, ideal: 640, max: 1920 },
                height: { min: 360, ideal: 640, max: 1920 },
              }}
              onResult={handleScan}
              onError={handleError}
              className="w-full h-full"
              videoStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              scanDelay={500}
              videoId="qr-video"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <Button onClick={startScanning} className="w-full" disabled={permissionGranted === false}>
              <Camera className="mr-2 h-4 w-4" />
              {permissionGranted === false ? "Camera Permission Required" : "Start Scanning"}
            </Button>

            {scannedData && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>QR Code Detected</AlertTitle>
                <AlertDescription className="mt-2">
                  <div className="break-all bg-gray-50 p-3 rounded-md">{scannedData}</div>
                  <Button onClick={resetScanner} variant="outline" className="mt-2">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Scan Another Code
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

