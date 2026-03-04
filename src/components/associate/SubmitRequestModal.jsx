import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Button from '../shared/Button';
import { REQUEST_TYPES } from '../../lib/requestMockData';
import { donors } from '../../lib/mockData';

export default function SubmitRequestModal({ onClose, prefillDonor }) {
  const [donorName, setDonorName] = useState(prefillDonor || '');
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);
  const [comments, setComments] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [dueDate, setDueDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    'w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 placeholder:text-muted/50';

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-black/40 animate-overlayFadeIn" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 text-center animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-600 text-xl font-bold">!</span>
            </div>
            <h2 className="text-lg font-serif text-navy mb-2">Request Submitted</h2>
            <p className="text-sm text-muted mb-6">
              Your request has been added to the planning team's queue. You'll see status updates in your "My Requests" panel.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 animate-overlayFadeIn" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-serif text-navy">Submit Request</h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-charcoal transition-colors duration-150"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Donor Name */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Donor Name
              </label>
              {prefillDonor ? (
                <input type="text" value={prefillDonor} disabled className={`${inputClass} bg-slate-50`} />
              ) : (
                <select
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select a donor...</option>
                  {donors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Request Type */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Request Type
              </label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className={inputClass}
              >
                {REQUEST_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Priority
              </label>
              <div className="flex gap-2">
                {['Normal', 'Rush'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md border transition-all duration-150 ${
                      priority === p
                        ? p === 'Rush'
                          ? 'bg-pp-gold/10 border-pp-gold text-pp-gold font-semibold'
                          : 'bg-navy text-white border-navy'
                        : 'border-border text-muted hover:text-charcoal hover:border-charcoal/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Requested Completion Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Associate Comments
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Provide context about what's needed..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Attachments (UI only) */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                Attachments
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-teal/40 transition-colors duration-150">
                <Upload size={20} className="text-muted mx-auto mb-2" />
                <p className="text-xs text-muted">Drop files here or click to browse</p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
