/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRefresh } from './use-refresh'

const useUser = () => {
	const [user, setUser] = useState<IUser | null>(null)

	const { onOpen } = useRefresh()
	const { userId } = useAuth()

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getUser(userId!)
				data === 'notFound' && onOpen()
				setUser(data)
			} catch (error) {
				setUser(null)
			}
		}

		userId && getData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { user }
}

export default useUser
