export interface SeasonalEmployer {
  id: string;
  name: string;
  category: 'Agriculture (H-2A)' | 'Seasonal Hospitality (H-2B)' | 'Seafood Processing (H-2B)' | 'Ski & Winter Resort (H-2B)' | 'Landscaping & Forestry (H-2B)';
  visaType: 'H-2A' | 'H-2B';
  state: string;
  stateCode: string;
  city: string;
  primaryCropOrService: string;
  peakSeasonMonths: string;
  hourlyWageRange: string;
  housingProvidedFree: boolean; // Under 20 CFR 655.122(d) for H-2A
  travelReimbursed: boolean;
  officialCareersUrl: string;
  description: string;
}

export interface StateHarvestCalendar {
  stateCode: string;
  stateName: string;
  aewrRate: number; // 2026 Adverse Effect Wage Rate ($/hr)
  peakMonths: string;
  primaryCrops: string[];
  h2aFilingWindow: string;
}

export const STATE_HARVEST_CALENDAR: StateHarvestCalendar[] = [
  {
    stateCode: 'WA',
    stateName: 'Washington',
    aewrRate: 19.75,
    peakMonths: 'June - November',
    primaryCrops: ['Apples', 'Sweet Cherries', 'Pears', 'Hops', 'Wine Grapes', 'Berries'],
    h2aFilingWindow: 'March - May (60-75 days before date of need)'
  },
  {
    stateCode: 'CA',
    stateName: 'California',
    aewrRate: 19.25,
    peakMonths: 'March - November (Year-Round)',
    primaryCrops: ['Strawberries', 'Citrus / Oranges', 'Almonds & Pistachios', 'Table Grapes', 'Lettuce & Leafy Greens'],
    h2aFilingWindow: 'January - March'
  },
  {
    stateCode: 'FL',
    stateName: 'Florida',
    aewrRate: 15.55,
    peakMonths: 'October - May (Winter Season)',
    primaryCrops: ['Citrus / Oranges', 'Winter Strawberries', 'Tomatoes', 'Bell Peppers', 'Sugar Cane'],
    h2aFilingWindow: 'July - September'
  },
  {
    stateCode: 'GA',
    stateName: 'Georgia',
    aewrRate: 15.55,
    peakMonths: 'April - July & September - November',
    primaryCrops: ['Peaches', 'Blueberries', 'Vidalia Onions', 'Pecans', 'Watermelons'],
    h2aFilingWindow: 'February - April'
  },
  {
    stateCode: 'OR',
    stateName: 'Oregon',
    aewrRate: 19.75,
    peakMonths: 'June - October',
    primaryCrops: ['Hazelnuts', 'Blueberries & Blackberries', 'Sweet Cherries', 'Pears', 'Nursery & Greenhouse'],
    h2aFilingWindow: 'March - May'
  },
  {
    stateCode: 'MI',
    stateName: 'Michigan',
    aewrRate: 18.50,
    peakMonths: 'May - October',
    primaryCrops: ['Tart Cherries', 'Apples', 'Asparagus', 'Blueberries', 'Cucumbers'],
    h2aFilingWindow: 'February - April'
  },
  {
    stateCode: 'NC',
    stateName: 'North Carolina',
    aewrRate: 16.05,
    peakMonths: 'May - November',
    primaryCrops: ['Sweet Potatoes', 'Tobacco', 'Christmas Trees', 'Cucumbers', 'Apples'],
    h2aFilingWindow: 'March - May'
  },
  {
    stateCode: 'TX',
    stateName: 'Texas',
    aewrRate: 15.75,
    peakMonths: 'Year-Round / October - June',
    primaryCrops: ['Cotton', 'Rio Grande Valley Citrus', 'Pecans', 'Livestock / Ranches', 'Watermelons'],
    h2aFilingWindow: 'July - September'
  },
  {
    stateCode: 'CO',
    stateName: 'Colorado',
    aewrRate: 17.85,
    peakMonths: 'November - April (Ski/H-2B) & June - Oct (Ag)',
    primaryCrops: ['Ski Resort Hospitality (H-2B)', 'Palisade Peaches', 'Rocky Ford Melons', 'Onions'],
    h2aFilingWindow: 'August - October (H-2B Winter Window)'
  },
  {
    stateCode: 'AK',
    stateName: 'Alaska',
    aewrRate: 18.00,
    peakMonths: 'May - September (Salmon/Seafood)',
    primaryCrops: ['Wild Salmon Processing (H-2B)', 'Pollock / Crab Processing', 'Cannery Operations'],
    h2aFilingWindow: 'January - March'
  }
];

