'use client'

import { useState, useRef, useEffect, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils' // adjust path

interface GlobalSearchProps {
	closeMenu?: () => void
}

function GlobalSearch({ closeMenu }: GlobalSearchProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [open, setOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value.toLowerCase()
		const isCoursePage = pathname.split('/').includes('courses')

		if (text && text.length > 2) {
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'q',
				value: text,
				toCourses: !isCoursePage,
			})
			router.push(newUrl)
			setOpen(false) // close search
			closeMenu?.() // close mobile menu if in mobile
		} else {
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ['q'],
			})
			router.push(newUrl)
		}
	}

	const debounceSearch = debounce(handleSearch, 300)

	// Click outside closes search
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('.btn-search')
			) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (open && inputRef.current) inputRef.current.focus()
	}, [open])

	return (
		<div className='search-box relative flex items-center'>
			<Button
				size={'icon'}
				variant={'ghost'}
				className='btn-search'
				aria-label='search-btn'
				onClick={() => setOpen(prev => !prev)}
			>
				<Search />
			</Button>

			<input
				ref={inputRef}
				type='text'
				className={`input-search absolute right-0 top-0 h-full transition-all duration-300
					${open ? 'opacity-100 pl-3 pr-10' : 'opacity-0 pl-0 pr-0'}
				`}
				placeholder='Type to Search...'
				onChange={debounceSearch}
			/>
		</div>
	)
}

export default GlobalSearch
