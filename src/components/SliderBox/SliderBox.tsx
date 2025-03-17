import Slider from '@mui/material/Slider'
import styles from './SliderBox.module.css'

type Props = {
	value: number
	setValue: React.Dispatch<React.SetStateAction<number>>
}

const sliderStyles = {
	'& .MuiSlider-track': {
		backgroundColor: 'var(--color-custom-purple)',
		borderWidth: 0,
	},
	'& .MuiSlider-thumb': {
		backgroundColor: 'var(--color-custom-purple)',
	},
	'& .MuiSlider-rail': {
		backgroundColor: 'var(--color-custom-lightpurple)',
	},
	'& .MuiSlider-root': {
		border: 'none',
		boxShadow: 'none',
	},
}

export const SliderBox = ({ value, setValue }: Props) => {
	const indicatorOffset = ((value - 8) / (100 - 8)) * 100
	const handleSliderChange = (_: Event, newValue: number | number[]) => {
		setValue(newValue as number)
	}

	return (
		<div className='flex-1 flex flex-col relative pb-8'>
			<label htmlFor='slider' className='text-custom-darkblue mb-1'>
				Age
			</label>
			<div className='flex justify-between text-xs text-custom-darkblue -mb-1'>
				<span>8</span>
				<span>100</span>
			</div>

			<Slider
				value={value}
				onChange={handleSliderChange}
				aria-labelledby='slider'
				min={8}
				max={100}
				step={1}
				sx={sliderStyles}
			/>
			<div
				className={`${styles.indicator} flex justify-center items-center w-[37px] h-[25px] absolute bottom-0 transform -translate-x-1/2 text-custom-purple text-xs font-medium bg-white  rounded-sm border border-custom-lightpurple`}
				style={{ left: `${indicatorOffset}%` }}>
				{value}
			</div>
		</div>
	)
}
