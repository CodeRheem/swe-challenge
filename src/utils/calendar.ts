/**
 * Wall Calendar - Utility Functions
 * Pure functions for date calculations and formatting
 */

import type { CalendarDay, DateRange, NotesData } from '../types';

/**
 * Get all days to display in calendar grid (including prev/next month padding)
 */
export function getCalendarDays(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  // First day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthDays = Array.from({ length: startingDayOfWeek }, (_, i) => ({
    date: new Date(year, month - 1, prevMonthLastDay - startingDayOfWeek + i + 1),
    isCurrentMonth: false,
  }));

  // Current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    isCurrentMonth: true,
  }));

  // Next month padding (to fill 6 rows)
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = Array.from({ length: 42 - totalCells }, (_, i) => ({
    date: new Date(year, month + 1, i + 1),
    isCurrentMonth: false,
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Map to CalendarDay with range checking
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  return allDays.map(({ date, isCurrentMonth }) => ({
    date,
    isCurrentMonth,
    isToday: isDateEqual(date, today),
    isInRange: false, // Will be set by parent
    isStart: false, // Will be set by parent
    isEnd: false, // Will be set by parent
  }));
}

/**
 * Check if two dates are the same (ignoring time)
 */
export function isDateEqual(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if date is within range (inclusive)
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const start = new Date(range.start);
  const end = new Date(range.end);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date >= start && date <= end;
}

/**
 * Format date to YYYY-MM-DD string for storage keys
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date for display (e.g., "April 2026")
 */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Format date for readable display (e.g., "Tuesday, April 8, 2026")
 */
export function formatDateFull(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Normalize date range (ensure start <= end)
 */
export function normalizeRange(range: DateRange): DateRange {
  if (!range.start || !range.end) return range;
  const start = new Date(range.start);
  const end = new Date(range.end);
  if (start <= end) return { start, end };
  return { start: end, end: start };
}

/**
 * Check if date is a holiday in 2026 (US holidays)
 */
export function isHoliday(date: Date): string | null {
  const month = date.getMonth();
  const day = date.getDate();

  const holidays: Record<number, Record<number, string>> = {
    0: { 1: 'New Year' },
    1: { 15: 'Presidents Day' }, // 3rd Monday
    2: { 17: 'St. Patrick' },
    3: { 10: 'Good Friday' },
    4: { 25: 'Memorial Day' },
    6: { 4: 'Independence Day' },
    8: { 7: 'Labor Day' }, // 1st Monday
    9: { 12: 'Columbus Day' }, // 2nd Monday
    10: { 11: 'Veterans Day', 26: 'Thanksgiving' },
    11: { 25: 'Christmas' },
  };

  return holidays[month]?.[day] || null;
}

/**
 * Get week day name (Mon, Tue, etc.)
 */
export function getDayNames(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

/**
 * localStorage utilities
 */
export const storage = {
  setCalendarState: (state: Record<string, unknown>) => {
    localStorage.setItem('wallCalendarState', JSON.stringify(state));
  },

  getCalendarState: () => {
    const stored = localStorage.getItem('wallCalendarState');
    return stored ? JSON.parse(stored) : null;
  },

  setNotes: (notes: NotesData | Record<string, unknown>) => {
    localStorage.setItem('wallCalendarNotes', JSON.stringify(notes));
  },

  getNotes: () => {
    const stored = localStorage.getItem('wallCalendarNotes');
    return stored ? JSON.parse(stored) : { monthNotes: '', dateNotes: {} };
  },

  clearAll: () => {
    localStorage.removeItem('wallCalendarState');
    localStorage.removeItem('wallCalendarNotes');
  },
};
