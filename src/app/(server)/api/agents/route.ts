import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'
import client from '@/config/letta-client'
import defaultAgent from '@/default-agent'

async function getAgents(req: NextApiRequest) {
  try {
    const agents = await client.agents.list()
    const sortedAgents = agents.sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
      return dateB - dateA
    })
    return NextResponse.json(sortedAgents)
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { error: 'Error fetching agents' },
      { status: 500 }
    )
  }
}

async function createAgent(req: NextApiRequest) {
  // ADD YOUR OWN AGENTS HERE
  const DEFAULT_MEMORY_BLOCKS = defaultAgent.DEFAULT_MEMORY_BLOCKS
  const DEFAULT_LLM = defaultAgent.DEFAULT_LLM
  const DEFAULT_EMBEDDING = defaultAgent.DEFAULT_EMBEDDING

  try {
    const newAgent = await client.agents.create({
      memoryBlocks: DEFAULT_MEMORY_BLOCKS,
      model: DEFAULT_LLM,
      embedding: DEFAULT_EMBEDDING,
    })

    return NextResponse.json(newAgent)
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ error: 'Error creating agent' }, { status: 500 })
  }
}

export const GET = getAgents
export const POST = createAgent
