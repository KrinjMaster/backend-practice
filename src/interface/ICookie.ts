import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export interface ICookie extends RequestCookie {
  name: string
  path: string
  value: string
}
