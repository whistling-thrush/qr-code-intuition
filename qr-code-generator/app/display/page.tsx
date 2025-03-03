import Link from 'next/link'
import QRCodeDisplay from '@/components/qr-code-display'
import { Suspense } from 'react'

export default function DisplayPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Display QR Code</h1>
      <Suspense>
        <QRCodeDisplay />
      </Suspense>
      <div className="mt-4">
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Generate New QR Code
        </Link>
      </div>
    </div>
  )
}