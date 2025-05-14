import React from "react";

interface FontSizeAdjusterProps {
  value: number;
  onChange: (value: number) => void;
}

const FontSizeAdjuster: React.FC<FontSizeAdjusterProps> = ({ value, onChange }) => {
  // 12부터 68까지 2단위로 숫자 배열 생성
  const fontSizeOptions = Array.from({ length: (68 - 12) / 2 + 1 }, (_, i) => 12 + i * 2);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    if (!isNaN(selectedValue)) {
      onChange(selectedValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        id="font-size"
        value={value}
        onChange={handleSelectChange}
        className="p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{  width: "80px" }}
      >
        {fontSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSizeAdjuster;
