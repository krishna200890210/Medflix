/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  emergencyContact: string;
  occupation?: string;
  location?: string;
  email?: string;
  phone?: string;
  conditions: string[];
  lastReportDate: string;
  healthScore: number;
  status: 'Critical' | 'Stable' | 'Improving' | 'Optimum';
  statusText: string;
  avatarUrl: string;
}

export interface Medication {
  id: string;
  memberId: string;
  name: string;
  dosage: string;
  frequency: string;
  pillsRemaining: number;
  pillsTotal: number;
  refillDate: string;
  startDate: string;
  status: 'active' | 'changed' | 'increased' | 'stopped';
}

export interface DrugInteraction {
  id: string;
  memberId: string;
  severity: 'severe' | 'moderate' | 'mild';
  title: string;
  description: string;
  drugsInvolved: string[];
}

export interface HealthReport {
  id: string;
  memberId: string;
  hospitalName: string;
  date: string;
  reportType: string;
  fileName: string;
  keyFindings: string[];
  aiSummary: string;
  riskIndicator: 'high' | 'medium' | 'low';
  abnormalValues: {
    marker: string;
    value: string;
    referenceRange: string;
    status: 'high' | 'low' | 'normal';
    description: string;
  }[];
  aiRecommendations: string[];
}

export interface BiomarkerData {
  memberId: string;
  marker: string; // 'HbA1c' | 'TSH' | 'Cholesterol' | 'BP_Systolic' | 'BP_Diastolic' | 'VitaminD'
  history: {
    date: string;
    value: number;
    secondary?: number; // e.g., for BP
    status: 'high' | 'low' | 'normal';
  }[];
}

export interface Appointment {
  id: string;
  memberId: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: 'upcoming' | 'past';
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  memberId: string;
  date: string;
  type: 'diagnosis' | 'hospital_visit' | 'surgery' | 'report' | 'medication_change' | 'alert';
  title: string;
  description: string;
  relatedReportId?: string;
  relatedMedId?: string;
}

export interface HealthAlert {
  id: string;
  memberId: string;
  type: 'critical' | 'medium' | 'info';
  category: 'drug_conflict' | 'missed_dose' | 'biomarker' | 'test_overdue' | 'trend';
  title: string;
  description: string;
  date: string;
  acknowledged: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
  graphData?: {
    title: string;
    markerType: string;
    memberId: string;
  };
}
