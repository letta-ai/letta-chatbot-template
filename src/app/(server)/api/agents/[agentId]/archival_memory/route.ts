import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'
import { validateAgentOwner } from '../../helpers'

async function getAgentArchivalMemory(
  req: NextRequest,
  { params }: { params: { agentId: string } }
) {
  const result = await validateAgentOwner(req, params)
  if (result instanceof NextResponse) {
    console.error('Error:', result)
    return result
  }
  const { agentId } = result

  try {
    const archivalMemory = await client.agents.archivalMemory.list(agentId)

    if (!archivalMemory) {
      return NextResponse.json(
        { error: 'Archival memory not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(archivalMemory)
  } catch (error) {
    console.error('Error fetching archival memory:', error)
    return NextResponse.json(
      { error: 'Error fetching archival memory' },
      { status: 500 }
    )
  }
}

export const GET = getAgentArchivalMemory
