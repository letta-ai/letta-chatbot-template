import { LettaClient } from '@letta-ai/letta-client';

const LETTA_TOKEN = process.env.LETTA_TOKEN
const BASE_URL = process.env.BASE_URL

if (!LETTA_TOKEN) {
    throw new Error("Environment variable LETTA_TOKEN is not set.");
}

if (!BASE_URL) {
    throw new Error("Environment variable BASE_URL is not set.");
}

const client = new LettaClient({ token: LETTA_TOKEN, baseUrl: BASE_URL });

export default client;
