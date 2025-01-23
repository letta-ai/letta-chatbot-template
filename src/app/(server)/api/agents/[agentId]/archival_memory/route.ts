import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import client from '@/config/letta-client';

async function getAgentArchivalMemory(
    req: NextApiRequest,
    { params }: { params: { agentId: string } },
) {
    const { agentId } = await params;
    if (!agentId) {
        return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }
    try {
        const archivalMemory = await client.agents.archivalMemory.list(agentId);
        if (!archivalMemory) {
            return NextResponse.json({ error: 'Archival memory not found' }, { status: 404 });
        }
        return NextResponse.json(archivalMemory);
    } catch (error) {
        console.error('Error fetching archival memory:', error);
        return NextResponse.json({ error: 'Error fetching archival memory' }, { status: 500 });
    }
}

export const GET = getAgentArchivalMemory;
