import { Mail, MapPin, Phone, Send,GitBranchIcon } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'
import { useForm } from 'react-hook-form';
import { sendContactMessage } from '../apis/contactApi';
import { useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { cn } from '../lib/utils';



interface ContactFormData {
  name:string;
  email:string;
  subject:string;
  message:string;
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success('Your message has been sent successfully');
      reset();
    },
    onError: () => {
      toast.error('Message failed to send. Please try again.');
    }
  });

  const onSubmit = (data:ContactFormData) => {
    mutation.mutateAsync(data);
  }

  return (
    <Section
      title="Contact"
      eyebrow="Get in touch"
      description="Reach out for collaborations, mentorship, or to join an upcoming build sprint."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-text-primary"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    maxLength: { value: 50, message: 'Name must be less than 50 characters' }
                  })}
                  className={`w-full rounded-xl border ${
                    errors.name ? 'border-red-500' : 'border-slate-200/80'
                  } bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-text-primary"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-slate-200/80'
                  } bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-semibold text-text-primary"
              >
                Subject
              </label>
              <input
                id="subject"
                {...register('subject', {
                  required: 'Subject is required',
                  minLength: { value: 5, message: 'Subject must be at least 5 characters' },
                  maxLength: { value: 100, message: 'Subject must be less than 100 characters' }
                })}
                className={`w-full rounded-xl border ${
                  errors.subject ? 'border-red-500' : 'border-slate-200/80'
                } bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
                })}
                rows={4}
                className={`w-full rounded-xl border ${
                  errors.message ? 'border-red-500' : 'border-slate-200/80'
                } bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50`}
                placeholder="Tell us about your idea or question..."
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button   
              type="submit"
              disabled={isSubmitting}
              className={cn(
                buttonClasses({
                  variant: 'primary',
                  className: 'inline-flex items-center gap-2',
                }),
                isSubmitting && 'opacity-70 cursor-not-allowed'
              )}
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
            <p className="text-xs text-text-muted">
              We respond within 2-3 business days. No backend is connected—this
              form is for demo purposes.
            </p>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary">Location</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Rwanda Coding Academy
              <br />
              Nyabihu District, Rwanda
            </p>
            <div className="mt-4 space-y-3 text-sm text-text-primary">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                isaprecieux112@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +250 788 598 775
              </div>
              <div className="flex items-center gap-2">
                <GitBranchIcon className="h-4 w-4 text-primary" />
                GitHub: ROBOTICS-CLUB1
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Nyabihu, Western Province
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary">Office Hours</h3>
            <p className="mt-2 text-sm text-text-muted">
              Weekdays: 4:00 PM — 8:00 PM
              <br />
              Saturdays: 10:00 AM — 2:00 PM
            </p>
            <p className="mt-4 text-sm font-semibold text-text-primary">
              Drop by during build sessions to see live prototypes.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

