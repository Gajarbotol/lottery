"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import LotteryTicket from "@/components/LotteryTicket"

const ticketPrice = 80

export default function LotteryPage() {
  const [userBalance, setUserBalance] = useState(0)
  const [purchasedTickets, setPurchasedTickets] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchUserBalance()
    fetchPurchasedTickets()
  }, [])

  const fetchUserBalance = async () => {
    try {
      const response = await fetch('/api/users/balance')
      const { balance } = await response.json()
      setUserBalance(balance)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user balance",
        variant: "destructive",
      })
    }
  }

  const fetchPurchasedTickets = async () => {
    try {
      const response = await fetch('/api/users/tickets')
      const { tickets } = await response.json()
      setPurchasedTickets(tickets)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch purchased tickets",
        variant: "destructive",
      })
    }
  }

  const handleBuyTicket = async () => {
    if (userBalance >= ticketPrice) {
      try {
        const response = await fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          const { ticketNumber } = await response.json()
          setUserBalance(userBalance - ticketPrice)
          setPurchasedTickets([...purchasedTickets, ticketNumber])
          toast({
            title: "Success",
            description: `Ticket ${ticketNumber} purchased successfully!`,
          })
        } else {
          throw new Error("Failed to purchase ticket")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to purchase ticket",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to buy a ticket",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Thai Government Lottery</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Buy Lottery Tickets</CardTitle>
          <CardDescription>Purchase your lucky ticket for the next draw!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <LotteryTicket />
          </div>
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">Ticket Price: ฿{ticketPrice}</p>
            <p className="text-md">Your Balance: ฿{userBalance}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBuyTicket} disabled={userBalance < ticketPrice}>
            Buy Ticket
          </Button>
        </CardFooter>
      </Card>
      {purchasedTickets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Purchased Tickets</CardTitle>
            <CardDescription>Good luck in the next draw!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {purchasedTickets.map((ticketNumber) => (
                <div key={ticketNumber} className="text-center p-2 border rounded">
                  {ticketNumber}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
