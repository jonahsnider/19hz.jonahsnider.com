export type EventListing = {
	date: {
		raw: string;
		start: Date;
		end: Date | undefined;
	};
	title: {
		content: string;
		url: string;
	};
	venue: string;
	priceAndAge: string | undefined;
	organizers: string | undefined;
	tags: string[];
	link:
		| {
				label: string;
				url: string;
		  }
		| undefined;
};
