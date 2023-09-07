import xml.etree.ElementTree as ET

def find_examples(xml_data):
    # Parse the XML data
    root = ET.fromstring(xml_data)

    # Define the attribute value you want to search for
    target_sctName = "example"

    # Use XPath to find all <section> elements with the specified attribute value
    sections_with_target_value = root.findall(f'.//section[@sctName="{target_sctName}"]/entry/side/words/word')

    result = []
    for section in sections_with_target_value:
        result.append(section.text)

    return(result)


