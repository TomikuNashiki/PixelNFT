import React from 'react';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  const colorSections = {
    'Primary Colors': ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
    'Secondary Colors': ['#FF00FF', '#00FFFF', '#FFA500', '#800080'],
    'Grayscale': ['#FFFFFF', '#CCCCCC', '#666666', '#000000'],
    'Pastels': ['#FFB3B3', '#B3FFB3', '#B3B3FF', '#FFFFB3'],
    'Earth Tones': ['#8B4513', '#A0522D', '#6B8E23', '#BDB76B']
  };

  return (
    <div className="space-y-4">
      {Object.entries(colorSections).map(([section, colors]) => (
        <div key={section}>
          <h4 className="text-sm font-medium text-gray-400 mb-2">{section}</h4>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded transition-transform hover:scale-110 ${
                  selectedColor === color ? 'ring-2 ring-purple-500' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;