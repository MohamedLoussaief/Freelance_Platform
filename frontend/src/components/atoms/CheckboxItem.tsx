import { useState } from "react";

const CheckboxItem = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none mb-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-5 h-5 flex items-center justify-center border-2 rounded 
          ${
            checked
              ? "border-green-600 text-green-600"
              : "border-gray-400 text-transparent"
          }`}
      >
        ✓
      </span>
      <span className="text-gray-800">{label}</span>
    </label>
  );
};

export default CheckboxItem;
