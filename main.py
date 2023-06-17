# Dataset based on #https://www.kaggle.com/datasets/kyanyoga/sample-sales-data

import os
import logging

import pandas as pd
import openai

import db_utils
import openai_utils
import json
import env
from flask import Flask, request, jsonify

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

env.addEnv()
openai.api_key = os.environ['OPEN_AI_KEY']


app = Flask(__name__)

@app.route('/api/sql', methods=['POST'])
def callData():
    requestData = request.json
    nlp_text = requestData.get('nlp_text')
    
    logging.info("Loading data...")
    df = pd.read_csv("data/SavedData/data.csv")
    logging.info(f"Data Format: {df.shape}")

    logging.info("Converting to database...")
    database = db_utils.dataframe_to_database(df, "Sales")
    
    fixed_sql_prompt = openai_utils.create_table_definition_prompt(df, "Sales")
    logging.info(f"Fixed SQL Prompt: {fixed_sql_prompt}")

    logging.info("Waiting for user input...")
    user_input = nlp_text
    final_prompt = openai_utils.combine_prompts(fixed_sql_prompt, user_input)
    logging.info(f"Final Prompt: {final_prompt}")

    logging.info("Sending to OpenAI...")
    response = openai_utils.send_to_openai(final_prompt)
    proposed_query = response["choices"][0]["text"]
    proposed_query_postprocessed = db_utils.handle_response(response)
    logging.info(f"Response obtained. Proposed sql query: {proposed_query_postprocessed}")
    result = db_utils.execute_query(database, proposed_query_postprocessed, df)
    logging.info(f"Result: {result}")
    print(result)
    return jsonify(result)
    

@app.route('/upload', methods=['POST'])
def upload_file():
    # requestData = request.json
    # nlp_text = requestData.get('nlp_text')
    print("=================")
    print(request.data)
    print("=================")
    if 'file' not in request.files:
        return 'No file provided', 400

    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400

    # Specify the folder where the file should be saved
    save_folder = 'data/SavedData/'

    file.save(save_folder + "data.csv")
    return jsonify({"satus":"success"}), 200

    
if __name__ == '__main__':
    app.run()