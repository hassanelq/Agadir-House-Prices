const Select = ({ value, onChange, options }) => {
  return (
    <select
      className="location text-black w-full px-3 py-2 rounded bg-gray-200"
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
