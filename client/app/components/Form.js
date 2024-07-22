"use client";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import Checkbox from "./CheckBox";
import { predictHomePrice } from "../utils/api";
import locations from "../data/locations";
import proprietyOptions from "../data/proprietyOptions";
import statusOptions from "../data/statusOptions";
import typesOptions from "../data/typesOptions";

const Form = () => {
  const [area, setArea] = useState(100);
  const [rooms, setRooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [bedrooms, setBedrooms] = useState(2);
  const [location, setLocation] = useState("abattoirs");
  const [jardin, setJardin] = useState(false);
  const [cuisineEquipped, setCuisineEquipped] = useState(false);
  const [piscine, setPiscine] = useState(false);
  const [type, setType] = useState("appartement");
  const [status, setStatus] = useState("nouveau");
  const [propriety, setPropriety] = useState("moins d'un an");
  const [estimatedPrice, setEstimatedPrice] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await predictHomePrice({
        area,
        rooms,
        bathrooms,
        bedrooms,
        location,
        type,
        jardin,
        cuisineEquipped,
        piscine,
        status,
        propriety,
      });
      setEstimatedPrice(data.estimated_price);
    } catch (error) {
      console.error("Error predicting home price:", error);
    }
  };

  return (
    <div className="form p-4">
      <h2 className="text-xl mb-4">
        Area (m<span className="text-sm">2</span>)
      </h2>
      <Input value={area} onChange={setArea} type="number" />
      <h2 className="text-xl mb-4">Rooms</h2>
      <RadioGroup
        name="Rooms"
        options={[1, 2, 3, 4, 5, 6]}
        selectedValue={rooms}
        onChange={setRooms}
      />
      <h2 className="text-xl mb-4">Bedrooms</h2>
      <RadioGroup
        name="Bedrooms"
        options={[1, 2, 3, 4]}
        selectedValue={bedrooms}
        onChange={setBedrooms}
      />
      <h2 className="text-xl mb-4">Bathrooms</h2>
      <RadioGroup
        name="Bathrooms"
        options={[1, 2, 3, 4]}
        selectedValue={bathrooms}
        onChange={setBathrooms}
      />
      <h2 className="text-xl mb-4">Features</h2>
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
      <h2 className="text-xl mb-4">Location</h2>
      <Select value={location} onChange={setLocation} options={locations} />
      <h2 className="text-xl mb-4">Type</h2>
      <Select value={type} onChange={setType} options={typesOptions} />
      <h2 className="text-xl mb-4">Status</h2>
      <Select value={status} onChange={setStatus} options={statusOptions} />
      <h2 className="text-xl mb-4">Propriety</h2>
      <Select
        value={propriety}
        onChange={setPropriety}
        options={proprietyOptions}
      />
      <button
        className="submit mt-4 w-full bg-green-500 text-white py-2 rounded"
        onClick={handleSubmit}
      >
        Estimate Price
      </button>
      {estimatedPrice && (
        <div
          id="uiEstimatedPrice"
          className="result mt-4 text-center bg-yellow-300 p-2 rounded"
        >
          <h2>{estimatedPrice} Lakh</h2>
        </div>
      )}
    </div>
  );
};

export default Form;
