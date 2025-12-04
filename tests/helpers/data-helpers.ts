import * as fs from 'fs';
import * as path from 'path';

/**
 * Data helpers for managing test data and generating test values
 */
export class DataHelpers {
  /**
   * Load JSON data from a file
   * @param fileName - The name of the JSON file (without path)
   * @returns The parsed JSON data
   * @example
   * const testData = DataHelpers.loadTestData('external-links.json');
   * console.log(testData.youtubeChannel);
   */
  static loadTestData<T>(fileName: string): T {
    const filePath = path.join(__dirname, '../data', fileName);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData) as T;
  }

  /**
   * Generate a random string of specified length
   * @param length - The length of the string
   * @returns A random string
   * @example
   * const randomId = DataHelpers.generateRandomString(10);
   * // Output: "aB3xY9mK2p"
   */
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random email address
   * @param domain - The email domain (default: 'test.com')
   * @returns A random email address
   * @example
   * const email = DataHelpers.generateRandomEmail('codewithmuh.com');
   * // Output: "user_aB3xY9@codewithmuh.com"
   */
  static generateRandomEmail(domain: string = 'test.com'): string {
    const username = `user_${this.generateRandomString(6)}`;
    return `${username}@${domain}`;
  }

  /**
   * Generate a timestamp-based unique identifier
   * @returns A unique identifier string
   * @example
   * const uniqueId = DataHelpers.generateUniqueId();
   * // Output: "1703001234567_aB3xY9"
   */
  static generateUniqueId(): string {
    const timestamp = Date.now();
    const randomPart = this.generateRandomString(6);
    return `${timestamp}_${randomPart}`;
  }

  /**
   * Get current date in YYYY-MM-DD format
   * @returns The current date string
   * @example
   * const today = DataHelpers.getCurrentDate();
   * // Output: "2024-12-19"
   */
  static getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get current timestamp in ISO format
   * @returns The current timestamp string
   * @example
   * const timestamp = DataHelpers.getCurrentTimestamp();
   * // Output: "2024-12-19T14:30:00.000Z"
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Generate a random number within a range
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   * @returns A random number
   * @example
   * const randomNum = DataHelpers.generateRandomNumber(1, 100);
   * // Output: 42
   */
  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Select a random item from an array
   * @param array - The array to select from
   * @returns A random item from the array
   * @example
   * const browsers = ['Chrome', 'Firefox', 'Safari'];
   * const randomBrowser = DataHelpers.selectRandomItem(browsers);
   * // Output: "Firefox"
   */
  static selectRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  /**
   * Deep clone an object
   * @param obj - The object to clone
   * @returns A deep clone of the object
   * @example
   * const original = { name: 'Test', data: { value: 123 } };
   * const cloned = DataHelpers.deepClone(original);
   */
  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Merge multiple objects into one
   * @param objects - Objects to merge
   * @returns Merged object
   * @example
   * const merged = DataHelpers.mergeObjects(
   *   { name: 'Test' },
   *   { age: 25 },
   *   { city: 'NYC' }
   * );
   * // Output: { name: 'Test', age: 25, city: 'NYC' }
   */
  static mergeObjects<T>(...objects: Partial<T>[]): T {
    return Object.assign({}, ...objects) as T;
  }
}
