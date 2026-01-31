
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export enum Language {
  EN = 'en',
  HI = 'hi',
  MR = 'mr'
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
  glucose?: number;
  hemoglobin?: number;
  symptoms: string[];
  isVerifiedReport?: boolean;
}

export enum RiskLevel {
  STABLE = 'STABLE',
  URGENT = 'URGENT',
  EMERGENCY = 'EMERGENCY'
}

export interface RiskAssessment {
  score: number;
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
