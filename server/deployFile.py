from flask import Flask, request, jsonify
import pickle
import json
import numpy as np

app = Flask(__name__)

__locations = None
__types = None
__status = None
__property_states = None
__data_columns = ["area", "rooms", "bedrooms", "bathrooms", "jardin", "piscine", "cuisine_equiped", "appartement", "maison", "villa", "bon \u00e9tat", "nouveau", "\u00e0 r\u00e9nover", "1-5 ans", "10-20 ans", "20-30 ans", "30-50 ans", "5-10 ans", "50-70 ans", "moins d'un an", "abattoirs", "al wifaq", "amicales", "amsernate", "anza", "ben serguaou", "bouargane", "charaf", "cit\u00e9 adrar", "extension dakhla", "founti", "haut anza", "haut founty", "hay al farah", "hay al wafaa", "hay dakhla", "hay houda", "hay massira", "hay mohammadi", "hay najah", "hay qods", "hay salam", "illigh", "lekhiam", "riad salam", "secteur touristique", "siusse", "taddart", "taddart anza", "talborjt", "tikiouine", "tilila", "ville nouvelle", "zone industrielle agadir"]
__model = None

def get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped):
    if __model is None:
        raise Exception("Model is not loaded")

    loc_index = __data_columns.index(location.lower()) if location.lower() in __data_columns else -1
    type_index = __data_columns.index(type.lower()) if type.lower() in __data_columns else -1
    status_index = __data_columns.index(status.lower()) if status.lower() in __data_columns else -1
    property_state_index = __data_columns.index(property_state.lower()) if property_state.lower() in __data_columns else -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = rooms
    x[2] = bedrooms
    x[3] = bathrooms
    x[4] = jardin
    x[5] = piscine
    x[6] = cuisine_equiped

    if loc_index >= 0:
        x[loc_index] = 1
    if type_index >= 0:
        x[type_index] = 1
    if status_index >= 0:
        x[status_index] = 1
    if property_state_index >= 0:
        x[property_state_index] = 1

    return __model.predict([x])[0]

def load_saved_artifacts():
    global __data_columns, __locations, __types, __status, __property_states, __model

    try:
        __locations = __data_columns[20:]
        __types = __data_columns[7:10]
        __status = __data_columns[10:13]
        __property_states = __data_columns[13:20]

        with open('./artifacts/Agadir_home_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading artifacts: {e}")

@app.route('/predict-home-price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'Request body is not in JSON format or is empty.'}), 400

    required_fields = ['location', 'type', 'status', 'property_state', 'area', 'rooms', 'bedrooms', 'bathrooms', 'jardin', 'piscine', 'cuisine_equiped']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    try:
        location = data['location']
        type = data['type']
        status = data['status']
        property_state = data['property_state']
        area = float(data['area'])
        rooms = int(data['rooms'])
        bedrooms = int(data['bedrooms'])
        bathrooms = int(data['bathrooms'])
        jardin = int(data['jardin'])
        piscine = int(data['piscine'])
        cuisine_equiped = int(data['cuisine_equiped'])

        estimated_price = get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped)
        estimated_price = int(estimated_price)

        response = jsonify({'estimated_price': estimated_price})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    load_saved_artifacts()
    app.run(debug=True)
