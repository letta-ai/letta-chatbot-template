import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'
import { LETTA_UID } from '@/types'
import { USE_COOKIE_BASED_AUTHEHNTICATION } from '@/constants'

export function middleware(request: NextRequest) {
  if (!USE_COOKIE_BASED_AUTHEHNTICATION) {
    // do nothing if we're not using cookie based authentication
    return NextResponse.next()
  }

  const response = NextResponse.next()
  let lettaUid = request.cookies.get(LETTA_UID)?.value

  if (!lettaUid) {
    lettaUid = uuid()
    response.cookies.set({
      name: LETTA_UID,
      value: lettaUid,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // expires 24 hours from now
      sameSite: 'lax', // Helps prevent csrf
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production' // send over https if we're on prod
    })
  }
  return response
}
