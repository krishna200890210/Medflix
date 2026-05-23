/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  FamilyMember,
  Medication,
  DrugInteraction,
  HealthReport,
  BiomarkerData,
  Appointment,
  TimelineEvent,
  HealthAlert,
} from './types';

export const familyMembers: FamilyMember[] = [
  {
    id: 'rahul',
    name: 'Rahul Sharma',
    role: 'Family Admin',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+0',
    allergies: ['Penicillin'],
    emergencyContact: 'Sunita Sharma (+91 98765 43211)',
    occupation: 'Software Engineer',
    location: 'Bangalore, India',
    email: 'rahul@medflix.demo',
    phone: '+91 98765 43210',
    conditions: ['Mild Screen Eye Strain', 'Vitamin D Insufficiency'],
    lastReportDate: '2026-04-10',
    healthScore: 89,
    status: 'Optimum',
    statusText: 'Excellent shape. Focus on sleep quality and screen breaks.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'ramesh',
    name: 'Ramesh Sharma',
    role: 'Father',
    age: 67,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Sulfa Drugs'],
    emergencyContact: 'Rahul Sharma (+91 98765 43210)',
    conditions: ['Type 2 Diabetes', 'Hypertension', 'High Cholesterol', 'Mild Chronic Kidney Disease (Stage 2)'],
    lastReportDate: '2026-05-12',
    healthScore: 71,
    status: 'Improving',
    statusText: 'HbA1c and Cholesterol improving. Hypertension under watch.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'sunita',
    name: 'Sunita Sharma',
    role: 'Mother',
    age: 63,
    gender: 'Female',
    bloodGroup: 'A+',
    allergies: ['Dust Mites', 'Gluten Sensitivity'],
    emergencyContact: 'Rahul Sharma (+91 98765 43210)',
    conditions: ['Hypothyroidism', 'Osteoarthritis (Knee)', 'Severe Vitamin D Deficiency'],
    lastReportDate: '2026-05-02',
    healthScore: 76,
    status: 'Stable',
    statusText: 'Thyroid levels optimized. Pain management and Vitamin D recovery are ongoing.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
  },
];

export const medications: Medication[] = [
  // Ramesh Sharma (Father)
  {
    id: 'med-ramesh-1',
    memberId: 'ramesh',
    name: 'Metformin Hydrochloride',
    dosage: '500 mg',
    frequency: 'Twice daily, with breakfast & dinner',
    pillsRemaining: 12,
    pillsTotal: 60,
    refillDate: '2026-05-29',
    startDate: '2024-03-15',
    status: 'changed', // adjusted dosing frequency
  },
  {
    id: 'med-ramesh-2',
    memberId: 'ramesh',
    name: 'Amlodipine Besylate',
    dosage: '5 mg',
    frequency: 'Once daily, in the morning',
    pillsRemaining: 24,
    pillsTotal: 30,
    refillDate: '2026-06-16',
    startDate: '2023-11-20',
    status: 'active',
  },
  {
    id: 'med-ramesh-3',
    memberId: 'ramesh',
    name: 'Rosuvastatin Calcium',
    dosage: '10 mg',
    frequency: 'Once daily, at bedtime',
    pillsRemaining: 5,
    pillsTotal: 30,
    refillDate: '2026-05-28',
    startDate: '2025-01-10',
    status: 'active',
  },

  // Sunita Sharma (Mother)
  {
    id: 'med-sunita-1',
    memberId: 'sunita',
    name: 'Levothyroxine Sodium (Thyroxine)',
    dosage: '75 mcg',
    frequency: 'Once daily, on an empty stomach (30 mins before breakfast)',
    pillsRemaining: 45,
    pillsTotal: 90,
    refillDate: '2026-07-07',
    startDate: '2022-08-01',
    status: 'active',
  },
  {
    id: 'med-sunita-2',
    memberId: 'sunita',
    name: 'Calcium + Vitamin D3 Supplement',
    dosage: '500 mg / 250 IU',
    frequency: 'Once daily, with lunch',
    pillsRemaining: 18,
    pillsTotal: 60,
    refillDate: '2026-06-10',
    startDate: '2025-05-01',
    status: 'increased', // high dose prescribed recently due to deficiency
  },
  {
    id: 'med-sunita-3',
    memberId: 'sunita',
    name: 'Tramadol Hydrochloride',
    dosage: '50 mg',
    frequency: 'As needed for high osteoarthritis knee pain (Max 1/day)',
    pillsRemaining: 10,
    pillsTotal: 20,
    refillDate: '2026-08-15',
    startDate: '2025-10-12',
    status: 'active',
  },

  // Rahul Sharma (Admin)
  {
    id: 'med-rahul-1',
    memberId: 'rahul',
    name: 'Vitamin D3 Sachet (Cholecalciferol)',
    dosage: '60,000 IU',
    frequency: 'Once a week with milk, Sunday mornings',
    pillsRemaining: 3,
    pillsTotal: 8,
    refillDate: '2026-06-14',
    startDate: '2026-04-12',
    status: 'active',
  },
];

