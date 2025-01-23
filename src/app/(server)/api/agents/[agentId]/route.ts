import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import client from '@/config/letta-client';

async function getAgentById(
  req: NextApiRequest,
  { params }: { params: { agentId: string } },
) {
  const { agentId } = await params;
  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
  }
  try {
    const agent = await client.agents.get(agentId);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    return NextResponse.json(agent);
  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json({ error: 'Error fetching agent' }, { status: 500 });
  }
}

export const GET = getAgentById;
