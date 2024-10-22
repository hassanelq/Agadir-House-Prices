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
    if __data_columns is None or __model is None:
        raise ValueError("Artifacts are not loaded. Please check if load_saved_artifacts() has been called.")

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

    return __model.predict([x])[0].astype(int)

def load_saved_artifacts():
    global __data_columns, __locations, __types, __status, __property_states, __model

    with open("./artifacts/columns.json", "r") as f:
        data = json.load(f)
        __data_columns = data.get('data_columns', [])
        __locations = __data_columns[20:]
        __types = __data_columns[7:10]
        __status = __data_columns[10:13]
        __property_states = __data_columns[13:20]

    with open('./artifacts/Agadir_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    try:
        print(get_estimated_price('tilila', 'appartement', 'nouveau', '1-5 ans', 100, 3, 2, 2, 0, 0, 0), "DH")
    except ValueError as e:
        print(e)
