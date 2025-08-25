/**
 * @fileoverview
 * NOTE: variables from JavaScript files are globally accessible because of the placement of the <script> tags at the end of index.html 
 * 
 * holds all of the rates (variable) and charges (fixed) which are factored into the bill estimation
 */

const sewerVariableRates = {
    2025: {
        'Single-Family': 14.18,
        'Multi-Family': 11.40,
        'Non-Residential': 1.41,
    },
    2026: {
        'Single-Family': 14.66,
        'Multi-Family': 12.17,
        'Non-Residential': 1.50,
    },
    2027: {
        'Single-Family': 15.39,
        'Multi-Family': 12.78,
        'Non-Residential': 1.58,
    },
    2028: {
        'Single-Family': 16.16,
        'Multi-Family': 13.42,
        'Non-Residential': 1.65,
    },
    2029: {
        'Single-Family': 16.97,
        'Multi-Family': 14.09,
        'Non-Residential': 1.74,
    },
    2030: {
        'Single-Family': 17.82,
        'Multi-Family': 14.79,
        'Non-Residential': 1.82,
    },
}

const waterVariableRates = {
    2025: {
        'Single-Family': {
            'Tier 1': 2.40,
            'Tier 2': 3.82,
            'Tier 3': 4.59,
        },
        'Non-Single-Family': {
            'Tier 1': 3.07,
        },
        'Recycled Water': {
            'Tier 1': 2.40,
        },
    },
    2026: {
        'Single-Family': {
            'Tier 1': 2.50,
            'Tier 2': 4.60,
            'Tier 3': 5.47,
        },
        'Non-Single-Family': {
            'Tier 1': 3.44,
        },
        'Recycled Water': {
            'Tier 1': 2.49,
        },
    },
    2027: {
        'Single-Family': {
            'Tier 1': 2.62,
            'Tier 2': 4.83,
            'Tier 3': 5.74		
        },
        'Non-Single-Family': {
            'Tier 1': 3.62,
        },
        'Recycled Water': {
            'Tier 1': 2.61,
        }
    },
    2028: {
        'Single-Family': {
            'Tier 1': 2.76,
            'Tier 2': 5.08,
            'Tier 3': 6.03,
        },
        'Non-Single-Family': {
            'Tier 1': 3.80,
        },
        'Recycled Water': {
            'Tier 1': 2.74,
        },
    },
    2029: {
        'Single-Family': {
            'Tier 1': 3.00,
            'Tier 2': 5.53,
            'Tier 3': 6.57,
        },
        'Non-Single-Family': {
            'Tier 1': 4.14,
        },
        'Recycled Water': {
            'Tier 1': 2.99,
        },
    },
    2030: {
        'Single-Family': {
            'Tier 1': 3.27,
            'Tier 2': 6.03,
            'Tier 3': 7.16,
        },
        'Non-Single-Family': {
            'Tier 1': 4.51,
        },
        'Recycled Water': {
            'Tier 1': 3.26,
        },
    }
}

const waterFixedCharges = {
    2025: {
        '5/8"': 30.65,
        '3/4"': 41.01,
        '1"': 61.84,
        '1 1/2"': 113.82,
        '2"': 176.20,
        '3"': 373.73,
        '4"': 664.84,
        '6"': 1361.40,
        '8"': 2505.02,
        '10"': 3960.54,
    },
    2026: {
        '5/8"': 29.87,
        '3/4"': 39.30,
        '1"': 58.16,
        '1 1/2"': 105.32,
        '2"': 161.91,
        '3"': 341.11,
        '4"': 605.20,
        '6"': 1237.13,
        '8"': 2274.63,
        '10"': 3595.08,
    },
    2027: {
        '5/8"': 31.36,
        '3/4"': 41.26,
        '1"': 61.07,
        '1 1/2"': 110.59,
        '2"': 170.01,
        '3"': 358.17,
        '4"': 635.46,
        '6"': 1298.99,
        '8"': 2388.36,
        '10"': 3774.83,
    },
    2028: {
        '5/8"': 32.93,
        '3/4"': 43.33,
        '1"': 64.12,
        '1 1/2"': 116.12,
        '2"': 178.51,
        '3"': 376.08,
        '4"': 667.24,
        '6"': 1363.94,
        '8"': 2507.78,
        '10"': 3963.57,
    },
    2029: {
        '5/8"': 35.89,
        '3/4"': 47.22,
        '1"': 69.89,
        '1 1/2"': 126.57,
        '2"': 194.57,
        '3"': 409.93,
        '4"': 727.29,
        '6"': 1486.69,
        '8"': 2733.48,
        '10"': 4320.29,
    },
    2030: {
        '5/8"': 39.12,
        '3/4"': 51.48,
        '1"': 76.18,
        '1 1/2"': 137.96,
        '2"': 212.08,
        '3"': 446.82,
        '4"': 792.74,
        '6"': 1620.50,
        '8"': 2979.49,
        '10"': 4709.12,
    },
}

