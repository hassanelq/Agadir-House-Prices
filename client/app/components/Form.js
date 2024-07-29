"use client";
// Form.js
import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import Checkbox from "./Checkerbox";
import { predictHomePrice } from "../utils/api";

// Data
import locations from "../data/locations";
import proprietyOptions from "../data/proprietyOptions";
import statusOptions from "../data/statusOptions";
import typesOptions from "../data/typesOptions";

const Form = () => {
  const [area, setArea] = useState(100);
  const [rooms, setRooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [bedrooms, setBedrooms] = useState(2);
  const [location, setLocation] = useState(locations[0]);
  const [jardin, setJardin] = useState(false);
  const [cuisineEquipped, setCuisineEquipped] = useState(false);
  const [piscine, setPiscine] = useState(false);
  const [type, setType] = useState(typesOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [propriety, setPropriety] = useState(proprietyOptions[0]);
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setEstimatedPrice("");
    const data = {
      location,
      type,
      status,
      property_state: propriety,
      area,
      rooms,
      bedrooms,
      bathrooms,
      jardin: jardin ? 1 : 0,
      piscine: piscine ? 1 : 0,
      cuisine_equiped: cuisineEquipped ? 1 : 0,
    };

    try {
      const result = await predictHomePrice(data);
      setEstimatedPrice(result.estimated_price);
    } catch (error) {
      console.error("Error predicting home price:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "  ");
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Estimate Home Price</h2>
      <div className="mb-4">
        <label className="block text-lg mb-2">
          Area (m<sup>2</sup>)
        </label>
        <input
          value={area}
          className="area p-2 w-full mb-4 border rounded bg-gray-200 text-black"
          onChange={(e) => setArea(e.target.value)}
          type="number"
          max={1000}
          min={40}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Rooms</label>
        <RadioGroup
          name="Rooms"
          options={[1, 2, 3, 4, 5, 6]}
          selectedValue={rooms}
          onChange={setRooms}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Bedrooms</label>
        <RadioGroup
          name="Bedrooms"
          options={[1, 2, 3, 4]}
          selectedValue={bedrooms}
          onChange={setBedrooms}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Bathrooms</label>
        <RadioGroup
          name="Bathrooms"
          options={[1, 2, 3, 4]}
          selectedValue={bathrooms}
          onChange={setBathrooms}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Features</label>
        <Checkbox
          label="Jardin"
          checked={jardin}
          onChange={() => setJardin(!jardin)}
        />
        <Checkbox
          label="Cuisine Équipée"
          checked={cuisineEquipped}
          onChange={() => setCuisineEquipped(!cuisineEquipped)}
        />
        <Checkbox
          label="Piscine"
          checked={piscine}
          onChange={() => setPiscine(!piscine)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Location</label>
        <Select value={location} onChange={setLocation} options={locations} />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Type</label>
        <Select value={type} onChange={setType} options={typesOptions} />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Status</label>
        <Select value={status} onChange={setStatus} options={statusOptions} />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Propriety</label>
        <Select
          value={propriety}
          onChange={setPropriety}
          options={proprietyOptions}
        />
      </div>
      <button
        className="w-full bg-green-600 text-white py-3 rounded transition duration-200 hover:bg-green-700"
        onClick={handleSubmit}
      >
        Estimate Price
      </button>
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12"></div>
        </div>
      )}
      {estimatedPrice && (
        <div
          id="uiEstimatedPrice"
          className="mt-4 text-2xl font-bold text-center p-2 bg-gray-100 rounded"
        >
          <h1>{formatPrice(estimatedPrice)} DH</h1>
        </div>
      )}
    </div>
  );
};

export default Form;

<style jsx>{`
  .loader {
    border-top-color: #000;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`}</style>;
