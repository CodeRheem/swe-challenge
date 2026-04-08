import React, { useState, useEffect } from 'react';
import ImageSection from './ImageSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import { storage, formatMonthYear } from '../utils';
import { getMonthConfig } from '../utils/months';
import type { DateRange, NotesData } from '../types';

/**
 * WallCalendar Component
 * Main orchestrator component that manages state and data persistence
 * Features: localStorage sync, responsive layout, smooth transitions
 * Enhanced: Month-specific images and color palettes
 */
export const WallCalendar: React.FC = () => {
  // State management
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    // Always start with April 2026, ignore stored state for year
    return new Date(2026, 3, 8); // April 8, 2026
  });

  const [selectedRange, setSelectedRange] = useState<DateRange>(() => {
    const stored = storage.getCalendarState();
    if (stored?.selectedRange?.start && stored?.selectedRange?.end) {
      return {
        start: new Date(stored.selectedRange.start),
        end: new Date(stored.selectedRange.end),
      };
    }
    return { start: null, end: null };
  });

  const [notes, setNotes] = useState<NotesData>(() => {
    return storage.getNotes();
  });

  // Get month configuration (image and colors) based on current month
  const monthConfig = getMonthConfig(currentMonth);
  const heroImage = monthConfig.imagePath;
  const monthColors = monthConfig.colors;

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    storage.setCalendarState({
      currentMonth: currentMonth.toISOString(),
      selectedRange: {
        start: selectedRange.start?.toISOString() || null,
        end: selectedRange.end?.toISOString() || null,
      },
    });
  }, [currentMonth, selectedRange]);

  // Persist notes to localStorage
  useEffect(() => {
    storage.setNotes(notes);
  }, [notes]);

  // Handlers
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const handleRangeChange = (newRange: DateRange) => {
    setSelectedRange(newRange);
  };

  const handleMonthNotesChange = (newNotes: string) => {
    setNotes((prev) => ({
      ...prev,
      monthNotes: newNotes,
    }));
  };

  const handleDateNotesChange = (dateKey: string, noteText: string) => {
    setNotes((prev) => {
      const updatedDateNotes = { ...prev.dateNotes };
      if (noteText.trim()) {
        updatedDateNotes[dateKey] = noteText;
      } else {
        delete updatedDateNotes[dateKey];
      }
      return {
        ...prev,
        dateNotes: updatedDateNotes,
      };
    });
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-8 transition-all duration-500"
      style={{
        background: monthColors.bg,
      }}
    >
      {/* Main container with max-width */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            📅 Wall Calendar
          </h1>
          <p className="text-white/90 text-sm sm:text-base drop-shadow">
            Plan your {formatMonthYear(currentMonth).split(' ')[0]} with style. Select dates, take notes, stay organized.
          </p>
        </div>

        {/* Main content grid */}
        {/* Desktop: side-by-side (Image left, Calendar + Notes right) */}
        {/* Mobile: stacked vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Image Section - Desktop: takes 1 column, Mobile: takes full width */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 lg:top-8">
              <ImageSection
                imageUrl={heroImage}
                currentMonth={currentMonth}
                onMonthChange={handleMonthChange}
                colors={monthColors}
              />
            </div>
          </div>

          {/* Calendar and Notes Section - Desktop: takes 2 columns, Mobile: takes full width */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Calendar Grid */}
            <div>
              <CalendarGrid
                currentMonth={currentMonth}
                selectedRange={selectedRange}
                onRangeChange={handleRangeChange}
                dateNotes={notes.dateNotes}
                onDateNotesChange={handleDateNotesChange}
              />
            </div>

            {/* Notes Section */}
            <div>
              <NotesSection
                selectedRange={selectedRange}
                monthNotes={notes.monthNotes}
                dateNotes={notes.dateNotes}
                onMonthNotesChange={handleMonthNotesChange}
                onDateNotesChange={handleDateNotesChange}
                currentMonth={currentMonth}
              />
            </div>
            <div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-white/80 drop-shadow">
            💾 Your calendar is automatically saved in your browser | 🎨 Colors & images change by month
          </p>
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
