import dynamic from "next/dynamic"

// Dynamically import the QR Scanner with no SSR
const QRScanner = dynamic(() => import("@/components/qr-scanner"), {
  ssr: false,
})

export default function ScanPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold text-center">QR Code Scanner</h1>
          <p className="text-center text-muted-foreground">Position a QR code in front of your camera to scan it</p>
          <QRScanner />
        </div>
      </div>
    </main>
  )
}

