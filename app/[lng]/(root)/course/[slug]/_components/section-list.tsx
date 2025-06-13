import { ISection } from '@/app.types'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { calculateTotalDuration } from '@/lib/utils'
import { ChevronsUpDown, Dot } from 'lucide-react'
import LessonList from './lesson-list'

function SectionList(section: ISection) {
	return (
		<AccordionItem value={section.title} className='mt-1 border-none'>
			<AccordionTrigger className='accordion-course flex w-full items-center justify-between bg-primary p-4 hover:no-underline'>
				<div className='flex items-center gap-2'>
					<ChevronsUpDown strokeWidth={1.75} className='size-4' />
					<div className='text-left font-space-grotesk text-[14px] font-semibold'>
						{section.title}
					</div>
				</div>
				<div className='hidden items-center text-sm lg:flex'>
					<div>{section.lessons.length} darslik</div>
					<Dot />
					<div>{calculateTotalDuration(section.lessons)} soat</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='mt-2 border-l-2 border-l-gray-800 p-4'>
					{section.lessons.map(lesson => (
						<LessonList key={lesson._id} {...lesson} />
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default SectionList
