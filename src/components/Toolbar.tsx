import React from 'react';
import { ColorPicker } from './ColorPicker';
import { Eraser, Download, Trash2 } from 'lucide-react';

interface ToolbarProps {
  currentColor: string;
  strokeWidth: number;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onClear: () => void;
  onSave: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  currentColor,
  strokeWidth,
  onColorChange,
  onStrokeWidthChange,
  onClear,
  onSave,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <ColorPicker currentColor={currentColor} onColorChange={onColorChange} />
      
      <div className="h-8 w-px bg-gray-300" />
      
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
          className="w-32"
        />
        <span className="text-sm text-gray-600">{strokeWidth}px</span>
      </div>

      <div className="h-8 w-px bg-gray-300" />
      
      <button
        onClick={() => onColorChange('#FFFFFF')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Eraser"
      >
        <Eraser className="w-6 h-6" />
      </button>
      
      <button
        onClick={onClear}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Clear Canvas"
      >
        <Trash2 className="w-6 h-6" />
      </button>
      
      <button
        onClick={onSave}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Save Drawing"
      >
        <Download className="w-6 h-6" />
      </button>
    </div>
  );
};