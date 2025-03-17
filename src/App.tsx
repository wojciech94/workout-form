import { useEffect, useState } from 'react'
import './App.css'
import { API_URL, HOLIDAY_API_KEY } from './constants/api'
import { Button } from './components/Button/Button'
import { Textfield } from './components/Textfield/Textfield'
import { initialFormData, isFormDataValid, validateEmail } from './utils/helpers'
import { SliderBox } from './components/SliderBox/SliderBox'
import { Calendar } from './components/Calendar/Calendar'
import { FileInput } from './components/FileInput/FileInput'

export type HolidayType = {
	country: string
	iso: string
	year: number
	date: string
	day: string
	name: string
	type: string
}

export type FormDataType = {
	firstName: InputType
	lastName: InputType
	email: InputType
}

export type InputType = {
	value: string
	isError: boolean
	type: 'text' | 'email'
}

function App() {
	const [holidays, setHolidays] = useState<HolidayType[] | null>(null)
	const [formData, setFormData] = useState<FormDataType>(initialFormData)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTime, setSelectedTime] = useState<string>('12:00')
	const [file, setFile] = useState<File | null>(null)
	const [age, setAge] = useState(28)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(API_URL, {
				headers: {
					'X-Api-Key': HOLIDAY_API_KEY,
				},
			})
			if (!response.ok) {
				const errorData = await response.json()
				console.warn('Failed to fetch holidays data: ', errorData.message)
				return
			}

			const data: HolidayType[] = await response.json()
			if (data) {
				setHolidays(data)
			}
		}

		fetchData()
	}, [])

	const submitData = async () => {
		const url = 'http://letsworkout.pl/submit'
		const formDataToSend = new FormData()

		Object.keys(formData).forEach(key => {
			const inputData = formData[key as keyof FormDataType]
			formDataToSend.append(key, inputData.value)
		})

		formDataToSend.append('age', age.toString())
		if (selectedDate) {
			formDataToSend.append('date', selectedDate.toDateString())
		}
		formDataToSend.append('time', selectedTime)

		if (file) {
			formDataToSend.append('file', file)
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: formDataToSend,
		}

		const response = await fetch(url, options)

		if (!response.ok) {
			const errorData = await response.json()
			console.warn('Failed to send application:', errorData.message)
			return
		}
		const data = await response.json()
		console.log(data)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (name === 'email') {
			const isValidEmail = validateEmail(value)
			setFormData(prev => ({
				...prev,
				[name]: {
					...prev[name],
					value,
					isError: !isValidEmail,
				},
			}))
			return
		}
		setFormData(prev => ({
			...prev,
			[name as keyof FormDataType]: {
				...prev[name as keyof FormDataType],
				value,
				isError: value == '',
			},
		}))
	}

	return (
		<>
			{holidays && (
				<form onSubmit={submitData} className='flex flex-col gap-6'>
					<h2 className='font-medium text-2xl text-custom-darkblue'>Personal info</h2>
					<Textfield
						name='firstName'
						variant={formData.firstName.type}
						isError={formData.firstName.isError}
						onChange={handleChange}
						label='First name'
						value={formData.firstName.value}></Textfield>
					<Textfield
						name='lastName'
						variant={formData.lastName.type}
						isError={formData.lastName.isError}
						onChange={handleChange}
						label='Last name'
						value={formData.lastName.value}></Textfield>
					<Textfield
						name='email'
						variant={formData.email.type}
						isError={formData.email.isError}
						onChange={handleChange}
						label='Email Address'
						value={formData.email.value}></Textfield>
					<SliderBox value={age} setValue={setAge}></SliderBox>
					<FileInput file={file} setFile={setFile} />
					<h2 className='font-medium text-2xl text-custom-darkblue'>Your workout</h2>
					<Calendar
						holidays={holidays}
						setSelectedDate={setSelectedDate}
						selectedTime={selectedTime}
						setSelectedTime={setSelectedTime}
					/>
					<Button disabled={!selectedDate || !file || !isFormDataValid(formData)}>Send application</Button>
				</form>
			)}
		</>
	)
}

export default App
