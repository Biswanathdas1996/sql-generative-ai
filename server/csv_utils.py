import csv

def read_csv(file_path):
    data = []
    with open(file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            data.append(row)
    return data

def add_text_to_csv(file_path, text1, text2):
    with open(file_path, 'a', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow([text1, text2])