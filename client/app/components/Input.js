const Input = ({ value, onChange, type }) => {
  return (
    <input
      className="area p-2 w-full mb-4 rounded bg-gray-200 text-black"
      type={type}
      value={value}
      max={1000}
      min={40}
    />
  );
};

export default Input;
