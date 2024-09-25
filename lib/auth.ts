import { NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'

export function getUserIdFromToken(req: NextApiRequest): number | null {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number }
      return decoded.userId
    } catch (error) {
      return null
    }
  }
  return null
}
