import os
import pandas as pd 


df = pd.read_csv("sales_data_sample.csv")
# print(df)

import sqlalchemy

from sqlalchemy import create_engine
from sqlalchemy import text

temp_db = create_engine('sqlite:///:memory:', echo=True)
data = df.to_sql(name="Sales", con=temp_db)

# with temp_db.connect() as conn:
#     result = conn.execute(text("SELECT SUM(QUANTITY * UNIT_PRICE) AS TotalSales FROM Sales"))

# result.all()


def create_table_defination(df):
    prompt = """### sqlite table, with its properties:
#
# Sales({})
#
## Acceptable date format is DD-MM-YYYY
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





def sql_input():
    nlp_text = input("Enter the sql: ")
    return nlp_text

generated_sql = sql_input()
with temp_db.connect() as conn:
    result_output = conn.execute(text(generated_sql))

print(result_output.all())





 