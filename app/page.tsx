import QRCodeGenerator from "@/components/qr-code-generator"

export default function GeneratePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate QR Code</h1>
      <QRCodeGenerator />
    </div>
  )
}