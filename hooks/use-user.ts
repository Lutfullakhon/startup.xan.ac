 
import { getUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRefresh } from './use-refresh'

const useUser = () => {
	const [user, setUser] = useState<IUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const { onOpen } = useRefresh()
	const { userId } = useAuth()

	useEffect(() => {
		if (!userId) {
			setIsLoading(false)
			return
		}

		const getData = async () => {
			try {
				const data = await getUser(userId)
				if (data === 'notFound') onOpen()
				setUser(data)
			} catch (error) {
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}

		getData()
	}, [userId, onOpen])

	return { user, isLoading }
}

export default useUser
