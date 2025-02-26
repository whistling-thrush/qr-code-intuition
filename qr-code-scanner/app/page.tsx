import QRScanner from "@/components/QRScanner"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">QR Code Scanner</h1>
      <QRScanner />
    </main>
  )
}