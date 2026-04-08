/**
 * Wall Calendar Component - Type Definitions
 * Strictly typed interfaces for state management and props
 */

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export interface NotesData {
  monthNotes: string;
  dateNotes: Record<string, string>; // YYYY-MM-DD -> note
}

export interface CalendarState {
  currentMonth: Date;
  selectedRange: DateRange;
  notes: NotesData;
  theme: 'light' | 'dark';
  heroImageUrl: string;
}

export interface DayCellProps {
  day: CalendarDay;
  isSelected: boolean;
  onDateClick: (date: Date) => void;
  hasNote: boolean;
}

export interface ImageSectionProps {
  imageUrl: string;
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
}

export interface CalendarGridProps {
  currentMonth: Date;
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  dateNotes: Record<string, string>;
  onDateNotesChange?: (date: string, notes: string) => void;
}

export interface NotesSectionProps {
  selectedRange: DateRange;
  monthNotes: string;
  dateNotes: Record<string, string>;
  onMonthNotesChange: (notes: string) => void;
  onDateNotesChange: (date: string, notes: string) => void;
  currentMonth: Date;
}
