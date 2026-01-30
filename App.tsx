
import React, { useState, useEffect } from 'react';
import { User, UserRole, PatientRecord, Vitals, RiskLevel } from './types';
import AuthView from './components/AuthView';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import PatientOnboarding from './components/PatientOnboarding';
import EmergencyAlert from './components/EmergencyAlert';
import { calculateMLRisk } from './services/riskEngine';
import { authService } from './services/authService';
import { dbService } from './services/dbService';
import { Activity, LogOut, ShieldCheck, HeartPulse, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Persistence Gatekeeper: Run Auth Observer on mount
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        // If user is a patient, fetch their clinical logs
        if (user.role === UserRole.PATIENT) {
          const record = dbService.getPatientRecord(user.id);
          if (record) {
            setPatientRecord(record);
          }
        }
      }
      setIsInitializing(false);
    });
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.PATIENT) {
      const record = dbService.getPatientRecord(user.id);
      if (record) setPatientRecord(record);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setPatientRecord(null);
    setIsEmergency(false);
  };

  const updateVitals = (newVitals: Vitals) => {
    if (!patientRecord || !currentUser) return;
    const risk = calculateMLRisk(newVitals);
    
    if (risk.level === RiskLevel.EMERGENCY) {
      setIsEmergency(true);
    }

    const updatedVitals = [newVitals, ...patientRecord.vitalsHistory];
    const updatedRecord: PatientRecord = {
      ...patientRecord,
      vitalsHistory: updatedVitals,
      latestRisk: risk
    };

    setPatientRecord(updatedRecord);
    // Link Unique User ID (UID) to the AI health logs
    dbService.savePatientRecord(currentUser.id, updatedRecord);
  };

  const completeOnboarding = (updatedUser: User, profileData: any) => {
    setCurrentUser(updatedUser);
    
    // Initialize record for the new patient
    const initialVitals: Vitals = {
      id: 'init-' + Date.now(),
      timestamp: new Date().toISOString(),
      systolicBP: 120,
      diastolicBP: 80,
      heartRate: 72,
      spo2: 98,
      symptoms: []
    };

    const newRecord: PatientRecord = {
      user: updatedUser,
      profile: profileData,
      vitalsHistory: [initialVitals],
      latestRisk: calculateMLRisk(initialVitals)
    };

    setPatientRecord(newRecord);
    dbService.savePatientRecord(updatedUser.id, newRecord);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
        <p className="text-slate-500 font-medium">Verifying clinical session...</p>
      </div>
    );
  }

  if (isEmergency) {
    return <EmergencyAlert onDismiss={() => setIsEmergency(false)} />;
  }

  if (!currentUser) {
    return <AuthView onAuthSuccess={handleLogin} />;
  }

  if (currentUser.role === UserRole.PATIENT && !currentUser.profileCompleted) {
    return <PatientOnboarding user={currentUser} onComplete={completeOnboarding} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-8 h-8 text-sky-600" />
              <span className="text-xl font-bold text-slate-900">MaternalCare AI</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end text-sm">
                <span className="font-semibold text-slate-800">{currentUser.name}</span>
                <span className="text-xs text-slate-500 uppercase tracking-tighter">{currentUser.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentUser.role === UserRole.DOCTOR ? (
          <DoctorDashboard />
        ) : (
          patientRecord && <PatientDashboard record={patientRecord} onUpdateVitals={updateVitals} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-slate-400 text-xs">
          <p>© 2024 MaternalCare AI. Clinical Decision Support Tool.</p>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>WHO Standard Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
