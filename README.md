# 🎯 Debtected

A web-based KNN classification system for predicting late debt payments using machine learning.

## 📋 Overview

Debtected is a full-stack machine learning application that uses the K-Nearest Neighbors (KNN) algorithm to classify and predict late debt payments. The application consists of:
- **Backend**: FastAPI server for model inference
- **Frontend**: ReactJS interface for user interaction
- **ML Model**: KNN classifier trained on debt payment data

## 📂 Project Structure

```
debtected/
├── backend/
│   ├── api.py
│   ├── Dockerfile
│   └── requirements.txt
├── base_model/
│   ├── knn/
│   │   ├── knn.py
│   │   └── train.py
│   └── README.md
├── model/
│   ├── dataset.csv
│   ├── knn_utang_generate_pkl.py
│   ├── knn_utang.ipynb
│   ├── knn_utang_test&train.py
│   └── requirements.txt
├── frontend/
│   └── app/
│       ├── src/
│       ├── public/
│       ├── Dockerfile
│       ├── package.json
│       └── vite.config.js
├── docker-compose.yml
└── README.md
```

## 🛠️ Tech Stack

### Machine Learning
- **Pandas** - Data manipulation
- **Scikit-learn** - KNN algorithm implementation
- **Matplotlib** & **Seaborn** - Data visualization

### Backend
- **FastAPI** - REST API framework
- **Uvicorn** - ASGI server
- **Scikit-learn** - Model inference
- **Pandas** - Data processing

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Axios** - HTTP client

## 🚀 Getting Started

Choose one of the following deployment methods:

- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)

---

## Local Development

### 1️⃣ Train the Model

#### Create virtual environment
```bash
cd model/
python3 -m venv venv
source venv/bin/activate  # Linux/MacOS
# OR
venv\Scripts\activate.bat  # Windows
```

#### Install dependencies
```bash
pip install -U -r requirements.txt
```

#### Train and export model
```bash
python3 knn_utang_generate_pkl.py
```

> **Note**: To use Jupyter Notebook instead:
> - Run `pip install -U -r requirements-2.txt`
> - Open `knn_utang.ipynb` with Jupyter extension in VS Code
> - Run `knn_utang.ipynb` does not generate `knn_pipeline.pkl` file

#### Copy model to backend
```bash
cp knn_pipeline.pkl ../backend/
```

### 2️⃣ Setup Backend

#### Create virtual environment
```bash
cd ../backend/
python3 -m venv venv
source venv/bin/activate  # Linux/MacOS
# OR
venv\Scripts\activate.bat  # Windows
```

#### Install dependencies
```bash
pip install -U -r requirements.txt
```

#### Configure environment
```bash
cp .env.example .env
# Edit .env file with your configuration
```

#### Start backend server
```bash
uvicorn api:app --reload
```

The backend will be available at `http://localhost:8000`

### 3️⃣ Setup Frontend

#### Install dependencies
```bash
cd ../frontend/app/
npm install
```

#### Configure environment
```bash
cp .env.example .env
# Edit .env file with your backend URL
```

#### Start development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Docker Deployment

### Prerequisites

Ensure you have:
- Docker installed
- Docker Compose installed
- Trained model file (`knn_pipeline.pkl`) in the `backend/` folder

### 1️⃣ Build images
```bash
docker compose build
```

### 2️⃣ Start containers
```bash
docker compose up -d
```

### 3️⃣ Stop containers
```bash
docker compose down
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request to `main`

---

## 📝 License

IDK, MIT maybe.