import { NormalizeError } from './error/NormalizeError';
import DiacriticsData from './diacritics.json';

export type Diacritics<K, V> = Map<K, V>

export const diacritics: Diacritics<number, string> = new Map(DiacriticsData as Array<[number, string]>);

export function normalizeSync(text: string): string {
  if (typeof text !== 'string') {
    throw new NormalizeError('This passed text isn\'t a string');
  }

  const content = [...text.trim()];
  const contentLength = content.length;

  for (let i = 0; i < contentLength; i += 1) {
    const base = diacritics.get(content[i].charCodeAt(0))

    if (typeof base === 'undefined') {
      continue;
    }

    content[i] = base;
  }

  return content.join('');
}

export async function normalize(text: string): Promise<string> {
  return normalizeSync(text);
}
