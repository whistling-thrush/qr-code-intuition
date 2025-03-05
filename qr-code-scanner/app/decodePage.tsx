import { QRDecoder } from "@/components/qr-decoder"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DecodePage() {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/scan">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Scanner
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center">QR Code Decoder</h1>
          <QRDecoder />
        </div>
      </div>
    </main>
  )
}

