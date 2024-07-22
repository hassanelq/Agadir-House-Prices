import React from "react";

const RadioGroup = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="relative flex items-center rounded-full bg-white text-black overflow-hidden border border-gray-300 w-full">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex-1 py-2 cursor-pointer flex justify-center items-center z-10 font-semibold text-sm ${
            selectedValue === option.value ? "text-[#4b4b4b]" : ""
          }`}
        >
          <input
            type="radio"
            value={option.value}
            name={name}
            id={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
