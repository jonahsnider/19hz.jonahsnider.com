import { REGIONS } from '@/regions';

export function getTimezoneForRegion(region: string): string {
	if (region in REGIONS) {
		return REGIONS[region as keyof typeof REGIONS].timezone;
	}

	throw new RangeError(`Unknown region: ${region}`);
}
