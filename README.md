# EchoSync 🎙️✨

A full-stack application built with **Angular**, **NestJS**, and **Python**. It captures voice input via the Web Speech API, stores it securely in a CSV format through a backend API, and provides a data cleaning pipeline for downstream analytics.

---

## 🏗️ Architecture Overview

The project is structured into three main layers:

1.  **Frontend (Angular)**: 
    *   **Web Speech API Integration**: Real-time voice recognition.
    *   **Modern UI**: Built with Angular Signals and a polished "Dark Mode" theme using a custom Angular gradient.
    *   **Navigation**: Toggles between the recording interface and an interactive architecture guide.

2.  **Backend (NestJS)**:
    *   **REST API**: Exposes endpoints for saving raw voice text and retrieving processed data.
    *   **CSV Pipeline**: Securely appends data to `data.csv` using Node.js `fs` streams.
    *   **CORS Enabled**: Configured for seamless communication with the frontend.

3.  **Data Processing (Python)**:
    *   **`clean_data.py`**: A normalization script that handles lowercase conversion, whitespace trimming, and filtering.
    *   **CSV Export**: Generates `cleaned_data.csv` for use in the app or other data tools.

---

## 🚀 Getting Started

### **Prerequisites**
*   **Node.js** (v18 or later)
*   **Python** (v3.8 or later)
*   **Google Chrome** or **Microsoft Edge** (for Web Speech API support)

### **1. Setup the Backend (NestJS)**
```bash
cd backend
npm install
npm run start:dev
```
*The server will start on `http://localhost:3000`.*

### **2. Setup the Frontend (Angular)**
```bash
# In a new terminal (root directory)
npm install
npm start
```
*The application will be available at `http://localhost:4200`.*

### **3. Running the Python Cleaning Script**
Once you have recorded and saved voice data through the app:
```bash
python scripts/clean_data.py
```
*This generates `cleaned_data.csv` in the root directory.*

---

## 📂 Project Structure

```bash
echosync/
├── backend/            # NestJS Application (echosync-api)
│   ├── src/            # Controllers and Services for CSV logic
│   └── main.ts         # Server and CORS configuration
├── scripts/            # Python Data Pipeline
│   └── clean_data.py   # Normalization and cleaning logic
├── src/                # Angular Frontend
│   ├── app/
│   │   ├── home/       # Recording and Table UI
│   │   ├── about/      # Interactive Architecture Guide
│   │   └── speech.ts   # Core Web Speech API Service
│   └── styles.css      # Global Dark Theme & Gradient styles
├── data.csv            # Generated Raw Data (Ignored by Git)
└── cleaned_data.csv    # Generated Processed Data (Ignored by Git)
```

---

## 🎨 Design System
*   **Theme**: Dark Glassmorphism.
*   **Colors**: Angular Red Gradient (`#dd0031` to `#f50d39`).
*   **Components**: Fully responsive, rounded (pill-shaped) UI elements.

---

## 📜 License
MIT License - See the project for details.
