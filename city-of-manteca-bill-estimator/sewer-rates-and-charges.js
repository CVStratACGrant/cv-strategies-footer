/**
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * holds all of the rates (variable) and charges (fixed) which are factored into the bill estimation
 */

const sewerRates = {
    2025: {
        /* Per Living Unit Charges */
        singleFamilyResidential: 58.60,
        multiFamilyResidential: 41.70,
        mobileHome: 37.20,

        /* Per Thousand Cubic Feet Rates */
        commercialLowStrength: 45.70,
        commercialMidStrength: 55.40,
        commercialHighStrength: 104.60,

        /* Industrial Rates */
        industrial: {
            biologicalOxygenDemandPerPoundRate: 0.70,
            nitrogenPerPoundRate: 3.10,
            totalSuspendedSolidsPerPoundRate: 1.00,
            volumePerMillionGallonsRate: 3872.20,
        },
    },
    2026: {
        /* Per Living Unit Charges */
        singleFamilyResidential: 64.50,
        multiFamilyResidential: 45.90,
        mobileHome: 40.90,

        /* Per Thousand Cubic Feet Rates */
        commercialLowStrength: 50.30,
        commercialMidStrength: 60.90,
        commercialHighStrength: 115.10,

        /* Industrial Rates */
        industrial: {
            biologicalOxygenDemandPerPoundRate: 0.80,
            nitrogenPerPoundRate: 3.41,
            totalSuspendedSolidsPerPoundRate: 1.10,
            volumePerMillionGallonsRate: 4259.40,
        },
    },
    2027: {
        /* Per Living Unit Charges */
        singleFamilyResidential: 68.40,
        multiFamilyResidential: 48.70,
        mobileHome: 43.40,

        /* Per Thousand Cubic Feet Rates */
        commercialLowStrength: 53.30,
        commercialMidStrength: 64.60,
        commercialHighStrength: 122.00,

        /* Industrial Rates */
        industrial: {
            biologicalOxygenDemandPerPoundRate: 0.80,
            nitrogenPerPoundRate: 3.61,
            totalSuspendedSolidsPerPoundRate: 1.17,
            volumePerMillionGallonsRate: 4515.00,
        },
    },
    2028: {
        /* Per Living Unit Charges */
        singleFamilyResidential: 72.50,
        multiFamilyResidential: 51.60,
        mobileHome: 46.00,

        /* Per Thousand Cubic Feet Rates */
        commercialLowStrength: 56.50,
        commercialMidStrength: 68.50,
        commercialHighStrength: 129.30,

        /* Industrial Rates */
        industrial: {
            biologicalOxygenDemandPerPoundRate: 0.80,
            nitrogenPerPoundRate: 3.83,
            totalSuspendedSolidsPerPoundRate: 1.24,
            volumePerMillionGallonsRate: 4785.90,
        },
    },
};

const old2024Rates = {
    /* Per Living Unit Charges */
    'Residential (Single Family Home)': 43.30,
    'Residential (Two or More Living Units)': 43.30,
    
    /* Per Thousand Cubic Feet Rates */
    'Car Wash': 24.53,
    'Church': 28.71,
    'Commercial': 30.96,
    'Commercial Mixed Use': 40.23,
    'Hotel (With Kitchen)': 61.89,
    'Hotel (Without Kitchen)': 33.81,
    'Hospital': 32.69,
    'Laundromat': 24.53,
    'Light Industrial': 25.35,
    'Market': 75.45,
    'Mobile Home Park': 36.57,
    'Mortuary': 75.45,
    'Motel (With Kitchen)': 61.89,
    'Motel (Without Kitchen)': 33.81,
    'Non-Profit': 27.82,
    'Office': 25.35,
    'Retail': 30.96,
    'Restaurant': 72.42,
    'School': 28.71,
    'Service Station': 34.04,
    'Trailer Park': 36.57,

    /* Industrial Rates */
    industrial: {
        biologicalOxygenDemandPerPoundRate: 0.404,
        cityOfLathropRate: null,
        raymusVillageRate: null,
        nitrogenPerPoundRate: 2.866,
        septagePerThousandCubicFeetRate: 165.16,
        totalSuspendedSolidsPerPoundRate: 0.765,
        volumePerMillionGallonsRate: 2023.24,
    },
}

const newToOldCustomerClasses = {
    singleFamilyResidential: ['Residential (Single Family Home)'],
    multiFamilyResidential: ['Residential (Two or More Living Units)'],
    mobileHome: ['Mobile Home Park', 'Trailer Park'],
    commercialLowStrength: [
      'Car Wash',
      'Church',
      'Laundromat',
      'Light Industrial',
      'Non-Profit',
      'Office',
      'Service Station',
      'School',
    ],
    commercialMidStrength: [
      'Commercial',
      'Commercial Mixed Use',
      'Hotel (Without)',
      'Hospital',
      'Motel (Without Kitchen)',
      'Retail',
    ],
    commercialHighStrength: [
      'Hotel (With Kitchen)',
      'Market',
      'Mortuary',
      'Motel (With Kitchen)',
      'Restaurant',
    ],
    industrial: [
      'Industrial'
    ]
  };