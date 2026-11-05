import { MessageCircle, PhoneCall } from 'lucide-react';
import { contactDetails } from '@/data/portfolio';

export default function ContactForm() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a
        href={contactDetails.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp Enquiry
      </a>
      <a
        href={contactDetails.phoneUrl}
        className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-purple px-6 py-4 text-sm font-semibold text-white shadow-glow transition duration-300 hover:-translate-y-0.5 hover:shadow-glow-purple"
      >
        <PhoneCall className="h-5 w-5" aria-hidden="true" />
        Call {contactDetails.whatsappLabel}
      </a>
    </div>
  );
}
