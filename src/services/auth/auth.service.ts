import { axiosPublic } from "@/lib/api";

/**
 * Authentication service for handling user authentication operations
 */
class AuthService {
  /**
   * Registers a new user and sends a verification code
   * @param username - User's username
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with registration data
   */
  async registerWithCode({ username, email, password }: { username: string; email: string; password: string; }) {
    const res = await axiosPublic.post('/auth/register', { username, email, password });
    return res.data;
  }

  /**
   * Verifies a user's email with a code
   * @param email - User's email address
   * @param code - Verification code
   * @returns Promise with verification data
   */
  async verifyEmailWithCode({ email, code }: { email: string; code: string; }) {
    console.log(email, code)
    const res = await axiosPublic.post('/auth/email/verify-code', { email, code });
    return res.data;
  }

  /**
   * Resends a verification code to the user's email
   * @param email - User's email address
   * @returns Promise with resend status
   */
  async resendVerificationCode({ email }: { email: string; }) {
    const res = await axiosPublic.post('/auth/email/resend-code', { email });
    return res.data;
  }

  /**
   * Logs in a user, supports MFA
   * @param identifier - User's email or username
   * @param password - User's password
   * @returns Promise with login data or MFA challenge
   */
  async loginWithMfaSupport({ identifier, password }: { identifier: string; password: string; }) {
    const res = await axiosPublic.post('/auth/login', { identifier, password });
    return res.data;
  }

  /**
   * Verifies MFA code during login
   * @param mfaToken - Token received during login challenge
   * @param mfaCode - 6-digit TOTP code from authenticator app
   * @returns Promise with authentication data
   */
  async mfaVerify({ mfaToken, mfaCode }: { mfaToken: string; mfaCode: string; }) {
    const res = await axiosPublic.post('/auth/mfa-verify', { mfaToken, mfaCode });
    return res.data;
  }

  /**
   * Sends a password reset OTP to the user's email address
   * @param email - User's email address
   * @returns Promise with request status
   */
  async forgotPassword({ email }: { email: string; }) {
    const res = await axiosPublic.post('/auth/forgot-password', { email });
    return res.data;
  }

  /**
   * Resets password with OTP code
   * @param email - User's email address
   * @param otp - One-time password received via email
   * @param newPassword - New password to set
   * @returns Promise with reset status
   */
  async resetPassword({ email, otp, newPassword }: { email: string; otp: string; newPassword: string; }) {
    const res = await axiosPublic.post('/auth/reset-password', { email, otp, newPassword });
    return res.data;
  }

  async verifyForgotOtp({ email, otp }: { email: string; otp: string; }) {
    const res = await axiosPublic.post('/auth/forgot-password/verifyOtp', { email, otp });
    return res.data;
  }
}

export const authService = new AuthService();
export default authService;