const dedicatedFireLineFixedCharges = {
    2025: {
        '2"': 11.87,
        '4"': 22.36,
        '6"': 46.17,
        '8"': 87.25,
        '10"': 149.03,
        '12"': 234.66,
        '16"': 488.93,
    },
    2026: {
        '2"': 12.78,
        '4"': 22.01,
        '6"': 42.99,
        '8"': 79.16,
        '10"': 133.57,
        '12"': 208.99,
        '16"': 432.92,
    },
    2027: {
        '2"': 13.42,
        '4"': 23.11,
        '6"': 45.14,
        '8"': 83.12,
        '10"': 140.25,
        '12"': 219.44,
        '16"': 454.57,
    },
    2028: {
        '2"': 14.09,
        '4"': 24.27,
        '6"': 47.39,
        '8"': 87.27,
        '10"': 147.27,
        '12"': 230.41,
        '16"': 477.29,
    },
    2029: {
        '2"': 15.36,
        '4"': 26.45,
        '6"': 51.66,
        '8"': 95.13,
        '10"': 160.52,
        '12"': 251.15,
        '16"': 520.25,
    },
    2030: {
        '2"': 16.74,
        '4"': 28.83,
        '6"': 56.31,
        '8"': 103.69,
        '10"': 174.97,
        '12"': 273.75,
        '16"': 567.07,
    },
};

const recycledWaterFixedCharges = {
    2025: {
        '5/8"': 14.88,
        '3/4"': 17.20,
        '1"': 21.85,
        '1 1/2"': 33.46,
        '2"': 47.40,
        '3"': 91.53,
        '4"': 156.56,
        '6"': 312.18,
        '8"': 567.67,
        '10"': 892.93,
    },
    2026: {
        '5/8"': 15.10,
        '3/4"': 18.35,
        '1"': 24.85,
        '1 1/2"': 41.11,
        '2"': 60.62,
        '3"': 122.40,
        '4"': 213.45,
        '6"': 431.31,
        '8"': 789.00,
        '10"': 1244.24,
    },
    2027: {
        '5/8"': 15.85,
        '3/4"': 19.26,
        '1"': 26.09,
        '1 1/2"': 43.16,
        '2"': 63.65,
        '3"': 128.52,
        '4"': 224.12,
        '6"': 452.88,
        '8"': 828.45,
        '10"': 1306.45,
    },
    2028: {
        '5/8"': 16.64,
        '3/4"': 20.23,
        '1"': 27.40,
        '1 1/2"': 45.32,
        '2"': 66.83,
        '3"': 134.95,
        '4"': 235.33,
        '6"': 475.52,
        '8"': 869.87,
        '10"': 1371.77,
    },
    2029: {
        '5/8"': 18.14,
        '3/4"': 22.05,
        '1"': 29.86,
        '1 1/2"': 49.40,
        '2"': 72.85,
        '3"': 147.09,
        '4"': 256.51,
        '6"': 518.32,
        '8"': 948.16,
        '10"': 1495.23,
    },
    2030: {
        '5/8"': 19.77,
        '3/4"': 24.03,
        '1"': 32.55,
        '1 1/2"': 53.85,
        '2"': 79.40,
        '3"': 160.33,
        '4"': 279.59,
        '6"': 564.97,
        '8"': 1033.49,
        '10"': 1629.80,
    },
};

