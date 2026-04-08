import React, { useState } from 'react';
import { FileText, Trash2, Save } from 'lucide-react';
import { formatDateKey, formatDateFull } from '../utils';
import type { NotesSectionProps } from '../types';

/**
 * NotesSection Component
 * Manages month-level and date-specific notes
 * Features: localStorage persistence, character count, clear operations
 */
export const NotesSection: React.FC<NotesSectionProps> = ({
  selectedRange,
  monthNotes,
  dateNotes,
  onMonthNotesChange,
  onDateNotesChange,
  currentMonth,
}) => {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  // Show notification
  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(''), 2000);
  };

  // Edit date-specific note
  const handleEditDateNote = (dateKey: string) => {
    setEditingDate(dateKey);
    setTempNoteText(dateNotes[dateKey] || '');
  };

  // Save date-specific note
  const handleSaveDateNote = (dateKey: string) => {
    if (tempNoteText.trim()) {
      onDateNotesChange(dateKey, tempNoteText);
      showNotification('Note saved!');
    } else {
      // Delete if empty
      const newNotes = { ...dateNotes };
      delete newNotes[dateKey];
    }
    setEditingDate(null);
    setTempNoteText('');
  };

  // Delete date-specific note
  const handleDeleteDateNote = (dateKey: string) => {
    const newNotes = { ...dateNotes };
    delete newNotes[dateKey];
    onDateNotesChange(dateKey, '');
    showNotification('Note deleted');
  };

  // Get notes for selected range
  const getRangeNotes = (): { date: Date; key: string; note: string }[] => {
    if (!selectedRange.start || !selectedRange.end) return [];

    const notes: { date: Date; key: string; note: string }[] = [];
    const current = new Date(selectedRange.start);

    while (current <= selectedRange.end) {
      const key = formatDateKey(current);
      if (key in dateNotes) {
        notes.push({
          date: new Date(current),
          key,
          note: dateNotes[key],
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return notes;
  };

  const rangeNotes = getRangeNotes();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FileText className="w-7 h-7 text-orange-500 drop-shadow-md" strokeWidth={1.5} />
          Notes & Memos
        </h3>
        <p className="text-sm text-gray-600">
          Add notes for {monthName} or attach them to specific dates
        </p>
      </div>

      {/* Notification */}
      {notificationMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm animate-fade-in flex items-center gap-2 shadow-md border border-green-300">
          <Save className="w-5 h-5 flex-shrink-0 drop-shadow-sm animate-bounce" strokeWidth={2} />
          {notificationMessage}
        </div>
      )}

      {/* Two-column layout: desktop, stacked: mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Month Notes */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 shadow-md animate-pulse"></span>
            {monthName} Notes
          </label>
          <textarea
            value={monthNotes}
            onChange={(e) => onMonthNotesChange(e.target.value)}
            placeholder={`Add general notes for ${monthName}...`}
            maxLength={500}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            {monthNotes.length}/500 characters
          </p>
        </div>

        {/* Right: Date-specific notes */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 shadow-md animate-pulse"></span>
            Date-Specific Notes
            {selectedRange.start && selectedRange.end && (
              <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-md shadow-sm font-medium">
                {rangeNotes.length} note{rangeNotes.length !== 1 ? 's' : ''}
              </span>
            )}
          </label>

          {!selectedRange.start || !selectedRange.end ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">
                Select a date range above to add date-specific notes
              </p>
            </div>
          ) : rangeNotes.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">
                No notes yet. Click dates in your range to add notes.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {rangeNotes.map(({ date, key, note }) => (
                <div
                  key={key}
                  className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  {editingDate === key ? (
                    <>
                      <p className="text-xs font-semibold text-orange-900 mb-2">
                        {formatDateFull(date)}
                      </p>
                      <textarea
                        value={tempNoteText}
                        onChange={(e) => setTempNoteText(e.target.value)}
                        maxLength={200}
                        className="w-full p-2 text-sm border border-orange-300 rounded mb-2 resize-none focus:ring-2 focus:ring-orange-500"
                      />
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => handleSaveDateNote(key)}
                          className="flex-1 px-2 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-md group"
                        >
                          <Save className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingDate(null)}
                          className="px-2 py-1.5 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {tempNoteText.length}/200 characters
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-orange-900 mb-2">
                        {formatDateFull(date)}
                      </p>
                      <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">
                        {note}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditDateNote(key)}
                          className="flex-1 px-2 py-1 text-xs bg-orange-200 text-orange-900 rounded hover:bg-orange-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDateNote(key)}
                          className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 active:scale-95 transition-all duration-200 flex items-center justify-center group"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 group-hover:text-red-600 transition-all duration-200" strokeWidth={2} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add note prompt for any date in range */}
      {selectedRange.start && selectedRange.end && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-3">
            💡 Tip: Click any date in your selected range to quickly add a note for that day
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
