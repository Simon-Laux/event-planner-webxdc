import React from 'react';
import { Circle } from 'lucide-react';

const COLORS = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
];

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
}) => {
  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`w-8 h-8 rounded-full transition-transform ${
            currentColor === color ? 'scale-110 ring-2 ring-blue-500' : ''
          }`}
        >
          <Circle
            fill={color}
            color={color}
            className="w-full h-full"
          />
        </button>
      ))}
    </div>
  );
};