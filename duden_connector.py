from bs4 import BeautifulSoup
import requests

def get_examples(word):

    full_html = requests.get(f"https://www.duden.de/rechtschreibung/{word}")


    # Create a BeautifulSoup object for the entire HTML document
    soup = BeautifulSoup(full_html.text, 'html.parser')

    # Find the <dt> tag with the text "Beispiele" within the larger document
    dt_tag = soup.find('dt', string='Beispiele')

    # Initialize an empty list to store the texts from <li> elements
    li_texts = []

    # Check if the <dt> tag was found
    if dt_tag:
        # Find all <li> tags within the <dt> tag
        li_tags = dt_tag.find_next('dd').find_all('li')
        
        # Extract the text from each <li> tag and add it to the list
        for li_tag in li_tags:
            li_texts.append((li_tag.text, None))
        
    return li_texts

