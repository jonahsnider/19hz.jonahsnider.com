import * as Sentry from '@sentry/astro';
import { HttpError, pipeline, withHeaders, withHttpError } from 'fetch-extras';
import { AppException } from '@/exceptions/app-exception';
import type { EventListing } from './event-listing';
import { parseEventListingHtml } from './parser';

const fetch19Hz = pipeline(fetch, withHeaders({ 'user-agent': '19hz.jonahsnider.com' }), withHttpError());

export async function fetchEventListings(region: string): Promise<EventListing[]> {
	let response: Response;

	try {
		response = await fetch19Hz(`https://19hz.info/eventlisting_${encodeURIComponent(region)}.php`);
	} catch (error) {
		if (!(error instanceof HttpError)) {
			throw error;
		}

		if (error.response.status === 404) {
			throw new AppException('Unknown region provided', 404);
		}

		Sentry.captureException(error);
		throw new AppException('Failed to fetch event listings', 502, { cause: error });
	}

	const html = await response.text();

	return parseEventListingHtml(html, region);
}
