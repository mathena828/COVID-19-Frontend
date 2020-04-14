const REGIONS = [
  {
    value: "NCR",
    label: "National Capital Region",
  },
  {
    value: "Region I",
    label: "Ilocos Region",
  },
  {
    value: "CAR",
    label: "Cordillera Administrative Region",
  },
  {
    value: "Region II",
    label: "Cagayan Valley",
  },
  {
    value: "Region III",
    label: "Central Luzon",
  },
  {
    value: "Region IV-A",
    label: "Calabarzon",
  },
  {
    value: "Mimaropa",
    label: "Southwestern Tagalog Region",
  },
  {
    value: "Region V",
    label: "Bicol Region",
  },
  {
    value: "Region VI",
    label: "Western Visayas",
  },
  {
    value: "Region VII",
    label: "Central Visayas",
  },
  {
    value: "Region VIII",
    label: "Eastern Visayas",
  },
  {
    value: "Region IX",
    label: "Zamboanga Peninsula",
  },
  {
    value: "Region X",
    label: "Northern Mindanao",
  },
  {
    value: "Region XI",
    label: "Davao Region",
  },
  {
    value: "Region XII",
    label: "Soccsksargen",
  },
  {
    value: "Region XIII",
    label: "Caraga Region",
  },
  {
    value: "BARMM",
    label: "Bangsamoro Autonomous Region in Muslim Mindanao",
  },
];

const UNITS = [
  {
    value: "unit",
    label: "unit",
  },
  {
    value: "kg",
    label: "kilogram",
  },
  {
    value: "g",
    label: "gram",
  },
  {
    value: "l",
    label: "liter",
  },
  {
    value: "ml",
    label: "milliliter",
  },
  {
    value: "m",
    label: "meter",
  },
];

const SANITIZE_HTML_OPTIONS = {
  allowedTags: [],
  allowedAttributes: []
};

const MODEL_VALIDATION = {
  MAX_NAME_ADDRESS: 128,
  MAX_PRICE_DIGITS: 8,
  MAX_PRICE_DP: 2,
};

export default {
  SANITIZE_HTML_OPTIONS,
  MODEL_VALIDATION,
  REGIONS,
  UNITS,
}
