export type UnitCategory =
  | "Length"
  | "Weight"
  | "Temperature"
  | "Area"
  | "Volume"
  | "Speed"
  | "Data Storage"
  | "Time"
  | "Pressure"
  | "Energy";

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  factorToBase: number; // Multiply by this to get base unit
}

export interface UnitCategoryData {
  baseUnit: string;
  units: UnitDefinition[];
}

export const UNIT_CATEGORIES: Record<UnitCategory, UnitCategoryData> = {
  Length: {
    baseUnit: "m",
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", factorToBase: 0.001 },
      { id: "cm", name: "Centimeter", symbol: "cm", factorToBase: 0.01 },
      { id: "m", name: "Meter", symbol: "m", factorToBase: 1 },
      { id: "km", name: "Kilometer", symbol: "km", factorToBase: 1000 },
      { id: "in", name: "Inch", symbol: "in", factorToBase: 0.0254 },
      { id: "ft", name: "Foot", symbol: "ft", factorToBase: 0.3048 },
      { id: "yd", name: "Yard", symbol: "yd", factorToBase: 0.9144 },
      { id: "mi", name: "Mile", symbol: "mi", factorToBase: 1609.344 },
      { id: "nmi", name: "Nautical Mile", symbol: "nmi", factorToBase: 1852 },
    ],
  },
  Weight: {
    baseUnit: "g",
    units: [
      { id: "mg", name: "Milligram", symbol: "mg", factorToBase: 0.001 },
      { id: "g", name: "Gram", symbol: "g", factorToBase: 1 },
      { id: "kg", name: "Kilogram", symbol: "kg", factorToBase: 1000 },
      { id: "oz", name: "Ounce", symbol: "oz", factorToBase: 28.349523125 },
      { id: "lb", name: "Pound", symbol: "lb", factorToBase: 453.59237 },
      { id: "stone", name: "Stone", symbol: "st", factorToBase: 6350.29318 },
      { id: "ton", name: "Metric Ton", symbol: "t", factorToBase: 1000000 },
    ],
  },
  Temperature: {
    baseUnit: "C",
    units: [
      { id: "c", name: "Celsius", symbol: "°C", factorToBase: 1 },
      { id: "f", name: "Fahrenheit", symbol: "°F", factorToBase: 1 },
      { id: "k", name: "Kelvin", symbol: "K", factorToBase: 1 },
    ],
  },
  Area: {
    baseUnit: "m2",
    units: [
      { id: "sqm", name: "Square Meter", symbol: "m²", factorToBase: 1 },
      { id: "sqkm", name: "Square Kilometer", symbol: "km²", factorToBase: 1000000 },
      { id: "sqft", name: "Square Foot", symbol: "sq ft", factorToBase: 0.09290304 },
      { id: "sqyd", name: "Square Yard", symbol: "sq yd", factorToBase: 0.83612736 },
      { id: "acre", name: "Acre", symbol: "ac", factorToBase: 4046.8564224 },
      { id: "ha", name: "Hectare", symbol: "ha", factorToBase: 10000 },
      { id: "sqmi", name: "Square Mile", symbol: "sq mi", factorToBase: 2589988.11 },
    ],
  },
  Volume: {
    baseUnit: "L",
    units: [
      { id: "ml", name: "Milliliter", symbol: "mL", factorToBase: 0.001 },
      { id: "l", name: "Liter", symbol: "L", factorToBase: 1 },
      { id: "m3", name: "Cubic Meter", symbol: "m³", factorToBase: 1000 },
      { id: "tsp", name: "Teaspoon (US)", symbol: "tsp", factorToBase: 0.00492892 },
      { id: "tbsp", name: "Tablespoon (US)", symbol: "tbsp", factorToBase: 0.0147868 },
      { id: "floz", name: "Fluid Ounce (US)", symbol: "fl oz", factorToBase: 0.0295735 },
      { id: "cup", name: "Cup (US)", symbol: "cup", factorToBase: 0.236588 },
      { id: "pt", name: "Pint (US)", symbol: "pt", factorToBase: 0.473176 },
      { id: "qt", name: "Quart (US)", symbol: "qt", factorToBase: 0.946353 },
      { id: "gal", name: "Gallon (US)", symbol: "gal", factorToBase: 3.78541 },
    ],
  },
  Speed: {
    baseUnit: "mps",
    units: [
      { id: "mps", name: "Meters per second", symbol: "m/s", factorToBase: 1 },
      { id: "kmh", name: "Kilometers per hour", symbol: "km/h", factorToBase: 0.277778 },
      { id: "mph", name: "Miles per hour", symbol: "mph", factorToBase: 0.44704 },
      { id: "knot", name: "Knot", symbol: "kn", factorToBase: 0.514444 },
      { id: "fps", name: "Feet per second", symbol: "ft/s", factorToBase: 0.3048 },
    ],
  },
  "Data Storage": {
    baseUnit: "B",
    units: [
      { id: "b", name: "Byte", symbol: "B", factorToBase: 1 },
      { id: "kb", name: "Kilobyte", symbol: "KB", factorToBase: 1024 },
      { id: "mb", name: "Megabyte", symbol: "MB", factorToBase: 1048576 },
      { id: "gb", name: "Gigabyte", symbol: "GB", factorToBase: 1073741824 },
      { id: "tb", name: "Terabyte", symbol: "TB", factorToBase: 1099511627776 },
      { id: "pb", name: "Petabyte", symbol: "PB", factorToBase: 1125899906842624 },
    ],
  },
  Time: {
    baseUnit: "s",
    units: [
      { id: "ms", name: "Millisecond", symbol: "ms", factorToBase: 0.001 },
      { id: "s", name: "Second", symbol: "s", factorToBase: 1 },
      { id: "min", name: "Minute", symbol: "min", factorToBase: 60 },
      { id: "h", name: "Hour", symbol: "h", factorToBase: 3600 },
      { id: "d", name: "Day", symbol: "d", factorToBase: 86400 },
      { id: "wk", name: "Week", symbol: "wk", factorToBase: 604800 },
      { id: "yr", name: "Year (Calendar)", symbol: "yr", factorToBase: 31536000 },
    ],
  },
  Pressure: {
    baseUnit: "Pa",
    units: [
      { id: "pa", name: "Pascal", symbol: "Pa", factorToBase: 1 },
      { id: "kpa", name: "Kilopascal", symbol: "kPa", factorToBase: 1000 },
      { id: "bar", name: "Bar", symbol: "bar", factorToBase: 100000 },
      { id: "psi", name: "Pounds per Square Inch", symbol: "psi", factorToBase: 6894.76 },
      { id: "atm", name: "Standard Atmosphere", symbol: "atm", factorToBase: 101325 },
      { id: "mmhg", name: "Millimeter of Mercury", symbol: "mmHg", factorToBase: 133.322 },
    ],
  },
  Energy: {
    baseUnit: "J",
    units: [
      { id: "j", name: "Joule", symbol: "J", factorToBase: 1 },
      { id: "kj", name: "Kilojoule", symbol: "kJ", factorToBase: 1000 },
      { id: "cal", name: "Calorie", symbol: "cal", factorToBase: 4.184 },
      { id: "kcal", name: "Kilocalorie", symbol: "kcal", factorToBase: 4184 },
      { id: "wh", name: "Watt-hour", symbol: "Wh", factorToBase: 3600 },
      { id: "kwh", name: "Kilowatt-hour", symbol: "kWh", factorToBase: 3600000 },
      { id: "btu", name: "British Thermal Unit", symbol: "BTU", factorToBase: 1055.06 },
    ],
  },
};

