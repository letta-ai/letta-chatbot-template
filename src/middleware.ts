import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'
import { LETTA_UID } from '@/types'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let lettaUid = request.cookies.get(LETTA_UID)?.value

  if (!lettaUid) {
    lettaUid = uuid()
    response.cookies.set({
      name: LETTA_UID,
      value: lettaUid,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // expires 24 hours from now
    })
  }
  return response
}
