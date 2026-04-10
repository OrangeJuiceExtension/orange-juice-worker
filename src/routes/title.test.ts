import { describe, expect, it } from 'vitest';
import { getTitle } from './title';

const titleTestCases = [
	{
		name: 'extracts title with lowercase tags',
		html: '<html><head><title>Test Page</title></head></html>',
		expected: 'Test Page',
	},
	{
		name: 'extracts title with uppercase tags',
		html: '<html><head><TITLE>Test Page</TITLE></head></html>',
		expected: 'Test Page',
	},
	{
		name: 'extracts title with mixed case tags',
		html: '<html><head><Title>Test Page</Title></head></html>',
		expected: 'Test Page',
	},
	{
		name: 'returns undefined for invalid input',
		html: 'invalid',
		expected: undefined,
	},
	{
		name: 'returns undefined when no title tag is present',
		html: '<html><head></head></html>',
		expected: undefined,
	},
	{
		name: 'extracts title tag content with surrounding whitespace',
		html: '<title>\nProgrammable Search Engine Blog\n</title>',
		expected: 'Programmable Search Engine Blog',
	},
	{
		name: 'extracts title tags with attributes',
		html: '<title data-rh="true">How My Son’s Roblox Mod Helped Me Find a Bug in Crypto Wallet Software</title>',
		expected: 'How My Son’s Roblox Mod Helped Me Find a Bug in Crypto Wallet Software',
	},
	{
		name: 'falls back to og:title when title is missing',
		html: '<html><head><meta data-rh="true" property="og:title" content="How My Son’s Roblox Mod Helped Me Find a Bug in Crypto Wallet Software"/></head></html>',
		expected: 'How My Son’s Roblox Mod Helped Me Find a Bug in Crypto Wallet Software',
	},
	{
		name: 'falls back to the first h1 when title and og:title are missing',
		html: '<html><body><h1>Primary Heading</h1><h1>Secondary Heading</h1></body></html>',
		expected: 'Primary Heading',
	},
	{
		name: 'prefers title over og:title and h1',
		html: '<html><head><title>Document Title</title><meta property="og:title" content="Open Graph Title"/></head><body><h1>Heading Title</h1></body></html>',
		expected: 'Document Title',
	},
	{
		name: 'prefers og:title over h1 when title is missing',
		html: '<html><head><meta property="og:title" content="Open Graph Title"/></head><body><h1>Heading Title</h1></body></html>',
		expected: 'Open Graph Title',
	},
	{
		name: 'extracts text content from h1 with nested tags',
		html: '<html><body><h1>Hello <span>World</span></h1></body></html>',
		expected: 'Hello World',
	},
] as const;

describe('Title extraction', () => {
	for (const testCase of titleTestCases) {
		it(testCase.name, () => {
			expect(getTitle(testCase.html)).toBe(testCase.expected);
		});
	}
});
