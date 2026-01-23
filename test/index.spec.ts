import { describe, expect, it } from 'vitest';
import { getTitle } from '../src/index';

describe('Title extraction', () => {
	it('extracts title with lowercase tags', () => {
		expect(getTitle('<html><head><title>Test Page</title></head></html>')).toBe('Test Page');
	});

	it('extracts title with uppercase tags', () => {
		expect(getTitle('<html><head><TITLE>Test Page</TITLE></head></html>')).toBe('Test Page');
	});

	it('extracts title with mixed case tags', () => {
		expect(getTitle('<html><head><Title>Test Page</Title></head></html>')).toBe('Test Page');
	});

	it('returns undefined for invalid URL', () => {
		expect(getTitle('invalid')).toBeUndefined();
	});

	it('returns undefined when no title tag present', () => {
		expect(getTitle('<html><head></head></html>')).toBeUndefined();
	});
});