export const drugInteractions: DrugInteraction[] = [
  {
    id: 'int-1',
    memberId: 'sunita',
    severity: 'moderate',
    title: 'Thyroxine Absorption Reduced by Calcium',
    description: 'Levothyroxine (Thyroxine) and Calcium Supplements should be taken at least 4 hours apart. Calcium binds to Thyroxine in the stomach, reducing its absorption and rendering the thyroid therapy less effective.',
    drugsInvolved: ['Levothyroxine Sodium', 'Calcium + Vitamin D3'],
  },
  {
    id: 'int-2',
    memberId: 'ramesh',
    severity: 'mild',
    title: 'Rosuvastatin + Renal Load Watch',
    description: 'Statins and hypertension therapy can slightly impact kidney clearance marker values. Since Ramesh exhibits Stage 2 CKD (Creatinine ~1.31 mg/dL), annual EGFR and kidney wellness reports are highly advised.',
    drugsInvolved: ['Rosuvastatin Calcium', 'Amlodipine Besylate'],
  },
];

export const healthReports: HealthReport[] = [
  // Ramesh reports
  {
    id: 'rep-ramesh-1',
    memberId: 'ramesh',
    hospitalName: 'Apollo Hospital Bangalore',
    date: '2026-05-12',
    reportType: 'Diabetes & Kidney Special Profile',
    fileName: 'apollo_diabetes_kidney_may2026.pdf',
    keyFindings: [
      'HbA1c improved safely to 7.4% (down from 8.1% six months ago)',
      'Serum Creatinine remains border elevated at 1.31 mg/dL (indicating mild Stage 2 renal filtration load)',
      'Estimated GFR (eGFR) is 58 mL/min/1.73m², requiring steady continuous hydration monitoring',
      'Fasting Blood Sugar is 128 mg/dL, showing good active control'
    ],
    aiSummary: 'Ramesh’s overall diabetes profile is on a positive trend. The step-down in HbA1c from 8.1% to 7.4% reflects optimal medication adherence. However, the border-line elevated Creatinine (1.31 mg/dL) and eGFR of 58 indicate mild kidney strain. Maintain high hydration, low sodium intake, and avoid unprescribed pain relievers.',
    riskIndicator: 'medium',
    abnormalValues: [
      {
        marker: 'HbA1c',
        value: '7.4%',
        referenceRange: '4.0% - 5.6% (Optimal), >6.5% (Diabetes)',
        status: 'high',
        description: 'Diabetes marker, but significantly improved compared to past results (8.1%).',
      },
      {
        marker: 'Serum Creatinine',
        value: '1.31 mg/dL',
        referenceRange: '0.60 - 1.20 mg/dL',
        status: 'high',
        description: 'Elevated. Highly indicates Stage 2 Kidney function profile (mild reduction). Avoid NSAIDs.',
      },
      {
        marker: 'eGFR',
        value: '58 ml/min/1.73m²',
        referenceRange: '> 90 (Normal)',
        status: 'low',
        description: 'Mildly reduced filtration rate. Requires tracking to prevent hydration lag.',
      },
    ],
    aiRecommendations: [
      'Maintain an daily average water intake of 2.5 - 3 Liters dry baseline.',
      'Check urine protein microalbuminuria ratio in next quarterly test.',
      'Request physician to review Rosuvastatin loading dose relative to kidney profile.',
      'Check fasting glucose levels visually twice a week using a glucometer.'
    ],
  },
  {
    id: 'rep-ramesh-2',
    memberId: 'ramesh',
    hospitalName: 'Manipal Hospitals Bangalore',
    date: '2026-02-10',
    reportType: 'Comprehensive Lipids & BP Follow-up',
    fileName: 'manipal_lipid_bp_feb2026.pdf',
    keyFindings: [
      'Total Cholesterol lowered to 210 mg/dL (from 245 mg/dL)',
      'LDL Cholesterol ("Bad") stands at 122 mg/dL (Border High, targeted is < 100 for cardiac watch patients)',
      'HDL Cholesterol ("Good") is 42 mg/dL (Acceptable)',
      'Blood Pressure averaged 138/88 mmHg across 3 manual clinical trials'
    ],
    aiSummary: 'Lipid control has shown a positive leap of 14% improvement since starting Rosuvastatin 10mg. Total cholesterol fell from a worrying 245 mg/dL in January to 210 mg/dL. Blood pressure is borderline high at 138/88 mmHg, indicating that lifestyle modulations like salt restriction should be continued strictly and synced with Amlodipine.',
    riskIndicator: 'medium',
    abnormalValues: [
      {
        marker: 'Total Cholesterol',
        value: '210 mg/dL',
        referenceRange: '100 - 200 mg/dL',
        status: 'high',
        description: 'Slightly high but reflects a substantial decrease from the 245 baseline.',
      },
      {
        marker: 'LDL Cholesterol',
        value: '122 mg/dL',
        referenceRange: '< 100 mg/dL (Cardiac goal)',
        status: 'high',
        description: 'Borderline elevated. High-density statin therapy has been helpful in driving this down.',
      },
      {
        marker: 'Systolic BP',
        value: '138 mmHg',
        referenceRange: '90 - 120 mmHg',
        status: 'high',
        description: 'Level is borderline stage 1 hypertension, stabilized under morning Amlodipine 5mg.',
      },
    ],
    aiRecommendations: [
      'Restrict dietary salt intake to under 2 grams daily (half-teaspoon max).',
      'Integrate 30 minutes of low-impact walking 5 days a week.',
      'Increase fibrous foods (oats, flaxseeds, legumes) which help absorb bile fats in digestion.'
    ],
  },

  // Sunita reports
  {
    id: 'rep-sunita-1',
    memberId: 'sunita',
    hospitalName: 'Fortis Hospital Bannerghatta',
    date: '2026-05-02',
    reportType: 'Comprehensive Endocrine Panel & Joint Scans',
    fileName: 'fortis_thyroid_joint_may2026.pdf',
    keyFindings: [
      'TSH (Thyroid Stimulating Hormone) is highly stable at 2.41 mIU/L (perfectly on target with Levothyroxine 75mcg)',
      '25-Hydroxy Vitamin D is severely deficient at 18.2 ng/mL (highly correlates with osteoarthritis knee joint pain spikes)',
      'Serum Calcium is 8.9 mg/dL (borderline low normal)',
      'Right knee X-Ray indicates moderate Osteoarthritis with joint space narrowing at the medial compartment'
    ],
    aiSummary: 'Sunita’s Hypothyroidism is beautifully regulated on her current Levothyroxine dose, with TSH on target at 2.41. However, the root underlying factor for her persistent knee arthritis pain is a combination of joint space narrowing and a severe Vitamin D deficiency (18.2 ng/mL). Rectifying the Vitamin D deficit via high dose supplementation will promote calcium absorption and joint relief.',
    riskIndicator: 'high',
    abnormalValues: [
      {
        marker: 'Vitamin D (25-OH)',
        value: '18.2 ng/mL',
        referenceRange: '30.0 - 100.0 ng/mL (Suboptimal <30, Deficient <20)',
        status: 'low',
        description: 'Severely low. Impedes skeletal calcium integration, exacerbating osteoarthritis pain.',
      },
      {
        marker: 'Calcium',
        value: '8.9 mg/dL',
        referenceRange: '8.8 - 10.2 mg/dL',
        status: 'normal',
        description: 'Lower limit of normal. Calcium intake requires backing by Vitamin D synthesis.',
      },
    ],
    aiRecommendations: [
      'Verify execution of Vit D3 supplemental plan (usually 60k IU weekly for 8-12 weeks).',
      'Take Thyroxine strictly 30-45 mins before breakfast, and delay Calcium ingestion to lunch.',
      'Utilize soft knee braces during morning walks to minimize bone-on-bone stress.',
      'Integrate low-impact quadricep exercises (straight leg raises) to stabilize patellar tracking.'
    ],
  },

  // Rahul reports
  {
    id: 'rep-rahul-1',
    memberId: 'rahul',
    hospitalName: 'Narayana Health Bangalore',
    date: '2026-04-10',
    reportType: 'Standard Annual Health Check',
    fileName: 'narayana_rahul_annual_apr2026.pdf',
    keyFindings: [
      'HbA1c is excellent at 5.2% (optimal metabolics)',
      'Vitamin D is borderline insufficient at 28.5 ng/mL (due to software professional indoor scheduling)',
      'High-Density Lipid (HDL) is 58 mg/dL (very protective cardiac level)',
      'Liver functions (SGOT/SGPT) and kidney functions are well within normal ranges'
    ],
    aiSummary: 'Rahul’s parameters are healthy and optimal. The only notable deficit is a borderline Vitamin D level of 28.5 ng/mL, commonly observed in indoor tech work schedules. Initiating a mild weekly maintenance booster has successfully arrested this. Eye strain is functional, requiring a 20-20-20 break adjustment.',
    riskIndicator: 'low',
    abnormalValues: [
      {
        marker: 'Vitamin D (25-OH)',
        value: '28.5 ng/mL',
        referenceRange: '30.0 - 100.0 ng/mL',
        status: 'low',
        description: 'Suboptimal level due to indoor posture. Under soft weekend maintenance.',
      },
    ],
    aiRecommendations: [
      'Ensure 15 minutes of direct sunrise dermal exposure during peak UV-B times weekly.',
      'Incorporate blue-light cut mechanics and follow the 20-20-20 rule during programming.'
    ],
  },
];

