import { SetStateAction, useEffect, useState } from 'react'
import Icon from '../../assets/arrow.svg'
import Info from '../../assets/info.svg'
import { HolidayType } from '../../App'
import { TimeSlot } from '../TimeSlot/TimeSlot'
import { checkNationalHoliday, getHolidayInfo, getHolidaysInMonth } from '../../utils/helpers'

type Props = {
	holidays: HolidayType[]
	setSelectedDate: React.Dispatch<SetStateAction<Date | null>>
	selectedTime: String
	setSelectedTime: React.Dispatch<SetStateAction<string>>
	isClosed: boolean
	setIsClosed: React.Dispatch<SetStateAction<boolean>>
}

export const Calendar = ({
	holidays,
	setSelectedDate,
	selectedTime,
	setSelectedTime,
	isClosed,
	setIsClosed,
}: Props) => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [currentHolidays, setCurrentHolidays] = useState<HolidayType[] | null>(null)
	const [selectedDay, setSelectedDay] = useState<Number | null>(null)
	const [holidayInfo, setHolidayInfo] = useState<String | null>(null)

	const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
	const times = ['12:00', '14:00', '16:30', '18:30', '20:00']

	useEffect(() => {
		const data = getHolidaysInMonth(currentDate, holidays)
		setCurrentHolidays(data)
	}, [currentDate])

	const getPreviousMonth = () => {
		const previousMonth = new Date(currentDate)
		previousMonth.setMonth(previousMonth.getMonth() - 1)
		setCurrentDate(previousMonth)
		setSelectedDay(null)
		setSelectedDate(null)
		setHolidayInfo(null)
	}

	const getNextMonth = () => {
		const nextMonth = new Date(currentDate)
		nextMonth.setMonth(nextMonth.getMonth() + 1)
		setCurrentDate(nextMonth)
		setSelectedDay(null)
		setSelectedDate(null)
		setHolidayInfo(null)
	}

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()
		const daysInMonth = new Date(year, month + 1, 0).getDate()

		const firstDayOfMonth = new Date(year, month, 1).getDay()
		const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

		const calendarDays = []

		for (let i = 0; i < startingDay; i++) {
			calendarDays.push(null)
		}

		for (let i = 1; i <= daysInMonth; i++) {
			calendarDays.push(i)
		}

		return calendarDays
	}

	const formatMonth = (date: Date) => {
		return date.toLocaleString('en-EN', { month: 'long', year: 'numeric' })
	}

	const days = getDaysInMonth(currentDate)

	const handleSetSelectedDay = (day: number | null, closed: boolean) => {
		setSelectedDay(day)
		setIsClosed(closed)
		if (day) {
			setHolidayInfo(getHolidayInfo(day, currentHolidays))
			const prevDate = currentDate
			prevDate.setDate(day)
			setSelectedDate(prevDate)
		}
	}

	return (
		<div className='flex flex-col gap-2 mb-6'>
			<div className='flex flex-wrap gap-6'>
				<div className='flex flex-1 flex-col gap-2'>
					<h3 className='leading-none text-custom-darkblue'>Date</h3>
					<div className='flex flex-col max-w-[326px] bg-white border border-custom-lightpurple p-6 rounded-lg'>
						<div className='flex justify-between items-center mb-4'>
							<button
								type='button'
								onClick={getPreviousMonth}
								className='p-1 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer'>
								<img src={Icon} alt='Arrow left icon'></img>
							</button>
							<div className='font-medium text-custom-darkblue'>{formatMonth(currentDate)}</div>
							<button
								type='button'
								onClick={getNextMonth}
								className='p-1 rounded-full text-gray-400 hover:bg-gray-100 rotate-180 cursor-pointer'>
								<img src={Icon} alt='Arrow right icon'></img>
							</button>
						</div>

						<div className='grid grid-cols-7 gap-1'>
							{daysOfWeek.map(day => (
								<div
									key={day}
									className='text-center font-medium text-sm text-custom-darkblue h-8 flex items-center justify-center'>
									{day}
								</div>
							))}

							{days.map((day, index) => {
								const isSunday = (index + 1) % 7 === 0
								const closed = isSunday || checkNationalHoliday(day, currentHolidays)

								return (
									<div
										key={index}
										className={`
              h-8 w-8 text-center flex items-center justify-center justify-self-center text-sm rounded-full text-custom-darkblue
              ${day === null ? 'invisible' : 'cursor-pointer'}
              ${day === selectedDay ? 'bg-custom-purple text-white' : 'hover:bg-custom-lightpurple'}
              ${closed ? 'text-gray-400' : ''} 
            `}
										onClick={() => handleSetSelectedDay(day, closed)}>
										{day}
									</div>
								)
							})}
						</div>
					</div>
				</div>
				{selectedDay && !isClosed && (
					<div className='flex flex-col gap-2'>
						<h3 className='leading-none'>Time</h3>
						<div className='flex flex-wrap gap-2 sm:flex-col'>
							{times &&
								times.map((t, id) => (
									<TimeSlot
										key={id}
										time={times[id]}
										isSelected={times[id] === selectedTime}
										setSelectedTime={setSelectedTime}>
										{t}
									</TimeSlot>
								))}
						</div>
					</div>
				)}
			</div>
			{holidayInfo && (
				<div className='flex gap-2 w-100'>
					<img width={18} src={Info} alt='Info icon'></img>
					<div className='text-sm text-custom-darkblue'>{`It is ${holidayInfo}`}</div>
				</div>
			)}
		</div>
	)
}
