[Live]()
[Live Source](https://billestimator.org/)
["Bill Estimator" in Dropbox]()

# Overview

## Functionality

### Water
- **Time Range**
  - 2026 – 2030
- **Customer Classes**
  - Single-Family Residential
  - Non-Single-Family Residential
    - Multi-Family Residential (not needed in HTML)
    - Commercial (not needed in HTML)
    - Industrial (not needed in HTML)
- **Rates and Charges**
  - Change in rates for
    - all customer classes
    - recycled water
  - Change in charges for
    - all customer classes
    - recycled water
    - private fire

### Sewer
- **Time Range**
  - 2025 – 2030
- **Customer Classes**
  - City
  - Residential
    - Single-Family Residential (defaults to 1 unit)
    - Multi-Family Residential
  - Non-Residential
- **Rates and Charges**
  - Change in charges for all customer classes
    - The *unit* is a dwelling unit for residential and HCF billing unit for non-residential.
      - Whether it is a dwelling unit or HCF is not significant for calculation.
      - The value itself, however, is critical for calculating future years.
      - It is found by dividing the base charge on the bill by the sewer charge for a given year.
      - With that unit value, one can multiply it by projected charges to determine upcoming years' base charges.


### Solid Waste
- **Time Range**
  - 2024 – 2027
- **Customer Classes**
  - Residential Rate
  - Commercial Rate
- **Rates and Charges**
  - Municipal Solid Waste (MSW) covers regular household and commercial trash. On the bill, it shows up as refuse.
  - YD stands for cubic yard, which is equivalent to 202 gallons.
  - For a bin to classify as an *additional container*, it has to have another container on the bill of the same size, type (a.k.a. commodity), and pickup rate (a.k.a. frequency)
  - Change in variable rates for
    - Residential Rates: 32 Gal, 64 Gal, 96 Gal
    - Commercial Rates
      - Municipal Solid Waste: 96 Gal
      - Recycling: 96 Gal
      - Organics: 96 Gal
    - Bin Rates
      - Municipal Solid Waste: 1.5 YD, 2 YD, 3 YD, 4 YD, 6 YD
      - Recycling: 1.5 YD, 2 YD, 3 YD, 4 YD, 6 YD
      - Organics: 1.5 YD, 2 YD, 3 YD
    - Compactor Rates
      - Municipal Solid Waste: 2 YD, 3 YD, 4 YD, 6 YD
      - Recycling: 2 YD, 3 YD, 4 YD, 6 YD
    - Roll Off Rates
      - Any Material: Any Size
      - Plus processing/disposal charge
    - Compacted Roll Off Rates
      - Any Material: Any Size
      - Plus processing/disposal charge


## Site Integration
This site uses the CMS Granicus. The goal was to integrate the bill estimator code without linking an external resource to host it. However, due to the limitations of Granicus, the estimator was built on a WordPress site hosted by WP Engine, using Code Block elements, and then embedded into the client's site.

## Customer Class Input
The Ontario bill structure includes all utilities, thus requiring only the collection of a user's customer class. Originally, however, the customer class input was structured like this to allow for alternative form structures based on utility.
```html
<label for="bill-estimator-type-menu">Customer Class</label>
<select id="bill-estimator-type-menu" name="bill-estimator-type-menu">
    <option data-utility="" data-group="" value="">Please select a rate calculator.</option>

    <optgroup label="Water">
        <option data-utility="Water" data-group="Residential" value="Single-Family">Single-Family Residential</option>
        <option data-utility="Water" data-group="Non-Single-Family Residential" value="Non-Single-Family Residential">Non-Single-Family Residential</option>
    </optgroup>
    
    <optgroup label="Sewer">
        <option data-utility="Sewer" data-group="Residential" value="Single-Family">Single-Family Residential</option>
        <option data-utility="Sewer" data-group="Residential" value="Multi-Family">Multi-Family Residential</option>
        <option data-utility="Sewer" data-group="Non-Residential" value="Non-Residential">Non-Residential</option>
    </optgroup>

    <optgroup label="Solid Waste">
        <option data-utility="Solid Waste" data-group="Residential" value="Residential">Residential</option>
        <option data-utility="Solid Waste" data-group="Commercial" value="Commercial">Commercial</option>
    </optgroup>
</select>
```

## Solid Waste Rate
For the solid waste rate, this was the original rate object structure:
```js
2026: {
    "Residential Rate - 32 Gal": 39.86,
    "Residential Rate - 64 Gal": 44.83,
    "Residential Rate - 96 Gal": 50.15,
    "Commercial Rate - 96 Gal MSW": 19.55,
    "Commercial Rate - 96 Gal REC": 12.93,
    "Commercial Rate - 96 Gal ORG": 19.93,
    "Bin Rate - 1.5 YD MSW": 134.81,
    "Bin Rate - 2 YD MSW": 147.23,
    "Bin Rate - 3 YD MSW": 179.09,
    "Bin Rate - 4 YD MSW": 202.81,
    "Bin Rate - 6 YD MSW": 281.57,
    "Bin Rate - 1.5 YD Rec": 100.49,
    "Bin Rate - 2 YD Rec": 110.59,
    "Bin Rate - 3 YD Rec": 137.66,
    "Bin Rate - 4 YD Rec": 160.03,
    "Bin Rate - 6 YD Rec": 222.19,
    "Bin Rate - 1.5 YD Org": 197.46,
    "Bin Rate - 2 YD Org": 234.19,
    "Bin Rate - 3 YD Org": 282.03,
    "Compactor Rate - 2YD - MSW": 209.74,
    "Compactor Rate - 3YD - MSW": 285.06,
    "Compactor Rate - 4YD - MSW": 361.94,
    "Compactor Rate - 6YD - MSW": 603.03,
    "Compactor Rate - 2YD - REC": 158.85,
    "Compactor Rate - 3YD - REC": 224.87,
    "Compactor Rate - 4YD - REC": 278.18,
    "Compactor Rate - 6YD - REC": 451.31,
    "Roll Off - Any Size - Any Material": 319.63,
    "Compacted Roll Off - Any Size - Any Material": 370.00,
},
```


## Questions

### Pending
None

### Answered

- Do non-single-family residential (non-SFR) water rates increase uniformly across all customer classes, or do multi-family, commercial, and industrial customers have separate rate increases? The data provided implies that they do increase uniformly, but I wanted to clarify.
- The Raftelis draft report shows fixed charge increases for non-SFR water meter customers, but it doesn’t include projections across all years, meter sizes, and customer classes (e.g., multi-family, commercial, industrial). I currently only have that information for single-family residential customers. Could you provide it if available?

---

- What is the 2025 rate for non-residential sewer customers?
- What are the 2025 and 2028 – 2030 sewer city rates?

---

How are solid waste bills calculated?

I assumed some bins may have multiple pickups, but I'm still ending up several dollars over or under the sample bill amounts when comparing to the 2024/2025 rate sheet. Here's what I’ve found:

| **Rate Sheet (4/11/2025)**         | **Sample Bill (3/18–4/16)**       | **Possible Calculation**                     | **Discrepancy**          |
|------------------------------------|-----------------------------------|----------------------------------------------|--------------------------|
| 2 YD Organics – $303.23            | 2 YD Food Waste – $451.15         | $303.23 × 1 pickup = $303.23                 | **–$147.92**             |
| 3 YD Recycling – $126.27           | 3 YD Recycle – $213.24            | $126.27 × 2 pickups = $252.54                | **+$39.30**              |
| 4 YD Refuse – $213.25              | 4 YD Refuse – $213.25             | $213.25 × 1 pickup = $213.25                 | $0                       |
| 4 YD Refuse – $213.25              | 4 YD Refuse – $878.65             | $213.25 × 4 pickups = $853.00                | **–$25.65**              |


So far, it looks like base rates match expected values when assuming weekly or multiple pickups, but discrepancies of $25–$150 remain unexplained — especially for organics and recycling.