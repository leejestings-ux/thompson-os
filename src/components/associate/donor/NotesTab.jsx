import { useState } from 'react';
import { Plus, X, MapPin, Clock, Trash2 } from 'lucide-react';
import { getMeetingNotes, associates } from '../../../lib/mockData';
import Button from '../../shared/Button';

const EMOTIONAL_STATES = [
  'confident',
  'anxious',
  'conflicted',
  'uncertain',
  'engaged',
  'withdrawn',
];

const EMOTION_STYLES = {
  confident: 'bg-emerald-50 text-emerald-700',
  anxious: 'bg-red-50 text-red-700',
  conflicted: 'bg-amber-50 text-amber-700',
  uncertain: 'bg-slate-100 text-slate-600',
  engaged: 'bg-blue-50 text-blue-700',
  withdrawn: 'bg-purple-50 text-purple-700',
};

const EMPTY_FORM = {
  date: new Date().toISOString().split('T')[0],
  location: '',
  summary: '',
  detailedNotes: '',
  emotionalState: 'engaged',
  followUpItems: [],
};

export default function NotesTab({ donor }) {
  const [notes, setNotes] = useState(() => getMeetingNotes(donor.id));
  const [expandedId, setExpandedId] = useState(null);
  const [showAddNote, setShowAddNote] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function addFollowUpItem() {
    setForm((prev) => ({
      ...prev,
      followUpItems: [
        ...prev.followUpItems,
        { text: '', owner: '', dueDate: '' },
      ],
    }));
  }

  function updateFollowUpItem(index, field, value) {
    setForm((prev) => ({
      ...prev,
      followUpItems: prev.followUpItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  function removeFollowUpItem(index) {
    setForm((prev) => ({
      ...prev,
      followUpItems: prev.followUpItems.filter((_, i) => i !== index),
    }));
  }

  function handleSaveNote() {
    if (!form.summary.trim()) return;
    const newNote = {
      id: `note-${Date.now()}`,
      donorId: donor.id,
      associateId: donor.associateId,
      date: form.date,
      duration: 60,
      location: form.location,
      summary: form.detailedNotes || form.summary,
      emotionalState: form.emotionalState,
      actionItems: form.followUpItems
        .filter((i) => i.text.trim())
        .map((i) => i.text),
    };
    setNotes((prev) => [newNote, ...prev]);
    setShowAddNote(false);
    setForm(EMPTY_FORM);
  }

  if (notes.length === 0 && !showAddNote) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-sm mb-4">No meeting notes yet.</p>
        <Button onClick={() => setShowAddNote(true)}>+ Add Note</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddNote(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Note
        </Button>
      </div>

      {/* Notes list */}
      {notes.map((note) => {
        const isExpanded = expandedId === note.id;
        return (
          <div
            key={note.id}
            className="bg-white rounded-xl border border-border overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : note.id)}
              className="w-full text-left p-4 hover:bg-table-stripe/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-charcoal">
                  {new Date(note.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                {note.emotionalState && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      EMOTION_STYLES[note.emotionalState] ||
                      'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {note.emotionalState}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted mb-2">
                {note.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {note.location}
                  </span>
                )}
                {note.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {note.duration} min
                  </span>
                )}
              </div>
              <p className="text-sm text-charcoal/80 line-clamp-2">
                {note.summary}
              </p>
            </button>

            {isExpanded && (
              <div className="border-t border-border p-4 bg-warm-white">
                <p className="text-sm text-charcoal leading-relaxed whitespace-pre-line mb-4">
                  {note.summary}
                </p>
                {note.actionItems?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Action Items
                    </h4>
                    <ul className="space-y-1.5">
                      {note.actionItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-charcoal"
                        >
                          <span className="text-navy mt-0.5">&bull;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAddNote(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-navy">
                Add Meeting Note
              </h2>
              <button
                onClick={() => setShowAddNote(false)}
                className="text-muted hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">
                    Emotional State
                  </label>
                  <select
                    value={form.emotionalState}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        emotionalState: e.target.value,
                      }))
                    }
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40 capitalize"
                  >
                    {EMOTIONAL_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  placeholder="e.g. Donor residence, Office Conference Room B"
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Summary
                </label>
                <input
                  type="text"
                  value={form.summary}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, summary: e.target.value }))
                  }
                  placeholder="Brief meeting summary"
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">
                  Detailed Notes
                </label>
                <textarea
                  value={form.detailedNotes}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, detailedNotes: e.target.value }))
                  }
                  rows={4}
                  placeholder="Full meeting notes..."
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40 resize-none"
                />
              </div>

              {/* Follow-up Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-charcoal">
                    Follow-up Items
                  </label>
                  <button
                    onClick={addFollowUpItem}
                    className="text-xs text-navy hover:text-navy-light font-medium"
                  >
                    + Add item
                  </button>
                </div>
                <div className="space-y-2">
                  {form.followUpItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          updateFollowUpItem(i, 'text', e.target.value)
                        }
                        placeholder="Action item"
                        className="flex-1 text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-navy/40"
                      />
                      <input
                        type="text"
                        value={item.owner}
                        onChange={(e) =>
                          updateFollowUpItem(i, 'owner', e.target.value)
                        }
                        placeholder="Owner"
                        className="w-28 text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-navy/40"
                      />
                      <input
                        type="date"
                        value={item.dueDate}
                        onChange={(e) =>
                          updateFollowUpItem(i, 'dueDate', e.target.value)
                        }
                        className="w-36 text-sm border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-navy/40"
                      />
                      <button
                        onClick={() => removeFollowUpItem(i)}
                        className="text-muted hover:text-muted-red mt-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button
                variant="secondary"
                onClick={() => setShowAddNote(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveNote}
                disabled={!form.summary.trim()}
              >
                Save Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
