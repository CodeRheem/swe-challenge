import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import type { DayCellProps } from '../types';

/**
 * DayCell Component
 * Individual calendar date cell with interactive states
 * Features: selection states, notes indicator, hover effects, accessibility
 */
export const DayCell: React.FC<DayCellProps> = ({
  day,
  onDateClick,
  hasNote,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine styling based on state
  const getBaseStyles = (): string => {
    // Outside current month
    if (!day.isCurrentMonth) {
      return 'text-gray-300 bg-gray-50';
    }

    // Today
    if (day.isToday) {
      return 'ring-2 ring-blue-400 ring-inset font-semibold text-blue-600 bg-blue-50';
    }

    // Range start or end
    if (day.isStart || day.isEnd) {
      return 'bg-blue-600 text-white font-bold shadow-md';
    }

    // In range
    if (day.isInRange) {
      return 'bg-blue-100 text-gray-900';
    }

    // Regular day
    return 'text-gray-900 bg-white hover:bg-gray-50';
  };

  return (
    <button
      onClick={() => onDateClick(day.date)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative aspect-square p-1 sm:p-2 rounded-lg font-medium text-xs sm:text-sm
        transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
        ${getBaseStyles()}
        ${!day.isCurrentMonth ? 'cursor-default' : ''}
        ${day.isCurrentMonth && !day.isToday && !day.isStart && !day.isEnd && !day.isInRange ? 'hover:shadow-md hover:scale-105' : ''}
      `}
      disabled={!day.isCurrentMonth}
      aria-label={`${day.date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })}`}
      title={`${day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
    >
      {/* Date number */}
      <span className="block font-bold text-center mb-0.5">{day.date.getDate()}</span>

      {/* Start/End indicators */}
      {(day.isStart || day.isEnd) && (
        <span className="absolute top-0.5 right-0.5 text-xs font-bold opacity-75">
          {day.isStart ? '📍' : '🏁'}
        </span>
      )}

      {/* Note indicator - shows on hover or if notes exist */}
      {(hasNote || isHovered) && hasNote && (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 transition-transform duration-200 hover:scale-125">
          <FileText className="w-4 h-4 text-orange-500 fill-orange-500 drop-shadow-md animate-pulse" strokeWidth={2} />
        </div>
      )}

      {/* Hover state indicator */}
      {isHovered && day.isCurrentMonth && !day.isToday && (
        <div className="absolute inset-0 rounded-lg bg-white/10 pointer-events-none" />
      )}
    </button>
  );
};

export default DayCell;
