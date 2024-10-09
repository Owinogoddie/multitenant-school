'use client';

import { useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <div
        className="w-10 h-10 rounded-full border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white p-2 rounded shadow-lg">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-32 h-32"
          />
        </div>
      )}
    </div>
  );
}