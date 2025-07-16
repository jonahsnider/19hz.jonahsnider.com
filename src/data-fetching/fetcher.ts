import { captureException } from '@sentry/nextjs';
import { AppException } from '@/exceptions/app-exception';
import { HTTPError } from '@/exceptions/http-exception';
import type { EventListing } from './event-listing';
import { parseEventListingHtml } from './parser';

export async function fetchEventListings(region: string): Promise<EventListing[]> {
	const request = new Request(`https://19hz.info/eventlisting_${encodeURIComponent(region)}.php`, {
		next: {
			// 6 hours in seconds
			// This can't be dynamically calculated because Next will either silently ignore it or throw an error on build
			// We also can't reference a constant that's exported since that can't be resolved by their very simple bundling tech
			revalidate: 21600,
		},
		headers: {
			'user-agent': '19hz.jonahsnider.com',
		},
	});
	const response = await fetch(request);

	if (response.status === 404) {
		throw new AppException('Unknown region provided');
	}

	if (!response.ok) {
		captureException(new HTTPError(response, request));
		throw new AppException('Failed to fetch event listings');
	}

	const html = await response.text();

	return parseEventListingHtml(html, region);
}
