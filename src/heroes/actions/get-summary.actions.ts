import { heroApi } from "../api/hero.api";
import type { SummaryInformationResponse } from "../pages/hero/types/summary-information.response";

export const getSummary = async () => {
  const { data } = await heroApi.get<SummaryInformationResponse>("/summary");
  return data;
};
