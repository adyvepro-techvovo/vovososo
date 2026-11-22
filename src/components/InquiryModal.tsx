import { useEffect, useState, type FormEvent } from 'react';
import { X, Check } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
}

type DisciplineOption = 'Kinetic Light' | 'Spatial Sound' | 'Monograph Edition';

export function InquiryModal({ isOpen, initialSubject = '', onClose }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [discipline, setDiscipline] = useState<DisciplineOption>('Kinetic Light');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setNotes(`Requesting technical dossier / commission details regarding: ${initialSubject}`);
    }
  }, [initialSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setOrganization('');
    setNotes('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#E4E4E7] bg-[#FAFAF9] p-6 text-[#111111] shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close inquiry form"
          className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-[#111111] transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="py-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-white">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3
              id="inquiry-modal-title"
              className="mt-5 font-display text-2xl font-semibold tracking-tight text-[#111111]"
            >
              Brief Logged with Studio
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#52525B]">
              Thank you, {name}. Our Zurich and Kyoto principals review new architectural commissions and monograph requests every Tuesday and will reply to <span className="font-medium text-[#111111]">{email}</span>.
            </p>
            <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-4 text-xs text-[#52525B]">
              <div>
                Discipline: <span className="font-medium text-[#111111]">{discipline}</span>
              </div>
              {organization ? (
                <div className="mt-1">
                  Institution: <span className="font-medium text-[#111111]">{organization}</span>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 min-h-[44px] w-full whitespace-nowrap rounded-lg bg-[#111111] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#27272A]"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-xs font-medium text-[#52525B]">Zurich · Kyoto</p>
              <h3
                id="inquiry-modal-title"
                className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#111111]"
              >
                Commission &amp; Dossier Inquiry
              </h3>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#52525B]">Discipline</span>
              <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-[#F4F4F5] p-1">
                {(['Kinetic Light', 'Spatial Sound', 'Monograph Edition'] as DisciplineOption[]).map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDiscipline(opt)}
                      className={`min-h-[38px] truncate rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        discipline === opt
                          ? 'bg-white text-[#111111] shadow-sm'
                          : 'text-[#52525B] hover:text-[#111111]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="inq-name" className="block text-xs font-medium text-[#52525B]">
                  Full Name
                </label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Clara Lindqvist"
                  className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#A1A1AA] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="inq-email" className="block text-xs font-medium text-[#52525B]">
                  Email Address
                </label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@kunsthalle.org"
                  className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#A1A1AA] focus:border-[#111111] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inq-org" className="block text-xs font-medium text-[#52525B]">
                Institution or Architectural Practice (Optional)
              </label>
              <input
                id="inq-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Museum / Civic Cultural Trust"
                className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#A1A1AA] focus:border-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="inq-notes" className="block text-xs font-medium text-[#52525B]">
                Spatial Context &amp; Timeline
              </label>
              <textarea
                id="inq-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share ceiling span, daylight conditions, or exhibition schedule..."
                className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#A1A1AA] focus:border-[#111111] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="min-h-[44px] w-full whitespace-nowrap rounded-lg bg-[#C8281E] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A61E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8281E]"
            >
              Send Studio Brief
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
