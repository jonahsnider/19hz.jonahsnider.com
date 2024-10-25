/**
 * Timezones that support dynamic daylight savings time.
 * https://github.com/wanasit/chrono/blob/80c126ba1df547c2092cb4412be5c4f1b1979f8d/src/timezone.ts
 */
const REGION_TO_TIMEZONE = {
	BayArea: 'PT',
	LosAngeles: 'PT',
	Seattle: 'PT',
	Atlanta: 'ET',
	Miami: 'ET',
	DC: 'ET',
	Texas: 'MT',
	Iowa: 'CT',
	Denver: 'MT',
	CHI: 'CT',
	Detroit: 'ET',
	Massachusetts: 'ET',
	LasVegas: 'PT',
	Phoenix: 'PT',
	PNW: 'PT',
};

export function getTimezoneForRegion(region: string): string {
	if (region in REGION_TO_TIMEZONE) {
		return REGION_TO_TIMEZONE[region as keyof typeof REGION_TO_TIMEZONE];
	}

	throw new RangeError(`Unknown region: ${region}`);
}
