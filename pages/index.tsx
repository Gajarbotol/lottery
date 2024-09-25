import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Thai Government Lottery</h1>
      <p className="mb-4">Try your luck with the official Thai lottery!</p>
      <div className="space-x-4">
        <Link href="/lottery">
          <Button>Buy Tickets</Button>
        </Link>
        <Link href="/auth">
          <Button variant="outline">Login / Register</Button>
        </Link>
      </div>
    </div>
  )
}
