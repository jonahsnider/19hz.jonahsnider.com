import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col justify-center items-center flex-1 gap-4'>
			<h2 className='text-3xl'>Page not found</h2>
			<Link href='/' className='underline text-primary text-lg'>
				Home
			</Link>
		</div>
	);
}
