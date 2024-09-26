import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { getUserIdFromToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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

      const totalUsers = await query('SELECT COUNT(*) as count FROM users')
      const totalTickets = await query('SELECT COUNT(*) as count FROM tickets')
      const totalRevenue = await query('SELECT SUM(price) as total FROM tickets')

      res.status(200).json({
        totalUsers: totalUsers[0].count,
        totalTickets: totalTickets[0].count,
        totalRevenue: totalRevenue[0].total || 0
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
