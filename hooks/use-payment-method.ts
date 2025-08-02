import { create } from 'zustand'

interface IPaymentStore {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const usePaymentMethod = create<IPaymentStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
