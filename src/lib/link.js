import { base } from '$app/paths';

/**
 * Internal links get the base path and a trailing slash (pages are prerendered as
 * folder/index.html, so they work on any static host). External links pass through.
 */
export function href(path) {
	if (!path || /^(https?:|mailto:|tel:)/.test(path)) return path;
	const [p, hash] = path.split('#');
	const withSlash = p.endsWith('/') ? p : p + '/';
	return base + withSlash + (hash ? '#' + hash : '');
}

export const isExternal = (path) => /^https?:/.test(path || '');
