import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { formatDateFull } from '../utils';

interface QuickNoteModalProps {
  date: Date | null;
  currentNote: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteText: string) => void;
}

/**
 * QuickNoteModal Component
 * Quick add/edit note modal for dates
 * Features: Focus management, auto-focus, character count
 */
export const QuickNoteModal: React.FC<QuickNoteModalProps> = ({
  date,
  currentNote,
  isOpen,
  onClose,
  onSave,
}) => {
  const [noteText, setNoteText] = useState<string>(currentNote);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNoteText(currentNote);
  }, [currentNote, isOpen]);

  const handleSave = () => {
    onSave(noteText);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen || !date) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-sm w-full animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-700 text-gray-900">Add Note</h3>
              <p className="text-sm text-gray-500 mt-1">{formatDateFull(date)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-red-100 rounded-lg transition-all duration-200 group transform hover:scale-110 active:scale-95"
              aria-label="Close modal"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-200" strokeWidth={2.5} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your note here... (Ctrl+Enter to save)"
              maxLength={300}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2">
              {noteText.length}/300 characters
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-2 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-600 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
            >
              <Save className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" strokeWidth={2.5} />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickNoteModal;
