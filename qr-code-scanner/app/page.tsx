import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">QR Code Scanner</CardTitle>
              <CardDescription className="text-center">Scan QR codes using your device camera</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <QrCode className="h-32 w-32 text-primary" />
            </CardContent>
            <CardFooter>
              <Link href="/scan" className="w-full">
                <Button className="w-full">Open Scanner</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

