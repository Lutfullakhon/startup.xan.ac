import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import React from 'react'

function GlobalSearch() {
	return (
		<Button size={'icon'} variant={'ghost'}>
			<Search />
		</Button>
	)
}

export default GlobalSearch
