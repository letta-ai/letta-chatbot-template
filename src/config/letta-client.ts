import { LettaClient } from '@letta-ai/letta-client'
import { config } from 'dotenv'

config()

const LETTA_TOKEN = process.env.LETTA_TOKEN || 'DEFAULT_TOKEN'
const BASE_URL = process.env.BASE_URL || 'http://localhost:8283'

if (!LETTA_TOKEN) {
  console.error(
    "LETTTA_TOKEN is not set. You might not be able to use Letta's full functionality."
  )
}

if (!BASE_URL) {
  console.error('BASE_URL is not set. We are using your localhost.')
}

const client = new LettaClient({
  token: LETTA_TOKEN,
  baseUrl: BASE_URL
})

export default client
