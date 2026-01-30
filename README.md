# MaternalCare AI: Smartwatch-Based Pregnancy Risk Assessment System

This repository contains the prototype for **MaternalCare AI**, a proactive healthcare SaaS designed to reduce maternal mortality in underserved regions. [cite_start]This project was developed as part of the **CIH 3.0 Final Round** by **Team Sovereign**[cite: 1, 15].

## 🎯 Mission & SDG Alignment
[cite_start]MaternalCare AI is built to directly address **Sustainable Development Goal 3.1**: reducing the global maternal mortality ratio to less than 70 per 100,000 live births by 2030[cite: 1, 362]. [cite_start]By leveraging affordable wearables and multimodal AI, we bridge the gap between rural clinics and specialist-level care[cite: 1, 396].

## 🚀 Key Features
* [cite_start]**Proactive Bio-Surveillance**: Unlike reactive chatbots, our system triggers alerts based on real-time biometric trends (HR, SpO2, Sleep) before symptoms become critical[cite: 1, 35, 124].
* [cite_start]**Multimodal Analysis**: Utilizes Google Gemini to analyze time-series data, physical symptom photos (edema/rashes), and handwritten lab reports via OCR[cite: 1, 8, 9, 15].
* [cite_start]**Multilingual Support**: Supports native languages like Marathi and Hindi to ensure accessibility for rural mothers[cite: 1, 9, 141, 1412].
* [cite_start]**Zero-Backend Infrastructure**: Built using a prompt-driven architecture in Google AI Studio, significantly reducing deployment costs[cite: 1, 962].

## 🛠️ Tech Stack
* [cite_start]**Hardware**: Fire-Boltt Hulk Smartwatch (captures vitals at an affordable ₹3,000 price point)[cite: 1, 28, 54].
* [cite_start]**Data Pipeline**: Google Fit ↔ NoCodeAPI ↔ Google AI Studio[cite: 1, 4, 618, 1036].
* [cite_start]**AI Engine**: Google Gemini 3 (Multimodal LLM)[cite: 1, 963].
* [cite_start]**Knowledge Base**: Retrieval-Augmented Generation (RAG) grounded in WHO Maternal Health Guidelines[cite: 1, 967, 1041].
* [cite_start]**Frontend**: React.js with Tailwind CSS[cite: 1, 1312, 1354].
* [cite_start]**Persistence**: IndexedDB for secure, browser-based data storage[cite: 1, 975, 1346].

## 🏗️ Architecture


1. [cite_start]**Data Source**: Fire-Boltt Hulk captures biometric data[cite: 1, 3].
2. [cite_start]**Bridge**: NoCodeAPI fetches JSON vitals from Google Fit[cite: 1, 619, 1033].
3. [cite_start]**Analysis**: Gemini 3 analyzes vitals against WHO clinical thresholds for Preeclampsia, Gestational Diabetes, and Anemia[cite: 1, 1067, 1092].
4. [cite_start]**Action**: Triggers "Red Alerts" and generates automated WhatsApp referral notes for healthcare providers[cite: 1, 115, 979, 1367].

## 📋 WHO Clinical Guardrails
The system's logic is strictly grounded in international medical standards:
* [cite_start]**Preeclampsia**: Triggered at BP ≥140/90 mmHg[cite: 1, 970, 1068].
* [cite_start]**Anemia**: Severity assessed based on WHO hemoglobin thresholds (e.g., <110 g/l for pregnant women)[cite: 1887, 1946].
* [cite_start]**Gestational Diabetes**: Fasting glucose thresholds ≥92 mg/dL[cite: 1, 1056].

## 🌍 Real-World Impact
[cite_start]MaternalCare AI is designed for the "last mile" of healthcare[cite: 1, 19]. [cite_start]In regions with limited access to physicians, this tool acts as a 24/7 clinical assistant, providing specialist-level screening at a generalist’s cost[cite: 1, 358, 392, 980].

---
**Team Sovereign | CIH 3.0 Finalists** *Lets make every birth a safe birth* *Every mother deserves a safe birth.*
