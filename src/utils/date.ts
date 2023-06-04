export const formatDateToUkrainian = (
  dateString: string,
  withTime = false
): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(withTime
      ? {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZone: "UTC",
        }
      : {}),
  };
  const formatter = new Intl.DateTimeFormat("uk-UA", options);

  return formatter.format(date);
};
