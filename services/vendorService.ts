// services/vendorService.ts
import type { VendorResponse } from "@/types/venue";
import apiClient from "../lib/axios";



// Vendor service class
export class VendorService {
  static async getVendors(
    currentPage: number = 1,
    itemsPerPage: number = 10
  ): Promise<VendorResponse> {
    const response = await apiClient.get<VendorResponse>(
      `/vendor?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
    return response.data;
  }
}
