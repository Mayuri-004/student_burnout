from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os
import shap

app = Flask(__name__)

# -------------------------------------------------
# Load Model
# -------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "model_file", "burnout_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model_file", "scaler.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model_file", "encoders.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
encoders = joblib.load(ENCODER_PATH)

explainer = shap.TreeExplainer(model)

print("Model Loaded Successfully")

# -------------------------------------------------
# Feature Engineering
# -------------------------------------------------

def feature_engineering(data):

    data["study_sleep_ratio"] = float(data["Daily_Study_Hours"]) / (float(data["Sleep_Hours"]) + 1)

    data["stress_pressure"] = (
        float(data["Family_Pressure_1_10"])
        + float(data["Peer_Competition_1_10"])
        + float(data["Exam_Anxiety_1_10"])
    )

    data["life_balance"] = (
        float(data["Physical_Activity_Hours"])
        + float(data["Social_Activity_Hours"])
    ) / (float(data["Screen_Time_Hours"]) + 1)

    return data

# -------------------------------------------------
# Burnout Risk Index
# -------------------------------------------------

def burnout_risk_index(data):

    anxiety = float(data["Exam_Anxiety_1_10"])
    peer = float(data["Peer_Competition_1_10"])
    family = float(data["Family_Pressure_1_10"])
    study = float(data["Daily_Study_Hours"])
    screen = float(data["Screen_Time_Hours"])
    sleep = float(data["Sleep_Hours"])
    activity = float(data["Physical_Activity_Hours"])

    bri = (
        0.25 * anxiety +
        0.20 * peer +
        0.15 * family +
        0.15 * study +
        0.10 * screen -
        0.15 * sleep -
        0.10 * activity
    )

    return round(bri,2)

# -------------------------------------------------
# Recommendations
# -------------------------------------------------

def generate_recommendations(data):

    rec = []

    if data["Sleep_Hours"] < 6:
        rec.append("Increase sleep to at least 7 hours")

    if data["Daily_Study_Hours"] > 8:
        rec.append("Take study breaks every 2-3 hours")

    if data["Screen_Time_Hours"] > 6:
        rec.append("Reduce screen exposure before sleep")

    if data["Physical_Activity_Hours"] < 1:
        rec.append("Add daily exercise")

    return rec

# -------------------------------------------------
# Early Warning
# -------------------------------------------------

def early_warning_system(data, burnout_level):

    warnings = []

    if burnout_level == "Moderate":

        if data["Sleep_Hours"] < 6:
            warnings.append("Sleep deprivation detected")

        if data["Exam_Anxiety_1_10"] > 7:
            warnings.append("High exam stress risk")

    if burnout_level == "High":

        warnings.append("Immediate intervention recommended")

        if data["Screen_Time_Hours"] > 6:
            warnings.append("Excessive screen exposure")

        if data["Daily_Study_Hours"] > 8:
            warnings.append("Continuous study causing burnout")

    if len(warnings) == 0:
        return "No early burnout signals detected"

    return warnings

# -------------------------------------------------
# Prediction API
# -------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        categorical_cols = [
            "Living_Situation",
            "Part_Time_Job",
            "Mental_Health_Support_Access"
        ]

        for col in categorical_cols:
            data[col] = encoders[col].transform([data[col]])[0]

        data = feature_engineering(data)

        df = pd.DataFrame([data])

        feature_names = [
            "Living_Situation","CGPA","Attendance_%","Daily_Study_Hours",
            "Sleep_Hours","Physical_Activity_Hours","Social_Activity_Hours",
            "Screen_Time_Hours","Weekly_Assignments","Backlogs",
            "Part_Time_Job","Family_Pressure_1_10","Peer_Competition_1_10",
            "Exam_Anxiety_1_10","Mental_Health_Support_Access",
            "study_sleep_ratio","stress_pressure","life_balance"
        ]

        df = df[feature_names]

        X = scaler.transform(df)

        prediction = float(model.predict(X)[0])
        prediction = round(prediction,2)

        if prediction <= 3:
            burnout_level = "Low"
        elif prediction <= 6:
            burnout_level = "Moderate"
        else:
            burnout_level = "High"

        bri = burnout_risk_index(data)

        shap_values = explainer.shap_values(X)

        importance = np.array(shap_values).flatten()

        triggers = sorted(
            zip(feature_names, importance),
            key=lambda x: abs(x[1]),
            reverse=True
        )[:3]

        trigger_list = [t[0] for t in triggers]

        rec = generate_recommendations(data)

        warnings = early_warning_system(data, burnout_level)

        result = {

            "burnout_score": prediction,

            "burnout_level": burnout_level,

            "burnout_risk_index": bri,

            "triggers": trigger_list,

            "recommendations": rec,

            "early_warning": warnings
        }

        return jsonify(result)

    except Exception as e:

        return jsonify({"error": str(e)})

# -------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True,port=5000)
