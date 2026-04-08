import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthYear } from '../utils';
import type { ImageSectionProps } from '../types';
import { CardContainer } from './ui/3d-card';

interface ImageSectionExtendedProps extends ImageSectionProps {
  colors?: {
    primary: string;
    secondary: string;
    text: string;
    bg: string;
    headerBg: string;
  };
}

/**
 * Utility: Determine if a color is light or dark
 */
function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * ImageSection Component
 * Displays hero image and month navigation header
 * Desktop: Left side (prominent), Mobile: Full width (condensed)
 * Enhanced: Month-specific colors and dynamic styling
 */
export const ImageSection: React.FC<ImageSectionExtendedProps> = ({
  imageUrl,
  currentMonth,
  onMonthChange,
  colors = {
    primary: '#3b82f6',
    secondary: '#0284c7',
    text: '#ffffff',
    bg: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    headerBg: 'bg-linear-to-r from-blue-600 to-blue-500',
  },
}) => {
  const isLight = isLightColor(colors.primary);
  const buttonTextColor = '#000000'; // Always black text
  const buttonBgColor = isLight ? '#d1d5db' : `${colors.primary}20`;
  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    newMonth.setFullYear(2026); // Ensure year stays 2026
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    newMonth.setFullYear(2026); // Ensure year stays 2026
    onMonthChange(newMonth);
  };

  return (
    <div className="w-full space-y-4">
      {/* Bordered Image Container with 3D hover effect */}
      <CardContainer className="inter-var w-full">
        <div className="w-full border-4 border-gray-300 rounded-2xl overflow-hidden bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <div className="relative w-full overflow-hidden group">
            <img
              src={imageUrl}
              alt="Calendar hero"
              className="w-full h-64 sm:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Month Header - Positioned on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
              <div className="drop-shadow-xl">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-90 mb-1">
                  {new Date(currentMonth).getFullYear()}
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-lg"
                  style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
                >
                  {formatMonthYear(currentMonth).split(' ')[0]}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Navigation Controls */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 rounded-xl relative z-10"
        style={{
          background: '#ffffff',
        }}
      >
        <button
          onClick={handlePrevMonth}
          className="p-3 rounded-xl transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-400/20 transform hover:scale-125 active:scale-95 flex items-center justify-center"
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
          }}
          aria-label="Previous month"
          title="Previous month"
        >
          <ChevronLeft className="w-7 h-7 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.5} />
        </button>

        <div className="flex-1 mx-4 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest" style={{ color: '#000000' }}>
            ← {new Date(currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} →
          </span>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-3 rounded-xl transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-400/20 transform hover:scale-125 active:scale-95 flex items-center justify-center"
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
          }}
          aria-label="Next month"
          title="Next month"
        >
          <ChevronRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ImageSection;
