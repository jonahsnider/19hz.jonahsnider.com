export function Footer() {
	return (
		<footer className='flex flex-col justify-center items-center py-4 text-muted-foreground'>
			<p>
				By{' '}
				<a className='underline text-primary' href='https://jonahsnider.com'>
					Jonah Snider
				</a>
			</p>

			<a className='underline text-primary' href='https://github.com/jonahsnider/19hz.jonahsnider.com'>
				GitHub
			</a>

			<p>
				Powered by{' '}
				<a className='underline text-primary' href='https://19hz.info'>
					19hz.info
				</a>{' '}
				{'<3'}
			</p>
		</footer>
	);
}
