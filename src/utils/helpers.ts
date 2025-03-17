import { HolidayType } from './../App'
import { FormDataType } from '../App'

export const validateEmail = (email: string) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return emailRegex.test(email)
}

export const initialFormData: FormDataType = {
	firstName: {
		value: '',
		isError: false,
		type: 'text',
	},
	lastName: {
		value: '',
		isError: false,
		type: 'text',
	},
	email: {
		value: '',
		isError: false,
		type: 'email',
	},
}

export const isFormDataValid = (data: FormDataType) => {
	for (const key in data) {
		const field = data[key as keyof FormDataType]

		if (!field.value.trim()) {
			return false
		}

		if (field.isError) {
			return false
		}

		if (field.type === 'email' && !validateEmail(field.value)) {
			return false
		}
	}

	return true
}

export const getHolidaysInMonth = (currentDate: Date, data: HolidayType[]) => {
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth()

	const newData = data.filter(d => {
		const date = new Date(d.date)
		return date.getFullYear() === currentYear && date.getMonth() === currentMonth
	})

	return newData
}

export const checkNationalHoliday = (day: Number | null, holidays: HolidayType[] | null) => {
	if (!holidays || !day) {
		return false
	}
	for (const data of holidays) {
		const holidayDay = data.date.split('-')[2]
		if (data.type === 'NATIONAL_HOLIDAY' && Number.parseInt(holidayDay) === day) {
			return true
		}
	}

	return false
}

export const getHolidayInfo = (day: Number, holidays: HolidayType[] | null) => {
	if (!day || !holidays) {
		return null
	}
	for (const data of holidays) {
		const holidayDay = data.date.split('-')[2]
		if ((data.type === 'NATIONAL_HOLIDAY' || data.type === 'OBSERVANCE') && Number.parseInt(holidayDay) === day) {
			return data.name
		}
	}
	return null
}
