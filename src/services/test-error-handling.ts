import { authService } from './auth.service';
import { mfaService } from './mfa.service';
import { formatApiErrorMessage } from '../lib/utils';

/**
 * Simple test function to verify error handling works correctly
 * This should be called from the browser console for testing
 */
export async function testErrorHandling() {
  console.log('Testing error handling...');
  
  try {
    // Test auth service with invalid credentials
    await authService.loginWithMfaSupport({ 
      identifier: 'invalid@email.com', 
      password: 'wrongpassword' 
    });
  } catch (error) {
    console.log('Auth error caught:', formatApiErrorMessage(error));
    console.log('Error object:', error);
  }
  
  try {
    // Test MFA service without authentication
    await mfaService.setupMfa();
  } catch (error) {
    console.log('MFA error caught:', formatApiErrorMessage(error));
    console.log('Error object:', error);
  }
  
  try {
    // Test network error simulation
    await authService.registerWithCode({ 
      username: 'test', 
      email: 'test@example.com', 
      password: 'password123' 
    });
  } catch (error) {
    console.log('Registration error caught:', formatApiErrorMessage(error));
    console.log('Error object:', error);
  }
  
  console.log('Error handling test completed');
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as unknown as { testErrorHandling: typeof testErrorHandling }).testErrorHandling = testErrorHandling;
}