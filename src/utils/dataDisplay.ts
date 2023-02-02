export function DataToSymbol(val: number) {
  if (val === 1) return "X";
  return "";
}

export function SymbolToData(symbol: string) {
  if (symbol === "X" || symbol === "x") return 1;
  return 0;
}
