import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../../lib/hooks/use-debounce';

// Mock timer
jest.useFakeTimers();

describe('useDebounce hook', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    
    expect(result.current).toBe('initial value');
  });

  it('should not update the debounced value before the delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value
    rerender({ value: 'new value', delay: 500 });
    
    // The debounced value should still be the initial value
    expect(result.current).toBe('initial value');
    
    // Fast-forward time by 400ms (less than the delay)
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // The debounced value should still be the initial value
    expect(result.current).toBe('initial value');
  });

  it('should update the debounced value after the delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value
    rerender({ value: 'new value', delay: 500 });
    
    // Fast-forward time by 500ms (equal to the delay)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // The debounced value should now be the new value
    expect(result.current).toBe('new value');
  });

  it('should handle multiple value changes within the delay period', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value multiple times
    rerender({ value: 'first change', delay: 500 });
    
    // Fast-forward time by 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Change the value again
    rerender({ value: 'second change', delay: 500 });
    
    // Fast-forward time by 200ms (total 400ms, still less than delay)
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // The debounced value should still be the initial value
    expect(result.current).toBe('initial value');
    
    // Fast-forward time by 300ms more (total 700ms, more than delay)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // The debounced value should now be the latest value
    expect(result.current).toBe('second change');
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value and delay
    rerender({ value: 'new value', delay: 1000 });
    
    // Fast-forward time by 600ms (more than original delay, less than new delay)
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // The debounced value should still be the initial value
    expect(result.current).toBe('initial value');
    
    // Fast-forward time by 400ms more (total 1000ms, equal to new delay)
    act(() => {
      jest.advanceTimersByTime(400);
    });
    
    // The debounced value should now be the new value
    expect(result.current).toBe('new value');
  });
});