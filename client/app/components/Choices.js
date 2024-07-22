import React from "react";

const ChoiceGroup = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="flex justify-center items-center space-x-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex-1 py-2 cursor-pointer flex justify-center items-center z-10 font-semibold text-sm ${
            selectedValue === option.value ? "text-white" : ""
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

export default ChoiceGroup;
