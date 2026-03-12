import pandas as pd
import joblib
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import classification_report, confusion_matrix

from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier


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
# Create Burnout Category
# -------------------------------------------------

def categorize_burnout(x):

    if x <= 3:
        return 0
    elif x <= 6:
        return 1
    else:
        return 2


data["Burnout_Category"] = data["Burnout_Level_1_10"].apply(categorize_burnout)

print("\nBurnout Category Distribution:")
print(data["Burnout_Category"].value_counts())


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
# Features & Target
# -------------------------------------------------

X = data.drop(["Burnout_Level_1_10", "Burnout_Category", "Stress_Level_1_10"], axis=1)

y = data["Burnout_Category"]

print("\nTotal Features Used:", X.shape[1])


# -------------------------------------------------
# Feature Scaling
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
    stratify=y,
    random_state=42
)


# -------------------------------------------------
# Handle Class Imbalance
# -------------------------------------------------

smote = SMOTE(random_state=42)

X_train, y_train = smote.fit_resample(X_train, y_train)


# -------------------------------------------------
# Train Model
# -------------------------------------------------

model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train)


# -------------------------------------------------
# Predictions
# -------------------------------------------------

y_pred = model.predict(X_test)


# -------------------------------------------------
# Evaluation
# -------------------------------------------------

print("\nModel Evaluation")
print("------------------------")

print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred, average="weighted"))
print("Recall:", recall_score(y_test, y_pred, average="weighted"))
print("F1 Score:", f1_score(y_test, y_pred, average="weighted"))

print("\nClassification Report")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix")
print(confusion_matrix(y_test, y_pred))


# -------------------------------------------------
# Save Model
# -------------------------------------------------

joblib.dump(model, MODEL_PATH)
joblib.dump(scaler, SCALER_PATH)
joblib.dump(encoders, ENCODER_PATH)

print("\n✅ Model saved successfully!")