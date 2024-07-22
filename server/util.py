import pickle
import json
import numpy as np

__locations = None
__types = None
__status = None
__property_states = None
__data_columns = None
__model = None

def get_estimated_price(location, type, status, property_state, area, rooms, bedrooms, bathrooms, jardin, piscine, cuisine_equiped):
    if __data_columns is None:
        raise ValueError("Data columns are not loaded. Please check if load_saved_artifacts() has been called.")

    try:
        print("Received in get_estimated_price:")
        print(f"location={location}, type={type}, status={status}, property_state={property_state}, area={area}, rooms={rooms}, bedrooms={bedrooms}, bathrooms={bathrooms}, jardin={jardin}, piscine={piscine}, cuisine_equiped={cuisine_equiped}")
        
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1
    
    try:
        type_index = __data_columns.index(type.lower())
    except ValueError:
        type_index = -1
    
    try:
        status_index = __data_columns.index(status.lower())
    except ValueError:
        status_index = -1
    
    try:
        property_state_index = __data_columns.index(property_state.lower())
    except ValueError:
        property_state_index = -1

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
    
    print(f"Prepared input vector for model: {x}")
    prediction = __model.predict([x])
    print(f"Model prediction: {prediction}")
    return prediction[0][0].astype(int)

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations
    global __types
    global __status
    global __property_states

    try:
        with open("./artifacts/columns.json", "r") as f:
            __data_columns = json.load(f)['data_columns']
            __locations = __data_columns[20:]
            __types = __data_columns[7:10]
            __status = __data_columns[10:13]
            __property_states = __data_columns[13:20]
            print(f"Loaded data columns: {__data_columns}")
    except Exception as e:
        print(f"Error loading columns.json: {e}")
        __data_columns = []

    global __model
    if __model is None:
        try:
            with open('./artifacts/Agadir_home_prices_model.pickle', 'rb') as f:
                __model = pickle.load(f)
            print("Model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {e}")

    print("loading saved artifacts...done")

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_estimated_price('tilila','appartement','nouveau', '1-5 ans', 100, 3, 2, 2, 0, 0, 0), "DH")
