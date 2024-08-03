"use client";
// Form.js
import React, { useState } from "react";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import { predictHomePrice } from "../utils/api";
// Data
import locations from "../data/locations";
import statusOptions from "../data/statusOptions";
import typesOptions from "../data/typesOptions";

import CircleAnimation from "./CircleAnimation";

const Form = () => {
  const [area, setArea] = useState(75);
  const [rooms, setRooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(2);
  const [bedrooms, setBedrooms] = useState(3);
  const [location, setLocation] = useState(locations[18]);
  const [type, setType] = useState(typesOptions[0]);
  const [status, setStatus] = useState(statusOptions[1]);
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setEstimatedPrice("");
    const data = {
      location,
      type,
      status,
      area,
      rooms,
      bedrooms,
      bathrooms,
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
    <div className="w-full md:w-[50%]">
      <h2 className="py-[1rem] text-[2rem] text-center md:text-left font-semibold text-transparent !bg-clip-text [background:linear-gradient(90deg,_#d4d4d4,_#797979)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        Prédire le prix
      </h2>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Superficie (m<sup>2</sup>)
        </label>
        <input
          value={area}
          className="border rounded-full bg-gray-200 text-black px-4 py-2 w-full"
          onChange={(e) => setArea(e.target.value)}
          type="number"
          max={1000}
          min={40}
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Pièces
        </label>
        <RadioGroup
          name="Rooms"
          options={[1, 2, 3, 4, 5, 6, 7, 8]}
          selectedValue={rooms}
          onChange={setRooms}
          className="w-full px-3 py-2"
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Chambres
        </label>
        <RadioGroup
          name="Bedrooms"
          options={[1, 2, 3, 4, 5]}
          selectedValue={bedrooms}
          onChange={setBedrooms}
          className="w-full px-3 py-2"
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Salles de bains
        </label>
        <RadioGroup
          name="Bathrooms"
          options={[1, 2, 3, 4]}
          selectedValue={bathrooms}
          onChange={setBathrooms}
          className="w-full  px-3 py-2"
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Quartier
        </label>
        <Select
          value={location}
          onChange={setLocation}
          options={locations}
          className="w-full "
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Type de bien
        </label>
        <Select
          value={type}
          onChange={setType}
          options={typesOptions}
          className="w-full"
        />
      </div>
      <div className="flex py-3 items-center">
        <label className="block text-[1.2rem] text-[#e5e7eb] opacity-75 w-[45%]">
          Etat
        </label>
        <Select
          value={status}
          onChange={setStatus}
          options={statusOptions}
          className="w-full"
        />
      </div>

      <div className="flex justify-end">
        <button
          className="relative w-[71%] flex justify-center items-center mt-3 px-5 py-3 text-center text-lg sm:text-xl leading-5 font-medium text-[#d4d4d4] box-border shadow-[0px_1px_1px_rgba(0,0,0,0.04),0px_2px_3px_rgba(0,0,0,0.12),0px_6px_9px_rgba(0,0,0,0.6)] rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0)] bg-[rgba(0,0,0,0.1)] border border-[rgba(255,255,255,0.1)] transition duration-300 ease-in-out hover:bg-[rgba(255,255,255,0.08)]"
          type="submit"
          onClick={handleSubmit}
        >
          Prédire le prix
        </button>
      </div>

      {loading && (
        <div className="flex justify-end pt-10 pr-16">
          {" "}
          <CircleAnimation />{" "}
        </div>
      )}
      {estimatedPrice && (
        <div id="uiEstimatedPrice" className="text-right pt-6 text-[#e5e7eb]">
          <h1 className="text-[3rem] font-bold">
            {formatPrice(estimatedPrice)} DH
          </h1>
          <p className="text-[1.1rem] ml-8 md:ml-16">
            La base de données est actuellement petite, ce qui peut parfois
            affecter la précision des prédictions.
          </p>
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
