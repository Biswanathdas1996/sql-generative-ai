from flask import Flask, jsonify
import itertools
import pandas as pd
import json

app = Flask(__name__)

# Enable CORS for all routes
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response

@app.route('/combinations', methods=['GET'])
def get_combinations():
    # Load your dataset into a pandas DataFrame
    df = pd.read_csv("data/SavedData/test.csv")
   
    # Assuming df is your DataFrame
    columns = df.columns.tolist()

   # Check if 'Unnamed: 16' column exists
    if 'Unnamed: 16' in columns:
        # Drop the 'Unnamed: 16' column
        df = df.drop('Unnamed: 16', axis=1)

    # Filter non-numeric columns
    numeric_columns = [col for col in columns if pd.api.types.is_numeric_dtype(df[col])]

    # Perform one-hot encoding for categorical variables
    df_encoded = pd.get_dummies(df[numeric_columns])

    # Calculate correlation coefficients for all combinations of columns
    combinations = []
    correlation_coefficients = []

    for r in range(2, len(numeric_columns) + 1):
        for combination in itertools.combinations(numeric_columns, r):
            combinations.append(combination)
            correlation_coefficients.append(df_encoded[list(combination)].corr().values[0, 1])

   
 # Create a list to store filtered combinations and correlation coefficients
    result = {}
    for i, combination in enumerate(combinations):
        data = {
            "combination": list(combination),
            "correlation_coefficients": correlation_coefficients[i]
        }
        key = ",".join(combination)
        result[i] = data

    # return jsonify(result)
# KeyError: ('QUANTITYORDERED', 'PRICEEACH')
    extracted_data = {}
    for key, value in result.items():
        combination = value['combination']
        # if(value['correlation_coefficients'] > 0.12):
        combination_data = df[combination]
        combination_data = combination_data.dropna()
        combination_data_list = combination_data.to_dict(orient='records')
        extracted_data[key] = combination_data_list
    return jsonify(extracted_data)




if __name__ == '__main__':
    app.run(debug=True)