const solidWasteVariableRates = {
    2025: {
        '32 Gal': { 
            'Single-Family Refuse': 35.60,
            'Non-Single-Family Organics': 9.96,
        },
        '64 Gal': { 
            'Single-Family Refuse': 39.45,
            'Non-Single-Family Organics': 16.82,
        },
        '96 Gal': { 
            'Single-Family Refuse': 43.81,
            'Non-Single-Family Refuse': 16.81,
            'Non-Single-Family Recycling': 10.21,
            'Non-Single-Family Organics': 24.14,
            'Non-Single-Family Green Waste': 16.72,
        },
        '1.5 YD': {
            'Non-Single-Family Refuse': 140.01,
            'Non-Single-Family Recycling': 98.21,
            'Non-Single-Family Organics': 292.06,
            'Non-Single-Family Green Waste': 109.27,
        },
        '2 YD': {
            'Non-Single-Family Refuse': 154.23,
            'Non-Single-Family Recycling': 107.56,
            'Non-Single-Family Organics': 302.23,
            'Non-Single-Family Green Waste': 122.66,
            'Non-Single-Family Compactor Refuse': 235.71,
            'Non-Single-Family Compactor Recycling': 141.14,
        },
        '3 YD': {
            'Non-Single-Family Refuse': 179.09,
            'Non-Single-Family Recycling': 126.27,
            'Non-Single-Family Organics': 322.57,
            'Non-Single-Family Green Waste': 149.45,
            'Non-Single-Family Compactor Refuse': 315.26,
            'Non-Single-Family Compactor Recycling': 202.46,
        },
        '4 YD': {
            'Non-Single-Family Refuse': 213.25,
            'Non-Single-Family Recycling': 144.98,
            'Non-Single-Family Green Waste': 176.24,
            'Non-Single-Family Compactor Refuse': 404.12,
            'Non-Single-Family Compactor Recycling': 253.14,
        },
        '6 YD': {
            'Non-Single-Family Refuse': 281.57,
            'Non-Single-Family Recycling': 193.77,
            'Non-Single-Family Green Waste': 229.82,
            'Non-Single-Family Compactor Refuse': 684.98,
            'Non-Single-Family Compactor Recycling': 386.42,
        },
        'Any Size': {
            'Roll Off': 247.61,
            'Compacted Roll Off': 283.68,
        }
    },
    2026: {
        '32 Gal': { 
            'Single-Family Refuse': 38.09,
            'Non-Single-Family Refuse': 8.48,
            'Non-Single-Family Recycling': 5.96,
            'Non-Single-Family Green Waste': 7.87,
            'Non-Single-Family Organics': 7.47,
        },
        '64 Gal': { 
            'Single-Family Refuse': 42.68,
            'Non-Single-Family Refuse': 13.09,
            'Non-Single-Family Recycling': 8.84,
            'Non-Single-Family Green Waste': 12.47,
            'Non-Single-Family Organics': 11.81,
        },
        '96 Gal': { 
            'Single-Family Refuse': 47.70,
            'Non-Single-Family Refuse': 18.57,
            'Non-Single-Family Recycling': 11.62,
            'Non-Single-Family Organics': 16.39,
            'Non-Single-Family Green Waste': 17.47,
        },
        '1.5 YD': {
            'Non-Single-Family Refuse': 149.40,
            'Non-Single-Family Recycling': 113.30,
            'Non-Single-Family Organics': 176.93,
            'Non-Single-Family Green Waste': 131.98,
            'Non-Single-Family Compactor Organics': 282.64,
        },
        '2 YD': {
            'Non-Single-Family Refuse': 163.25,
            'Non-Single-Family Recycling': 123.44,
            'Non-Single-Family Organics': 224.03,
            'Non-Single-Family Green Waste': 156.04,
            'Non-Single-Family Compactor Refuse': 237.86,
            'Non-Single-Family Compactor Recycling': 166.28,
            'Non-Single-Family Compactor Organics': 341.63,
        },
        '3 YD': {
            'Non-Single-Family Refuse': 190.79,
            'Non-Single-Family Recycling': 147.40,
            'Non-Single-Family Organics': 282.64,
            'Non-Single-Family Green Waste': 190.45,
            'Non-Single-Family Compactor Refuse': 318.34,
            'Non-Single-Family Compactor Recycling': 232.58,
            'Non-Single-Family Compactor Organics': 458.47,
        },
        '4 YD': {
            'Non-Single-Family Refuse': 222.89,
            'Non-Single-Family Recycling': 168.84,
            'Non-Single-Family Green Waste': 225.00,
            'Non-Single-Family Compactor Refuse': 404.31,
            'Non-Single-Family Compactor Recycling': 286.70,
        },
        '6 YD': {
            'Non-Single-Family Refuse': 295.88,
            'Non-Single-Family Recycling': 226.79,
            'Non-Single-Family Green Waste': 293.67,
            'Non-Single-Family Compactor Refuse': 674.60,
            'Non-Single-Family Compactor Recycling': 446.72,
        },
        'Any Size': {
            'Roll Off': 308.45,
            'Compacted Roll Off': 352.16,
        }
    },
    2027: {
        "32 Gal": {
            "Single-Family Refuse": 40.59,
            'Non-Single-Family Refuse': 9.08,
            'Non-Single-Family Recycling': 6.55,
            'Non-Single-Family Green Waste': 8.26,
            "Non-Single-Family Organics": 8.06
        },
        "64 Gal": {
            "Single-Family Refuse": 45.91,
            'Non-Single-Family Refuse': 14.42,
            'Non-Single-Family Recycling': 9.74,
            'Non-Single-Family Green Waste': 13.06,
            "Non-Single-Family Organics": 12.73
        },
        "96 Gal": {
            "Single-Family Refuse": 51.59,
            "Non-Single-Family Refuse": 20.33,
            "Non-Single-Family Recycling": 13.03,
            "Non-Single-Family Organics": 17.67,
            "Non-Single-Family Green Waste": 18.21
        },
        "1.5 YD": {
            "Non-Single-Family Refuse": 158.78,
            "Non-Single-Family Recycling": 128.40,
            "Non-Single-Family Organics": 190.76,
            "Non-Single-Family Green Waste": 154.69,
            'Non-Single-Family Compactor Organics': 304.73,
        },
        "2 YD": {
            "Non-Single-Family Refuse": 172.28,
            "Non-Single-Family Recycling": 139.32,
            "Non-Single-Family Organics": 241.54,
            "Non-Single-Family Green Waste": 189.42,
            "Non-Single-Family Compactor Refuse": 240.02,
            "Non-Single-Family Compactor Recycling": 191.43,
            'Non-Single-Family Compactor Organics': 368.33,
        },
        "3 YD": {
            "Non-Single-Family Refuse": 202.49,
            "Non-Single-Family Recycling": 168.54,
            "Non-Single-Family Organics": 304.73,
            "Non-Single-Family Green Waste": 231.44,
            "Non-Single-Family Compactor Refuse": 321.41,
            "Non-Single-Family Compactor Recycling": 262.70,
            'Non-Single-Family Compactor Organics': 494.31,
        },
        "4 YD": {
            "Non-Single-Family Refuse": 232.53,
            "Non-Single-Family Recycling": 192.71,
            "Non-Single-Family Green Waste": 273.76,
            "Non-Single-Family Compactor Refuse": 404.5,
            "Non-Single-Family Compactor Recycling": 320.27,
        },
        "6 YD": {
            "Non-Single-Family Refuse": 310.18,
            "Non-Single-Family Recycling": 259.80,
            "Non-Single-Family Green Waste": 357.52,
            "Non-Single-Family Compactor Refuse": 664.21,
            "Non-Single-Family Compactor Recycling": 507.01,
        },
        "Any Size": {
            "Roll Off": 369.29,
            "Compacted Roll Off": 420.63
        }
    },
    2028: {
        "32 Gal": {
            "Single-Family Refuse": 43.08,
            "Non-Single-Family Organics": 8.64
        },
        "64 Gal": {
            "Single-Family Refuse": 49.14,
            "Non-Single-Family Organics": 13.65
        },
        "96 Gal": {
            "Single-Family Refuse": 55.48,
            "Non-Single-Family Refuse": 22.09,
            "Non-Single-Family Recycling": 14.44,
            "Non-Single-Family Organics": 18.96,
            "Non-Single-Family Green Waste": 18.96
        },
        "1.5 YD": {
            "Non-Single-Family Refuse": 168.17,
            "Non-Single-Family Recycling": 143.49,
            "Non-Single-Family Organics": 204.59,
            "Non-Single-Family Green Waste": 177.40
        },
        "2 YD": {
            "Non-Single-Family Refuse": 181.30,
            "Non-Single-Family Recycling": 155.19,
            "Non-Single-Family Organics": 259.05,
            "Non-Single-Family Green Waste": 222.79
        },
        "3 YD": {
            "Non-Single-Family Refuse": 214.19,
            "Non-Single-Family Recycling": 189.67,
            "Non-Single-Family Organics": 326.82,
            "Non-Single-Family Green Waste": 272.44
        },
        "4 YD": {
            "Non-Single-Family Refuse": 242.17,
            "Non-Single-Family Recycling": 216.57
        },
        "6 YD": {
            "Non-Single-Family Refuse": 324.49,
            "Non-Single-Family Recycling": 292.82
        },
        "Any Size": {
            "Roll Off": 430.14,
            "Compacted Roll Off": 489.11
        }
    },
    2029: {
        "32 Gal": {
            "Single-Family Refuse": 44.37,
            "Non-Single-Family Organics": 8.90
        },
        "64 Gal": {
            "Single-Family Refuse": 50.61,
            "Non-Single-Family Organics": 14.06
        },
        "96 Gal": {
            "Single-Family Refuse": 57.15,
            "Non-Single-Family Refuse": 22.75,
            "Non-Single-Family Recycling": 14.87,
            "Non-Single-Family Organics": 19.52,
            "Non-Single-Family Green Waste": 19.52
        },
        "1.5 YD": {
            "Non-Single-Family Refuse": 173.22,
            "Non-Single-Family Recycling": 147.79,
            "Non-Single-Family Organics": 210.73,
            "Non-Single-Family Green Waste": 182.72
        },
        "2 YD": {
            "Non-Single-Family Refuse": 186.74,
            "Non-Single-Family Recycling": 159.85,
            "Non-Single-Family Organics": 266.82,
            "Non-Single-Family Green Waste": 229.48
        },
        "3 YD": {
            "Non-Single-Family Refuse": 220.62,
            "Non-Single-Family Recycling": 195.36,
            "Non-Single-Family Organics": 336.63,
            "Non-Single-Family Green Waste": 280.61
        },
        "4 YD": {
            "Non-Single-Family Refuse": 249.44,
            "Non-Single-Family Recycling": 223.07
        },
        "6 YD": {
            "Non-Single-Family Refuse": 334.22,
            "Non-Single-Family Recycling": 301.60
        },
        "Any Size": {
            "Roll Off": 443.04,
            "Compacted Roll Off": 503.78
        }
    },
    2030: {
        "32 Gal": {
            "Single-Family Refuse": 45.70,
            "Non-Single-Family Organics": 9.17
        },
        "64 Gal": {
            "Single-Family Refuse": 52.13,
            "Non-Single-Family Organics": 14.49
        },
        "96 Gal": {
            "Single-Family Refuse": 58.86,
            "Non-Single-Family Refuse": 23.44,
            "Non-Single-Family Recycling": 15.32,
            "Non-Single-Family Organics": 20.11,
            "Non-Single-Family Green Waste": 20.11
        },
        "1.5 YD": {
            "Non-Single-Family Refuse": 178.41,
            "Non-Single-Family Recycling": 152.23,
            "Non-Single-Family Organics": 217.05,
            "Non-Single-Family Green Waste": 188.21
        },
        "2 YD": {
            "Non-Single-Family Refuse": 192.35,
            "Non-Single-Family Recycling": 164.65,
            "Non-Single-Family Organics": 274.83,
            "Non-Single-Family Green Waste": 236.36
        },
        "3 YD": {
            "Non-Single-Family Refuse": 227.24,
            "Non-Single-Family Recycling": 201.22,
            "Non-Single-Family Organics": 346.73,
            "Non-Single-Family Green Waste": 289.03
        },
        "4 YD": {
            "Non-Single-Family Refuse": 256.92,
            "Non-Single-Family Recycling": 229.76
        },
        "6 YD": {
            "Non-Single-Family Refuse": 344.25,
            "Non-Single-Family Recycling": 310.65
        },
        "Any Size": {
            "Roll Off": 456.33,
            "Compacted Roll Off": 518.89
        }
    }
};

