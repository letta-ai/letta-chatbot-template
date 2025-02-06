import { NextRequest, NextResponse } from 'next/server'
import client from '@/config/letta-client'
import { getAgent, getAgentId, getUserId, validateAgentOwner } from '../helpers'

async function getAgentById(
  req: NextRequest,
  { params }: { params: { agentId: string } }
) {
  const result = await validateAgentOwner(req, params)
  if (result instanceof NextResponse) {
    console.error('Error:', result)
    return result
  }
  const { agent } = result

  try {
    return NextResponse.json(agent)
  } catch (error) {
    console.error('Error fetching agent:', error)
    return NextResponse.json({ error: 'Error fetching agent' }, { status: 500 })
  }
}

async function modifyAgentById(
  req: NextRequest,
  { params }: { params: { agentId: string } }
) {
  const body = await req.json()

  const result = await validateAgentOwner(req, params)
  if (result instanceof NextResponse) {
    console.error('Error:', result)
    return result
  }
  const { agentId } = result

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

async function deleteAgentById(
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
    await client.agents.delete(agentId)
    return NextResponse.json({ message: 'Agent deleted successfully' })
  } catch (error) {
    console.error('Error deleting agent:', error)
    return NextResponse.json({ error: 'Error deleting agent' }, { status: 500 })
  }
}

export const GET = getAgentById
export const PATCH = modifyAgentById
export const DELETE = deleteAgentById
