import { InputHTMLAttributes } from 'react'
import styles from './Textfield.module.css'
import Icon from '../../assets/warning.svg'
import { FormDataType } from '../../App'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: keyof FormDataType
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	isError: boolean
	label: string
	variant: 'text' | 'email'
}

export const Textfield = ({ disabled, value, onChange, isError, label, name, variant, ...rest }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<label className={`${styles.label}`} htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				className={`${isError ? styles.error : ''} ${styles.input} ${variant === 'email' ? 'font-medium':''}`}
				disabled={disabled}
				{...rest}
				onChange={onChange}></input>
			{isError && (
				<div className='flex gap-[10px] items-start'>
					<img src={Icon} alt='warning icon' className='mt-1' width={16}></img>
					<div className='flex flex-col text-sm'>
						{variant === 'email' ? (
							<>
								<span>Please use correct formatting</span>
								<span>Example: address@email.com</span>
							</>
						) : (
							<span>Input cannot be empty</span>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
