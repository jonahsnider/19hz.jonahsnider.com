'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CopyButtonInput } from './copy-button-input';

export function UrlBuilder() {
	const [region, setRegion] = useState('BayArea');

	return (
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
	);
}

const KNOWN_REGIONS = {
	BayArea: 'San Francisco Bay Area / Northern California',
	LosAngeles: 'Los Angeles / Southern California',
	Seattle: 'Seattle',
	Atlanta: 'Atlanta',
	Miami: 'Miami',
	DC: 'Washington, DC / Maryland / Virginia',
	Texas: 'Texas',
	Iowa: 'Iowa / Nebraska',
	Denver: 'Denver',
	CHI: 'Chicago',
	Detroit: 'Detroit',
	Massachusetts: 'Massachusetts',
	LasVegas: 'Las Vegas',
	Phoenix: 'Phoenix',
	PNW: 'PNW',
	ORE: 'Oregon',
	BC: 'British Columbia',
} as const;

const KNOWN_REGIONS_ARRAY = Object.entries(KNOWN_REGIONS);

export function RegionInput({ setValue, value }: { value: string; setValue: (value: string) => void }) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{/* biome-ignore lint/a11y/useSemanticElements: This is not accurate */}
				<Button variant='outline' role='combobox' aria-expanded={open} className='w-full md:w-[400px] justify-between'>
					{value ? KNOWN_REGIONS_ARRAY.find((region) => region[0] === value)?.[1] : 'Select framework...'}
					<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[400px] p-0'>
				<Command>
					<CommandInput placeholder='Search region...' className='h-9' />
					<CommandList>
						<CommandEmpty>No region found.</CommandEmpty>
						<CommandGroup>
							{KNOWN_REGIONS_ARRAY.map((region) => (
								<CommandItem
									key={region[0]}
									value={region[0]}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									{region[1]}
									<CheckIcon className={cn('ml-auto h-4 w-4', value === region[0] ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
