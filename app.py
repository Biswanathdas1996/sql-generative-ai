from flask import Flask, request, jsonify

import os
import openai
import pandas as pd 
import time
import sqlalchemy
import json
from sqlalchemy import create_engine
from sqlalchemy import text

os.environ["OPENAI_KEY"] = "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"
openai.api_key = os.getenv("OPENAI_KEY")





app = Flask(__name__)

def create_table_defination(df):
    prompt = """### sqlite table, with its properties:
#
# Sales({})
#
## Acceptable date format is DD-MM-YYYY
#
## where DATE is type TEXT
#
""".format(",".join(str(col) for col in df.columns))

    return prompt


def combine_prompts(df, query_prompt):
    defination = create_table_defination(df)
    query_init_string = f"### A query to answer: {query_prompt}\nSELECT"
    return defination + query_init_string

def handle_responce(responce):
        # query = responce["choices"][0]["text"].replace('\n', ' ').replace('  ', ' ').strip()
        query = text = responce['choices'][0]['text'].split('\n')[0]
        extracted_text = query.split('\n\n', 1)[0]
        if extracted_text.startswith(" "):
            extracted_text = "SELECT"+ extracted_text
            
        return extracted_text

async def make_openai_request(promptdata):
    result = openai.Completion.create(
        # engine="davinci",
        engine="text-davinci-003",
        prompt=promptdata,
        temperature=0,
        max_tokens=150,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["#", ";"]
    )
    return result


@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({'message': 'Hello, World!'})


@app.route('/api/users', methods=['POST'])
async def create_user():
    reqiestData = request.json  
    df = pd.read_csv("sales_data.csv")
    temp_db = create_engine('sqlite:///:memory:', echo=True)
    data = df.to_sql(name="Sales", con=temp_db)
    nlp_text = reqiestData.get('nlp_text')
    print(combine_prompts(df,nlp_text))
    responce = await make_openai_request(combine_prompts(df,nlp_text))
    print("------------responce from GPT st----------->")
    print(responce)
    print("------------responce from GPT ed----------->")
    formatted_query = handle_responce(responce)
    print("------------formatted_query start----------->") 
    print(formatted_query)
    print("------------formatted_query end----------->")
    with temp_db.connect() as conn:
        result_output = conn.execute(text(formatted_query))
    print("------------Output resilt 1----------->")    
    print(result_output.all())
    output = print(result_output.all())
    print("------------output ----------->")
    print(output)
    time.sleep(3)
    # Continue with the program execution
    print("Hold of 3 seconds completed")
    response = {'output': output}
    return jsonify(response), 201







# @app.route('/api/sql', methods=['POST'])
# async def sql():
#     requestData = request.json
#     df = pd.read_csv("sales_data.csv")
#     temp_db = create_engine('sqlite:///:memory:', echo=True)
#     data = df.to_sql(name="Sales", con=temp_db)
#     generated_sql = requestData.get('nlp_text')
#     result_output = None 
#     with temp_db.connect() as conn:
#         result_output = conn.execute(text(generated_sql))
#         # Convert the result into a list of dictionaries
#         print(result_output.fetchall())
        

#     response = {'output': result_output.fetchall()}
#     return jsonify(response), 201

@app.route('/api/sql', methods=['POST'])
async def sql():
    requestData = request.json
    df = pd.read_csv("sales_data_sample.csv")
    temp_db = create_engine('sqlite:///:memory:', echo=True)
    data = df.to_sql(name="Sales", con=temp_db)
    generated_sql = requestData.get('nlp_text')

    # sql_query = "SELECT * FROM Sales"

    # Execute the SQL query
    with temp_db.connect() as connection:
        result = connection.execute(text(generated_sql))

        # Fetch all rows from the query result
        rows = result.fetchall()
        converted_data = [dict(zip(",".join(str(col) for col in df.columns), row)) for row in rows]

    # Return the data as API response in JSON format
    return jsonify(converted_data)




if __name__ == '__main__':
    app.run()
