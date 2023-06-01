import { Dayjs } from "dayjs";
import { FC, useState } from "react";

import { Button, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as BaseDatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useIsMobile } from "../../hooks/isMbile";

type DatePickerProps = {
  onSubmit: (first: Dayjs | null, second: Dayjs | null) => void;
};

export const DatePicker: FC<DatePickerProps> = ({ onSubmit }) => {
  const isMobile = useIsMobile();
  const [firstValue, setFirstValue] = useState<Dayjs | null>(null);
  const [secondValue, setSecondValue] = useState<Dayjs | null>(null);
  const [valid, setValid] = useState(true);

  const handleChange = (first: Dayjs | null, second: Dayjs | null) => {
    if (!first || !second) {
      setValid(false);
      return;
    }

    if (!first.isValid() || !second.isValid()) {
      setValid(false);
      return;
    }

    if (second.isBefore(first)) {
      setValid(false);
      return;
    }

    if (first.isSame(second)) {
      setValid(false);
      return;
    }

    setValid(true);
  };

  return (
    <Stack
      spacing={1}
      direction={isMobile ? "column" : "row"}
      alignItems="center"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <BaseDatePicker
            value={firstValue}
            onChange={(newValue) => {
              handleChange(newValue, secondValue);
              setFirstValue(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <BaseDatePicker
            value={secondValue}
            onChange={(newValue) => {
              handleChange(firstValue, newValue);
              setSecondValue(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        disabled={!valid || !firstValue || !secondValue}
        variant="outlined"
        onClick={() => {
          onSubmit(firstValue, secondValue);
        }}
      >
        Показати
      </Button>
    </Stack>
  );
};
