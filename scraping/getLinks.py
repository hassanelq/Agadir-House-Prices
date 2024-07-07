import requests
from bs4 import BeautifulSoup
import pandas as pd

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
