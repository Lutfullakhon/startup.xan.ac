// components/ReactStarsClient.tsx
'use client'
import dynamic from 'next/dynamic'

// Dynamically import with SSR disabled
const ReactStars = dynamic(() => import('react-stars'), { ssr: false })
export default ReactStars
