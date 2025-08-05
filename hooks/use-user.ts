import { getUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const useUser = () => {
	const [user, setUser] = useState<IUser | null>(null)

	const { userId } = useAuth()

	useEffect(() => {
		const getData = async () => {
			try {
				const data = await getUser(userId!)
				setUser(data)
			} catch (error) {
				setUser(null)
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		userId && getData()
	}, [userId])

	return { user }
}

export default useUser
