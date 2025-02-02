import { NextApiRequest } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'

async function getAgentById(
  req: NextApiRequest,
  { params }: { params: { agentId: string } }
) {
  const { agentId } = await params
  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }
  try {
    const agent = await client.agents.retrieve(agentId)
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error fetching agent:', error)
    return NextResponse.json({ error: 'Error fetching agent' }, { status: 500 })
  }
}

async function modifyAgentById(req: NextRequest, { params }: { params: { agentId: string } }) {
  const { agentId } = await params
  const body = await req.json()

  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }
  try {
    const updatedAgent = await client.agents.modify(agentId, body)
    if (!updatedAgent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
    return NextResponse.json(updatedAgent)
  } catch (error) {
    console.error('Error updating agent:', error)
    return NextResponse.json({ error: 'Error updating agent' }, { status: 500 })
  }
}

export const GET = getAgentById
export const PATCH = modifyAgentById