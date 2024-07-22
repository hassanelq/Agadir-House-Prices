# from flask import Flask, request, jsonify
# import util

# app = Flask(__name__)

# @app.route('/predict-home-price', methods=['POST'])
# def predict_home_price():
#     try:
#         data = request.get_json()
#         location = data['location']
#         type = data['type']
#         status = data['status']
#         property_state = data['property_state']
#         area = float(data['area'])
#         rooms = int(data['rooms'])
#         bedrooms = int(data['bedrooms'])
#         bathrooms = int(data['bathrooms'])
#         jardin = int(data['jardin'])
#         piscine = int(data['piscine'])
#         cuisine_equiped = int(data['cuisine_equiped'])

#         print(f"Received data: location={location}, type={type}, status={status}, property_state={property_state}, area={area}, rooms={rooms}, bedrooms={bedrooms}, bathrooms={bathrooms}, jardin={jardin}, piscine={piscine}, cuisine_equiped={cuisine_equiped}")

#         estimated_price = util.get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped)
        
#         estimated_price = int(estimated_price) 

#         response = jsonify({
#             'estimated_price': estimated_price
#         })
#         response.headers.add('Access-Control-Allow-Origin', '*')

#         return response
#     except Exception as e:
#         print(f"Error occurred: {e}")
#         response = jsonify({
#             'error': str(e)
#         })
#         response.headers.add('Access-Control-Allow-Origin', '*')
#         return response, 400

# if __name__ == "__main__":
#     print("Starting Python Flask Server For Home Price Prediction...")
#     util.load_saved_artifacts()
#     app.run()



from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/predict-home-price', methods=['POST'])
def predict_home_price():
    try:
        # Debug print headers and request body
        print("Headers: ", request.headers)
        print("Request data: ", request.data)

        # Attempt to get JSON data from the request
        data = request.get_json()
        
        # Check if data is None
        if data is None:
            raise ValueError("Request body is not in JSON format or is empty.")

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

        print(f"Received data: location={location}, type={type}, status={status}, property_state={property_state}, area={area}, rooms={rooms}, bedrooms={bedrooms}, bathrooms={bathrooms}, jardin={jardin}, piscine={piscine}, cuisine_equiped={cuisine_equiped}")

        estimated_price = util.get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped)
        
        estimated_price = int(estimated_price) 

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
