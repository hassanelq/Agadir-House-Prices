import React from "react";

const RadioGroup = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="relative flex items-center rounded-full bg-white text-black overflow-hidden border border-gray-300 w-full">
      {options.map((option) => (
        <label
          key={option}
          className={`flex-1 py-2 cursor-pointer flex justify-center items-center z-10 font-semibold text-sm rounded-full transition-all duration-200 ${
            selectedValue === option
              ? "bg-gray-600 text-white"
              : "bg-gray-200 text-[#4b4b4b]"
          }`}
        >
          <input
            type="radio"
            value={option}
            name={name}
            id={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
            className="hidden"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
