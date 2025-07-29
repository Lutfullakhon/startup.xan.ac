'use client'

import { ILesson } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Player from '@vimeo/player'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { completeLesson, getNextLesson } from '@/actions/lesson.action'
import { toast } from 'sonner'

interface Props {
	lesson: ILesson
}

function VideoLesson({ lesson }: Props) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const playerRef = useRef<HTMLDivElement>(null)
	const playerInstance = useRef<Player | null>(null)
	const { courseId } = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const { userId } = useAuth()
	const t = useTranslate()

	// Enhanced Vimeo ID extraction that handles management URLs
	const vimeoId = useMemo(() => {
		if (!lesson.videoUrl) {
			setError('No video URL provided')
			return null
		}

		// Extract from management URL format: https://vimeo.com/manage/videos/ID/...
		const manageMatch = lesson.videoUrl.match(
			/vimeo\.com\/manage\/videos\/(\d+)/
		)
		if (manageMatch) return parseInt(manageMatch[1])

		// Standard URL format: https://vimeo.com/ID
		const standardMatch = lesson.videoUrl.match(/vimeo\.com\/(\d+)/)
		if (standardMatch) return parseInt(standardMatch[1])

		// Direct ID case
		if (/^\d+$/.test(lesson.videoUrl)) return parseInt(lesson.videoUrl)

		setError('Invalid Vimeo URL format')
		return null
	}, [lesson.videoUrl])

	// Stable callback for video end
	const onEnd = useCallback(async () => {
		if (!userId) return

		setIsLoading(true)

		try {
			const [nextLesson] = await Promise.all([
				getNextLesson(lesson._id, `${courseId}`),
				completeLesson(lesson._id, userId, pathname),
			])

			if (nextLesson) {
				router.push(
					`/dashboard/${courseId}/${nextLesson.lessonId}?s=${nextLesson.sectionId}`
				)
			}

			toast.success(t('successfully'))
		} catch (err) {
			console.error('Completion error:', err)
			toast.error(t('error'))
		} finally {
			setIsLoading(false)
		}
	}, [userId, courseId, lesson._id, pathname, router, t])

	// Initialize player effect
	useEffect(() => {
		if (!playerRef.current || !vimeoId) return

		// Only initialize once
		if (!playerInstance.current) {
			const initializePlayer = async () => {
				try {
					playerInstance.current = new Player(playerRef.current!, {
						id: vimeoId,
						responsive: true,
						autoplay: true,
					})

					await playerInstance.current.ready()
					setIsLoading(false)
					playerInstance.current.on('ended', onEnd)
				} catch (err) {
					console.error('Player initialization error:', err)
					setError(
						`Failed to load video: ${
							err instanceof Error ? err.message : 'Unknown error'
						}`
					)
					setIsLoading(false)
				}
			}

			initializePlayer()
		}

		return () => {
			if (playerInstance.current) {
				playerInstance.current.off('ended', onEnd)
				playerInstance.current.destroy()
				playerInstance.current = null
			}
		}
	}, [vimeoId]) // Removed onEnd from dependencies

	return (
		<div className='flex flex-col gap-4'>
			{/* Player Container - Fixed height with aspect ratio */}
			<div
				className='relative w-full overflow-hidden rounded-md bg-background'
				style={{ aspectRatio: '16/9' }}
			>
				{error ? (
					<div className='flex h-full flex-col items-center justify-center bg-destructive/10 p-4 text-center'>
						<p className='text-lg font-medium text-destructive'>{error}</p>
						<p className='text-sm text-muted-foreground mt-2'>
							Video ID: {vimeoId || 'none'} | URL: {lesson.videoUrl}
						</p>
						<Button
							variant='outline'
							className='mt-4'
							onClick={() => {
								setError(null)
								setIsLoading(true)
								if (playerInstance.current) {
									playerInstance.current.destroy()
									playerInstance.current = null
								}
							}}
						>
							Retry
						</Button>
					</div>
				) : isLoading ? (
					<div className='absolute inset-0 flex items-center justify-center bg-slate-500/20'>
						<Loader2 className='size-6 animate-spin text-primary' />
					</div>
				) : null}

				<div
					className={cn(
						'absolute inset-0 h-full w-full',
						(isLoading || error) && 'invisible'
					)}
					ref={playerRef}
				/>
			</div>

			{/* Lesson Info - Now properly spaced below video */}
			<div className='rounded-md bg-gradient-to-t from-background to-secondary p-4 lg:p-6'>
				<div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
					<h2 className='font-space-grotesk text-2xl font-bold'>
						{lesson.title}
					</h2>
					<Button
						disabled={isLoading || !!error}
						onClick={onEnd}
						className='min-w-[150px] md:ml-4'
					>
						{isLoading ? (
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						) : (
							<CheckCircle className='mr-2 h-4 w-4' />
						)}
						{t('completeLesson')}
					</Button>
				</div>

				{/* Add any additional lesson content here with proper spacing */}
			</div>
		</div>
	)
}

export default VideoLesson
