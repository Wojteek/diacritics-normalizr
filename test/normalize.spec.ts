import { normalizeSync, normalize, NormalizeError, diacritics } from '../src';

describe('diacritics-normalizr', () => {
  it('returns promise while normalize() function is being used', async () => {
    expect.assertions(1);
    expect(normalize('')).toBeInstanceOf(Promise);
  });

  it('returns collection of resolved Promises of normalize() function calls', async () => {
    expect.assertions(1);
    await expect(Promise.all([
      normalize('áčďéěíňóřšťúů'),
      normalize('áæðéíóöþúý'),
      normalize('âçğöşüûü'),
      normalize('áéíñóúü'),
    ])).resolves.toEqual([
      'acdeeinorstuu',
      'aaedeioothuy',
      'acgosuuu',
      'aeinouu',
    ]);
  });

  it('should remove diacritics from different strings', () => {
    expect.assertions(2);
    expect(normalizeSync('Zażółć gęślą jaźń')).toBe('Zazolc gesla jazn');
    expect(normalizeSync('Mel dagetön dunoms nemögik of, fif klänikosi ofidoms omis kü. Nenkodiko opöjutols temakäd vo lul, obs as jibalan ogolons.')).toBe('Mel dageton dunoms nemogik of, fif klanikosi ofidoms omis ku. Nenkodiko opojutols temakad vo lul, obs as jibalan ogolons.');
  });

  it('should throw an error if passed value isn\'t a string', async () => {
    expect.assertions(2);
    expect(() => {
      normalizeSync([
        'value',
        'test_value',
      ]);
    }).toThrow(NormalizeError);
    await expect(normalize([
      'value',
      'test_value',
    ])).rejects.toBeInstanceOf(NormalizeError);
  });

  it('should add a new "diacritic" and then remove it', async () => {
    expect.assertions(2);
    diacritics.set(119, 'vv');
    await expect(normalize('It works!')).resolves.toBe('It vvorks!');
    expect(diacritics.delete(119)).toBe(true);
  });
});
