import { ReactNode } from 'react'

type Props = {
	children: ReactNode
	isSelected: boolean
	setSelectedTime: React.Dispatch<React.SetStateAction<string>>
	time: string
}

export const TimeSlot = ({ time, children, isSelected, setSelectedTime }: Props) => {
	return (
		<div
			className={`h-[46px] w-19 border ${
				isSelected ? 'border-custom-purple border-2' : 'border-custom-lightpurple'
			} bg-white border-custom-lightpurple hover:border-custom-purple hover:border-2 hover:cursor-pointer rounded-lg flex justify-center items-center`}
			onClick={() => setSelectedTime(time)}>
			{children}
		</div>
	)
}
