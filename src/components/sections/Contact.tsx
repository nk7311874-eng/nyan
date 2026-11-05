import { Instagram, Linkedin, Mail } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { contactDetails } from '@/data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk About Your Project"
          description="Have a business enquiry? Call me or start a conversation on WhatsApp."
        />

        <Reveal className="mx-auto max-w-3xl">
          <div className="glass-card space-y-6 p-6 sm:p-8">
            <p className="text-center text-sm text-slate-400">
              Get in touch directly at <span className="font-semibold text-white">{contactDetails.whatsappLabel}</span>
            </p>
            <ContactForm />
            <div className="grid gap-4 sm:grid-cols-3">
              <a href={`mailto:${contactDetails.email}`} className="glass-card flex items-center justify-center gap-3 p-4 text-sm font-semibold text-white">
                <Mail className="h-5 w-5 text-brand-blue-light" aria-hidden="true" />
                Email
              </a>
              <a href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center justify-center gap-3 p-4 text-sm font-semibold text-white">
                <Instagram className="h-5 w-5 text-brand-blue-light" aria-hidden="true" />
                Instagram
              </a>
              <a href={contactDetails.linkedinUrl} target="_blank" rel="noopener noreferrer" className="glass-card flex items-center justify-center gap-3 p-4 text-sm font-semibold text-white">
                <Linkedin className="h-5 w-5 text-brand-blue-light" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
