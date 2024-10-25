import { AppException } from '@/exceptions/app-exception';
import { HTTPError } from '@/exceptions/http-exception';
import { captureException } from '@sentry/nextjs';
import convert from 'convert';
import type { EventListing } from './event-listing';
import { parseEventListingHtml } from './parser';

const EVENT_LISTING_CACHE_TTL = convert(1, 'hour');

export async function fetchEventListings(region: string): Promise<EventListing[]> {
	const request = new Request(`https://19hz.info/eventlisting_${encodeURIComponent(region)}.php`, {
		next: {
			revalidate: EVENT_LISTING_CACHE_TTL.to('s'),
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
