export const CLINICAL_THRESHOLDS = {
  PREECLAMPSIA: {
    NORMAL: { systolic: 120, diastolic: 80 },
    URGENT: { systolic: 140, diastolic: 90 }, // Clinical Concern: ≥140/90
    EMERGENCY: { systolic: 160, diastolic: 110 }
  },
  HEART_RATE: {
    NORMAL_MAX: 110,
    CONCERN: 120 // Clinical Concern: >120 BPM
  },
  SPO2: {
    CONCERN: 94 // Clinical Concern: <94%
  },
  GESTATIONAL_DIABETES: {
    URGENT_FASTING: 95, // Clinical Concern: >95 mg/dL
    EMERGENCY_DKA: 400
  },
  ANEMIA: {
    CONCERN_HB: 10.5, // Clinical Concern: <10.5 g/dL
    SEVERE_HB: 7.0
  },
  EMERGENCY_SYMPTOMS: [
    "bleeding", "seizure", "unconscious", "blurred vision", "severe headache",
    "डोकं दुखणे", "डोळ्यांसमोर अंधार", "घाबरल्यासारखे वाटणे", "पोटात दुखणे",
    "heavy bleeding", "swelling of face/hands"
  ],
  URGENT_SYMPTOMS: [
    "fever", "decreased fetal movement", "abdominal pain", "nausea"
  ]
};

export const COLORS = {
  PRIMARY: '#0ea5e9',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
  SUCCESS: '#10b981',
  MUTED: '#64748b',
  PURPLE: '#a855f7',
  ROSE: '#f43f5e'
};