const Select = ({ value, onChange, options }) => {
  return (
    <select
      className="location text-black p-2 w-full mb-4 rounded bg-gray-200"
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
