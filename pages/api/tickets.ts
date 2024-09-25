import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'
import {getUserIdFromToken} from '../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userId = getUserIdFromToken(req)
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      // Check user balance
      const userResult = await query('SELECT balance FROM users WHERE id = ?', [userId])
      if (userResult.length === 0 || userResult[0].balance < 80) {
        return res.status(400).json({ message: 'Insufficient balance' })
      }

      // Generate a random 6-digit ticket number
      const ticketNumber = Math.floor(100000 + Math.random() * 900000).toString()

      // Create ticket
      const purchaseDate = new Date()
      await query('INSERT INTO tickets (user_id, number, purchase_date) VALUES (?, ?, ?)', [userId, ticketNumber, purchaseDate])

      // Deduct balance
      await query('UPDATE users SET balance = balance - 80 WHERE id = ?', [userId])

      res.status(201).json({ message: 'Ticket purchased successfully', ticketNumber })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
