import pandas as pd

# Load the dataset
df = pd.read_csv(r'../scrap/mubawab_listings.csv', dtype=object)

# Delete unnecessary columns
df = df.drop(['Standing', 'Ascenseur', 'Vue_sur_mer', 'Garage'], axis=1)

# Property_State colum, if it's equal to 0, it's NAN

df['Property_State'] = df['Property_State'].replace('0', pd.NA)

# Convert the relevant columns to numeric

df['Price'] = pd.to_numeric(df['Price'], errors='coerce')
df['Area'] = pd.to_numeric(df['Area'], errors='coerce')
df['Rooms'] = pd.to_numeric(df['Rooms'], errors='coerce')
df['Bedrooms'] = pd.to_numeric(df['Bedrooms'], errors='coerce')
df['Bathrooms'] = pd.to_numeric(df['Bathrooms'], errors='coerce')
df['Jardin'] = df['Jardin'].astype(int)
df['Piscine'] = df['Piscine'].astype(int)
df['Cuisine_equiped'] = df['Cuisine_equiped'].astype(int)

# delete rows missing rooms and status
df = df.dropna(subset=['Rooms', 'Status'])

# Fill missing Price values step by step
df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms', 'Bathrooms', 'Rooms', 'Property_State', 'Jardin', 'Piscine', 'Cuisine_equiped'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms', 'Bathrooms', 'Rooms', 'Piscine', 'Cuisine_equiped'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms', 'Bathrooms', 'Piscine'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms', 'Bathrooms'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bathrooms'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier', 'Status'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Quartier'])['Price']
    .transform(lambda x: x.mean()))

df['Price'] = df['Price'].fillna(
    df.groupby(['Type', 'Status'])['Price']
    .transform(lambda x: x.mean()))

# Fill missing Area values
df['Area'] = df['Area'].fillna(
    df.groupby(['Type', 'Quartier', 'Status', 'Bedrooms', 'Bathrooms'])['Area']
    .transform(lambda x: x.mean()))

df['Area'] = df['Area'].fillna(
    df.groupby(['Type'])['Area']
    .transform(lambda x: x.mean()))

# Fill missing property_state values
def fill_property_state(row):
        if pd.isnull(row['Property_State']):
            if row['Status'] == 'Nouveau':
                return '0'
            else:
                mode_value = df[(df['Type'] == row['Type']) &
                                (df['Quartier'] == row['Quartier']) &
                                (df['Status'] == row['Status'])]['Property_State'].mode()
                if not mode_value.empty:
                    return mode_value[0]
                else:
                    mode_value = df[(df['Status'] == row['Status'])]['Property_State'].mode()
                    return mode_value[0]
        else:
            return row['Property_State']

df['Property_State'] = df.apply(fill_property_state, axis=1)

# Add Price_m2 column
df['Price_m2'] = df['Price'] / df['Area']

# Save df to csv file for further analysis and preprocessing
df.to_csv('mubawab_listings_clean.csv', index=False)