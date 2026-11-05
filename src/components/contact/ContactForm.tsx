import { useState, type FormEvent } from 'react';
import { AlertCircle, MessageCircle } from 'lucide-react';
import { validateContactForm, type ContactFormErrors, type ContactFormValues } from '@/lib/contactValidation';
import { contactDetails } from '@/data/portfolio';

const emptyValues: ContactFormValues = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = [
      `Hi, I'm ${values.name.trim()}.`,
      `My email: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n');
    const whatsappUrl = `${contactDetails.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputClasses =
    'w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition duration-300 hover:border-white/20 focus:border-brand-blue-light focus:outline-none focus:ring-2 focus:ring-brand-blue/30';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="contact-name"
          label="Name"
          error={errors.name}
          value={values.name}
          placeholder="Your full name"
          autoComplete="name"
          className={inputClasses}
          onChange={(value) => updateField('name', value)}
        />
        <FormField
          id="contact-email"
          label="Email"
          type="email"
          error={errors.email}
          value={values.email}
          placeholder="you@example.com"
          autoComplete="email"
          className={inputClasses}
          onChange={(value) => updateField('email', value)}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-300">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          placeholder="Tell me about your business and what you'd like to achieve."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          onChange={(event) => updateField('message', event.target.value)}
          className={inputClasses}
        />
        {errors.message && <FieldError id="contact-message-error" message={errors.message} />}
      </div>

      <div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          WhatsApp will open with your enquiry ready to review and send.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send WhatsApp Enquiry
        </button>
      </div>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  autoComplete: string;
  className: string;
  type?: string;
  onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  value,
  error,
  placeholder,
  autoComplete,
  className,
  type = 'text',
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={className}
      />
      {error && <FieldError id={`${id}-error`} message={error} />}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {message}
    </p>
  );
}
