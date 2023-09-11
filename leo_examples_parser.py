import xml.etree.ElementTree as ET

def find_examples(xml_data):
    # Parse the XML data
    root = ET.fromstring(xml_data)

    # Define the attribute value you want to search for
    target_sctName = "example"

    # Use XPath to find all <section> elements with the specified attribute value
    sections_with_target_value = root.findall(f'.//section[@sctName="{target_sctName}"]/entry/side/words/word')

    result = []
    first = None
    for i in range(0, len(sections_with_target_value), 2):
        result.append((sections_with_target_value[i+1].text, sections_with_target_value[i].text))

    return(result)