// 12 months history for biomarkers
export const biomarkers: BiomarkerData[] = [
  // Ramesh Sharma (Father)
  {
    memberId: 'ramesh',
    marker: 'HbA1c',
    history: [
      { date: 'Jun 2025', value: 8.3, status: 'high' },
      { date: 'Aug 2025', value: 8.1, status: 'high' },
      { date: 'Oct 2025', value: 7.9, status: 'high' },
      { date: 'Dec 2025', value: 7.8, status: 'high' },
      { date: 'Feb 2026', value: 7.6, status: 'high' },
      { date: 'May 2026', value: 7.4, status: 'high' },
    ],
  },
  {
    memberId: 'ramesh',
    marker: 'Cholesterol',
    history: [
      { date: 'Jun 2025', value: 250, status: 'high' },
      { date: 'Aug 2025', value: 245, status: 'high' },
      { date: 'Oct 2025', value: 238, status: 'high' },
      { date: 'Dec 2025', value: 228, status: 'high' },
      { date: 'Feb 2026', value: 220, status: 'high' },
      { date: 'May 2026', value: 210, status: 'high' },
    ],
  },
  {
    memberId: 'ramesh',
    marker: 'BP (Systolic)',
    history: [
      { date: 'Jun 2025', value: 144, status: 'high' },
      { date: 'Aug 2025', value: 142, status: 'high' },
      { date: 'Oct 2025', value: 140, status: 'high' },
      { date: 'Dec 2025', value: 139, status: 'high' },
      { date: 'Feb 2026', value: 138, status: 'high' },
      { date: 'May 2026', value: 135, status: 'high' },
    ],
  },
  {
    memberId: 'ramesh',
    marker: 'Serum Creatinine',
    history: [
      { date: 'Jun 2025', value: 1.18, status: 'normal' },
      { date: 'Aug 2025', value: 1.20, status: 'normal' },
      { date: 'Oct 2025', value: 1.25, status: 'high' },
      { date: 'Dec 2025', value: 1.28, status: 'high' },
      { date: 'Feb 2026', value: 1.30, status: 'high' },
      { date: 'May 2026', value: 1.31, status: 'high' },
    ],
  },

  // Sunita Sharma (Mother)
  {
    memberId: 'sunita',
    marker: 'TSH (Thyroid)',
    history: [
      { date: 'Jun 2025', value: 4.8, status: 'high' },
      { date: 'Aug 2025', value: 4.1, status: 'high' },
      { date: 'Oct 2025', value: 3.2, status: 'normal' },
      { date: 'Dec 2025', value: 2.8, status: 'normal' },
      { date: 'Feb 2026', value: 2.5, status: 'normal' },
      { date: 'May 2026', value: 2.4, status: 'normal' },
    ],
  },
  {
    memberId: 'sunita',
    marker: 'Vitamin D',
    history: [
      { date: 'Jun 2025', value: 24, status: 'low' },
      { date: 'Aug 2025', value: 25, status: 'low' },
      { date: 'Oct 2025', value: 22, status: 'low' },
      { date: 'Dec 2025', value: 20, status: 'low' },
      { date: 'Feb 2026', value: 19, status: 'low' },
      { date: 'May 2026', value: 18.2, status: 'low' },
    ],
  },
];

