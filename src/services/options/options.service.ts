// src/services/optionsService.ts

import { axiosAuth } from "@/lib/api";
import { CreateOrUpdateOptionRequest, MinimalOption, Option } from "@/types/options.types";

export interface CreateOrUpdateOptionResponse extends Option {}

// ===== Service implementation =====
export const OptionsService = {
  /**
   * Create or update an option.
   * @param data Option payload.
   */
  async createOrUpdate(
    data: CreateOrUpdateOptionRequest
  ): Promise<CreateOrUpdateOptionResponse> {
    const res = await axiosAuth.post<CreateOrUpdateOptionResponse>("/options", data);
    return res.data;
  },

  /**
   * Get all options with minimal fields.
   */
  async getAllMinimal(): Promise<MinimalOption[]> {
    const res = await axiosAuth.get<MinimalOption[]>("/options");
    return res.data;
  },

  /**
   * Get options filtered by type.
   * @param type The type of options to retrieve.
   */
  async getByType(type: string): Promise<Option[]> {
    const res = await axiosAuth.get<Option[]>(`/options/${encodeURIComponent(type)}`);
    return res.data;
  },
};

export default OptionsService;
