import csv
import random
import decimal
from faker import Faker

# Create a Faker instance for generating fake data
fake = Faker()

# Generate random data and write to CSV file
with open('sales_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['ID', 'PRODUCT', 'QUANTITY', 'UNIT_PRICE', 'DATE', 'COUNTRY', 'USER', 'DOB'])  # Write header row

    for _ in range(1000):
        id = fake.random_int(min=1, max=10000)
        product = fake.word()
        quantity = fake.random_int(min=1, max=100)
        unit_price = decimal.Decimal(random.uniform(0, 100)).quantize(decimal.Decimal('0.00'))
        date = fake.date_between(start_date='-1y', end_date='today').strftime('%d-%m-%Y')
        country = fake.country()
        user = fake.name()
        dob = fake.date_of_birth(minimum_age=18, maximum_age=80).strftime('%d-%m-%Y')

        writer.writerow([id, product, quantity, unit_price, date, country, user, dob])

print("CSV file generated successfully.")
