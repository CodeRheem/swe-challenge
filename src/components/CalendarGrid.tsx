import React, { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import DayCell from './DayCell';
import QuickNoteModal from './QuickNoteModal';
import {
  getCalendarDays,
  isDateInRange,
  isDateEqual,
  getDayNames,
  formatDateKey,
  isHoliday,
} from '../utils';
import type { CalendarGridProps, CalendarDay } from '../types';

/**
 * CalendarGrid Component
 * Displays calendar grid with date range selection
 * Features: range selection, visual feedback, holiday markers, date navigation
 */
export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedRange,
  onRangeChange,
  dateNotes,
  onDateNotesChange,
}) => {
  // Quick note modal state
  const [modalDate, setModalDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize calendar days calculation
  const calendarDays: CalendarDay[] = useMemo(() => {
    const days = getCalendarDays(currentMonth);
    return days.map((day) => ({
      ...day,
      isInRange: isDateInRange(day.date, selectedRange),
      isStart: selectedRange.start ? isDateEqual(day.date, selectedRange.start) : false,
      isEnd: selectedRange.end ? isDateEqual(day.date, selectedRange.end) : false,
    }));
  }, [currentMonth, selectedRange]);

  // Handle date selection with range logic
  const handleDateClick = (clickedDate: Date) => {
    // If date is already in range and both start/end exist, open quick note modal
    if (
      selectedRange.start &&
      selectedRange.end &&
      isDateInRange(clickedDate, selectedRange)
    ) {
      setModalDate(clickedDate);
      setIsModalOpen(true);
      return;
    }

    const newStart = selectedRange.start;
    const newEnd = selectedRange.end;

    // If no dates selected, set start date
    if (!newStart && !newEnd) {
      onRangeChange({ start: clickedDate, end: null });
      return;
    }

    // If only start date exists, set end date (or start new range if clicking before start)
    if (newStart && !newEnd) {
      if (clickedDate < newStart) {
        onRangeChange({ start: clickedDate, end: newStart });
      } else {
        onRangeChange({ start: newStart, end: clickedDate });
      }
      return;
    }

    // If both dates exist, start new selection
    if (newStart && newEnd) {
      onRangeChange({ start: clickedDate, end: null });
      return;
    }
  };

  // Handle quick note save from modal
  const handleSaveQuickNote = (noteText: string) => {
    if (modalDate && onDateNotesChange) {
      const dateKey = formatDateKey(modalDate);
      onDateNotesChange(dateKey, noteText);
    }
  };

  // Clear selection
  const handleClearSelection = () => {
    onRangeChange({ start: null, end: null });
  };

  // Quick selection shortcuts
  const handleQuickSelect = (days: number) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    onRangeChange({ start: startDate, end: today });
  };

  const dayNames = getDayNames();
  const selectedCount = useMemo(() => {
    if (!selectedRange.start || !selectedRange.end) return 0;
    const diffTime = Math.abs(
      selectedRange.end.getTime() - selectedRange.start.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [selectedRange]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
      {/* Header with stats */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-800 text-gray-900 mb-2 tracking-tight">
          Select Date Range
        </h3>
        {selectedRange.start && selectedRange.end && (
          <p className="text-sm text-gray-600 font-500">
            {selectedCount} {selectedCount === 1 ? 'day' : 'days'} selected
          </p>
        )}
      </div>

      {/* Quick select buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleQuickSelect(7)}
          className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200 font-600 shadow-sm hover:shadow-md"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleQuickSelect(30)}
          className="px-3 py-1.5 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200 font-600 shadow-sm hover:shadow-md"
        >
          Last 30 Days
        </button>
        <button
          onClick={handleClearSelection}
          className="ml-auto px-3 py-1.5 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 active:scale-95 transition-all duration-200 font-600 flex items-center gap-1.5 shadow-sm hover:shadow-md group"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" strokeWidth={2.5} />
          Clear
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-600 text-gray-600 py-2 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
        {calendarDays.map((day, index) => {
          const dateKey = formatDateKey(day.date);
          const hasNote = dateKey in dateNotes;
          const holiday = isHoliday(day.date);

          return (
            <div key={index} className="relative">
              <DayCell
                day={day}
                isSelected={day.isStart || day.isEnd || day.isInRange}
                onDateClick={handleDateClick}
                hasNote={hasNote}
              />
              {/* Holiday badge */}
              {holiday && day.isCurrentMonth && (
                <div
                  className="absolute -top-1 -right-1 text-xs"
                  title={holiday}
                  aria-label={`Holiday: ${holiday}`}
                >
                  🎉
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection info */}
      <div className="pt-4 border-t border-gray-200">
        {selectedRange.start && selectedRange.end ? (
          <div className="text-xs sm:text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Start:</span>{' '}
              {selectedRange.start.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <p>
              <span className="font-semibold">End:</span>{' '}
              {selectedRange.end.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500 italic">
            {selectedRange.start ? 'Click a date to set end date' : 'Click to start selection'}
          </p>
        )}
      </div>

      {/* Quick Note Modal */}
      <QuickNoteModal
        date={modalDate}
        currentNote={modalDate ? dateNotes[formatDateKey(modalDate)] || '' : ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuickNote}
      />
    </div>
  );
};

export default CalendarGrid;
