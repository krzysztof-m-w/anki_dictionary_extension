from bs4 import BeautifulSoup
import requests

def get_examples(word):
        
    file_content = requests.get(f"https://en.pons.com/translate/german-polish/{word}").text

    soup = BeautifulSoup(file_content, 'html.parser')

    def find_dls_with_example_span(tag):
        return tag.name == 'dl' and (tag.find('span', {'class': 'example'}) or tag.find('span', {'class' : "idiom_proverb"})) 

    # Find all div elements containing <span class="example">
    translated_examples = soup.find_all(find_dls_with_example_span)

    untranslated_examples = soup.find_all("div", {"class" : "example"})

    result = []

    # Print the contents of these divs
    for tag in translated_examples:
        dt = tag.find('dt')
        dd = tag.find('dd')
        result.append((dt.text, dd.text))

    for tag in untranslated_examples:
        result.append((tag.text, None))

    return result



