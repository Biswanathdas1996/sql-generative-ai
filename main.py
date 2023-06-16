import os
import openai
import pandas as pd 

os.environ["OPENAI_KEY"] = "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"
openai.api_key = os.getenv("OPENAI_KEY")



df = pd.read_csv("sales_data.csv")
# print(df)

import sqlalchemy

from sqlalchemy import create_engine
from sqlalchemy import text

temp_db = create_engine('sqlite:///:memory:', echo=True)
data = df.to_sql(name="Sales", con=temp_db)


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

# print(create_table_defination(df))

def prompt_input():
    nlp_text = input("Enter the info you want: ")
    return nlp_text

# prompt_input()


def combine_prompts(df, query_prompt):
    defination = create_table_defination(df)
    query_init_string = f"### A query to answer: {query_prompt}\nSELECT"
    return defination + query_init_string



nlp_text = prompt_input()
print("------------Prompt----------->") 
print(combine_prompts(df,nlp_text))



responce = openai.Completion.create(
    # engine="davinci",
    engine="text-davinci-003",
    prompt=combine_prompts(df,nlp_text),
    temperature=0,
    max_tokens=150,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stop=["#", ";"]
)
print("------------responce from GPT st----------->")
print(responce)
print("------------responce from GPT ed----------->")

def handle_responce(responce):
    # query = responce["choices"][0]["text"].replace('\n', ' ').replace('  ', ' ').strip()
    query = text = responce['choices'][0]['text'].split('\n')[0]
    extracted_text = query.split('\n\n', 1)[0]
    if extracted_text.startswith(" "):
        extracted_text = "SELECT"+ extracted_text
        
    return extracted_text

formatted_query = handle_responce(responce)

print("------------formatted_query start----------->") 
print(formatted_query)
print("------------formatted_query end----------->")

with temp_db.connect() as conn:
    result_output = conn.execute(text(formatted_query))
print("------------Output resilt 1----------->")    
print(result_output.all())  
 
 