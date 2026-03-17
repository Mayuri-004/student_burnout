import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score

from imblearn.over_sampling import SMOTE
from xgboost import XGBRegressor

# -------------------------------------------------
# Paths
# -------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "dataset", "burnout_dataset2.xlsx")
MODEL_PATH = os.path.join(BASE_DIR, "model_file", "burnout_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model_file", "scaler.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model_file", "encoders.pkl")

# -------------------------------------------------
# Load Dataset
# -------------------------------------------------

data = pd.read_excel(DATA_PATH)

print("Dataset Shape:", data.shape)

# -------------------------------------------------
# Drop Unwanted Columns
# -------------------------------------------------

data = data.drop([
    "Student_ID",
    "Year",
    "Branch",
    "Career_Clarity_1_10",
    "Interested_in_Core_Job"
], axis=1)

# -------------------------------------------------
# Encode Categorical Columns
# -------------------------------------------------

categorical_cols = [
    "Living_Situation",
    "Part_Time_Job",
    "Mental_Health_Support_Access"
]

encoders = {}

for col in categorical_cols:

    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    encoders[col] = le

# -------------------------------------------------
# Feature Engineering
# -------------------------------------------------

data["study_sleep_ratio"] = data["Daily_Study_Hours"] / (data["Sleep_Hours"] + 1)

data["stress_pressure"] = (
    data["Family_Pressure_1_10"]
    + data["Peer_Competition_1_10"]
    + data["Exam_Anxiety_1_10"]
)

data["life_balance"] = (
    data["Physical_Activity_Hours"]
    + data["Social_Activity_Hours"]
) / (data["Screen_Time_Hours"] + 1)

# -------------------------------------------------
# Features and Target
# -------------------------------------------------

X = data.drop(["Burnout_Level_1_10", "Stress_Level_1_10"], axis=1)

y = data["Burnout_Level_1_10"]

print("Total Features:", X.shape[1])

# -------------------------------------------------
# Scaling
# -------------------------------------------------

scaler = StandardScaler()

X = scaler.fit_transform(X)

# -------------------------------------------------
# Train Test Split
# -------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# -------------------------------------------------
# Train Model (Regression)
# -------------------------------------------------

model = XGBRegressor(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train)

# -------------------------------------------------
# Prediction
# -------------------------------------------------

y_pred = model.predict(X_test)

print("\nModel Evaluation")
print("---------------------------")

print("MAE:", mean_absolute_error(y_test, y_pred))
print("R2 Score:", r2_score(y_test, y_pred))

# -------------------------------------------------
# Save Model
# -------------------------------------------------

joblib.dump(model, MODEL_PATH)
joblib.dump(scaler, SCALER_PATH)
joblib.dump(encoders, ENCODER_PATH)

print("\nModel saved successfully")
