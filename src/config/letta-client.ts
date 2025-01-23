import { LettaClient } from '@letta-ai/letta-client';

const LETTA_TOKEN = process.env.LETTA_TOKEN || 'DEFAULT_TOKEN';
const BASE_URL = process.env.BASE_URL;

if (!LETTA_TOKEN) {
  console.error('LETTTA_TOKEN is not set. You might not be able to use Letta\'s full functionality.')
}

if (!BASE_URL) {
  throw new Error('Environment variable BASE_URL is not set.');
}

const client = new LettaClient({ token: LETTA_TOKEN, baseUrl: BASE_URL });

export default client;
