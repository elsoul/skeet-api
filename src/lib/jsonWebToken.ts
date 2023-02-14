import jwt from 'jsonwebtoken'

const JWT_SALT = process.env.JWT_SALT || 'salt'
const BASE_URL = process.env.BASE_URL || 'base_url'

export const encodeJWT = async (key: string, expiresIn: string = '10000d') => {
  const token = jwt.sign({ key }, JWT_SALT, {
    algorithm: 'HS256',
    issuer: BASE_URL,
    expiresIn,
  })
  return token
}

export const decodeJWT = async (token: string, maxAge: string = '10000d') => {
  try {
    const decoded = jwt.verify(token, JWT_SALT, {
      algorithms: ['HS256'],
      issuer: BASE_URL,
      maxAge,
    })
    return decoded
  } catch (error) {
    console.log(error)
    return `error: ${error}`
  }
}

export const decodedKey = async (token: string) => {
  const key = await decodeJWT(token)
  if (typeof key === 'string') return 'string'
  return key.key
}