export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    memberId: 'ramesh',
    doctorName: 'Dr. Srinivas Prasad',
    specialty: 'Cardiologist',
    hospital: 'Fortis Hospital, Bannerghatta',
    date: '24 May 2026',
    time: '11:30 AM',
    status: 'upcoming',
    notes: 'Bi-annual cardiac safety checkup and lipid-lowering review. Ensure reports for Cholesterol are carried.',
  },
  {
    id: 'appt-2',
    memberId: 'sunita',
    doctorName: 'Dr. Leela Rao',
    specialty: 'Endocrinologist',
    hospital: 'Manipal Hospital, Bangalore',
    date: '02 Jun 2026',
    time: '04:00 PM',
    status: 'upcoming',
    notes: 'Thyroid state follow-up. Carry TSH Fortis report from May 2026. Avoid food 4 hours prior.',
  },
  {
    id: 'appt-3',
    memberId: 'ramesh',
    doctorName: 'Dr. S. K. Mittal',
    specialty: 'Diabetologist',
    hospital: 'Apollo Clinics, Bangalore',
    date: '15 Apr 2026',
    time: '10:00 AM',
    status: 'past',
    notes: 'Reviewed HbA1c values. Adjusted Metformin loading frequency to twice daily based on 8.1% reading.',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'time-1',
    memberId: 'ramesh',
    date: 'Jan 15, 2025',
    type: 'medication_change',
    title: 'Diabetes Medication Adjusted',
    description: 'Dr. Mittal adjusted Ramesh’s Metformin regimen from once daily to twice daily (morning & night, with food) to tackle elevated HbA1c spikes.',
  },
  {
    id: 'time-2',
    memberId: 'ramesh',
    date: 'Feb 10, 2026',
    type: 'report',
    title: 'Manipal Lipids & BP Completed',
    description: 'Total cholesterol fell by 14% to 210 mg/dL. Fasting blood glucose was recorded at 134 mg/dL. BP noted as 138/88.',
    relatedReportId: 'rep-ramesh-2',
  },
  {
    id: 'time-3',
    memberId: 'ramesh',
    date: 'Mar 12, 2025',
    type: 'alert',
    title: 'Cholesterol Risk Warning Tagged',
    description: 'AI model flagged an LDL trend of 145 mg/dL from lab sheets, issuing warning regarding potential cardiovascular impact due to underlying hypertension.',
  },
  {
    id: 'time-4',
    memberId: 'ramesh',
    date: 'Apr 15, 2026',
    type: 'hospital_visit',
    title: 'Diabetology Consultation',
    description: 'Apollo review completed. The clinician observed high adherence to dosing changes, noting positive muscular response and no Metformin-linked acidity.',
  },
  {
    id: 'time-5',
    memberId: 'sunita',
    date: 'May 02, 2026',
    type: 'report',
    title: 'Fortis Joint Scans and Thyroid Panel',
    description: 'Thyroid profile recorded at exceptional stability (TSH: 2.41). However, scan reports revealed osteo-narrowing of knees and severe Vitamin D lack (18.2 ng/mL).',
    relatedReportId: 'rep-sunita-1',
  },
  {
    id: 'time-6',
    memberId: 'ramesh',
    date: 'May 12, 2026',
    type: 'report',
    title: 'Apollo Diabetes Profile Analysis',
    description: 'Latest report indicates HbA1c has touched a safe 7.4%. Kidney clearance values are border high (Creatinine 1.31 mg/dL), denoting filtration pressure.',
    relatedReportId: 'rep-ramesh-1',
  },
];

