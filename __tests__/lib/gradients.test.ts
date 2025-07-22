import { gradients, getGradient } from '../../lib/gradients';

describe('gradients utility', () => {
  describe('gradients array', () => {
    it('should contain at least one gradient', () => {
      expect(gradients.length).toBeGreaterThan(0);
    });

    it('should contain only string values', () => {
      gradients.forEach(gradient => {
        expect(typeof gradient).toBe('string');
      });
    });

    it('should contain tailwind gradient classes', () => {
      gradients.forEach(gradient => {
        expect(gradient).toMatch(/bg-gradient-to-[rl]/);
      });
    });
  });

  describe('getGradient function', () => {
    it('should return a gradient when no username is provided', () => {
      // Mock Math.random to return a predictable value
      const mockMath = Object.create(global.Math);
      mockMath.random = jest.fn().mockReturnValue(0.5);
      global.Math = mockMath;

      const gradient = getGradient();
      
      // Should return a gradient from the array
      expect(gradients).toContain(gradient);
      
      // Should use Math.random to select a gradient
      expect(Math.random).toHaveBeenCalled();
    });

    it('should return the same gradient for the same username', () => {
      const username = 'testuser';
      
      const gradient1 = getGradient(username);
      const gradient2 = getGradient(username);
      
      expect(gradient1).toBe(gradient2);
    });

    it('should return different gradients for different usernames', () => {
      // This test might occasionally fail if two different usernames happen to hash to the same gradient index
      // But it's unlikely with our test usernames
      const username1 = 'user1';
      const username2 = 'completelyDifferentUser';
      
      const gradient1 = getGradient(username1);
      const gradient2 = getGradient(username2);
      
      // This is a probabilistic test - there's a small chance it could fail even if the code is correct
      // if both usernames happen to hash to the same gradient index
      expect(gradient1).not.toBe(gradient2);
    });

    it('should handle empty username', () => {
      // Mock Math.random to return a predictable value
      const mockMath = Object.create(global.Math);
      mockMath.random = jest.fn().mockReturnValue(0.5);
      global.Math = mockMath;

      const gradient = getGradient('');
      
      // Should return a gradient from the array
      expect(gradients).toContain(gradient);
    });

    it('should handle usernames with special characters', () => {
      const username = 'user!@#$%^&*()';
      
      const gradient = getGradient(username);
      
      // Should return a gradient from the array
      expect(gradients).toContain(gradient);
    });
  });
});