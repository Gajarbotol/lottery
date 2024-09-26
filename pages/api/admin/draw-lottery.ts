import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { getUserIdFromToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userId = getUserIdFromToken(req)
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      // Check if the user is an admin
      const adminCheck = await query('SELECT is_admin FROM users WHERE id = ?', [userId])
      if (!adminCheck[0]?.is_admin) {
        return res.status(403).json({ message: 'Forbidden' })
      }

      // Generate winning number
      const winningNumber = Math.floor(100000 + Math.random() * 900000).toString()

      // Insert into draws table
      await query('INSERT INTO draws (draw_date, winning_number) VALUES (NOW(), ?)', [winningNumber])

      // Find winning tickets
      const winningTickets = await query('SELECT user_id FROM tickets WHERE number = ?', [winningNumber])

      // Update user balances for winners
      for (const ticket of winningTickets) {
        await query('UPDATE users SET balance = balance + 1000000 WHERE id = ?', [ticket.user_id])
      }

      res.status(200).json({ message: 'Lottery draw completed', winningNumber, winners: winningTickets.length })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
