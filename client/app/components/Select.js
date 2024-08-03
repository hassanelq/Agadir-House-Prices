const Select = ({ value, onChange, options }) => {
  return (
    <select
      className="text-black w-full px-3 py-2 rounded-full bg-gray-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
