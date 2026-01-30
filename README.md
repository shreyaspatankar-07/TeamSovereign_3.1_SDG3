# MaternalCare AI: Smartwatch-Based Pregnancy Risk Assessment System

This repository contains the prototype for **MaternalCare AI**, a proactive healthcare SaaS designed to reduce maternal mortality in underserved regions. This project was developed as part of the **CIH 3.0 Final Round** by **Team Sovereign**.

## 🎯 Mission & SDG Alignment
MaternalCare AI is built to directly address **Sustainable Development Goal 3.1**: reducing the global maternal mortality ratio to less than 70 per 100,000 live births by 2030.By leveraging affordable wearables and multimodal AI, we bridge the gap between rural clinics and specialist-level care.

## 🚀 Key Features
* **Proactive Bio-Surveillance**: Unlike reactive chatbots, our system triggers alerts based on real-time biometric trends (HR, SpO2, Sleep) before symptoms become critical.
* **Multimodal Analysis**: Utilizes Google Gemini to analyze time-series data, physical symptom photos (edema/rashes), and handwritten lab reports via OCR.
* **Multilingual Support**: Supports native languages like Marathi and Hindi to ensure accessibility for rural mothers.
* **Zero-Backend Infrastructure**: Built using a prompt-driven architecture in Google AI Studio, significantly reducing deployment costs.

## 🛠️ Tech Stack
* **Hardware**: Fire-Boltt Hulk Smartwatch (captures vitals at an affordable ₹3,000 price point).
* **Data Pipeline**: Google Fit ↔ Google Cloud Console ↔ Google AI Studio.
* **AI Engine**: Google Gemini 3 (Multimodal LLM).
* **Knowledge Base**: Retrieval-Augmented Generation (RAG) grounded in WHO Maternal Health Guidelines.
* **Frontend**: React.js with Tailwind CSS.
* **Persistence**: IndexedDB for secure, browser-based data storage.

## 🏗️ Architecture


1. **Data Source**: Fire-Boltt Hulk captures biometric data.
2. **Bridge**: NoCodeAPI fetches JSON vitals from Google Fit.
3. **Analysis**: Gemini 3 analyzes vitals against WHO clinical thresholds for Preeclampsia, Gestational Diabetes, and Anemia.
4. **Action**: Triggers "Red Alerts" and generates automated WhatsApp referral notes for healthcare providers.

## 📋 WHO Clinical Guardrails
The system's logic is strictly grounded in international medical standards:
* **Preeclampsia**: Triggered at BP ≥140/90 mmHg.
* **Anemia**: Severity assessed based on WHO hemoglobin thresholds (e.g., <110 g/l for pregnant women).
* **Gestational Diabetes**: Fasting glucose thresholds ≥92 mg/dL.

## 🌍 Real-World Impact
MaternalCare AI is designed for the "last mile" of healthcare. In regions with limited access to physicians, this tool acts as a 24/7 clinical assistant, providing specialist-level screening at a generalist’s cost.

---
**Team Sovereign | CIH 3.0 Finalists** *Lets make every birth a safe birth* *Every mother deserves a safe birth.*
