import pandas as pd
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# 1. Load dataset mentah
df = pd.read_csv("dataset.csv")

# 2. Hitung fitur turunan (hanya untuk training)
df['credit_utilization_ratio'] = (df['total_debt'] / df['total_credit']) * 100
df['debt_to_income_ratio'] = (df['total_monthly_debt'] / df['income']) * 100
df['loan_to_value'] = (df['loan_amount'] / df['property_value']) * 100

# 3. Tentukan fitur dan label
X = df[['income', 'slik_ojk', 'credit_utilization_ratio', 'debt_to_income_ratio',
        'loan_to_value', 'loan_purpose', 'employment_status', 'job_tenure',
        'home_ownership', 'marital_status']]
y = df['late_payment_risk']  # label: 'rendah', 'sedang', 'tinggi'

# 4. Definisikan preprocessing
numeric_features = ['income', 'slik_ojk', 'credit_utilization_ratio',
                    'loan_to_value', 'job_tenure']
categorical_features = ['loan_purpose', 'employment_status',
                        'home_ownership', 'marital_status']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', MinMaxScaler(), numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ],
    remainder='passthrough'  # debt_to_income_ratio tetap masuk tanpa scaling
)

# 5. Buat pipeline KNN
pipeline = Pipeline(steps=[
    ('preprocessing', preprocessor),
    ('classifier', KNeighborsClassifier(n_neighbors=5))
])

# 6. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 7. Latih model
pipeline.fit(X_train, y_train)

# 8. Evaluasi
y_pred = pipeline.predict(X_test)
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred, labels=["rendah","sedang","tinggi"]))
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=["rendah","sedang","tinggi"]))

# 9. Simpan pipeline ke file .pkl
joblib.dump(pipeline, "knn_pipeline-1.pkl")
print("Model berhasil disimpan ke knn_pipeline-1.pkl")