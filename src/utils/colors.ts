export const generateColors = (count: number): string[] => {
  const colors: string[] = [];

  const goldenRatioConjugate = 0.618033988749895;

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatioConjugate) % 1;

    const color = hslToHex(hue, 0.5, 0.6);

    colors.push(color);
  }

  return colors;
};

function hslToHex(h: number, s: number, l: number): string {
  const hPrime = h * 6;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((hPrime % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (hPrime >= 0 && hPrime < 1) {
    r = c;
    g = x;
  } else if (hPrime >= 1 && hPrime < 2) {
    r = x;
    g = c;
  } else if (hPrime >= 2 && hPrime < 3) {
    g = c;
    b = x;
  } else if (hPrime >= 3 && hPrime < 4) {
    g = x;
    b = c;
  } else if (hPrime >= 4 && hPrime < 5) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, "0");
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${rHex}${gHex}${bHex}`;
}
