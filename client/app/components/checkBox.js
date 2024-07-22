const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 mb-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-white"
      />
      <span className=" font-medium">{label}</span>
    </label>
  );
};

export default Checkbox;
