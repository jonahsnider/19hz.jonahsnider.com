import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { REGIONS } from '@/regions';
import { CopyButtonInput } from './copy-button-input';

export function UrlBuilder() {
	const [region, setRegion] = useState('BayArea');

	return (
		<TooltipProvider>
			<div className='flex flex-col gap-4 items-center justify-center'>
				<RegionInput value={region} setValue={setRegion} />

				<div>
					<CopyButtonInput
						value={`19hz.jonahsnider.com/api/region/${encodeURIComponent(region)}/feed.xml`}
						copyValue={`https://19hz.jonahsnider.com/api/region/${encodeURIComponent(region)}/feed.xml`}
						editable={false}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
}

const REGIONS_ARRAY = Object.entries(REGIONS);

export function RegionInput({ setValue, value }: { value: string; setValue: (value: string) => void }) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full md:w-[400px] justify-between'>
					{value ? REGIONS[value as keyof typeof REGIONS]?.name : 'Select region...'}
					<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[400px] p-0'>
				<Command>
					<CommandInput placeholder='Search region...' className='h-9' />
					<CommandList>
						<CommandEmpty>No region found.</CommandEmpty>
						<CommandGroup>
							{REGIONS_ARRAY.map(([region, metadata]) => (
								<CommandItem
									key={region}
									value={metadata.name}
									onSelect={() => {
										setValue(region);
										setOpen(false);
									}}
								>
									{metadata.name}
									<CheckIcon className={cn('ml-auto h-4 w-4', value === region ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
