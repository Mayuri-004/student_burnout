from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os
import shap

app = Flask(__name__)

# -------------------------------------------------
# Load Model Files
# -------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "model_file", "burnout_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "model_file", "scaler.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model_file", "encoders.pkl")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
encoders = joblib.load(ENCODER_PATH)

print("✅ Model Loaded Successfully")

explainer = shap.TreeExplainer(model)

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
# Recommendation Engine
# -------------------------------------------------

def generate_recommendations(data):

    sleep = float(data["Sleep_Hours"])
    study = float(data["Daily_Study_Hours"])
    screen = float(data["Screen_Time_Hours"])
    activity = float(data["Physical_Activity_Hours"])
    anxiety = float(data["Exam_Anxiety_1_10"])

    rec = []

    if sleep < 6:
        rec.append("Increase sleep to at least 7 hours")

    if study > 8:
        rec.append("Take breaks every 2–3 hours during study")

    if screen > 6:
        rec.append("Reduce screen time before sleep")

    if activity < 1:
        rec.append("Include at least 30 minutes of exercise")

    if anxiety > 7:
        rec.append("Practice relaxation or meditation")

    return rec


# -------------------------------------------------
# Burnout Forecast
# -------------------------------------------------

def forecast_risk(data):

    sleep = float(data["Sleep_Hours"])
    study = float(data["Daily_Study_Hours"])
    anxiety = float(data["Exam_Anxiety_1_10"])

    if sleep < 6 and study > 8:
        return "Burnout risk may become HIGH within 5 days"

    if anxiety > 8:
        return "Exam stress may increase burnout risk"

    return "Burnout risk likely to remain stable"


# -------------------------------------------------
# Personal Analysis
# -------------------------------------------------

def personal_analysis(data):

    sleep = float(data["Sleep_Hours"])
    study = float(data["Daily_Study_Hours"])

    if study > 8:
        return "Your study duration exceeds recommended limits"

    if sleep < 6:
        return "Your sleep pattern may affect mental recovery"

    return "Your lifestyle pattern appears balanced"

def early_warning_system(data, burnout_level):

    warnings = []

    if burnout_level == "Moderate":

        if data["Sleep_Hours"] < 6:
            warnings.append("Sleep pattern indicates rising fatigue risk")

        if data["Exam_Anxiety_1_10"] > 7:
            warnings.append("Exam stress may increase burnout soon")

    if burnout_level == "High":

        warnings.append("Immediate intervention recommended")

        if data["Screen_Time_Hours"] > 6:
            warnings.append("High screen exposure worsening stress")

        if data["Daily_Study_Hours"] > 8:
            warnings.append("Continuous study hours increasing burnout probability")

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

        data.pop("Stress_Level_1_10", None)

        # -----------------------------------------
        # Encode categorical columns
        # -----------------------------------------

        categorical_cols = [
            
            "Living_Situation",
            "Part_Time_Job",
            "Mental_Health_Support_Access",
            
        ]

        for col in categorical_cols:
            data[col] = encoders[col].transform([data[col]])[0]

        # -----------------------------------------
        # Feature Engineering
        # -----------------------------------------

        data = feature_engineering(data)

        # -----------------------------------------
        # Convert to DataFrame
        # -----------------------------------------

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

        X = df.values

        # -----------------------------------------
        # Scaling
        # -----------------------------------------

        X = scaler.transform(X)

        # -----------------------------------------
        # Prediction
        # -----------------------------------------

        prediction = int(model.predict(X)[0])
        probability = model.predict_proba(X).tolist()

        burnout_map = {
            0: "Low",
            1: "Moderate",
            2: "High"
        }

        burnout_level = burnout_map[prediction]
        warnings = early_warning_system(data, burnout_level)
        # -----------------------------------------
        # SHAP Trigger Detection
        # -----------------------------------------

        shap_values = explainer.shap_values(X)

        if isinstance(shap_values, list):
            importance = shap_values[prediction][0]
        else:
            importance = shap_values[0]

        importance = np.array(importance).flatten()
        importance = importance[:len(feature_names)]

        triggers = sorted(
            zip(feature_names, importance),
            key=lambda x: abs(float(x[1])),
            reverse=True
        )[:3]

        trigger_list = [t[0] for t in triggers]

        # -----------------------------------------
        # Additional features
        # -----------------------------------------

        rec = generate_recommendations(data)
        future = forecast_risk(data)
        personal = personal_analysis(data)

        # -----------------------------------------
        # Response
        # -----------------------------------------

        result = {

            "burnout_level": burnout_level,
            "prediction_class": int(prediction),
            "probability": probability,

            "triggers": trigger_list,

            "future_prediction": future,

            "personal_analysis": personal,

            "recommendations": rec,
            "early_warning": warnings
        }

        return jsonify(result)

    except Exception as e:

        return jsonify({"error": str(e)})
# -------------------------------------------------
# Run Server
# -------------------------------------------------

if __name__ == "__main__":

    app.run(debug=True, port=5000)