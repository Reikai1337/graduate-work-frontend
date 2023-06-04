import axios from "axios";

import {
  NovaPoshtaResponse,
  NovaPostOfficesResponse,
  NovaPostOfficesToInput,
  PoshtaAddressToInput
} from "./types";

const POSHTA_URL = "https://api.novaposhta.ua/v2.0/json/";

export const getNovaPoshtaCities = async (
  city: string
): Promise<PoshtaAddressToInput[]> => {
  const res = await axios.post<NovaPoshtaResponse>(POSHTA_URL, {
    apiKey: "b98ccface8e26e035dc5faae69aaac0b",
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
      CityName: city,
      Limit: "50",
      Page: "1",
    },
  });

  const result: PoshtaAddressToInput[] = [];

  res.data.data.forEach((data) => {
    data.Addresses.forEach((address) => {
      result.push({
        ...address,
        label: address.Present,
      });
    });
  });

  return result;
};
export const getNovaPoshtaPostOffices = async (
  cityRef: string
): Promise<NovaPostOfficesToInput[]> => {
  const res = await axios.post<NovaPostOfficesResponse>(POSHTA_URL, {
    apiKey: "b98ccface8e26e035dc5faae69aaac0b",
    modelName: "Address",
    calledMethod: "getWarehouses",
    methodProperties: {
      CityRef: cityRef,
    },
  });

  return res.data.data.map<NovaPostOfficesToInput>((item) => ({
    label: item.Description,
  }));
};
