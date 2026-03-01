// Mapeamento de valores para links de pagamento
export const PAYMENT_LINKS: Record<number, string> = {
  300: "https://mpago.li/14hoE1Q",
  350: "https://mpago.li/1B5PM98",
  400: "https://mpago.li/1yYJs3S",
  450: "https://mpago.li/2HUReus",
  500: "https://mpago.li/1TKRZfo",
  550: "https://mpago.li/1ed4RJQ",
  600: "https://mpago.li/1vH8qu2",
  650: "https://mpago.li/11VL5yS",
  700: "https://mpago.li/1UHqpai",
  750: "https://mpago.li/26rRoSa",
  800: "https://mpago.li/2dPppU9",
  850: "https://mpago.li/2Z82ucX",
  900: "https://mpago.li/2gp49gv",
  950: "https://mpago.li/1HB123J",
  1000: "https://mpago.li/2vgKxEd",
  1050: "https://mpago.li/2hKq7NZ",
  1100: "https://mpago.li/2qi31aD",
  1150: "https://mpago.li/1bMBoDn",
  1200: "https://mpago.li/2JjjMn7",
  1250: "https://mpago.li/1jmZ5to",
  1300: "https://mpago.li/2r2Y5o6",
  1350: "https://mpago.li/1GebEBx",
  1400: "https://mpago.li/31iAFDi",
  1450: "https://mpago.li/2GTngwt",
  1500: "https://mpago.li/2Y5AKiA",
  1550: "https://mpago.li/2ePR9M9",
  1600: "https://mpago.li/1ZV7J5",
  1650: "https://mpago.li/2NQc1rX",
  1700: "https://mpago.li/1Ci6VfE",
  1750: "https://mpago.li/1v5QAHR",
  1800: "https://mpago.li/1oanyYB",
  1850: "https://mpago.li/2BUNTh4",
  1900: "https://mpago.li/2xLXU5v",
  1950: "https://mpago.li/1TPBcNf",
  2000: "https://mpago.li/1iSFRe3",
  2050: "https://mpago.li/1ARmSBB",
  2100: "https://mpago.li/2fh8DVV",
  2150: "https://mpago.li/2Y4d56w",
  2200: "https://mpago.li/1H6UsBe",
  2250: "https://mpago.li/1kfGTuZ",
  2300: "https://mpago.li/18TZiVv",
  2350: "https://mpago.li/1ToD4mH",
  2400: "https://mpago.li/2uwvfMp",
  2450: "https://mpago.li/1J1FN97",
  2500: "https://mpago.li/2mNnHoK",
  2550: "https://mpago.li/1TXK9Wp",
  2600: "https://mpago.li/2VVCYKL",
  2650: "https://mpago.li/2HA34RX",
  2700: "https://mpago.li/25J5arL",
  2750: "https://mpago.li/2hPFnRp",
  2800: "https://mpago.li/1pjBJp9",
  2850: "https://mpago.li/2FX8iPh",
  2900: "https://mpago.li/2AhUpSV",
  2950: "https://mpago.li/2xJmcCF",
  3000: "https://mpago.li/2xbRuqj",
};

export function getPaymentLink(amount: number): string | null {
  // Procura por um link exato
  if (PAYMENT_LINKS[amount]) {
    return PAYMENT_LINKS[amount];
  }
  
  // Se não encontrar um link exato, retorna null
  return null;
}
