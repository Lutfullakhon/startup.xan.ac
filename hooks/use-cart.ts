import { ICourse } from '@/app.types'
import { create } from 'zustand'

interface ICart extends ICourse {
	quantity: number
}

interface ICartStore {
	carts: ICart[]
	addToCart: (course: ICourse) => void
	removeFromCart: (id: string) => void
	increment: (id: string) => void
	decrement: (id: string) => void
	totalPrice: (percentOff?: number) => number
	cartsLength: () => number
	taxes: () => number
	clearCart: () => void
}

export const useCart = create<ICartStore>((set, get) => ({
	carts: [],
	addToCart: (course: ICourse) => {
		const { carts } = get()
		const existing = carts.find(cart => cart._id === course._id)
		if (existing) {
			set(state => {
				const newCarts = state.carts.map(cart => cart)
				return { carts: newCarts }
			})
		} else {
			set({ carts: [...carts, { ...course, quantity: 1 }] })
		}
	},
	removeFromCart: (id: string) => {
		const { carts } = get()
		const newCarts = carts.filter(cart => cart._id !== id)
		set({ carts: newCarts })
	},
	increment: (id: string) => {
		const { carts } = get()
		const newCarts = carts.map(cart => {
			if (cart._id === id) {
				return { ...cart, quantity: cart.quantity + 1 }
			}

			return cart
		})
		set({ carts: newCarts })
	},
	decrement: (id: string) => {
		const { carts } = get()
		const newCarts = carts.map(cart => {
			if (cart._id === id) {
				return { ...cart, quantity: cart.quantity - 1 }
			}

			return cart
		})
		set({ carts: newCarts })
	},

	totalPrice: (percentOff?: number) => {
		const { carts } = get()

		const total = carts.reduce((acc, cart) => acc + cart.currentPrice, 0)

		if (percentOff) {
			return total - (total * percentOff) / 100
		}

		return total
	},

	cartsLength: () => {
		return get().carts.reduce((acc, cart) => acc + cart.quantity, 0)
	},
	taxes: () => get().totalPrice() * 0.1,
	clearCart: () => set({ carts: [] }),
}))