const solidWasteAdditionalPickupRates = {
    2025: {
        'Single-Family Refuse': {
            '32 Gal': 3.75,
            '64 Gal': 7.73,
            '96 Gal': 12.15,
        },
        'Single-Family Recycling': {
            '96 Gal': 7.34,
        },
        'Single-Family Organics': {
            '96 Gal': 13.69,
        },
        'Non-Single-Family Refuse': {
            '96 Gal': 23.8,
            '1.5 YD': 58.15,
            '2 YD': 74.07,
            '3 YD': 98.92,
            '4 YD': 133.08,
            '6 YD': 201.4,
        },
        'Non-Single-Family Compactor Refuse': {
            '2 YD': 155.54,
            '3 YD': 235.09,
            '4 YD': 323.96,
            '6 YD': 604.82,
        },
        'Non-Single-Family Recycling': {
            '96 Gal': 18.98,
            '1.5 YD': 55.67,
            '2 YD': 66.11,
            '3 YD': 86.97,
            '4 YD': 107.84,
            '6 YD': 165.54,
        },
        'Non-Single-Family Compactor Recycling': {
            '2 YD': 115.09,
            '3 YD': 176.41,
            '4 YD': 227.09,
            '6 YD': 360.37,
        },
        'Non-Single-Family Green Waste': {
            '96 Gal': 25.34,
            '1.5 YD': 63.15,
            '2 YD': 76.55,
            '3 YD': 103.34,
            '4 YD': 130.13,
            '6 YD': 183.71,
        },
        'Non-Single-Family Organics': {
            '32 Gal': 18.59,
            '64 Gal': 25.44,
            '96 Gal': 32.76,
            '1.5 YD': 117.78,
            '2 YD': 148.92,
            '3 YD': 211.9,
        },
    },
    2026:{
        'Single-Family Refuse': {
            '32 Gal': 4.27,
            '64 Gal': 8.96,
            '96 Gal': 14.04,
        },
        'Single-Family Recycling': {
            '32 Gal': 5.81,
            '64 Gal': 7.00,
            '96 Gal': 8.28,
        },
        'Single-Family Organics': {
            '32 Gal': 10.55,
            '64 Gal': 12.24,
            '96 Gal': 14.02,
        },
        'Non-Single-Family Refuse': {
            '32 Gal': 13.43,
            '64 Gal': 18.02,
            '96 Gal': 22.62,
            '1.5 YD': 53.68,
            '2 YD': 69.8,
            '3 YD': 97.33,
            '4 YD': 129.43,
            '6 YD': 202.41,
        },
        'Non-Single-Family Compactor Refuse': {
            '2 YD': 144.40,
            '3 YD': 224.87,
            '4 YD': 310.85,
            '6 YD': 581.14,
        },
        'Non-Single-Family Recycling': {
            '32 Gal': 11.64,
            '64 Gal': 14.53,
            '96 Gal': 17.3,
            '1.5 YD': 48.66,
            '2 YD': 58.73,
            '3 YD': 87.95,
            '4 YD': 110.83,
            '6 YD': 174.71,
        },
        'Non-Single-Family Compactor Recycling': {
            '2 YD': 115.66,
            '3 YD': 181.95,
            '4 YD': 236.08,
            '6 YD': 396.09,
        },
        'Non-Single-Family Green Waste': {
            '32 Gal': 13.46,
            '64 Gal': 18.05,
            '96 Gal': 23.05,
            '1.5 YD': 62.91,
            '2 YD': 86.98,
            '3 YD': 121.38,
            '4 YD': 155.94,
            '6 YD': 224.61,
        },
        'Non-Single-Family Organics': {
            '32 Gal': 7.05,
            '64 Gal': 11.38,
            '96 Gal': 15.96,
            '1.5 YD': 77.51,
            '2 YD': 124.6,
            '3 YD': 183.21,
        },
        'Non-Single-Family Compactor Organics': {
            '1.5 YD': 183.21,
            '2 YD': 242.2,
            '3 YD': 359.05,
        },
    },
    2027:{
        'Single-Family Refuse': {
            '32 Gal': 4.79,
            '64 Gal': 10.19,
            '96 Gal': 15.93,
        },
        'Single-Family Recycling': {
            '32 Gal': 4.28,
            '64 Gal': 6.66,
            '96 Gal': 9.23,
        },
        'Single-Family Organics': {
            '32 Gal': 7.40,
            '64 Gal': 10.79,
            '96 Gal': 14.36,
        },
        'Non-Single-Family Refuse': {
            '32 Gal': 11.31,
            '64 Gal': 16.63,
            '96 Gal': 22.11,
            '1.5 YD': 50.9,
            '2 YD': 65.52,
            '3 YD': 95.73,
            '4 YD': 125.77,
            '6 YD': 203.42,
        },
        'Non-Single-Family Compactor Refuse': {
            '2 YD': 133.25,
            '3 YD': 214.65,
            '4 YD': 297.75,
            '6 YD': 557.46,
        },
        'Non-Single-Family Recycling': {
            '32 Gal': 9.14,
            '64 Gal': 12.34,
            '96 Gal': 15.62,
            '1.5 YD': 47.7,
            '2 YD': 58.98,
            '3 YD': 88.92,
            '4 YD': 113.82,
            '6 YD': 183.88,
        },
        'Non-Single-Family Compactor Recycling': {
            '2 YD': 116.23,
            '3 YD': 187.5,
            '4 YD': 245.07,
            '6 YD': 431.81,
        },
        'Non-Single-Family Green Waste': {
            '32 Gal': 10.80,
            '64 Gal': 15.6,
            '96 Gal': 20.75,
            '1.5 YD': 62.67,
            '2 YD': 97.4,
            '3 YD': 139.43,
            '4 YD': 181.75,
            '6 YD': 265.51,
        },
        'Non-Single-Family Organics': {
            '32 Gal': 7.59,
            '64 Gal': 12.27,
            '96 Gal': 17.21,
            '1.5 YD': 83.57,
            '2 YD': 134.34,
            '3 YD': 197.54,
        },
        'Non-Single-Family Compactor Organics': {
            '1.5 YD': 197.54,
            '2 YD': 261.14,
            '3 YD': 387.11,
        },
    }
}

