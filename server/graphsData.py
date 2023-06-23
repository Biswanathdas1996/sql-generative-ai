from flask import Flask, jsonify
import pandas as pd
import json
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response
    
# Route for the Flux API
@app.route('/api/flux', methods=['GET'])
def flux_api():
    # Assuming df is your DataFrame
    df = pd.read_csv("data/SavedData/test.csv")

    # Define the given JSON data
    given_json = {
        "0": {
            "combination": [
                "QUANTITYORDERED",
                "PRICEEACH"
            ],
            "correlation_coefficients": 0.059862515059745464
        },
        "1": {
            "combination": [
                "QUANTITYORDERED",
                "SALES"
            ],
            "correlation_coefficients": -0.28006141600401385
        },
        "2": {
            "combination": [
                "PRICEEACH",
                "SALES",
                "PRODUCTLINE"
            ],
            "correlation_coefficients": -0.2607469582656837
        }
    }


    extracted_data = {}
    for key, value in given_json.items():
        combination = value['combination']
        combination_data = df[combination]
        combination_data = combination_data.dropna()
        combination_data_list = combination_data.to_dict(orient='records')
        extracted_data[key] = combination_data_list
    return jsonify(extracted_data)

if __name__ == '__main__':
    app.run()
