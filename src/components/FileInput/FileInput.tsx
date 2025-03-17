import { ChangeEvent, SetStateAction, useRef } from 'react'
import { DeleteIcon } from '../DeleteIcon/DeleteIcon'
import styles from './FileInput.module.css'

type Props = {
	file: File | null
	setFile: React.Dispatch<SetStateAction<File | null>>
}

export const FileInput = ({ file, setFile }: Props) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFile(file)
		}
	}

	const handleRemoveFile = () => {
		setFile(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className='flex flex-col gap-1 mb-6'>
			<label htmlFor='fileinput' className='text-custom-darkblue'>
				Photo
			</label>
			<div className='relative h-24 p-6 border bg-white border-custom-lightpurple rounded-lg cursor-pointer'>
				<input
					ref={fileInputRef}
					id='fileinput'
					type='file'
					accept='image/*'
					className={`${styles.fileInput} absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 outline-none`}
					onChange={handleFileChange}></input>
				<div
					className={`w-full flex justify-center absolute top-1/2 left-1/2 -translate-1/2 ${
						file?.name ? '' : 'pointer-events-none'
					}`}>
					{file && file.name ? (
						<div className='flex justify-center items-center gap-2 px-4'>
							<span className='text-custom-darkblue break-all'>{file.name}</span>
							<DeleteIcon onClick={handleRemoveFile} />
						</div>
					) : (
						<div className='flex gap-2'>
							<span className='underline text-custom-purple'>Upload a file</span>
							<span className='text-[#898DA9] hidden sm:inline'>or drag and drop here</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
