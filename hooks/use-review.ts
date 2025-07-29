import { create } from 'zustand'

interface IReviewStore {
	isOpen: boolean
	isLoading: boolean
	onOpen: () => void
	onClose: () => void
	startLoading: () => void
	stopLoading: () => void
}

export const useReview = create<IReviewStore>(set => ({
	isOpen: false,
	isLoading: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	startLoading: () => set({ isLoading: true }),
	stopLoading: () => set({ isLoading: false }),
}))
