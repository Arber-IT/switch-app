// logics.js

const unitData = {
    prefixes: {
        base: "",
        units: [
            {value: "p", label: "Pico", factor: 1e-12},
            {value: "n", label: "Nano", factor: 1e-9},
            {value: "µ", label: "Micro", factor: 1e-6},
            {value: "m", label: "Milli", factor: 1e-3},
            {value: "c", label: "Centi", factor: 1e-2},
            {value: "d", label: "Deci", factor: 1e-1},
            {value: "da", label: "Deca", factor: 1e1},
            {value: "h", label: "Hecto", factor: 1e2},
            {value: "k", label: "Kilo", factor: 1e3},
            {value: "M", label: "Mega", factor: 1e6},
            {value: "G", label: "Giga", factor: 1e9},
            {value: "T", label: "Tera", factor: 1e12}
        ]
    },

    length: {
        base: "m", // we'll convert everything relative to meters
        units: [
            {value: "mm", label: "Millimeters (mm)", factor: 0.001},
            {value: "cm", label: "Centimeters (cm)", factor: 0.01},
            {value: "dm", label: "Decimeters (dm)", factor: 0.1},
            {value: "m", label: "Meters (m)", factor: 1},
            {value: "km", label: "Kilometers (km)", factor: 1000},
            {value: "in", label: "Inches (in)", factor: 0.0254},
            {value: "ft", label: "Feet (ft)", factor: 0.3048},
            {value: "yd", label: "Yards (yd)", factor: 0.9144},
            {value: "mi", label: "Miles (mi)", factor: 1609.344},
            {value: "ly", label: "Light-years (ly)", factor: 9.46073e15}
        ]
    },

    astronomicalLength: {
        base: "ly",
        units: [
            {value: "ls", label: "Light-second (ls)", factor: 3.168808781e-8},
            {value: "lm", label: "Light-minute (lm)", factor: 1.90128527e-6},
            {value: "lh", label: "Light-hour (lh)", factor: 1.14077e-4},
            {value: "ld", label: "Light-day (ld)", factor: 2.73791e-3},
            {value: "ly", label: "Light-year (ly)", factor: 1},
            {value: "kly", label: "Kilolight-year (kly)", factor: 1e3},
            {value: "Mly", label: "Megalight-year (Mly)", factor: 1e6},
            {value: "Gly", label: "Gigalight-year (Gly)", factor: 1e9},
            {value: "AU", label: "Astronomical Unit (AU)", factor: 1.58125e-5},
            {value: "pc", label: "Parsec (pc)", factor: 3.26156}
        ]
    },

    angle: {
        base: "rad", // radian as the base unit
        units: [
            {value: "rad", label: "Radian (rad)", factor: 1},
            {value: "deg", label: "Degree (°)", factor: Math.PI / 180}, // 1° = π/180 rad
            {value: "arcmin", label: "Arcminute (′)", factor: Math.PI / 10800}, // 1′ = 1/60° = π/10800 rad
            {value: "arcsec", label: "Arcsecond (″)", factor: Math.PI / 648000}   // 1″ = 1/60′ = π/648000 rad
        ]
    },

    acceleration: {
        base: "m/s²",
        units: [
            {value: "m/s²", label: "Meters per second squared (m/s²)", factor: 1},
            {value: "km/s²", label: "Kilometers per second squared (km/s²)", factor: 1e-3},
            {value: "ft/s²", label: "Feet per second squared (ft/s²)", factor: 0.3048},
            {value: "yd/s²", label: "Yards per second squared (yd/s²)", factor: 0.9144},
            {value: "g", label: "Earth gravity (g)", factor: 9.80665}
        ]
    },

    area: {
        base: "m²",
        units: [
            {value: "mm²", label: "Square millimeters (mm²)", factor: 1e-6},
            {value: "cm²", label: "Square centimeters (cm²)", factor: 1e-4},
            {value: "dm²", label: "Square decimeters (dm²)", factor: 1e-2},
            {value: "m²", label: "Square meters (m²)", factor: 1},
            {value: "ha", label: "Hectares (ha)", factor: 10000},
            {value: "km²", label: "Square kilometers (km²)", factor: 1e6},
            {value: "in²", label: "Square inches (in²)", factor: 0.00064516},
            {value: "ft²", label: "Square feet (ft²)", factor: 0.092903}
        ]
    },

    volume: {
        base: "m³",
        units: [
            {value: "ml", label: "Milliliters (mL)", factor: 1e-6},
            {value: "l", label: "Liters (L)", factor: 0.001},
            {value: "m³", label: "Cubic meters (m³)", factor: 1},
            {value: "gal", label: "Gallons (US gal)", factor: 0.00378541},
            {value: "fl oz", label: "Fluid ounces (US)", factor: 2.95735e-5}
        ]
    },

    mass: {// renamed from "weight" for correctness
        base: "kg",
        units: [
            {value: "mg", label: "Milligrams (mg)", factor: 1e-6},
            {value: "g", label: "Grams (g)", factor: 0.001},
            {value: "µg", label: "Microgram (µg)", factor: 1e-9},
            {value: "kg", label: "Kilograms (kg)", factor: 1},
            {value: "t", label: "Metric tons (t)", factor: 1000},
            {value: "oz", label: "Ounces (oz)", factor: 0.0283495},
            {value: "lb", label: "Pounds (lb)", factor: 0.453592}
        ]
    },

    force: {
        base: "N", // Newton as base unit
        units: [
            {value: "N", label: "Newton (N)", factor: 1},
            {value: "kN", label: "Kilonewton (kN)", factor: 1000},
            {value: "MN", label: "Meganewton (MN)", factor: 1000000},
            {value: "dyne", label: "Dyne (dyne)", factor: 1e-5}, // 1 dyne = 1e-5 N
            {value: "kgf", label: "Kilogram-force (kgf)", factor: 9.80665}, // 1 kgf ≈ 9.80665 N
            {value: "lbf", label: "Pound-force (lbf)", factor: 4.44822}     // 1 lbf ≈ 4.44822 N
        ]
    },

    work: {
        base: "J", // Joule as base unit
        units: [
            {value: "J", label: "Joule (J)", factor: 1},
            {value: "N·m", label: "Newton meter (N·m)", factor: 1}, // 1 N·m = 1 J
            {value: "kJ", label: "Kilojoule (kJ)", factor: 1000}, // 1 kJ = 1000 J
            {value: "cal", label: "Calorie (cal)", factor: 4.184}, // 1 cal ≈ 4.184 J
            {value: "kcal", label: "Kilocalorie (kcal)", factor: 4184}, // 1 kcal ≈ 4184 J
            {value: "Wh", label: "Watt-hour (Wh)", factor: 3600}, // 1 Wh = 3600 J
            {value: "BTU", label: "British Thermal Unit (BTU)", factor: 1055.06},
            {value: "BTUh", label: "BTU per hour (BTU/h)", factor: 0.293071}, // 1 BTU/h ≈ 0.293071 W for power
            {value: "eV", label: "Electronvolt (eV)", factor: 1.602e-19}, // 1 eV ≈ 1.602×10⁻¹⁹ J
            {value: "therm", label: "Therm", factor: 105500000}, // 1 therm ≈ 105.5 MJ
            {value: "ftlb", label: "Foot-pound (ft·lb)", factor: 1.35582} // 1 ft·lb ≈ 1.35582 J
        ]
    },

    power: {
        base: "W", // Watt as base unit
        units: [
            {value: "W", label: "Watt (W)", factor: 1},
            {value: "kW", label: "Kilowatt (kW)", factor: 1000}, // 1 kW = 1000 W
            {value: "MW", label: "Megawatt (MW)", factor: 1000000}, // 1 MW = 1,000,000 W
            {value: "PS", label: "Metric horsepower (PS)", factor: 735.49875}, // 1 PS ≈ 735.5 W
            {value: "hp", label: "Mechanical horsepower (hp)", factor: 745.7}   // 1 hp ≈ 745.7 W
        ]
    },

    time: {
        base: "s", // seconds as the base unit
        units: [
            {value: "ns", label: "Nanosecond (ns)", factor: 1e-9},
            {value: "µs", label: "Microsecond (µs)", factor: 1e-6},
            {value: "ms", label: "Millisecond (ms)", factor: 0.001},
            {value: "cs", label: "Centisecond (0.01 s)", factor: 0.01},
            {value: "ds", label: "Decisecond (0.1 s)", factor: 0.1},
            {value: "s", label: "Second (s)", factor: 1},
            {value: "min", label: "Minute (min)", factor: 60},
            {value: "h", label: "Hour (h)", factor: 3600}, // 60*60
            {value: "day", label: "Day", factor: 86400}, // 24*3600
            {value: "week", label: "Week", factor: 604800}, // 7*86400
            {value: "month", label: "Month", factor: 2629800}, // average month ≈ 30.44 days
            {value: "year", label: "Year", factor: 31557600}, // 365.25 days
            {value: "decade", label: "Decade", factor: 315576000}, // 10 years
            {value: "century", label: "Century", factor: 3155760000}, // 100 years
            {value: "millennium", label: "Millennium", factor: 31557600000} // 1000 years
        ]
    },

    speed: {
        base: "m/s",
        units: [
            {value: "cm/s", label: "Centimeters per second (cm/s)", factor: 0.01}, // 1 cm/s = 0.01 m/s
            {value: "mm/s", label: "Millimeters per second (mm/s)", factor: 0.001},
            {value: "m/s", label: "Meters per second (m/s)", factor: 1},
            {value: "km/h", label: "Kilometers per hour (km/h)", factor: 0.277778},
            {value: "mps", label: "Miles per second (mps)", factor: 1609.344},
            {value: "ft/s", label: "Feet per second (ft/s)", factor: 0.3048}, // 1 ft = 0.3048 m
            {value: "in/s", label: "Inches per second (in/s)", factor: 0.0254},
            {value: "mph", label: "Miles per hour (mph)", factor: 0.44704},
            {value: "kn", label: "Knots (kn)", factor: 0.514444}
        ]
    },

    temperature: {
        // Special case — no linear factor → we handle separately
        units: [
            {value: "C", label: "Celsius (°C)"},
            {value: "F", label: "Fahrenheit (°F)"},
            {value: "K", label: "Kelvin (K)"}
        ]
    },

    pressure: {
        base: "Pa", // Pascal as the base unit
        units: [
            {value: "Pa", label: "Pascal (Pa)", factor: 1},
            {value: "kPa", label: "Kilopascal (kPa)", factor: 1000}, // 1 kPa = 1,000 Pa
            {value: "MPa", label: "Megapascal (MPa)", factor: 1000000}, // 1 MPa = 1,000,000 Pa
            {value: "torr", label: "Torr", factor: 133.322}, // 1 torr ≈ 133.322 Pa
            {value: "bar", label: "Bar", factor: 100000}, // 1 bar = 100,000 Pa
            {value: "atm", label: "Atmosphere (atm)", factor: 101325}, // 1 atm = 101,325 Pa
            {value: "mmHg", label: "Millimeter of Mercury (mmHg)", factor: 133.322}, // 1 mmHg ≈ 133.322 Pa
            {value: "psi", label: "Pound per square inch (psi)", factor: 6894.76}    // 1 psi ≈ 6,894.76 Pa
        ]
    },

    digital: {
        base: "bit",
        units: [
            {value: "bit", label: "Bits", factor: 1},
            {value: "byte", label: "Bytes", factor: 8},
            {value: "kb", label: "Kilobits", factor: 1000},
            {value: "kB", label: "Kilobytes", factor: 8000},
            {value: "mb", label: "Megabits", factor: 1e6},
            {value: "mB", label: "Megabytes", factor: 8e6},
            {value: "gb", label: "Gigabits", factor: 1e9},
            {value: "gB", label: "Gigabytes", factor: 8e9}
        ]
    },

    electric: {
        base: "V", // Volt as base unit for electric potential
        units: [
            {value: "V", label: "Volt (V)", factor: 1}, // electric potential
            {value: "mV", label: "Millivolt (mV)", factor: 0.001}, // 1 mV = 0.001 V
            {value: "kV", label: "Kilovolt (kV)", factor: 1000}, // 1 kV = 1000 V
            {value: "A", label: "Ampere (A)", factor: 1}, // current
            {value: "mA", label: "Milliampere (mA)", factor: 0.001}, // 1 mA = 0.001 A
            {value: "kA", label: "Kiloampere (kA)", factor: 1000}, // 1 kA = 1000 A
            {value: "Ω", label: "Ohm (Ω)", factor: 1}, // resistance
            {value: "kΩ", label: "Kiloohm (kΩ)", factor: 1000}, // 1 kΩ = 1000 Ω
            {value: "MΩ", label: "Megaohm (MΩ)", factor: 1000000}, // 1 MΩ = 1,000,000 Ω
            {value: "F", label: "Farad (F)", factor: 1}, // capacitance
            {value: "mF", label: "Millifarad (mF)", factor: 0.001}, // 1 mF = 0.001 F
            {value: "H", label: "Henry (H)", factor: 1}, // inductance
            {value: "mH", label: "Millihenry (mH)", factor: 0.001}, // 1 mH = 0.001 H
            {value: "kH", label: "Kilohenry (kH)", factor: 1000}        // 1 kH = 1000 H
        ]
    },

    currency: {
        base: "EUR",
        units: [
            {value: "EUR", label: "Euro (EUR)", factor: 1},
            {value: "AUD", label: "Australian Dollar (AUD)", factor: 1 / 1.72},
            {value: "CAD", label: "Canadian Dollar (CAD)", factor: 1 / 1.62},
            {value: "USD", label: "US Dollar (USD)", factor: 1 / 1.19},
            {value: "BRL", label: "Brazilian Real (BRL)", factor: 1 / 6.25},
            {value: "GBP", label: "British Pound (GBP)", factor: 1 / 0.87},
            {value: "JPY", label: "Japanese Yen (JPY)", factor: 1 / 132},
            {value: "CNY", label: "Renminbi Yuan (CNY)", factor: 1 / 8.33},
            {value: "CHF", label: "Swiss Franc (CHF)", factor: 1 / 0.93},
            "",
            {value: "", label: "EUROPE", factor: 1, disabled: true},
            {value: "ALL", label: "Albanian Lek (ALL)", factor: 1 / 96.65},
            {value: "BAM", label: "Convertible Mark (BAM)", factor: 1 / 1.96},
            {value: "DKK", label: "Danish Krone (DKK)", factor: 1 / 7.47},
            {value: "HUF", label: "Forint (HUF)", factor: 1 / 380.86},
            {value: "ISK", label: "Island Krone (ISK)", factor: 1 / 145},
            {value: "UAH", label: "Hrywnja (UAH)", factor: 1 / 51.16},
            {value: "MKD", label: "Macedonian Denar (MKD)", factor: 1 / 61.64},
            {value: "MDL", label: "Moldovian Leu (MDL)", factor: 1 / 20.1},
            {value: "NOK", label: "Norway Krone (NOK)", factor: 1 / 11.4},
            {value: "RON", label: "Romanian Leu (RON)", factor: 1 / 5.1},
            {value: "RUB", label: "Russian Rubel (RUB)", factor: 1 / 90.3},
            {value: "SEK", label: "Sweden Krone (SEK)", factor: 1 / 10.6},
            {value: "RSD", label: "Serbian Dinar (RSD)", factor: 1 / 117.4},
            {value: "CZK", label: "Czech Krone (CZK)", factor: 1 / 24.33},
            {value: "BYN", label: "Belarus Rubel (BYN)", factor: 1 / 3.4},
            {value: "PLN", label: "Złoty (PLN)", factor: 1 / 4.2},
            "",
            {value: "", label: "AMERICA", factor: 1, disabled: true},
            {value: "CAD", label: "Canadian Dollar (CAD)", factor: 1 / 1.62},
            {value: "USD", label: "US Dollar (USD)", factor: 1 / 1.19},
            {value: "ARS", label: "Argentinian Peso (ARS)", factor: 1 / 1716.51},
            {value: "AWG", label: "Aruba-Florin (AWG)", factor: 1 / 2.15},
            {value: "BSD", label: "Bahama-Dollar (BSD)", factor: 1 / 1.19},
            {value: "BBD", label: "Barbados-Dollar (BBD)", factor: 1 / 2.40},
            {value: "BZD", label: "Belize-Dollar (BZD)", factor: 1 / 2.39},
            {value: "BMD", label: "Bermuda-Dollar (BMD)", factor: 1 / 1.19},
            {value: "BOB", label: "Boliviano (BOB)", factor: 1 / 8.22},
            {value: "BRL", label: "Brazilian Real (BRL)", factor: 1 / 6.25},
            {value: "XCG", label: "Caribbean Gulden (XCG)", factor: 1 / 2.16},
            {value: "KYD", label: "Cayman-Dollar (KYD)", factor: 1},
            {value: "CLP", label: "Chil. Peso (CLP)", factor: 1 / 1033.35},
            {value: "COP", label: "Columbia-Peso (COP)", factor: 1 / 4374},
            {value: "CRC", label: "Costa-Rica-Colón (CRC)", factor: 1 / 591},
            {value: "NIO", label: "Córdoba Oro (NIO)", factor: 1 / 44.04},
            {value: "DOP", label: "Dominican Peso (DOP)", factor: 1 / 75.3},
            {value: "XCD", label: "East-Caribbean Dollar (XCD)", factor: 1 / 3.23},
            {value: "SVC", label: "El-Salvador-Colón (SVC)", factor: 1 / 10.47},
            {value: "GTQ", label: "Guatemala Quetzal (GTQ)", factor: 1 / 9.2},
            {value: "GYD", label: "Guyana-Dollar (GYD)", factor: 1 / 250.4},
            {value: "JMD", label: "Jamaica-Dollar (JMD)", factor: 1 / 187.6},
            {value: "HNL", label: "Lempira (HNL)", factor: 1 / 31.6},
            {value: "MXN", label: "Mexican Peso (MXN)", factor: 1 / 20.52},
            {value: "PAB", label: "Panama Balboa (PAB)", factor: 1 / 1.2},
            {value: "PYG", label: "Paraguay Guaraní (PYG)", factor: 1 / 8017},
            {value: "PEN", label: "Peruan Sol (PEN)", factor: 1 / 4},
            {value: "SRD", label: "Suriname-Dollar (SRD)", factor: 1 / 45.5},
            {value: "TTD", label: "Trinidad-and-Tobago-Dollar (TTD)", factor: 1 / 8.11},
            {value: "UYU", label: "Uruguay Peso (UYU)", factor: 1 / 45.2},
            {value: "VES", label: "Venezuela Bolívar (VES)", factor: 1 / 425.6},
            "",
            {value: "", label: "ASIA", factor: 1, disabled: true},
            {value: "AFN", label: "Afghani (AFN)", factor: 1 / 78.70},
            {value: "AMD", label: "Armenian Dram (AMD)", factor: 1 / 450.70},
            {value: "AUD", label: "Australian Dollar (AUD)", factor: 1 / 1.72},
            {value: "AZN", label: "Azerbaidjan Manat (AZN)", factor: 1 / 2.02},
            {value: "BHD", label: "Bahrain-Dinar (BHD)", factor: 1 / 0.45},
            {value: "THB", label: "Baht (THB)", factor: 1 / 37.12},
            {value: "BND", label: "Brunei-Dollar (BND)", factor: 1 / 1.51},
            {value: "KHR", label: "Cambodian Riel (KHR)", factor: 1 / 4811},
            {value: "AED", label: "Emirati-Dirham (AED)", factor: 1 / 4.4},
            {value: "FJD", label: "Fidji-Dollar (FJD)", factor: 1 / 2.63},
            {value: "GEL", label: "Georgian Lari (GEL)", factor: 1 / 3.23},
            {value: "HTG", label: "Gourde (HTG)", factor: 1 / 156.73},
            {value: "HKD", label: "Hongkong-Dollar (HKD)", factor: 1 / 9.3},
            {value: "INR", label: "Indian Rupie (INR)", factor: 1 / 109.95},
            {value: "IDR", label: "Indonesian Rupiah (IDR)", factor: 1 / 20052},
            {value: "IQD", label: "Irakian Dinar (IQD)", factor: 1 / 1567.8},
            {value: "IRR", label: "Iranian Rial (IRR)", factor: 1 / 1304525.50},
            {value: "JPY", label: "Japanese Yen (JPY)", factor: 1 / 132},
            {value: "YER", label: "Jemen-Rial (YER)", factor: 1 / 285.4},
            {value: "JOD", label: "Jordanian Dinar (JOD)", factor: 1 / 0.85},
            {value: "PGK", label: "Kina (PGK)", factor: 1 / 5.1},
            {value: "KWD", label: "Kuwait-Dinar (KWD)", factor: 1 / 0.37},
            {value: "QAR", label: "Qatar-Riyal (QAR)", factor: 1 / 4.35},
            {value: "LAK", label: "Laos Kip (LAK)", factor: 1 / 25784},
            {value: "LBP", label: "Lebanon Pound (LBP)", factor: 1 / 107173.4},
            {value: "MOP", label: "Macau-Pataca (MOP)", factor: 1 / 9.6},
            {value: "MYR", label: "Malaysian Ringgit (MYR)", factor: 1 / 4.69},
            {value: "NPR", label: "Nepal Rupie (NPR)", factor: 1 / 175.9},
            {value: "TWD", label: "Taiwan-Dollar (TWD)", factor: 1 / 37.5},
            {value: "NZD", label: "Neuseeland-Dollar (NZD)", factor: 1 / 1.97},
            {value: "BTN", label: "Ngultrum (BTN)", factor: 1 / 109.9},
            {value: "OMR", label: "Oman Rial (OMR)", factor: 1 / 0.46},
            {value: "PKR", label: "Pakistan Rupie (PKR)", factor: 1 / 334.2},
            {value: "PHP", label: "Philippines Peso (PHP)", factor: 1 / 70.5},
            {value: "CNY", label: "Renminbi Yuan (CNY)", factor: 1 / 8.33},
            {value: "MVR", label: "Rufiyaa (MVR)", factor: 1 / 18.6},
            {value: "SBD", label: "Solomonian-Dollar (SBD)", factor: 1 / 9.7},
            {value: "SAR", label: "Saudi-Riyal (SAR)", factor: 1 / 4.5},
            {value: "ILS", label: "Shekel (ILS)", factor: 1 / 3.7},
            {value: "SCR", label: "Seychelles-Rupie (SCR)", factor: 1 / 16.83},
            {value: "SGD", label: "Singapore-Dollar (SGD)", factor: 1 / 1.5},
            {value: "KGS", label: "Som (KGS)", factor: 1 / 104.6},
            {value: "TJS", label: "Somoni (TJS)", factor: 1 / 11.16},
            {value: "UZS", label: "Soʻm (UZS)", factor: 1 / 14538},
            {value: "LKR", label: "Sri-Lanka-Rupie (LKR)", factor: 1 / 369.6},
            {value: "SDG", label: "Sudan Pound (SDG)", factor: 1 / 720.4},
            {value: "KRW", label: "Sth. Korea Won (KRW)", factor: 1 / 1712.6},
            {value: "BDT", label: "Taka (BDT)", factor: 1 / 146},
            {value: "KZT", label: "Tenge (KZT)", factor: 1 / 600.2},
            {value: "TND", label: "Tunesia Dinar (TND)", factor: 1 / 3.4},
            {value: "TMT", label: "Turkmenistan-Manat (TMT)", factor: 1 / 4.2},
            {value: "TRY", label: "Turkish Lira (TRY)", factor: 1 / 52},
            {value: "VND", label: "Viet Nam Đồng (VND)", factor: 1 / 31063},
            "",
            {value: "", label: "AFRICA", factor: 1, disabled: true},
            {value: "DZD", label: "Algerian Dinar (DZD)", factor: 1 / 153.90},
            {value: "MGA", label: "Ariary (MGA)", factor: 1 / 5340},
            {value: "BWP", label: "Botswana Pula (BWP)", factor: 1 / 15.66},
            {value: "BIF", label: "Burundi-Franc (BIF)", factor: 1 / 3523.50},
            {value: "CVE", label: "Cape-Verde-Escudo (CVE)", factor: 1 / 110.26},
            {value: "XOF", label: "CFA-Franc (XOF)", factor: 1 / 656},
            {value: "XPF", label: "CFP-Franc (XPF)", factor: 1 / 119.26},
            {value: "GHS", label: "Cedi (GHS)", factor: 1 / 13},
            {value: "GMD", label: "Dalasi (GMD)", factor: 1 / 87.19},
            {value: "DJF", label: "Djibuti-Franc (DJF)", factor: 1 / 213.12},
            {value: "EGP", label: "Egypt Pound (EGP)", factor: 1 / 56},
            {value: "ETB", label: "Ethiopia Birr (ETB)", factor: 1 / 185.6},
            {value: "GNF", label: "Guinea-Franc (GNF)", factor: 1 / 10502},
            {value: "KES", label: "Kenia-Schilling (KES)", factor: 1 / 154.3},
            {value: "KMF", label: "Comoros-Franc (KMF)", factor: 1 / 492.2},
            {value: "CDF", label: "Congo-Franc (CDF)", factor: 1 / 2750},
            {value: "AOA", label: "Kwanza (AOA)", factor: 1 / 1097.5},
            {value: "SLE", label: "Leone (SLE)", factor: 1 / 29.1},
            {value: "LSL", label: "Lesotho Loti (LSL)", factor: 1 / 19},
            {value: "LRD", label: "Liberian Dollar (LRD)", factor: 1 / 221.4},
            {value: "LYD", label: "Libyan Dinar (LYD)", factor: 1 / 7.52},
            {value: "SZL", label: "Lilangeni (SZL)", factor: 1 / 19},
            {value: "MWK", label: "Malawi-Kwacha (MWK)", factor: 1 / 2075.30},
            {value: "MUR", label: "Mauritius-Rupie (MUR)", factor: 1 / 54},
            {value: "MZN", label: "Metical (MZN)", factor: 1 / 76.35},
            {value: "MAD", label: "Morocco Dirham (MAD)", factor: 1 / 10.8},
            {value: "NGN", label: "Naira (NGN)", factor: 1 / 1671.2},
            {value: "NAD", label: "Namibia-Dollar (NAD)", factor: 1 / 19.03},
            {value: "MRU", label: "Ouguiya (MRU)", factor: 1 / 47.66},
            {value: "RWF", label: "Rwanda-Franc (RWF)", factor: 1 / 1743.1},
            {value: "SOS", label: "Somalia-Schilling (SOS)", factor: 1 / 681.6},
            {value: "ZAR", label: "Sth. Africa Rand (ZAR)", factor: 1 / 18.8},
            {value: "TZS", label: "Tanzania-Schilling (TZS)", factor: 1 / 3058.5},
            {value: "UGX", label: "Uganda-Schilling (UGX)", factor: 1 / 4250},
            {value: "ZMW", label: "Zambia Kwacha (ZMW)", factor: 1 / 23.6}
        ]
    },

    timezones: {
        base: "",
        units: [
            {value: "TZ 0", label: "UTC+-0 / London", factor: 0},
            {value: "TZ01", label: "UTC+01 / Berlin", factor: 1},
            {value: "TZ02", label: "UTC+02 / Athens", factor: 2},
            {value: "TZ03", label: "UTC+03 / Moscow", factor: 3},
            {value: "TZ04", label: "UTC+04 / Dubai", factor: 4},
            {value: "TZ05", label: "UTC+05 / Karachi", factor: 5},
            {value: "TZ06", label: "UTC+06 / Almaty", factor: 6},
            {value: "TZ07", label: "UTC+07 / Bangkok", factor: 7},
            {value: "TZ08", label: "UTC+08 / Beijing", factor: 8},
            {value: "TZ09", label: "UTC+09 / Tokyo", factor: 9},
            {value: "TZ10", label: "UTC+10 / Sydney", factor: 10},
            {value: "TZ11", label: "UTC+11 / Noumea", factor: 11},
            {value: "TZ12", label: "UTC+12 / Auckland", factor: 12},
            {value: "TZ13", label: "UTC-11 / Niue", factor: 13},
            {value: "TZ14", label: "UTC-10 / Honolulu", factor: 14},
            {value: "TZ15", label: "UTC-09 / Anchorage", factor: 15},
            {value: "TZ16", label: "UTC-08 / Los Angeles", factor: 16},
            {value: "TZ17", label: "UTC-07 / Denver", factor: 17},
            {value: "TZ18", label: "UTC-06 / Chicago", factor: 18},
            {value: "TZ19", label: "UTC-05 / New York", factor: 19},
            {value: "TZ20", label: "UTC-04 / Santiago", factor: 20},
            {value: "TZ21", label: "UTC-03 / Buenos Aires", factor: 21},
            {value: "TZ22", label: "UTC-02 / South Georgia", factor: 22},
            {value: "TZ23", label: "UTC-01 / Azores", factor: 23}
        ]
    }

};

