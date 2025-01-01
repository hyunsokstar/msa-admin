// extensions/FontColor.ts
import { Color } from '@tiptap/extension-color'

export const FontColor = Color.extend({
  name: 'fontColor',
  addOptions() {
    return {
      types: ['textStyle'],
      colors: [
        '#000000', // Black
        '#4B5563', // Gray-600
        '#EF4444', // Red-500
        '#F97316', // Orange-500
        '#F59E0B', // Amber-500
        '#EAB308', // Yellow-500
        '#84CC16', // Lime-500
        '#22C55E', // Green-500
        '#10B981', // Emerald-500
        '#14B8A6', // Teal-500
        '#06B6D4', // Cyan-500
        '#0EA5E9', // Sky-500
        '#3B82F6', // Blue-500
        '#6366F1', // Indigo-500
        '#8B5CF6', // Violet-500
        '#A855F7', // Purple-500
        '#D946EF', // Fuchsia-500
        '#EC4899', // Pink-500
        '#F43F5E', // Rose-500
        '#FFFFFF', // White
      ],
    }
  },
})