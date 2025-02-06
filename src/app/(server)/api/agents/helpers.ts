import client from '@/config/letta-client'
import { LETTA_UID } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function validateAgentOwner(
  req: NextRequest,
  params: { agentId: string }
) {
  const userId = getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const agentId = await getAgentId(params)
  if (!agentId) {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
  }

  const agent = await getAgent(agentId)
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  if (!agent.tags.includes(`user:${userId}`)) {
    return NextResponse.json({ error: 'Cannot find agent with associated user id' }, { status: 404 })
  }

  return {
    userId: userId,
    agentId: agentId,
    agent: agent
  }
}

export function internalUserId(userId: string) {
  return `user:${userId}`
}

export function getUserId(req: NextRequest) {
  return req.cookies.get(LETTA_UID)?.value
}

export async function getAgentId(
  params: PromiseLike<{ agentId: string }> | { agentId: string }
) {
  const { agentId } = await params
  return agentId
}

export async function getAgent(agentId: string) {
  const agent = await client.agents.retrieve(agentId)
  return agent
}
