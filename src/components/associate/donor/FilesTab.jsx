import { FileText, Download } from 'lucide-react';
import { getDonorFiles } from '../../../lib/donorMockData';

const CATEGORY_STYLES = {
  Financial: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Legal: 'bg-blue-50 text-blue-700 border border-blue-200',
  Personal: 'bg-purple-50 text-purple-700 border border-purple-200',
  Correspondence: 'bg-amber-50 text-amber-700 border border-amber-200',
};

export default function FilesTab({ donor }) {
  const files = getDonorFiles(donor.id);

  if (files.length === 0) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <p className="text-muted text-sm font-serif italic">No files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] animate-fadeIn">
      {files.map((file, i) => (
        <div
          key={file.id}
          className={`flex items-center justify-between px-5 py-3.5 transition-colors duration-150 hover:bg-[#EEF2F7] ${
            i > 0 ? 'border-t border-border/50' : ''
          } ${i % 2 === 1 ? 'bg-warm-white' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
              <FileText size={16} className="text-navy" />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">{file.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    CATEGORY_STYLES[file.category] ||
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {file.category}
                </span>
                <span className="text-xs text-muted">
                  {new Date(file.uploadDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="text-xs text-muted">{file.size}</span>
              </div>
            </div>
          </div>
          <button className="text-muted hover:text-navy transition-colors duration-150 p-2 rounded-lg hover:bg-navy/5">
            <Download size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
