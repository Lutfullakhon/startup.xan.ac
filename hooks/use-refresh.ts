import { create } from 'zustand'

interface IRefreshStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useRefresh = create<IRefreshStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
