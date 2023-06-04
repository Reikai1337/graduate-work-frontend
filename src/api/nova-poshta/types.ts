export type PoshtaAddress = {
  Present: string;
  Warehouses: 7;
  MainDescription: string;
  Area: string;
  Region: string;
  SettlementTypeCode: string;
  Ref: string;
  DeliveryCity: string;
  AddressDeliveryAllowed: true;
  StreetsAvailability: boolean;
  ParentRegionTypes: string;
  ParentRegionCode: string;
  RegionTypes: string;
  RegionTypesCode: string;
};

export type PoshtaAddressToInput = PoshtaAddress & {
  label: string;
};

export type NovaPoshtaResponse = {
  data: {
    TotalCount: number;
    Addresses: PoshtaAddress[];
  }[];
};

export type NovaPostOfficesResponse = {
  data: {
    Description: string;
  }[];
};

export type NovaPostOfficesToInput = {
  label: string;
};
