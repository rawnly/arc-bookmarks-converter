import { Card } from '@/components/ui/card';
import Form from './components/form';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import HowTo from '@/components/how-to';

export default function Home() {
	return (
		<div className='flex flex-col bg-dotted items-center justify-center w-screen min-h-screen p-8'>
			<div className='text-center mb-6'>
				<h1 className='font-bold text-3xl'>
					Arc(away)
				</h1>
				<h3 className='font-medium text-2xl'>
					Migrate from Arc to any browser
				</h3>
			</div>
			<Card className='p-8 w-full max-w-lg'>
				<Form />
			</Card>
			<small className='text-xs w-full max-w-lg mt-4 text-body opacity-80'>
				Pase your share URL above to convert it into a bookmark file.
				100% privacy friendly. We don't store any data.
			</small>

			<div className='fixed top-5 right-5 flex items-center gap-4'>
				<HowTo />


				<Button variant='neutral' asChild>
					<a href="https://github.com/rawnly/arcaway">
						Source <ExternalLink />
					</a>
				</Button>
			</div>
		</div>
	);
}