const solidWasteAdditionalContainerRates = {
    2025:{
        '32 Gal': {
            'Non-Single-Family Organics': 6.8,
        },
        '64 Gal': {
            'Non-Single-Family Organics': 13.76,
        },
        '96 Gal': { 
            'Non-Single-Family Refuse': 12.15,
            'Non-Single-Family Recycling': 7.34,
            'Non-Single-Family Organics': 21.11,
            'Non-Single-Family Green Waste': 13.69,
        },
        '1.5 YD': {
            'Non-Single-Family Refuse': 40.94,
            'Non-Single-Family Recycling': 38.46,
            'Non-Single-Family Organics': 100.57,
            'Non-Single-Family Green Waste': 43.96,
        },
        '2 YD': {
            'Non-Single-Family Refuse': 57.75,
            'Non-Single-Family Recycling': 49.79,
            'Non-Single-Family Organics': 132.6,
            'Non-Single-Family Green Waste': 57.83,
            'Non-Single-Family Compactor Refuse': 138.21,
            'Non-Single-Family Compactor Recycling': 97.76,
        },
        '3 YD': {
            'Non-Single-Family Refuse': 83.91,
            'Non-Single-Family Recycling': 71.96,
            'Non-Single-Family Organics': 196.18,
            'Non-Single-Family Green Waste': 85.46,
            'Non-Single-Family Compactor Refuse': 220.11,
            'Non-Single-Family Compactor Recycling': 161.42,
        },
        '4 YD': {
            'Non-Single-Family Refuse': 119.53,
            'Non-Single-Family Recycling': 94.3,
            'Non-Single-Family Green Waste': 112.46,
            'Non-Single-Family Compactor Refuse': 311.31,
            'Non-Single-Family Compactor Recycling': 214.45,
        },
        '6 YD': {
            'Non-Single-Family Refuse': 189.71,
            'Non-Single-Family Recycling': 153.85,
            'Non-Single-Family Green Waste': 166.85,
            'Non-Single-Family Compactor Refuse': 594.52,
            'Non-Single-Family Compactor Recycling': 350.07,
        },
    },
   2026:{
        '32 Gal': {
            'Non-Single-Family Refuse': 4.27,
            'Non-Single-Family Recycling': 2.49,
            'Non-Single-Family Green Waste': 4.3,
            'Non-Single-Family Organics': 3.68,
        },
        '64 Gal': {
            'Non-Single-Family Refuse': 8.96,
            'Non-Single-Family Recycling': 5.46,
            'Non-Single-Family Green Waste': 8.99,
            'Non-Single-Family Organics': 8.07,
        },
        '96 Gal': { 
            'Non-Single-Family Refuse': 14.04,
            'Non-Single-Family Recycling': 8.28,
            'Non-Single-Family Green Waste': 14.02,
            'Non-Single-Family Organics': 12.7,
        },
        '1.5 YD': {
            'Non-Single-Family Refuse': 42.67,
            'Non-Single-Family Recycling': 39.55,
            'Non-Single-Family Green Waste': 49.46,
            'Non-Single-Family Organics': 75.8,
            'Non-Single-Family Compactor Organics': 181.51,
        },
        '2 YD': {
            'Non-Single-Family Refuse': 58.56,
            'Non-Single-Family Compactor Refuse': 132.49,
            'Non-Single-Family Recycling': 51.31,
            'Non-Single-Family Compactor Recycling': 103.75,
            'Non-Single-Family Green Waste': 74.14,
            'Non-Single-Family Organics': 123.68,
            'Non-Single-Family Compactor Organics': 241.28,
        },
        '3 YD': {
            'Non-Single-Family Refuse': 87.26,
            'Non-Single-Family Compactor Refuse': 214.83,
            'Non-Single-Family Recycling': 77.88,
            'Non-Single-Family Compactor Recycling': 171.9,
            'Non-Single-Family Green Waste': 109.41,
            'Non-Single-Family Organics': 183.07,
            'Non-Single-Family Compactor Organics': 358.9,
        },
        '4 YD': {
            'Non-Single-Family Refuse': 120.74,
            'Non-Single-Family Compactor Refuse': 302.77,
            'Non-Single-Family Recycling': 102.15,
            'Non-Single-Family Compactor Recycling': 228,
            'Non-Single-Family Green Waste': 144.51,
        },
        '6 YD': {
            'Non-Single-Family Refuse': 195.59,
            'Non-Single-Family Compactor Refuse': 575.24,
            'Non-Single-Family Recycling': 167.89,
            'Non-Single-Family Compactor Recycling': 390.2,
            'Non-Single-Family Green Waste': 214.34,
        }
   },
   2027:{
        '32 Gal': {
            'Non-Single-Family Refuse': 4.79,
            'Non-Single-Family Recycling': 2.62,
            'Non-Single-Family Green Waste': 4.28,
            'Non-Single-Family Organics': 3.8,
        },
        '64 Gal': {
            'Non-Single-Family Refuse': 10.19,
            'Non-Single-Family Recycling': 5.89,
            'Non-Single-Family Green Waste': 9.16,
            'Non-Single-Family Organics': 8.33,
        },
        '96 Gal': { 
            'Non-Single-Family Refuse': 15.93,
            'Non-Single-Family Recycling': 9.23,
            'Non-Single-Family Green Waste': 14.36,
            'Non-Single-Family Organics': 13.12,
        },
        '1.5 YD': {
            'Non-Single-Family Refuse': 44.41,
            'Non-Single-Family Recycling': 40.65,
            'Non-Single-Family Green Waste': 54.96,
            'Non-Single-Family Organics': 78.26,
            'Non-Single-Family Compactor Organics': 187.4,
            
        },
        '2 YD': {
            'Non-Single-Family Refuse': 59.37,
            'Non-Single-Family Compactor Refuse': 126.76,
            'Non-Single-Family Recycling': 52.83,
            'Non-Single-Family Compactor Recycling': 109.74,
            'Non-Single-Family Green Waste': 90.45,
            'Non-Single-Family Organics': 127.69,
            'Non-Single-Family Compactor Organics': 249.12,
        },
        '3 YD': {
            'Non-Single-Family Refuse': 90.61,
            'Non-Single-Family Compactor Refuse': 209.54,
            'Non-Single-Family Recycling': 83.8,
            'Non-Single-Family Compactor Recycling': 182.39,
            'Non-Single-Family Green Waste': 133.35,
            'Non-Single-Family Organics': 189.01,
            'Non-Single-Family Compactor Organics': 370.56,
        },
        '4 YD': {
            'Non-Single-Family Refuse': 121.95,
            'Non-Single-Family Compactor Refuse': 294.23,
            'Non-Single-Family Recycling': 110,
            'Non-Single-Family Compactor Recycling': 241.56,
            'Non-Single-Family Green Waste': 176.56,
        },
        '6 YD': {
            'Non-Single-Family Refuse': 201.46,
            'Non-Single-Family Compactor Refuse': 555.96,
            'Non-Single-Family Recycling': 181.92,
            'Non-Single-Family Compactor Recycling': 430.32,
            'Non-Single-Family Green Waste': 261.83,
        }
   } 
}

