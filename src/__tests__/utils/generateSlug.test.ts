import { generateSlug } from '@/utils/generateSlugs';

describe('generateSlug', () => {
  it('should convert text to lowercase', () => {
    expect(generateSlug('HELLO WORLD')).toBe('hello-world');
  });

  it('should remove accents and special characters', () => {
    expect(generateSlug('café')).toBe('cafe');
    expect(generateSlug('nação')).toBe('nacao');
    expect(generateSlug('ação')).toBe('acao');
  });

  it('should replace spaces with hyphens', () => {
    expect(generateSlug('hello world')).toBe('hello-world');
    expect(generateSlug('hello  world')).toBe('hello-world');
  });

  it('should remove special characters except hyphens', () => {
    expect(generateSlug('hello@world!')).toBe('helloworld');
    expect(generateSlug('hello#world$')).toBe('helloworld');
  });

  it('should handle multiple consecutive hyphens', () => {
    expect(generateSlug('hello---world')).toBe('hello-world');
    expect(generateSlug('hello--world--')).toBe('hello-world');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(generateSlug('-hello-world-')).toBe('hello-world');
    expect(generateSlug('--hello-world--')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(generateSlug('')).toBe('');
  });

  it('should handle string with only special characters', () => {
    expect(generateSlug('!@#$%')).toBe('');
  });

  it('should handle complex real-world examples', () => {
    expect(generateSlug('Produto Especial - Categoria A')).toBe(
      'produto-especial-categoria-a'
    );
    expect(generateSlug('iPhone 15 Pro Max')).toBe('iphone-15-pro-max');
    expect(generateSlug('Café & Chá')).toBe('cafe-cha');
  });

  it('should preserve numbers', () => {
    expect(generateSlug('Produto 123')).toBe('produto-123');
    expect(generateSlug('iPhone 15')).toBe('iphone-15');
  });
});
