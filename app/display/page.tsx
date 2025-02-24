import QRCodeDisplay from "@/components/qr-code-display"

export default function DisplayPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Display QR Code</h1>
      <QRCodeDisplay />
    </div>
  )
}