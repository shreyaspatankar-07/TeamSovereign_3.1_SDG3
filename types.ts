
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileCompleted: boolean;
}

export interface PatientProfile {
  age: number;
  gestationalWeeks: number;
  medicalHistory: string[];
  lastPeriodDate: string;
}

export interface Vitals {
  id: string;
  timestamp: string;
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  spo2: number;
  glucose?: number; // mg/dL
  hemoglobin?: number; // g/dL
  symptoms: string[];
}

export enum RiskLevel {
  STABLE = 'STABLE',
  URGENT = 'URGENT',
  EMERGENCY = 'EMERGENCY'
}

export interface RiskAssessment {
  score: number; // 0.0 to 1.0
  level: RiskLevel;
  reasons: string[];
  aiNote?: string;
}

export interface PatientRecord {
  user: User;
  profile: PatientProfile;
  vitalsHistory: Vitals[];
  latestRisk: RiskAssessment;
}
