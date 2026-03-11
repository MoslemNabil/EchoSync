import csv
import os

# Paths relative to the project root
input_file = 'data.csv'
output_file = 'cleaned_data.csv'

def clean_text(text):
    """Basic text cleaning logic."""
    if not text:
        return ""
    # Convert to lowercase
    cleaned = text.lower()
    # Remove extra whitespace
    cleaned = " ".join(cleaned.split())
    # Additional complex cleaning could go here
    return cleaned

def main():
    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        print("Please use the Angular app to record and save voice data first.")
        return

    cleaned_rows = []
    
    with open(input_file, mode='r', encoding='utf-8') as infile:
        reader = csv.reader(infile)
        headers = next(reader, None) # Extract headers
        
        if not headers:
            print("File is empty.")
            return

        for row in reader:
            if len(row) >= 2:
                timestamp = row[0]
                text = row[1]
                cleaned_val = clean_text(text)
                
                # Only keep rows that have text after cleaning
                if cleaned_val:
                    cleaned_rows.append([timestamp, cleaned_val])

    with open(output_file, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['Timestamp', 'CleanedText'])
        writer.writerows(cleaned_rows)

    print(f"Successfully cleaned data. Saved to '{output_file}'.")
    print(f"Total valid rows: {len(cleaned_rows)}")

if __name__ == '__main__':
    main()
