import fetcher from '../../lib/fetcher';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetcher utility', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should return JSON data when the response is successful', async () => {
    // Mock data
    const mockData = { name: 'John Doe' };
    
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData)
    });

    // Call the fetcher function
    const result = await fetcher('/api/user');
    
    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('/api/user', undefined);
    expect(result).toEqual(mockData);
  });

  it('should throw an error when the response status is 401', async () => {
    // Mock unauthorized response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: jest.fn()
    });

    // Call the fetcher function and expect it to throw
    await expect(fetcher('/api/user')).rejects.toThrow('Unauthorized');
    
    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('/api/user', undefined);
  });

  it('should pass request init options to fetch', async () => {
    // Mock data
    const mockData = { success: true };
    
    // Mock successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData)
    });

    // Request init options
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'testuser' })
    };

    // Call the fetcher function with init options
    const result = await fetcher('/api/user', init);
    
    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('/api/user', init);
    expect(result).toEqual(mockData);
  });
});