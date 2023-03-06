import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

const algorithm = 'aes-256-cbc'
const password = process.env.SKEET_PW_SALT || ''
const salt = process.env.SKEET_CRYPTO_SALT || ''
const key = crypto.scryptSync(password, salt, 32)
const inputEncoding = 'utf8'
const outputEncoding = 'base64'

export const encrypt = async (data: string, iv: Buffer) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
  cipheredData += cipher.final(outputEncoding)
  return cipheredData
}

export const decrypt = async (data: string, iv: Buffer) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decipheredData = decipher.update(data, outputEncoding, inputEncoding)
  decipheredData += decipher.final(inputEncoding)
  return decipheredData
}
