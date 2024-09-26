import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalTickets: 0, totalRevenue: 0 })
  const { toast } = useToast()

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        throw new Error('Failed to fetch admin stats')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch admin statistics",
        variant: "destructive",
      })
    }
  }

  const handleDrawLottery = async () => {
    try {
      const response = await fetch('/api/admin/draw-lottery', { method: 'POST' })
      if (response.ok) {
        toast({
          title: "Success",
          description: "Lottery draw completed successfully",
        })
      } else {
        throw new Error('Failed to draw lottery')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to draw lottery",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Tickets Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">฿{stats.totalRevenue}</p>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleDrawLottery}>Draw Lottery</Button>
    </div>
  )
}
