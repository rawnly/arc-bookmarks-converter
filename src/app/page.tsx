import { generateHTML } from '@/lib/util'
import Form from './components/form';

export default function Home() {


	return (
		<div className='flex dark:bg-black bg-white dark:text-white text-black items-center justify-center w-screen min-h-screen p-8'>
			<div className='flex flex-col items-center justify-center'>
				<Form />
			</div>
		</div>
	);
}
