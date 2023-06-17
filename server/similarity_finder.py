from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import csv_utils


def finder(input_text):
    csv_data = csv_utils.read_csv('responses/QA.csv')
    converted_data_1 = [list(obj.values())[0] for obj in csv_data]
    data = [{"input": item[0], "output": item[1]} for item in converted_data_1]


    # Extract input texts from data
    input_texts = [item["input"] for item in data]

    # Create TF-IDF vectorizer and transform the input texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(input_texts)

    # Transform the mining input text
    mining_input_tfidf = vectorizer.transform([input_text])

    # Calculate cosine similarity between mining input and each input text
    similarity_scores = cosine_similarity(mining_input_tfidf, tfidf_matrix)[0]

    # Find the index of the most similar input text
    most_similar_index = similarity_scores.argmax()

    # Get the most similar input text and its similarity score
    most_similar_text = data[most_similar_index]
    similarity_score = similarity_scores[most_similar_index]

    # Print the result
   
    outputData = { "input":most_similar_text["input"], "sql":most_similar_text["output"], "score":similarity_score}
    return outputData
    
