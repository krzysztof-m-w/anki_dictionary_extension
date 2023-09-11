import requests
from bs4 import BeautifulSoup
from leo_examples_parser import find_examples

# gets the xml containing all the data from give url and using find_examples finds examples embeded on the leo website
def get_examples(word):
    # Send an HTTP GET request to the URL
    response = requests.get(f"https://dict.leo.org/german-english/{word}")

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the <script> element with the specified attributes
    script_element = soup.find("script", {"type": "application/xml", "language": "xml", "data-dz-name": "searchresult"})

    # Extract the content of the <script> element
    if script_element:
        xml_data = script_element.get_text()
    else:
        print("Script element not found in the HTML.")

    return find_examples(xml_data)


