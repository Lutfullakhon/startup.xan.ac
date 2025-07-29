import { addArchiveCourse, addFavoriteCourse } from '@/actions/course.action'
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useReview } from '@/hooks/use-review'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import { FolderArchive, Heart, Share2, Star } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { toast } from 'sonner'

function DropdownContent() {
	const pathname = usePathname()
	const t = useTranslate()
	const { onOpen } = useReview()
	const { courseId } = useParams()
	const { userId } = useAuth()

	const onCopy = () => {
		const link = process.env.NEXT_PUBLIC_BASE_URL + pathname

		navigator.clipboard.writeText(link).then(() => toast.success(t('copied')))
	}

	const onAdd = (type: 'favourite' | 'archive') => {
		let promise

		if (type === 'favourite') {
			promise = addFavoriteCourse(`${courseId}`, userId!)
		} else {
			promise = addArchiveCourse(`${courseId}`, userId!)
		}

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: `${t('alreadyAdded')}!`,
		})
	}

	return (
		<DropdownMenuContent className='w-[300px]'>
			<DropdownMenuItem
				className='cursor-pointer gap-2'
				onClick={() => onAdd('favourite')}
			>
				<Heart size={20} />
				<span>{t('favouriteCourse')}</span>
			</DropdownMenuItem>
			<DropdownMenuItem
				className='cursor-pointer gap-2'
				onClick={() => onAdd('archive')}
			>
				<FolderArchive size={20} />
				<span>{t('archiveCourse')}</span>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem className='cursor-pointer gap-2' onClick={onOpen}>
				<Star size={20} />
				<span>{t('evaluation')}</span>
			</DropdownMenuItem>
			<DropdownMenuItem className='cursor-pointer gap-2' onClick={onCopy}>
				<Share2 size={20} />
				<span>{t('share')}</span>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem className='cursor-pointer gap-2 opacity-50'>
				{t('shareCourse')}
			</DropdownMenuItem>
		</DropdownMenuContent>
	)
}

export default DropdownContent