const categorySelect = document.getElementById("category");
const fromSelect = document.getElementById("fromunit");
const toSelect = document.getElementById("tounit");

function populateUnits() {
    const cat = categorySelect.value;

    // Clear both dropdowns
    fromSelect.innerHTML = '<option value="">Select unit</option>';
    toSelect.innerHTML = '<option value="">Select unit</option>';

    if (!cat || !unitData[cat])
        return;

    const unitList = unitData[cat].units;

    unitList.forEach(unit => {
        const option1 = document.createElement("option");
        option1.value = unit.value;
        option1.textContent = unit.label;
        if (unit.disabled)
            option1.disabled = true;
        fromSelect.appendChild(option1);

        const option2 = option1.cloneNode(true);
        toSelect.appendChild(option2);
    });

    // Optional: auto-select first and second unit
    if (unitList.length >= 2) {
        fromSelect.value = unitList[0].value;
        toSelect.value = unitList[1].value;
    }
}

// Run when category changes
categorySelect.addEventListener("change", populateUnits);

// Optional: run once on page load if you want to pre-select something
// populateUnits();

document.getElementById("convertbtn").addEventListener("click", () => {
    const cat = categorySelect.value;
    const fromU = fromSelect.value;
    const toU = toSelect.value;
    const val = parseFloat(document.getElementById("valueInput").value);

    if (!cat || !fromU || !toU || isNaN(val)) {
        document.getElementById("result").textContent = "Please fill all fields correctly.";
        return;
    }

    let result;

    if (cat === "temperature") {
        // Special non-linear conversion
        if (fromU === "C" && toU === "F")
            result = val * 1.8 + 32;
        else if (fromU === "F" && toU === "C")
            result = (val - 32) / 1.8;
        else if (fromU === "C" && toU === "K")
            result = val + 273.15;
        else if (fromU === "K" && toU === "C")
            result = val - 273.15;
        // ... add other pairs
        else
            result = val; // same unit
    } else if (cat === "timezones") {

        // validation input
        if (!Number.isInteger(val) || val < 0 || val > 23) {
            alert("Please enter an integer between 0 and 23 for timezones.");
            document.getElementById("result").textContent = "";
            return;
        }

        const fromFactor = unitData.timezones.units.find(tz => tz.value === fromU)?.factor ?? 0;
        const toFactor = unitData.timezones.units.find(tz => tz.value === toU)?.factor ?? 0;

        result = (val + (toFactor - fromFactor) + 24) % 24;

    } else {
        // Linear (factor-based)
        const data = unitData[cat];
        const fromFactor = data.units.find(u => u.value === fromU).factor;
        const toFactor = data.units.find(u => u.value === toU).factor;

        const inBase = val * fromFactor;
        result = inBase / toFactor;
    }

    if (cat === "timezones") {
        // găsește label-urile orașelor din unitData
        const fromCity = unitData.timezones.units.find(tz => tz.value === fromU)?.label.split("/")[1]?.trim() ?? fromU;
        const toCity = unitData.timezones.units.find(tz => tz.value === toU)?.label.split("/")[1]?.trim() ?? toU;

        document.getElementById("result").textContent =
                `${val} ${fromCity} = ${Math.floor(result)} ${toCity}`;
    } else {

        let displayValue;
        if ((Math.abs(result) > 0 && Math.abs(result) < 0.001) || Math.abs(result) > 1000000) {
            displayValue = result.toExponential(3);
        } else {
            displayValue = result.toFixed(3);
        }

        document.getElementById("result").textContent =
                `${val} ${fromU} = ${displayValue} ${toU}`;
    }

});