// const solidWasteAdditionalContainerAdditionalPickupRates = { 
//     2025:{
//         'Non-Single-Family Refuse': {
//             '96 Gal': 23.8,
//             '1.5 YD': 58.15,
//             '2 YD': 74.07,
//             '3 YD': 98.92,
//             '4 YD': 133.08,
//             '6 YD': 201.4,
//         },
//         'Non-Single-Family Compactor Refuse': {
//             '2 YD': 155.54,
//             '3 YD': 235.09,
//             '4 YD': 323.96,
//             '6 YD': 604.82,
//         },
//         'Non-Single-Family Recycling': {
//             '96 Gal': 18.98,
//             '1.5 YD': 55.67,
//             '2 YD': 66.11,
//             '3 YD': 86.97,
//             '4 YD': 107.84,
//             '6 YD': 165.54,
//         },
//         'Non-Single-Family Compactor Recycling': {
//             '2 YD': 115.09,
//             '3 YD': 176.41,
//             '4 YD': 227.09,
//             '6 YD': 360.37,
//         },
//         'Non-Single-Family Green Waste': {
//             '96 Gal': 25.34,
//             '1.5 YD': 61.18,
//             '2 YD': 73.45,
//             '3 YD': 97.98,
//             '4 YD': 123.94,
//             '6 YD': 178.34,
//         },
//         'Non-Single-Family Organics': {
//             '32 Gal': 18.59,
//             '64 Gal': 25.44,
//             '96 Gal': 32.76,
//             '1.5 YD': 117.78,
//             '2 YD': 148.92,
//             '3 YD': 211.9,
//         }, 
//     },
//     2026:{
//         'Non-Single-Family Refuse': {
//             '32 Gal': 13.43,
//             '64 Gal': 28.2,
//             '96 Gal': 37.46,
//             '1.5 YD': 54.81,
//             '2 YD': 69.80,
//             '3 YD': 97.33,
//             '4 YD': 129.43,
//             '6 YD': 192.30,
//         },
//         'Non-Single-Family Compactor Refuse': {
//             '2 YD': 144.40,
//             '3 YD': 224.87,
//             '4 YD': 310.85,
//             '6 YD': 581.14,
//         },
//         'Non-Single-Family Recycling': {
//             '32 Gal': 11.64,
//             '64 Gal': 14.53,
//             '96 Gal': 17.30,
//             '1.5 YD': 48.66,
//             '2 YD': 58.72,
//             '3 YD': 84.38,
//             '4 YD': 110.13,
//             '6 YD': 174.71,
//         },
//         'Non-Single-Family Compactor Recycling': {
//             '2 YD': 115.66,
//             '3 YD': 181.95,
//             '4 YD': 236.08,
//             '6 YD': 396.09,
//         },
//         'Non-Single-Family Green Waste': {
//             '32 Gal': 13.45,
//             '64 Gal': 17.38,
//             '96 Gal': 23.04,
//             '1.5 YD': 62.91,
//             '2 YD': 86.97,
//             '3 YD': 121.39,
//             '4 YD': 155.96,
//             '6 YD': 224.61,
//         },
//         'Non-Single-Family Organics': {
//             '32 Gal': 7.04,
//             '64 Gal': 11.37,
//             '96 Gal': 15.92,
//             '1.5 YD': 77.51,
//             '2 YD': 124.61,
//             '3 YD': 183.21,
//         },  
//         'Non-Single-Family Compactor Organics': {
//             '1.5 YD': 183.21,
//             '2 YD': 242.20,
//             '3 YD': 359.05,
//         },
//     },
//     2027:{
//         'Non-Single-Family Refuse': {
//             '32 Gal': 11.31,
//             '64 Gal': 36.96,
//             '96 Gal': 51.12,
//             '1.5 YD': 51.46,
//             '2 YD': 65.52,
//             '3 YD': 95.73,
//             '4 YD': 125.77,
//             '6 YD': 203.42,
//         },
//         'Non-Single-Family Compactor Refuse': {
//             '2 YD': 133.26,
//             '3 YD': 214.65,
//             '4 YD': 297.74,
//             '6 YD': 557.46,
//         },
//         'Non-Single-Family Recycling': {
//             '32 Gal': 9.14,
//             '64 Gal': 12.34,
//             '96 Gal': 15.62,
//             '1.5 YD': 46.19,
//             '2 YD': 57.66,
//             '3 YD': 88.93,
//             '4 YD': 113.81,
//             '6 YD': 183.88,
//         },
//         'Non-Single-Family Compactor Recycling': {
//             '2 YD': 116.23,
//             '3 YD': 187.50,
//             '4 YD': 245.07,
//             '6 YD': 431.82,
//         },
//         'Non-Single-Family Green Waste': {
//             '32 Gal': 10.80,
//             '64 Gal': 15.27,
//             '96 Gal': 20.76,
//             '1.5 YD': 62.67,
//             '2 YD': 97.40,
//             '3 YD': 139.43,
//             '4 YD': 181.75,
//             '6 YD': 265.51,
//         }, 
//         'Non-Single-Family Organics': {
//             '32 Gal': 7.60,
//             '64 Gal': 12.27,
//             '96 Gal': 17.21,
//             '1.5 YD': 83.56,
//             '2 YD': 134.35,
//             '3 YD': 197.53,
//         },
//         'Non-Single-Family Compactor Organics': {
//             '1.5 YD': 197.53,
//             '2 YD': 261.13,
//             '3 YD': 387.11,
//         },
//     }
// }

const ieuaCharges = {
    2025: 24.79,
    2026: 27.02,
    2027: 29.45,
}