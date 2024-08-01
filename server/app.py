from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

__data_columns = ["area", "rooms", "bedrooms", "bathrooms", "appartement", "villa", "abattoirs", "al wifaq", "amicales", "anza", "ben serguaou", "charaf", "cit\u00e9 adrar", "extension dakhla", "founti", "haut anza", "haut founty", "hay dakhla", "hay houda", "hay massira", "hay mohammadi", "hay najah", "hay salam", "illigh", "lekhiam", "port", "riad salam", "secteur touristique", "taddart", "taddart anza", "talborjt", "tikiouine", "tilila", "ville nouvelle", "zone industrielle agadir", "bon \u00e9tat", "nouveau", "\u00e0 r\u00e9nover"]
__model = None

def get_estimated_price(location, type, status, area, rooms, bedrooms, bathrooms):
    if __model is None:
        raise Exception("Model is not loaded")

    loc_index = __data_columns.index(location.lower()) if location.lower() in __data_columns else -1
    type_index = __data_columns.index(type.lower()) if type.lower() in __data_columns else -1
    status_index = __data_columns.index(status.lower()) if status.lower() in __data_columns else -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = rooms
    x[2] = bedrooms
    x[3] = bathrooms

    if loc_index >= 0:
        x[loc_index] = 1
    if type_index >= 0:
        x[type_index] = 1
    if status_index >= 0:
        x[status_index] = 1

    return __model.predict([x])[0]

def load_saved_artifacts():
    global __model
    model_path = './artifacts/Agadir_home_prices_model.pickle'
    with open(model_path, 'rb') as f:
        __model = pickle.load(f)

@app.route('/predict-home-price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'Request body is not in JSON format or is empty.'}), 400

    required_fields = ['location', 'type', 'status', 'area', 'rooms', 'bedrooms', 'bathrooms']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    try:
        location = data['location']
        type = data['type']
        status = data['status']
        area = float(data['area'])
        rooms = int(data['rooms'])
        bedrooms = int(data['bedrooms'])
        bathrooms = int(data['bathrooms'])

        estimated_price = get_estimated_price(location, type, status, area, rooms, bedrooms, bathrooms)
        estimated_price = int(estimated_price)

        response = jsonify({'estimated_price': estimated_price})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    try:
        load_saved_artifacts()
        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(f"Failed to start the server: {e}")
