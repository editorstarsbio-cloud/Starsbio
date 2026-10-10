import requests
import json
import time
import csv
import string

# The base keywords you want to expand
SEED_KEYWORDS = [
    "calculator",
    "how to calculate",
    "formula for",
    "percent",
    "interest",
    "mortgage",
    "equation"
]

# Google Autocomplete API
URL = "http://suggestqueries.google.com/complete/search?client=chrome&q="

# Alphabets and numbers to attach for deep scraping
SUFFIXES = list(string.ascii_lowercase) + [str(i) for i in range(10)]

def get_suggestions(query):
    try:
        response = requests.get(URL + query, timeout=5)
        if response.status_code == 200:
            data = json.loads(response.text)
            return data[1] # The suggestions array
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return []

def main():
    print("Starting Massive Keyword Scraper...")
    all_keywords = set()
    
    # Open CSV file to save keywords
    with open("massive_keywords_list.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Keyword"])
        
        for seed in SEED_KEYWORDS:
            print(f"\nScraping base: {seed}")
            
            # Get direct suggestions for the seed
            direct_suggs = get_suggestions(seed)
            for s in direct_suggs:
                if s not in all_keywords:
                    all_keywords.add(s)
                    writer.writerow([s])
            
            # Deep Scrape: Append a, b, c... z and 0-9 to the seed
            for suffix in SUFFIXES:
                query = f"{seed} {suffix}"
                suggestions = get_suggestions(query)
                
                for s in suggestions:
                    if s not in all_keywords:
                        all_keywords.add(s)
                        writer.writerow([s])
                
                # Small delay so Google doesn't block your IP
                time.sleep(0.5)
                
    print(f"\nDone! Successfully saved {len(all_keywords)} unique long-tail keywords to 'massive_keywords_list.csv'")

if __name__ == "__main__":
    main()
