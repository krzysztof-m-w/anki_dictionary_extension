import requests

class Anki_connector:
    def __init__(self, url = 'http://localhost:8765'):
        self.url = url
        self.get_model_names()

    def get_model_names(self):
        request_data = {
            "action": "modelNames",
            "version": 6
        }

        response = requests.post(self.url, json=request_data)

        if response.status_code != 200:
            return response.status_code
        
        self.model_names = response.json()['result']

        return response.status_code
    
connector = Anki_connector()

print(connector.model_names)