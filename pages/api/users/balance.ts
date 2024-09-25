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

      const result = await query('SELECT balance FROM users WHERE id = ?', [userId])
      if (result.length > 0) {
        res.status(200).json({ balance: result[0].balance })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
