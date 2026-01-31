import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, PatientRecord, Vitals, RiskLevel, Language } from './types';
import AuthView from './components/AuthView';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import PatientOnboarding from './components/PatientOnboarding';
import EmergencyAlert from './components/EmergencyAlert';
import { calculateMLRisk } from './services/riskEngine';
import { authService } from './services/authService';
import { dbService } from './services/dbService';
import { offlineStore } from './services/offlineStore';
import { TRANSLATIONS } from './services/languageService';
import { LogOut, HeartPulse, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [bootError, setBootError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const recordRef = useRef<PatientRecord | null>(null);
  useEffect(() => { recordRef.current = patientRecord; }, [patientRecord]);

  const t = TRANSLATIONS[language];

  const initializeApp = async () => {
    setIsInitializing(true);
    setBootError(null);
    try {
      try {
        await offlineStore.init();
      } catch (e) { console.warn("Persistence Init failed", e); }

      authService.onAuthStateChanged(async (user) => {
        if (user) {
          setCurrentUser(user);
          if (user.role === UserRole.PATIENT) {
            let record = dbService.getPatientRecord(user.id);
            const cachedLogs = await offlineStore.getLastLogs();
            if (record) {
              if (cachedLogs.length > 0) {
                record.vitalsHistory = cachedLogs;
                record.latestRisk = calculateMLRisk(cachedLogs[0], record.profile);
              }
              setPatientRecord(record);
            }
          }
        }
        setIsInitializing(false);
      });
    } catch (err: any) {
      setBootError("Clinical engine failed to start.");
      setIsInitializing(false);
    }
  };

  useEffect(() => { initializeApp(); }, []);

  const updateVitals = async (newVitals: Vitals) => {
    const currentRec = recordRef.current;
    if (!currentRec || !currentUser) return;

    const risk = calculateMLRisk(newVitals, currentRec.profile);
    if (risk.level === RiskLevel.EMERGENCY) setIsEmergency(true);
    
    const updatedVitals = [newVitals, ...currentRec.vitalsHistory].slice(0, 100);
    const updatedRecord: PatientRecord = { ...currentRec, vitalsHistory: updatedVitals, latestRisk: risk };
    
    setPatientRecord(updatedRecord);
    dbService.savePatientRecord(currentUser.id, updatedRecord);
    try { await offlineStore.saveVitals(newVitals); } catch (e) { console.error("Save failed", e); }
  };

  const handleUpdateRecord = (updatedRecord: PatientRecord) => {
    if (!currentUser) return;
    setPatientRecord(updatedRecord);
    dbService.savePatientRecord(currentUser.id, updatedRecord);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100">
          <HeartPulse className="w-10 h-10 text-sky-600 animate-pulse" />
        </div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">MaternalCare AI System</h2>
      </div>
    );
  }

  if (bootError) return <div className="p-20 text-center text-red-500 font-bold">{bootError}</div>;

  if (isEmergency) {
    return <EmergencyAlert language={language} record={patientRecord} onDismiss={() => setIsEmergency(false)} />;
  }

  if (!currentUser) {
    return <AuthView language={language} onAuthSuccess={u => { 
      setCurrentUser(u); 
      if(u.role === UserRole.PATIENT) setPatientRecord(dbService.getPatientRecord(u.id)); 
    }} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd]">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-sky-600 p-1.5 rounded-lg shadow-sm">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">{t.appName}</span>
            <span className="ml-2 h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Clinical Triage Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
              {[Language.EN, Language.HI, Language.MR].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                    language === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[9px] font-black uppercase text-sky-600 tracking-tighter">{currentUser.role}</div>
              </div>
              <button 
                onClick={() => authService.signOut().then(() => { setCurrentUser(null); setPatientRecord(null); })}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {currentUser.role === UserRole.DOCTOR ? (
          <DoctorDashboard language={language} />
        ) : (
          patientRecord ? (
            <PatientDashboard 
              language={language}
              record={patientRecord} 
              onUpdateVitals={updateVitals} 
              onUpdateRecord={handleUpdateRecord}
            />
          ) : (
            <PatientOnboarding 
              language={language}
              user={currentUser} 
              onComplete={(u, p) => {
                const rec: PatientRecord = {
                  user: u, profile: p,
                  vitalsHistory: [{ id: 'init', timestamp: new Date().toISOString(), systolicBP: 120, diastolicBP: 80, heartRate: 72, spo2: 98, glucose: 85, symptoms: [] }],
                  latestRisk: calculateMLRisk({ id: 'init', timestamp: new Date().toISOString(), systolicBP: 120, diastolicBP: 80, heartRate: 72, spo2: 98, glucose: 85, symptoms: [] }, p)
                };
                setCurrentUser(u); setPatientRecord(rec); dbService.savePatientRecord(u.id, rec);
              }} 
            />
          )
        )}
      </main>
    </div>
  );
};

export default App;