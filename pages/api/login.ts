import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const users = await query('SELECT * FROM users WHERE email = ?', [email])
      const user = users[0]

      if (user && await bcrypt.compare(password, user.password_hash)) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
