global.fetch = jest.fn();

describe('apiFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env.NEXT_PUBLIC_API_URL = 'https://api.test.com/api';
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_API_URL;
    jest.resetModules();
  });

  it('should fetch data successfully', async () => {
    const { apiFetch } = await import('@/services/api');

    const mockData = { id: 1, name: 'Test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await apiFetch('/test');

    expect(fetch).toHaveBeenCalledWith('https://api.test.com/api/test', {
      next: { revalidate: 60 },
    });
    expect(result).toEqual(mockData);
  });

  it('should use default API URL when env var is not set', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    const { apiFetch } = await import('@/services/api');

    const mockData = { id: 1, name: 'Test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await apiFetch('/test');

    expect(fetch).toHaveBeenCalledWith('https://api.insany.co/api/test', {
      next: { revalidate: 60 },
    });
  });

  it('should throw error when response is not ok', async () => {
    const { apiFetch } = await import('@/services/api');

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(apiFetch('/test')).rejects.toThrow('Erro ao buscar /test');
  });

  it('should handle different endpoints', async () => {
    const { apiFetch } = await import('@/services/api');

    const mockData = { products: [] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await apiFetch('/products');

    expect(fetch).toHaveBeenCalledWith('https://api.test.com/api/products', {
      next: { revalidate: 60 },
    });
  });

  it('should handle query parameters in endpoint', async () => {
    const { apiFetch } = await import('@/services/api');

    const mockData = { id: 1 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await apiFetch('/products?category=electronics');

    expect(fetch).toHaveBeenCalledWith(
      'https://api.test.com/api/products?category=electronics',
      {
        next: { revalidate: 60 },
      }
    );
  });
});
