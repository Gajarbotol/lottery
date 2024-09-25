import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import {getUserIdFromToken} from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const userId = getUserIdFromToken(req)
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const result = await query('SELECT number FROM tickets WHERE user_id = ? ORDER BY purchase_date DESC LIMIT 10', [userId])
      const tickets = result.map((ticket: any) => ticket.number)
      res.status(200).json({ tickets })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
