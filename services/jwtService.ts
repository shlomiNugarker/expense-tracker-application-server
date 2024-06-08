import { NextFunction, Request, RequestHandler, Response } from 'express'

import { sign, verify } from 'jsonwebtoken'

const createToken = (user: any) => {
  const accessToken = sign(
    { fullName: user.fullName, id: user._id },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '1h' }
  )

  return accessToken
}

declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    accessToken: string
  }
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.session.accessToken
  console.log({ accessToken })

  if (!accessToken)
    return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = verify(accessToken, process.env.JWT_SECRET as string)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

export const jwtService = {
  createToken,
  validateToken,
}
