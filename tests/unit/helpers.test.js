/**
 * Unit tests for helper utility functions
 * These tests use Jest which is already configured in the React app
 */

const {
  generateRandomString,
  getTimestamp,
  isValidUrl,
  extractDomain
} = require('../utils/helpers');

describe('Helper Utilities', () => {
  describe('generateRandomString', () => {
    test('should generate a string of default length 10', () => {
      const result = generateRandomString();
      expect(result).toHaveLength(10);
      expect(typeof result).toBe('string');
    });

    test('should generate a string of specified length', () => {
      const length = 20;
      const result = generateRandomString(length);
      expect(result).toHaveLength(length);
    });

    test('should generate different strings on multiple calls', () => {
      const result1 = generateRandomString();
      const result2 = generateRandomString();
      expect(result1).not.toBe(result2);
    });

    test('should only contain alphanumeric characters', () => {
      const result = generateRandomString(50);
      const alphanumericRegex = /^[A-Za-z0-9]+$/;
      expect(result).toMatch(alphanumericRegex);
    });
  });

  describe('getTimestamp', () => {
    test('should return a valid ISO timestamp string', () => {
      const timestamp = getTimestamp();
      expect(typeof timestamp).toBe('string');
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    test('should return current time', () => {
      const before = new Date().getTime();
      const timestamp = getTimestamp();
      const after = new Date().getTime();
      
      const timestampMs = new Date(timestamp).getTime();
      expect(timestampMs).toBeGreaterThanOrEqual(before);
      expect(timestampMs).toBeLessThanOrEqual(after);
    });
  });

  describe('isValidUrl', () => {
    test('should return true for valid HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://www.example.com/path')).toBe(true);
    });

    test('should return true for valid URLs with query parameters', () => {
      expect(isValidUrl('https://example.com?param=value')).toBe(true);
      expect(isValidUrl('https://youtube.com/@codewithmuh?sub_confirmation=1')).toBe(true);
    });

    test('should return false for invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('htp://wrong-protocol.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });

    test('should return true for localhost URLs', () => {
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('http://127.0.0.1:3000')).toBe(true);
    });
  });

  describe('extractDomain', () => {
    test('should extract domain from valid URLs', () => {
      expect(extractDomain('https://www.example.com/path')).toBe('www.example.com');
      expect(extractDomain('http://github.com/user/repo')).toBe('github.com');
      expect(extractDomain('https://youtube.com/@codewithmuh')).toBe('youtube.com');
    });

    test('should extract domain from URLs with query parameters', () => {
      expect(extractDomain('https://example.com?param=value')).toBe('example.com');
    });

    test('should return empty string for invalid URLs', () => {
      expect(extractDomain('not a url')).toBe('');
      expect(extractDomain('')).toBe('');
    });

    test('should handle localhost URLs', () => {
      expect(extractDomain('http://localhost:3000')).toBe('localhost');
      expect(extractDomain('http://127.0.0.1:3000')).toBe('127.0.0.1');
    });
  });
});