export const CERTIFIED_SEASONAL_EMPLOYERS: SeasonalEmployer[] = [
  {
    id: 'h2-001',
    name: 'Wonderful Orchards (The Wonderful Company)',
    category: 'Agriculture (H-2A)',
    visaType: 'H-2A',
    state: 'California',
    stateCode: 'CA',
    city: 'Shafter / Kern County',
    primaryCropOrService: 'Pistachios, Almonds & Pomegranates',
    peakSeasonMonths: 'August - November',
    hourlyWageRange: '$19.25 - $22.50 / hr (AEWR Guaranteed)',
    housingProvidedFree: true,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.wonderful.com/careers/',
    description: 'World’s largest grower of almonds and pistachios. Certified H-2A program offering free licensed family housing, daily field transport, and inbound airfare reimbursement.'
  },
  {
    id: 'h2-002',
    name: 'Stemilt Growers LLC',
    category: 'Agriculture (H-2A)',
    visaType: 'H-2A',
    state: 'Washington',
    stateCode: 'WA',
    city: 'Wenatchee',
    primaryCropOrService: 'Apples, Sweet Cherries, Pears & Peaches',
    peakSeasonMonths: 'June - November',
    hourlyWageRange: '$19.75 - $24.00 / hr',
    housingProvidedFree: true,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.stemilt.com/careers/',
    description: 'Premier Pacific Northwest tree fruit grower. Modern on-farm dormitory housing, kitchen facilities, and certified DOL compliance.'
  },
  {
    id: 'h2-003',
    name: 'Driscoll’s Certified Grower Partners',
    category: 'Agriculture (H-2A)',
    visaType: 'H-2A',
    state: 'California',
    stateCode: 'CA',
    city: 'Watsonville / Salinas Valley',
    primaryCropOrService: 'Strawberries, Raspberries & Blueberries',
    peakSeasonMonths: 'March - October',
    hourlyWageRange: '$19.25 - $23.00 / hr',
    housingProvidedFree: true,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.driscolls.com/about/careers',
    description: 'Global berry leader partnering with certified California farms offering verified H-2A agricultural contracts with piece-rate bonuses.'
  },
  {
    id: 'h2-004',
    name: 'Gebbers Farms',
    category: 'Agriculture (H-2A)',
    visaType: 'H-2A',
    state: 'Washington',
    stateCode: 'WA',
    city: 'Brewster',
    primaryCropOrService: 'Cherries and Honeycrisp Apples',
    peakSeasonMonths: 'June - November',
    hourlyWageRange: '$19.75 - $22.00 / hr',
    housingProvidedFree: true,
    travelReimbursed: true,
    officialCareersUrl: 'https://gebbersfarms.com/',
    description: 'One of the largest contiguous apple and cherry orchards in North America. Thousands of verified seasonal harvest positions annually.'
  },
  {
    id: 'h2-005',
    name: 'Trident Seafoods Corporation',
    category: 'Seafood Processing (H-2B)',
    visaType: 'H-2B',
    state: 'Alaska',
    stateCode: 'AK',
    city: 'Akutan / Kodiak / Bristol Bay',
    primaryCropOrService: 'Wild Alaska Salmon & Pollock Processing',
    peakSeasonMonths: 'June - September',
    hourlyWageRange: '$18.00 - $22.00 / hr + Overtime ($27-$33/hr)',
    housingProvidedFree: false,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.tridentseafoods.com/join-our-team/',
    description: 'Largest vertically integrated seafood company in North America. High overtime potential (60-70 hrs/week), company-provided meals/room board deductions, and direct Seattle/Alaska flights.'
  },
  {
    id: 'h2-006',
    name: 'Silver Bay Seafoods',
    category: 'Seafood Processing (H-2B)',
    visaType: 'H-2B',
    state: 'Alaska',
    stateCode: 'AK',
    city: 'Sitka / Valdez / Naknek',
    primaryCropOrService: 'Salmon Processing & Canning',
    peakSeasonMonths: 'June - August',
    hourlyWageRange: '$17.50 - $21.00 / hr + Overtime',
    housingProvidedFree: false,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.silverbayseafoods.com/employment/',
    description: 'Fisherman-owned processing network in pristine Alaskan coastal ports. Rapid seasonal earning potential for intensive summer contracts.'
  },
  {
    id: 'h2-007',
    name: 'Xanterra Travel Collection (National Parks)',
    category: 'Seasonal Hospitality (H-2B)',
    visaType: 'H-2B',
    state: 'Wyoming / Colorado',
    stateCode: 'WY',
    city: 'Yellowstone / Grand Canyon',
    primaryCropOrService: 'Hospitality, Culinary, Housekeeping & Guest Services',
    peakSeasonMonths: 'May - October & December - March',
    hourlyWageRange: '$16.00 - $19.50 / hr',
    housingProvidedFree: false,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.xanterrajobs.com/',
    description: 'Concessionaire operating historic lodges in America’s iconic National Parks. Subsidized employee dormitories, employee dining rooms, and park passes.'
  },
  {
    id: 'h2-008',
    name: 'Vail Resorts',
    category: 'Ski & Winter Resort (H-2B)',
    visaType: 'H-2B',
    state: 'Colorado',
    stateCode: 'CO',
    city: 'Vail / Breckenridge / Beaver Creek',
    primaryCropOrService: 'Ski Lift Operations, Food & Beverage, Hospitality',
    peakSeasonMonths: 'November - April',
    hourlyWageRange: '$20.00 - $24.00 / hr + Free Epic Ski Pass',
    housingProvidedFree: false,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.vailresortscareers.com/',
    description: 'Premier mountain resort company in the world. Generous employee ski passes, subsidized mountain town housing, and international seasonal visa programs.'
  },
  {
    id: 'h2-009',
    name: 'BrightView Landscapes',
    category: 'Landscaping & Forestry (H-2B)',
    visaType: 'H-2B',
    state: 'Texas / Florida / Carolinas',
    stateCode: 'TX',
    city: 'Dallas / Houston / Orlando',
    primaryCropOrService: 'Commercial Landscape Maintenance & Turf Care',
    peakSeasonMonths: 'March - November',
    hourlyWageRange: '$16.50 - $20.00 / hr',
    housingProvidedFree: false,
    travelReimbursed: true,
    officialCareersUrl: 'https://www.brightview.com/careers',
    description: 'Largest commercial landscaping employer in the US. Comprehensive safety training, DOL prevailing wage compliance, and certified H-2B positions.'
  },
  {
    id: 'h2-010',
    name: 'Southern Valley Fruit & Vegetable',
    category: 'Agriculture (H-2A)',
    visaType: 'H-2A',
    state: 'Georgia',
    stateCode: 'GA',
    city: 'Norman Park',
    primaryCropOrService: 'Bell Peppers, Squash, Cucumbers & Cabbage',
    peakSeasonMonths: 'April - July & September - November',
    hourlyWageRange: '$15.55 - $18.00 / hr',
    housingProvidedFree: true,
    travelReimbursed: true,
    officialCareersUrl: 'https://southernvalley.us/',
    description: 'Multi-generation family produce grower in South Georgia offering licensed on-site housing, daily transportation, and guaranteed Adverse Effect Wage Rates.'
  }
];
