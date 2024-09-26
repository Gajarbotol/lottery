import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({ name: '', balance: 0 })
  const [recentTickets, setRecentTickets] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchUserInfo()
    fetchRecentTickets()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('/api/users/info')
      if (response.ok) {
        const data = await response.json()
        setUserInfo(data)
      } else {
        throw new Error('Failed to fetch user info')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user information",
        variant: "destructive",
      })
    }
  }

  const fetchRecentTickets = async () => {
    try {
      const response = await fetch('/api/users/tickets')
      if (response.ok) {
        const data = await response.json()
        setRecentTickets(data.tickets)
      } else {
        throw new Error('Failed to fetch recent tickets')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recent tickets",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Name: {userInfo.name}</p>
            <p>Balance: ฿{userInfo.balance}</p>
            <Button className="mt-4">
              <Link href="/add-funds">Add Funds</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTickets.length > 0 ? (
              <ul>
                {recentTickets.map((ticket, index) => (
                  <li key={index}>{ticket}</li>
                ))}
              </ul>
            ) : (
              <p>No recent tickets</p>
            )}
            <Button className="mt-4">
              <Link href="/lottery">Buy Tickets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
