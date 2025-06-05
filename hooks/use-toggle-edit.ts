'use client'

import { useState } from 'react'

function UseToggleEdit() {
	const [state, setState] = useState(false)

	const onToggle = () => setState(prev => !prev)

	return {state, onToggle}
}

export default UseToggleEdit
