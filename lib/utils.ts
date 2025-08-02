import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { enUS, ruRU, trTR } from '@clerk/localizations'
import { uzUZ } from './uz-UZ'
import qs from 'query-string'
import { ILesson } from '@/app.types'
import { enUS as en, uz, tr, ru } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localization(lng: string) {
	if (lng === 'en') return enUS
	if (lng === 'ru') return ruRU
	if (lng === 'tr') return trTR
	if (lng === 'uz') return uzUZ
}


export function getCurrentLng(lng: string) {
	if (lng === 'en') return 'English'
	if (lng === 'ru') return 'Русский'
	if (lng === 'tr') return 'Türkçe'
	if (lng === 'uz') return 'O‘zbek'
}


export function getReadingTime(content: string) {
	const WPS = 250 / 60

	let images = 0
	const regex = /\w/

	const words = content.split(' ').filter(word => {
		if (word.includes('<img')) {
			images += 1
		}
		return regex.test(word)
	}).length

	const imageAdjust = images * 4
	let imageSecs = 0
	let imageFactor = 12

	while (images) {
		imageSecs += imageFactor
		if (imageFactor > 3) {
			imageFactor -= 1
		}
		images -= 1
	}

	const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)

	if (minutes < 9) {
		return '0' + minutes
	} else {
		return minutes
	}
}

interface UrlQueryParams {
	params: string
	key: string
	value: string | null
	toCourses?: boolean
}

export const formUrlQuery = ({
	key,
	params,
	value,
	toCourses = false,
}: UrlQueryParams) => {
	const currentUrl = qs.parse(params)

	currentUrl[key] = value

	return qs.stringifyUrl(
		{
			url: toCourses
				? `/${window.location.pathname.split('/')[1]}/courses`
				: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	)
}

interface RemoveUrlQueryParams {
	params: string
	keysToRemove: string[]
}
export const removeKeysFromQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const currentUrl = qs.parse(params)

	keysToRemove.forEach(key => {
		delete currentUrl[key]
	})

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	)
}

export const calculateTotalDuration = (lessons: ILesson[]) => {
	let totalMinutes = 0

	lessons.forEach(lesson => {
		totalMinutes +=
			lesson.duration.hours * 60 +
			lesson.duration.minutes +
			Math.round(lesson.duration.seconds / 60)
	})

	const totalHours = Math.floor(totalMinutes / 60)
	const remainingMinutes = totalMinutes % 60

	const formattedTotalDuration = `${totalHours}.${remainingMinutes
		.toString()
		.padStart(2, '0')}`

	return formattedTotalDuration
}


export const formatLessonTime = (lesson: ILesson) => {
	const duration = lesson.duration

	const totalSeconds =
		duration.hours * 3600 + duration.minutes * 60 + duration.seconds

	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60

	const formattedTime = `${hours > 0 ? hours + ':' : ''}${
		minutes > 0 ? minutes + ':' : ''
	}${seconds.toString().padStart(2, '0')}`

	return formattedTime
}

export const formatAndDivideNumber = (num: number) => {
	if (num >= 1000000) {
		const formattedNum = (num / 1000000).toFixed(1)
		return `${formattedNum}M`
	} else if (num >= 1000) {
		const formattedNum = (num / 1000).toFixed(1)
		return `${formattedNum}K`
	} else {
		return num.toString()
	}
}

export const getTimeLocale = (lng: string) => {
	if (lng === 'en') return en
	if (lng === 'ru') return ru
	if (lng === 'tr') return tr
	if (lng === 'uz') return uz
}

export const generateNumericId = (): string => {
	let id = ''
	for (let i = 0; i < 4; i++) {
		id += Math.floor(Math.random() * 10).toString()
	}
	return id
}
