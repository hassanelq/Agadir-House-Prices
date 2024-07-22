const Input = ({ value, onChange, type }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= 0 && newValue <= 1000) {
      onChange(newValue);
    } else if (newValue > 1000) {
      onChange(1000);
    }
  };

  return (
    <input
      className="area p-2 w-full mb-4 rounded bg-gray-200 text-black"
      type={type}
      value={value}
      onChange={handleChange}
      max={1000}
      min={40}
    />
  );
};

export default Input;
