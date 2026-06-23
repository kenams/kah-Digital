import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    version: '1.0.0',
    gateway: 'KAH Digital API',
    endpoints: [
      'POST /api/kah/v1/ai',
      'POST /api/kah/v1/email',
      'GET  /api/kah/v1/health',
    ],
    ts: new Date().toISOString(),
  })
}