export const healthAlerts: HealthAlert[] = [
  {
    id: 'al-1',
    memberId: 'sunita',
    type: 'critical',
    category: 'drug_conflict',
    title: 'Drug Absorption Conflict Detected',
    description: 'Sunita takes Levothyroxine in early morning, but recently added a dense Calcium dosage which is sometimes ingested concurrently. Calcium binds to Thyroxine in the stomach, reducing its absorption. Separate ingestion times by at least 4 hours.',
    date: '2026-05-23',
    acknowledged: false,
  },
  {
    id: 'al-2',
    memberId: 'ramesh',
    type: 'medium',
    category: 'biomarker',
    title: 'Elevated Kidney Clearance Impairment (GFR: 58)',
    description: 'Ramesh’s Glomerular Filtration Rate has progressed to a Stage 2 CKD profile (eGFR of 58). GFR is under 60. Monitor hydration carefully, control salt ingestion, and avoid Ibuprofen or other NSAID painkillers which harm kidneys.',
    date: '2026-05-22',
    acknowledged: false,
  },
  {
    id: 'al-3',
    memberId: 'ramesh',
    type: 'medium',
    category: 'missed_dose',
    title: 'Amlodipine Besylate Fill Refill Warning',
    description: 'Ramesh’s Metformin Hydrochloride has 12 tablets remaining. Refill is needed by May 29, 2026, to ensure diabetic treatment continuity.',
    date: '2026-05-23',
    acknowledged: false,
  },
  {
    id: 'al-4',
    memberId: 'sunita',
    type: 'critical',
    category: 'biomarker',
    title: 'Severe Vitamin D Deficiency (18.2 ng/mL)',
    description: 'Values are significantly below safe clinical guidelines (>30 ng/mL), impeding bone protection and fueling knee joint osteoarthritis. Urgent implementation of the weekly 60k Cholecalciferol course is highly advised.',
    date: '2026-05-02',
    acknowledged: false,
  },
  {
    id: 'al-5',
    memberId: 'ramesh',
    type: 'info',
    category: 'trend',
    title: 'HbA1c Clinical Improvement Metric reached',
    description: 'AI summary identified a landmark 8.6% drop in cumulative Hemoglobin glycemic binding (fell from 8.1% to 7.4% over 6 months). Active metformin dosing changes are working successfully.',
    date: '2026-05-12',
    acknowledged: true,
  },
];
