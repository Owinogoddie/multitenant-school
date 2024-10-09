'use client';

import { useState, useEffect, useRef } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="w-10 h-10 rounded-full border cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {isOpen && (
        <div className="absolute top-12 left-0 z-10">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-32 h-32 cursor-pointer appearance-none"
            style={{ opacity: 0 }}
          />
          <div 
            className="w-32 h-32 absolute top-0 left-0 pointer-events-none" 
            style={{ backgroundColor: color }}
          ></div>
        </div>
      )}
    </div>
  );
}