import pandas as pd
from sqlalchemy import create_engine, text
import mysql.connector

# Path to the CSV file
csv_file_path = './data/esperance-de-vie-par-villes.csv'  # Replace with the actual path to your file

# Read the CSV file with the correct encoding
df = pd.read_csv(csv_file_path, delimiter=',', encoding='utf-8')

# Rename the columns
df.columns = ['region_department_city', 'life_expectancy']

# Split the 'region_department_city' column into multiple columns
df[['region', 'department', 'city']] = df['region_department_city'].str.split(' - ', expand=True)

# Convert the 'life_expectancy' column to float
df['life_expectancy'] = df['life_expectancy'].astype(float)

# Select the columns of interest
df = df[['region', 'department', 'city', 'life_expectancy']]

# MySQL connection information
user = 'root'
password = 'user'
host = 'localhost'
database = 'life_expectancy_db'

# Establish a connection to MySQL server to drop the database if it exists
try:
    cnx = mysql.connector.connect(user=user, password=password, host=host)
    cursor = cnx.cursor()

    # Drop the database if it exists
    cursor.execute(f"DROP DATABASE IF EXISTS {database}")
    print(f"Database '{database}' dropped successfully")

    # Committing the change
    cnx.commit()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'cursor' in locals():
        cursor.close()
    if 'cnx' in locals() and cnx.is_connected():
        cnx.close()

# Create the SQLAlchemy engine for the MySQL connection
engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}', connect_args={'charset': 'utf8mb4'})

# Create the database and the tables
with engine.connect() as conn:
    conn.execute(text(f"CREATE DATABASE {database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"))
    conn.execute(text(f"USE {database}"))

    # Create regions table
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS regions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) COLLATE utf8mb4_unicode_ci UNIQUE
        )
    """))

    # Create departments table
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) COLLATE utf8mb4_unicode_ci UNIQUE,
            region_id INT,
            FOREIGN KEY (region_id) REFERENCES regions(id)
        )
    """))

    # Create life_expectancy table
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS life_expectancy (
            id INT AUTO_INCREMENT PRIMARY KEY,
            life_expectancy FLOAT
        )
    """))

    # Create cities table
    conn.execute(text("""
        CREATE TABLE IF NOT EXISTS cities (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) COLLATE utf8mb4_unicode_ci UNIQUE,
            department_id INT,
            life_expectancy_id INT,          
            FOREIGN KEY (department_id) REFERENCES departments(id),
            FOREIGN KEY (life_expectancy_id) REFERENCES life_expectancy(id)
        )
    """))

# Update the engine to use the new database
engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database}', connect_args={'charset': 'utf8mb4'})

# Insert data into regions table
regions = df[['region']].drop_duplicates().reset_index(drop=True)
regions.columns = ['name']  # Rename the column to match the MySQL table
regions.to_sql('regions', con=engine, if_exists='append', index=False)

# Fetch the inserted regions to get their IDs
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM regions"))
    regions_db = pd.DataFrame(result.fetchall(), columns=['id', 'name'])

# Insert data into departments table with region_id
departments = df[['department', 'region']].drop_duplicates().reset_index(drop=True)
departments = departments.merge(regions_db, left_on='region', right_on='name').rename(columns={'id': 'region_id'})
departments = departments[['department', 'region_id']]
departments.columns = ['name', 'region_id']  # Adjust column names
departments.to_sql('departments', con=engine, if_exists='append', index=False)

# Fetch the inserted departments to get their IDs
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM departments"))
    departments_db = pd.DataFrame(result.fetchall(), columns=['id', 'name', 'region_id'])

# Insert data into life_expectancy table
life_expectancies = df[['life_expectancy']].drop_duplicates().reset_index(drop=True)
life_expectancies.to_sql('life_expectancy', con=engine, if_exists='append', index=False)

# Fetch the inserted life_expectancies to get their IDs
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM life_expectancy"))
    life_expectancies_db = pd.DataFrame(result.fetchall(), columns=['id', 'life_expectancy'])

# Insert data into cities table with department_id and life_expectancy_id
cities = df[['city', 'department', 'life_expectancy']].drop_duplicates().reset_index(drop=True)
cities = cities.merge(departments_db, left_on='department', right_on='name').rename(columns={'id': 'department_id'})
cities = cities.merge(life_expectancies_db, on='life_expectancy').rename(columns={'id': 'life_expectancy_id'})
cities = cities[['city', 'department_id', 'life_expectancy_id']]
cities.columns = ['name', 'department_id', 'life_expectancy_id']  # Adjust column names
cities.to_sql('cities', con=engine, if_exists='append', index=False)

print("Les données ont été chargées avec succès dans la base de données MySQL.")
