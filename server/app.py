import os
import logging
import pandas as pd
import openai
import db_utils
import openai_utils
import json
import env
import csv_utils
import similarity_finder
import csv
import ProfileReport
import tempReport
from urllib.parse import urlparse, parse_qs
from flask import Flask, request, jsonify, Response, send_file

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

env.addEnv()
openai.api_key = os.environ['OPEN_AI_KEY']


app = Flask(__name__)

# Enable CORS for all routes


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS'
    return response


@app.route('/api/upload-csv', methods=['POST'])
def upload_csv_file():
    # json_data = json.loads(request.form.get('json'))
    # fileTitle = json_data.get('nlp_text')

    if 'file' not in request.files:
        return 'No file provided', 400
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    # Specify the folder where the file should be saved

    # save_folder = 'data/SavedData/'
    # file.save(save_folder + "data.csv")
    file.save('data/UploadedFiles/' + file.filename)
    return jsonify({"satus": "success", "file": file.filename}), 200


@app.route('/api/csv-data', methods=['GET'])
def get_csv_data():
    csv_data = csv_utils.read_csv('data/SavedData/data.csv')
    return jsonify(csv_data)


@app.route('/api/get-list-of-files', methods=['GET'])
def get_list_of_files():
    csv_data = csv_utils.read_csv('data/record.csv')
    return jsonify(csv_data)


@app.route('/api/generate-html-report', methods=['POST'])
def generate_html_report():
    requestData = request.json
    file_name = requestData.get('file_name')

    html_content_with_css = ProfileReport.generate_html(file_name)
    # return Response(html_content_with_css, mimetype='text/html')
    return jsonify({"satus": "success"}), 200


@app.route('/api/return-html-report', methods=['GET'])
def return_html_report():
    filename = request.args.get('file')
    print(filename)
    return send_file(f"data/GeneratedReport/{filename}")


@app.route('/api/return-temp-html-report', methods=['GET'])
def return_temp_html_report():
    return send_file("temp_report.html")


@app.route('/api/return-csv-file', methods=['GET'])
def return_csv_file():
    filename = request.args.get('file')
    print(filename)
    return send_file(f"data/UploadedFiles/{filename}")


@app.route('/api/generate', methods=['POST'])
def callData():
    requestData = request.json
    nlp_text = requestData.get('nlp_text')
    file_name = requestData.get('file_name')
    logging.info("Loading data...")

    df = pd.read_csv(f"data/UploadedFiles/{file_name}")

    logging.info(f"Data Format: {df.shape}")
    logging.info("Converting to database...")
    database = db_utils.dataframe_to_database(df, "Sales")
    fixed_sql_prompt = openai_utils.create_table_definition_prompt(df, "Sales")
    logging.info(f"Fixed SQL Prompt: {fixed_sql_prompt}")
    logging.info("Waiting for user input...")
    user_input = nlp_text
    final_prompt = openai_utils.combine_prompts(fixed_sql_prompt, user_input)
    logging.info(f"Final Prompt: {final_prompt}")
    checkSimiliraty = similarity_finder.finder(nlp_text)
    print("checkSimiliraty['score'] ============>", checkSimiliraty['score'])
    proposed_query_postprocessed = None
    if checkSimiliraty['score'] > 0.90:
        print("Take SQL from database", checkSimiliraty['sql'])
        proposed_query_postprocessed = checkSimiliraty['sql']
    else:
        logging.info("Sending to OpenAI...")
        response = openai_utils.send_to_openai(final_prompt)
        # proposed_query = response["choices"][0]["text"]
        proposed_query_postprocessed = db_utils.handle_response(response)
        csv_utils.add_text_to_csv(
            "responses/QA.csv", nlp_text, proposed_query_postprocessed)

    result = db_utils.execute_query(database, proposed_query_postprocessed, df)
    logging.info(f"Result: {result}")
    print(result)
    tempReport.generate_temp_html(result)
    return jsonify(result)


@app.route('/api/update-csv-data', methods=['POST'])
def update_csv():
    # Retrieve the data from the request
    data = request.get_json()
    # Specify the file path to save the CSV file
    file_path = 'responses/QA.csv'
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([])
        for item in data:
            writer.writerow([item["input"], item["output"]])
    return 'CSV file saved successfully'


@app.route('/api/get-past-qa', methods=['GET'])
def get_past_data():
    csv_data = csv_utils.read_csv('responses/QA.csv')
    converted_data_1 = [list(obj.values())[0] for obj in csv_data]
    converted_data = [{"input": item[0], "output": item[1]}
                      for item in converted_data_1]
    return jsonify(converted_data)


if __name__ == '__main__':
    app.run()