export interface ConversionResult {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  formula: string;
}

export function convertUnits(
  category: UnitCategory,
  value: number,
  fromId: string,
  toId: string
): ConversionResult {
  const safeValue = isNaN(value) ? 0 : value;

  // Temperature special case
  if (category === "Temperature") {
    let celsius = 0;
    if (fromId === "c") celsius = safeValue;
    else if (fromId === "f") celsius = ((safeValue - 32) * 5) / 9;
    else if (fromId === "k") celsius = safeValue - 273.15;

    let target = 0;
    let formula = "";
    if (toId === "c") {
      target = celsius;
      formula = fromId === "f" ? "(°F − 32) × 5/9" : fromId === "k" ? "K − 273.15" : "1 : 1";
    } else if (toId === "f") {
      target = (celsius * 9) / 5 + 32;
      formula = fromId === "c" ? "(°C × 9/5) + 32" : "(K − 273.15) × 9/5 + 32";
    } else if (toId === "k") {
      target = celsius + 273.15;
      formula = fromId === "c" ? "°C + 273.15" : "((°F − 32) × 5/9) + 273.15";
    }

    return {
      fromValue: safeValue,
      fromUnit: fromId.toUpperCase(),
      toValue: Number(target.toFixed(4)),
      toUnit: toId.toUpperCase(),
      formula,
    };
  }

  const catData = UNIT_CATEGORIES[category];
  const fromDef = catData?.units.find((u) => u.id === fromId) || catData?.units[0];
  const toDef = catData?.units.find((u) => u.id === toId) || catData?.units[1];

  const baseValue = safeValue * fromDef.factorToBase;
  const toValue = toDef.factorToBase !== 0 ? baseValue / toDef.factorToBase : 0;

  const ratio = fromDef.factorToBase / toDef.factorToBase;
  const formula = `Multiply by ${ratio >= 0.0001 ? Number(ratio.toPrecision(6)) : ratio.toExponential(4)}`;

  return {
    fromValue: safeValue,
    fromUnit: fromDef.symbol,
    toValue: Number(toValue.toFixed(6)),
    toUnit: toDef.symbol,
    formula,
  };
}
