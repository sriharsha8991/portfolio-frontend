/**
 * ContactSection Component
 * Contact form with EmailJS integration
 * Social links and contact methods
 */

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import CONFIG from '../../config';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const config = CONFIG.getConfig();
      const { publicKey, serviceId, templateId } = config.emailjs;

      // EmailJS send (using fetch API)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: 'contact@sriharsha.dev',
      href: 'mailto:contact@sriharsha.dev',
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: '+91 1234567890',
      href: 'tel:+911234567890',
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: 'Hyderabad, India',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open
            to discussing new opportunities and ideas.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <SectionReveal delay={100}>
              <Card variant="glass">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text dark:text-text-dark mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-2.5 rounded-lg
                        bg-surface dark:bg-surface-dark
                        border ${errors.name ? 'border-red-500' : 'border-border dark:border-border-dark'}
                        text-text dark:text-text-dark
                        focus:outline-none focus:ring-2 focus:ring-primary
                        transition-colors duration-200
                      `}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text dark:text-text-dark mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-2.5 rounded-lg
                        bg-surface dark:bg-surface-dark
                        border ${errors.email ? 'border-red-500' : 'border-border dark:border-border-dark'}
                        text-text dark:text-text-dark
                        focus:outline-none focus:ring-2 focus:ring-primary
                        transition-colors duration-200
                      `}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text dark:text-text-dark mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-2.5 rounded-lg
                        bg-surface dark:bg-surface-dark
                        border ${errors.subject ? 'border-red-500' : 'border-border dark:border-border-dark'}
                        text-text dark:text-text-dark
                        focus:outline-none focus:ring-2 focus:ring-primary
                        transition-colors duration-200
                      `}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text dark:text-text-dark mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`
                        w-full px-4 py-2.5 rounded-lg
                        bg-surface dark:bg-surface-dark
                        border ${errors.message ? 'border-red-500' : 'border-border dark:border-border-dark'}
                        text-text dark:text-text-dark
                        focus:outline-none focus:ring-2 focus:ring-primary
                        transition-colors duration-200
                        resize-none
                      `}
                      placeholder="Your message..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-700 dark:text-red-400 text-sm">
                        Failed to send message. Please try again or contact me directly.
                      </p>
                    </div>
                  )}
                </form>
              </Card>
            </SectionReveal>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <SectionReveal key={method.label} delay={150 + index * 50}>
                  <Card variant="glass" interactive={!!method.href}>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="flex items-start gap-4 cursor-pointer"
                      >
                        <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary-dark/20 flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary dark:text-primary-dark" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text dark:text-text-dark mb-1">
                            {method.label}
                          </h3>
                          <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                            {method.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary-dark/20 flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary dark:text-primary-dark" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text dark:text-text-dark mb-1">
                            {method.label}
                          </h3>
                          <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
