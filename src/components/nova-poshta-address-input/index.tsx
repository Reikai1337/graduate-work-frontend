import { ChangeEvent, FC, useEffect, useState } from "react";

import { Autocomplete, Stack, TextField } from "@mui/material";

import {
  getNovaPoshtaCities,
  getNovaPoshtaPostOffices
} from "../../api/nova-poshta";
import {
  NovaPostOfficesToInput,
  PoshtaAddressToInput
} from "../../api/nova-poshta/types";
import { useDebounce } from "../../hooks/useDebounce";

export type NovaPoshtaData = {
  city: string | null;
  address: string | null;
};

export type NovaPoshtaAddressInputProps = {
  onChange: (data: NovaPoshtaData) => void;
};

export const NovaPoshtaAddressInput: FC<NovaPoshtaAddressInputProps> = ({
  onChange,
}) => {
  const [searchCityValue, setSearchCityValue] = useState<string>("");
  const debouncedCityValue = useDebounce<string>(searchCityValue, 500);
  const [poshtaAddress, setPoshtaAddress] = useState<PoshtaAddressToInput[]>(
    []
  );
  const [selectedCity, setSelectedCity] = useState<PoshtaAddressToInput | null>(
    null
  );

  const [searchPostOfficesValue, setPostOfficesValue] = useState<string>("");
  const [postOffices, setPostOffices] = useState<NovaPostOfficesToInput[]>([]);
  const [selectedPostOffice, setSelectedPostOffice] =
    useState<NovaPostOfficesToInput | null>(null);

  const handleSearchCityValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchCityValue(event.target.value);
  };
  const handlePostOfficesValueChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPostOfficesValue(event.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getNovaPoshtaCities(debouncedCityValue);
      setPoshtaAddress(res);
    };
    fetch();
  }, [debouncedCityValue]);

  useEffect(() => {
    if (!selectedCity) {
      setPostOffices([]);
      setSelectedPostOffice(null);
      return;
    }
    const fetch = async () => {
      const res = await getNovaPoshtaPostOffices(selectedCity.DeliveryCity);
      setPostOffices(res);
    };
    fetch();
  }, [selectedCity]);

  return (
    <Stack spacing={1} direction="row">
      <Autocomplete
        disablePortal
        options={poshtaAddress}
        fullWidth
        size="small"
        value={selectedCity}
        onChange={(_e, v) => {
          setSelectedCity(v);
        }}
        noOptionsText="Міст не знайдено"
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleSearchCityValueChange}
            value={searchCityValue}
            label="Місто"
          />
        )}
      />
      <Autocomplete
        disablePortal
        options={postOffices}
        fullWidth
        size="small"
        value={selectedPostOffice}
        onChange={(_e, v) => {
          setSelectedPostOffice(v);
          onChange({
            address: v?.label || null,
            city: selectedCity?.Present || null,
          });
        }}
        noOptionsText="Відділень не знайдено"
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handlePostOfficesValueChange}
            value={searchPostOfficesValue}
            label="Відділення"
          />
        )}
      />
    </Stack>
  );
};
