import { Keypair, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import bs58 from 'bs58'

export const genKeypair = async () => {
  const keypair = Keypair.generate()
  return keypair
}

export const getKeypairData = async (keypair: Keypair) => {
  return {
    pubkey: keypair.publicKey.toBase58(),
    secretKey: bs58.encode(keypair.secretKey),
    unit8Array: keypair.secretKey,
  }
}

export const getKeypairFromArrayString = async (keyString: string) => {
  const secretKeyArray = keyString.split(',').map((i) => Number(i))
  let secretKey = Uint8Array.from(secretKeyArray)
  let keypair = Keypair.fromSecretKey(secretKey)
  return keypair
}

export const getAirdrop = async (connection: Connection, keypair: Keypair) => {
  try {
    let airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL
    )
    const latestBlockHash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    })
    return airdropSignature
  } catch (error) {
    console.error(error)
  }
}

export const getBalance = async (connection: Connection, keypair: Keypair) => {
  try {
    return await connection.getBalance(keypair.publicKey)
  } catch (error) {
    throw new Error(`getBalance: ${error}`)
  }
}
