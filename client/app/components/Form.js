"use client";
import React, { useState } from "react";
import Input from "./Input";
import RadioGroup from "./RadioGroup";
// import ChoiceGroup from "./Choices";
import Select from "./Select";
import Checkbox from "./CheckBox";
import { getLocationNames, predictHomePrice } from "../utils/api";

const Form = () => {
  const [area, setArea] = useState(100);
  const [rooms, setRooms] = useState(2);

  const [bathrooms, setBathrooms] = useState(2);
  const [bedrooms, setBedrooms] = useState(2);
  const [location, setLocation] = useState("");

  const [jardin, setJardin] = useState(false);
  const [cuisineEquipped, setCuisineEquipped] = useState(false);
  const [piscine, setPiscine] = useState(false);
  const [locations, setLocations] = useState([]);
  const [type, setType] = useState("appartement");
  const [status, setStatus] = useState("nouveau");
  const [propriety, setPropriety] = useState("1-5 ans");

  const [estimatedPrice, setEstimatedPrice] = useState("");

  const handleSubmit = async () => {
    const data = await predictHomePrice({ area, bhk, bathrooms, location });
    setEstimatedPrice(data.estimated_price);
  };

  React.useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocationNames();
      setLocations(data.locations);
    };
    fetchLocations();
  }, []);

  const typesOptions = ["appartement", "maison", "villa"];
  const statusOptions = ["nouveau", "bon etat", "a renover"];

  const ProprietyOptions = [
    "moins d'un an",
    "1-5 ans",
    "5-10 ans",
    "10-20 ans",
    "20-30 ans",
    "30-50 ans",
    "50-70 ans",
  ];
  const RoomsOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  return (
    <div className="form p-4">
      <h2 className="text-xl mb-4">
        Area (m<span className="text-sm">2</span>)
      </h2>
      <Input value={area} onChange={setArea} type="number" />
      <h2 className="text-xl mb-4">Rooms</h2>
      <RadioGroup
        name="Rooms"
        options={RoomsOptions}
        selectedValue={rooms}
        onChange={setRooms}
      />
      <h2 className="text-xl mb-4">Bedrooms</h2>
      <RadioGroup
        name="Bedrooms"
        options={RoomsOptions}
        selectedValue={bedrooms}
        onChange={setBedrooms}
      />
      <h2 className="text-xl mb-4">Bathrooms</h2>
      <RadioGroup
        name="Bathrooms"
        options={RoomsOptions}
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
        options={ProprietyOptions}
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
