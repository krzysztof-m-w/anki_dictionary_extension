import requests

class Anki_connector:
    def __init__(self, url = 'http://localhost:8765'):
        self.url = url
        self.get_model_names()
        self.get_model_field_names()
        self.get_deck_names()

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
    
    def get_model_field_names(self):
        self.model_field_names = dict()
        
        for model in self.model_names:
            request_data = {
                "action": "modelFieldNames",
                "version": 6,
                "params": {
                    "modelName": model
                }
            }

            response = requests.post(self.url, json=request_data)

            if response.status_code != 200:
                self.model_field_names = dict()
                return response.status_code
            
            self.model_field_names[model] = response.json()['result']

        return 200
    
    def get_deck_names(self):
        request_data = {
            "action": "deckNames",
            "version": 6
        }

        response = requests.post(self.url, json=request_data)

        if response.status_code != 200:
            return response.status_code
            
        self.deck_names = response.json()['result']
    
    def add_card(self, deckName, modelName, front, back):
        request_data = {
            "action": "addNote",
            "version": 6,
            "params": {
                "note": {
                    "deckName": f"{deckName}",
                    "modelName": f"{modelName}",
                    "fields": {
                        f"{self.model_field_names[modelName][0]}": f"{front}",
                        f"{self.model_field_names[modelName][1]}": f"{back}"
                    },
                    "options": {
                        "allowDuplicate": False,
                        "duplicateScope": "deck",
                        "duplicateScopeOptions": {
                            "deckName": "Default",
                            "checkChildren": False,
                            "checkAllModels": False
                        }
                    }
                }
            }
        }                   
        
        response = requests.post(self.url, json=request_data)

        if response.status_code != 200:
            return response.status_code
        
        if response.json()['error']:
            return response.json()['error']

        return 200