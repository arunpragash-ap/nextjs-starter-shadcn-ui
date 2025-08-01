import { axiosAuth } from "@/lib/api";

/**
 * MFA (Multi-Factor Authentication) service for handling TOTP-based 2FA
 */
class MfaService {
  /**
   * Setup MFA for the current user
   * Generates a TOTP secret and returns it with a QR code
   * @returns Promise with secret and QR code data URL
   */
  async setupMfa() {
    const response = await axiosAuth.post("/auth/mfa/setup");
    return response.data;
  }

  /**
   * Verify MFA token during setup
   * @param token - 6-digit TOTP code from authenticator app
   * @returns Promise with success status
   */
  async verifyMfaSetup(token: string) {
    const response = await axiosAuth.post("/auth/mfa/verify", { token });
    return response.data;
  }

  /**
   * Disable MFA for the current user
   * @param token - 6-digit TOTP code from authenticator app
   * @returns Promise with success status
   */
  async disableMfa(token: string) {
    const response = await axiosAuth.post("/auth/mfa/disable", { token });
    return response.data;
  }

  /**
   * Check if MFA is enabled for the current user
   * @returns Promise with MFA status
   */
  async getMfaStatus() {
    const response = await axiosAuth.get("/auth/mfa/status");
    return response.data;
  }
}

export const mfaService = new MfaService();
export default mfaService;