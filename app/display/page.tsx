import Link from "next/link"
import QRCodeDisplay from "@/components/qr-code-display"
import { Button } from "@/components/ui/button"

export default function DisplayPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Display QR Code</h1>
      <QRCodeDisplay />
      <div className="mt-4">
        <Link href="/">
          <Button variant="outline">Generate New QR Code</Button>
        </Link>
      </div>
    </div>
  )
}