import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}

export const Button = ({ disabled, onClick, children, ...rest }: ButtonProps) => {
	return (
		<button
			className={`${styles.button} rounded-sm text-white bg-custom-purple hover:bg-custom-darkpurple cursor-pointer transition-colors disabled:bg-custom-lightpurple disabled:cursor-not-allowed ${styles.button}`}
			disabled={disabled}
			onClick={onClick}
			{...rest}>
			{children}
		</button>
	)
}
