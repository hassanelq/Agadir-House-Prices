from flask import Flask, request, jsonify
import util

app = Flask(__name__)

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

        estimated_price = util.get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped)
        estimated_price = int(estimated_price)

        response = jsonify({'estimated_price': estimated_price})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    util.load_saved_artifacts()
    app.run()
