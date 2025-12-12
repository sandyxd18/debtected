from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import joblib
import pandas as pd
import os

load_dotenv()

app = FastAPI()

origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pipeline KNN yang sudah dilatih
MODEL_PATH = os.getenv("MODEL_PATH", "knn_pipeline-1.pkl")
pipeline = joblib.load(MODEL_PATH)

class InputData(BaseModel):
    income: float
    slik_ojk: int
    total_debt: float
    total_credit: float
    total_monthly_debt: float
    loan_amount: float
    property_value: float
    loan_purpose: str
    employment_status: str
    job_tenure: int
    home_ownership: str
    marital_status: str

@app.post("/predict")
def predict(data: InputData):
    # Konversi input ke DataFrame
    df = pd.DataFrame([data.dict()])

    # Hitung fitur turunan
    df['credit_utilization_ratio'] = (df['total_debt'] / df['total_credit']) * 100
    df['debt_to_income_ratio'] = (df['total_monthly_debt'] / df['income']) * 100
    df['loan_to_value'] = (df['loan_amount'] / df['property_value']) * 100

    # Ambil subset fitur sesuai pipeline
    fitur = ['income','slik_ojk','credit_utilization_ratio','debt_to_income_ratio',
             'loan_to_value','loan_purpose','employment_status','job_tenure',
             'home_ownership','marital_status']

    # Prediksi risiko
    prediksi = pipeline.predict(df[fitur])[0]
    return {"risiko": prediksi}