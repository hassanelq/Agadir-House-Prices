from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get-location-names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route('/get-types', methods=['GET'])
def get_types():
    response = jsonify({
        'types': util.get_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route('/get-status', methods=['GET'])
def get_status():
    response = jsonify({
        'status': util.get_status()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route('/get-property-states', methods=['GET'])
def get_property_states():
    response = jsonify({
        'property_states': util.get_property_states()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route('/predict-home-price', methods=['POST'])
def predict_home_price():
    try:
        location = request.form['location']
        type = request.form['type']
        status = request.form['status']
        property_state = request.form['property_state']
        area = float(request.form['area'])
        rooms = int(request.form['rooms'])
        bedrooms = int(request.form['bedrooms'])
        bathrooms = int(request.form['bathrooms'])
        jardin = int(request.form['jardin'])
        piscine = int(request.form['piscine'])
        cuisine_equiped = int(request.form['cuisine_equiped'])

        print(f"Received data: location={location}, type={type}, status={status}, property_state={property_state}, area={area}, rooms={rooms}, bedrooms={bedrooms}, bathrooms={bathrooms}, jardin={jardin}, piscine={piscine}, cuisine_equiped={cuisine_equiped}")

        estimated_price = util.get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped)
        
        # Ensure estimated_price is a standard Python type
        estimated_price = int(estimated_price)  # or int(estimated_price) based on your requirement

        response = jsonify({
            'estimated_price': estimated_price
        })
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response
    except Exception as e:
        print(f"Error occurred: {e}")
        response = jsonify({
            'error': str(e)
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 400

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()


