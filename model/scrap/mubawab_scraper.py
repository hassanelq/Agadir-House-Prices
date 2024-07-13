import requests
from bs4 import BeautifulSoup
import pandas as pd
import re


def get_listing_links(page_url):
    response = requests.get(page_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        listings = soup.find('ul', class_='ulListing').find_all('li', class_='listingBox')
        return [listing['linkref'] for listing in listings]
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return []

# Base URL for the pages
base_url = 'https://www.mubawab.ma/fr/ct/agadir/immobilier-a-vendre'

# Initialize an empty list to store all listing links
all_listing_links = []

# Assuming there are 25 pages
for page_number in range(1, 26):
    page_url = f"{base_url}:p:{page_number}"
    links = get_listing_links(page_url)
    all_listing_links.extend(links)
    print(f"Page {page_number}: {len(links)} links collected.")

# Print the total number of links collected
print(f"Total links collected: {len(all_listing_links)}")

# Save the links to a CSV file
links_df = pd.DataFrame(all_listing_links, columns=['Link'])
links_df.to_csv('listing_links.csv', index=False)
print("Links saved to listing_links.csv")




# Read the CSV file with the listing links
links_df = pd.read_csv('scraping/listing_links.csv')
listing_links = links_df['Link'].tolist()

# Initialize lists to store the extracted data
prices = []
quartiers = []
areas = []
rooms = []
bedrooms = []
bathrooms = []
types = []
statuses = []
standings = []
property_states = []

# Initialize lists for additional features
features = ['Ascenseur', 'Garage', 'Jardin', 'Piscine', 'Cuisine équipée', 'Vue sur mer']
features_dict = {feature: [] for feature in features}

# Function to extract details from each listing page
def extract_listing_details(link):
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract price
        price_tag = soup.find('h3', class_='orangeTit')
        price = ''.join(filter(str.isdigit, price_tag.get_text(strip=True))) if price_tag else 'N/A'
        
        # Extract quartier (neighborhood)
        quartier_div = soup.find('div', class_='col-8 vAlignM adBread')
        quartier_tag = quartier_div.find_all('a', class_='darkblue')[-1] if quartier_div else None
        quartier = quartier_tag.get_text(strip=True) if quartier_tag else 'N/A'
        
        # Extract details using icons
        details_div = soup.find('div', class_='disFlex adDetails')
        area, room, bedroom, bathroom = 'N/A', 'N/A', 'N/A', 'N/A'
        if details_div:
            details = details_div.find_all('div', class_='adDetailFeature')
            for detail in details:
                icon = detail.find('i', class_='adDetailFeatureIcon')
                value = detail.find('span').get_text(strip=True)
                if 'icon-triangle' in icon['class']:
                    area = re.findall(r'\d+', value)[0] if value else 'N/A'
                elif 'icon-house-boxes' in icon['class']:
                    room = re.findall(r'\d+', value)[0] if value else 'N/A'
                elif 'icon-bed' in icon['class']:
                    bedroom = re.findall(r'\d+', value)[0] if value else 'N/A'
                elif 'icon-bath' in icon['class']:
                    bathroom = re.findall(r'\d+', value)[0] if value else 'N/A'

                    
        # Extract additional features
        features_div = soup.find('div', class_='adFeatures')
        type_, status, standing, property_state = 'N/A', 'N/A', 'N/A', '0'
        if features_div:
            features = features_div.find_all('div', class_='adMainFeature')
            for feature in features:
                label = feature.find('p', class_='adMainFeatureContentLabel').get_text(strip=True)
                value = feature.find('p', class_='adMainFeatureContentValue').get_text(strip=True)
                if label == 'Type de bien':
                    type_ = value
                elif label == 'Etat':
                    status = value
                elif label == 'Standing':
                    standing = value
                elif label == 'Etat du bien':
                    property_state = value

            # Extract additional tags
            extra_tags_div = features_div.find_next('div', class_='adFeatures')
            extra_features = {feature: 0 for feature in features_dict}
            if extra_tags_div:
                extra_tags = extra_tags_div.find_all('div', class_='adFeature')
                for extra_tag in extra_tags:
                    tag_value = extra_tag.find('span').get_text(strip=True)
                    if tag_value in features_dict:
                        extra_features[tag_value] = 1

            # Append the feature values
            for feature in features_dict:
                features_dict[feature].append(extra_features[feature])

        # Append the data to the lists
        prices.append(price)
        quartiers.append(quartier)
        areas.append(area)
        rooms.append(room)
        bedrooms.append(bedroom)
        bathrooms.append(bathroom)
        types.append(type_)
        statuses.append(status)
        standings.append(standing)
        property_states.append(property_state)
    else:
        print(f"Failed to retrieve listing page: {link}. Status code: {response.status_code}")

# Loop through the first few links and extract details
num = 0
for link in listing_links:
    print(f"Extracting details from link {num}")
    extract_listing_details(link)
    num += 1

# Create a DataFrame to store the extracted data
data = pd.DataFrame({
    'Type': types,
    'Quartier': quartiers,
    'Price': prices,
    'Area': areas,
    'Rooms': rooms,
    'Bedrooms': bedrooms,
    'Bathrooms': bathrooms,
    'Status': statuses,
    'Standing': standings,
    'Property State': property_states
})

# Add the additional features to the DataFrame
for feature in features_dict:
    data[feature] = features_dict[feature]

# Display the DataFrame
print(data)

# Save the data to a CSV file
data.to_csv('listing_details.csv', index=False)
