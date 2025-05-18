// src/components/rich-editor/LexicalEditor/ColorPicker.tsx
import React, { useState, useRef, useEffect } from "react";

interface ColorPickerProps {
    initialColor: string;
    onChange: (color: string) => void;
    label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ initialColor, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const [hue, setHue] = useState(0); // 0-360
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const colorAreaRef = useRef<HTMLDivElement>(null);
    const hueSliderRef = useRef<HTMLDivElement>(null);

    // Predefined colors palette
    const colorPalette = [
        // Row 1
        "#FF0000", "#FF9900", "#FFFF00", "#996633", "#99CC00", "#006600", "#CC00FF", "#3333FF",
        // Row 2
        "#0099FF", "#00FFFF", "#99FF99", "#000000", "#666666", "#CCCCCC", "#FFFFFF", "#F5F5DC"
    ];

    // Initialize color position and hue from initial color
    useEffect(() => {
        if (initialColor && initialColor !== "") {
            const { h, s, l } = hexToHsl(initialColor);
            setHue(h);

            // Set position based on saturation and lightness
            if (colorAreaRef.current) {
                const width = colorAreaRef.current.clientWidth;
                const height = colorAreaRef.current.clientHeight;
                setPosition({
                    x: s * width,
                    y: (1 - l) * height
                });
            }
        }
    }, [initialColor, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Convert HSL values to Hex color
    const updateColor = (h: number, s: number, l: number) => {
        const newColor = hslToHex(h, s, l);
        setSelectedColor(newColor);
        onChange(newColor);
    };

    // Handle click/drag in the color area
    const handleColorAreaInteraction = (
        event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
        isMove = false
    ) => {
        if (!colorAreaRef.current || (isMove && event.type !== "touchmove" && (event as React.MouseEvent).buttons !== 1)) {
            return;
        }

        let clientX, clientY;
        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        const rect = colorAreaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

        setPosition({ x, y });

        // Calculate saturation and lightness based on position
        const s = x / rect.width;
        const l = 1 - y / rect.height;

        updateColor(hue, s, l);
    };

    // Handle click/drag on the hue slider
    const handleHueInteraction = (
        event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        if (!hueSliderRef.current) return;

        let clientX;
        if ('touches' in event) {
            clientX = event.touches[0].clientX;
        } else {
            clientX = event.clientX;
        }

        const rect = hueSliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));

        // Calculate hue based on slider position (0-360)
        const newHue = Math.round((x / rect.width) * 360);
        setHue(newHue);

        // Update color with new hue value
        if (colorAreaRef.current) {
            const width = colorAreaRef.current.clientWidth;
            const height = colorAreaRef.current.clientHeight;
            const s = position.x / width;
            const l = 1 - position.y / height;
            updateColor(newHue, s, l);
        }
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        onChange(color);

        // Update hue and position when selecting from palette
        const { h, s, l } = hexToHsl(color);
        setHue(h);

        if (colorAreaRef.current) {
            const width = colorAreaRef.current.clientWidth;
            const height = colorAreaRef.current.clientHeight;
            setPosition({
                x: s * width,
                y: (1 - l) * height
            });
        }
    };

    const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let color = e.target.value;

        // Ensure the input starts with a #
        if (!color.startsWith('#')) {
            color = '#' + color;
        }

        // Validate the hex color format
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            handleColorChange(color);
        } else {
            setSelectedColor(color);
        }
    };

    return (
        <div className="relative" ref={colorPickerRef}>
            <button
                type="button"
                className="flex items-center text-sm px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={`Select ${label || "color"}`}
            >
                {label && <span className="mr-1">{label}:</span>}
                <div
                    className="w-5 h-5 border border-gray-300 rounded"
                    style={{ backgroundColor: selectedColor }}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 bg-white rounded shadow-lg p-3 w-64">
                    {/* Color palette */}
                    <div className="grid grid-cols-8 gap-1 mb-3">
                        {colorPalette.map((color, index) => (
                            <button
                                key={index}
                                className={`w-6 h-6 rounded-sm border ${selectedColor.toLowerCase() === color.toLowerCase() ? 'border-2 border-blue-500' : 'border-gray-300'}`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorChange(color)}
                                aria-label={`Color ${color}`}
                            />
                        ))}
                    </div>

                    {/* Color area (saturation/brightness) */}
                    <div
                        ref={colorAreaRef}
                        className="w-full h-32 mb-3 cursor-pointer rounded relative"
                        style={{
                            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%),
                          linear-gradient(to right, rgba(255,255,255,1) 0%, hsla(${hue}, 100%, 50%, 1) 100%)`
                        }}
                        onClick={handleColorAreaInteraction}
                        onMouseDown={handleColorAreaInteraction}
                        onMouseMove={(e) => handleColorAreaInteraction(e, true)}
                        onTouchStart={handleColorAreaInteraction}
                        onTouchMove={handleColorAreaInteraction}
                    >
                        {/* Color picker handle */}
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-md absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                                backgroundColor: selectedColor,
                                left: position.x,
                                top: position.y,
                            }}
                        />
                    </div>

                    {/* Hue slider */}
                    <div
                        ref={hueSliderRef}
                        className="w-full h-4 mb-3 cursor-pointer rounded relative"
                        style={{
                            background: `linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)`
                        }}
                        onClick={handleHueInteraction}
                        onMouseDown={handleHueInteraction}
                        onTouchStart={handleHueInteraction}
                    >
                        {/* Hue slider handle */}
                        <div
                            className="w-4 h-4 rounded-full bg-white border border-gray-300 shadow-md absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${(hue / 360) * 100}%`,
                                top: '50%'
                            }}
                        />
                    </div>

                    {/* Preview bar */}
                    <div
                        className="w-full h-8 mb-2 rounded"
                        style={{ backgroundColor: selectedColor }}
                    />

                    {/* Hex input */}
                    <div className="flex items-center">
                        <span className="mr-2 text-sm">Hex</span>
                        <input
                            type="text"
                            value={selectedColor}
                            onChange={handleHexInputChange}
                            className="border rounded px-2 py-1 text-sm w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function to convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
    l = Math.max(0, Math.min(1, l));
    s = Math.max(0, Math.min(1, s));

    const hue = h / 360;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, hue + 1 / 3);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1 / 3);
    }

    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Helper function to convert HEX to HSL
function hexToHsl(hex: string): { h: number, s: number, l: number } {
    // Default values
    if (!hex || !/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
        return { h: 0, s: 0, l: 0 };
    }

    // Convert hex to RGB
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16) / 255;
        g = parseInt(hex[2] + hex[2], 16) / 255;
        b = parseInt(hex[3] + hex[3], 16) / 255;
    } else {
        r = parseInt(hex.slice(1, 3), 16) / 255;
        g = parseInt(hex.slice(3, 5), 16) / 255;
        b = parseInt(hex.slice(5, 7), 16) / 255;
    }

    // Find the min and max values to calculate lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h = Math.round(h * 60);
    }

    return { h, s, l };
}

export default ColorPicker;