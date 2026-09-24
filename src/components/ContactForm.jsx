import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Send, MessageSquare } from 'lucide-react';
import Button from './Button';
import { businessData } from '../data/business';
import { productsData } from '../data/products';

/**
 * ContactForm adhering to SRS Section 2.6 & Light Architectural Theme:
 * - Fields: Name, Phone, Requirement, Message
 * - URL query parameter pre-fill support (?model=... or ?service=...)
 * - Instant feedback & direct WhatsApp submission option
 */
export default function ContactForm() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: productsData[0]?.name || '100 LPH RO Plant',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-fill requirement from URL parameters if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modelParam = params.get('model');
    const serviceParam = params.get('service');
    const requirementParam = params.get('requirement');

    if (modelParam) {
      setFormData((prev) => ({ ...prev, requirement: modelParam }));
    } else if (serviceParam) {
      setFormData((prev) => ({ ...prev, requirement: `Service: ${serviceParam}` }));
    } else if (requirementParam) {
      setFormData((prev) => ({ ...prev, requirement: requirementParam }));
    }
  }, [location.search]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const sendViaWhatsApp = () => {
    const text = `*New Water Requirement Inquiry*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Requirement:* ${encodeURIComponent(formData.requirement)}%0A*Message:* ${encodeURIComponent(formData.message || 'I would like to receive pricing and technical consultation.')}`;
    window.open(`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="rounded-surface-lg bg-brand-white border border-brand-border p-6 sm:p-10 shadow-card-soft">
      {submitted ? (
        <div className="py-10 text-center animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-full bg-brand-paleBlue text-brand-primaryBlue flex items-center justify-center mx-auto mb-4 border border-brand-softBlue">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-brand-ink mb-2">
            Inquiry Registered Successfully
          </h3>
          <p className="text-sm text-brand-bodyText max-w-md mx-auto mb-6">
            Thank you, <strong>{formData.name}</strong>. Our technical engineering team in Solapur will review your requirement for <strong>{formData.requirement}</strong> and contact you shortly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={sendViaWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-paleBlue border border-brand-softBlue text-brand-deepOcean text-sm font-semibold hover:bg-brand-softBlue transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-brand-primaryBlue" />
              <span>Forward Directly to WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', requirement: productsData[0]?.name || '100 LPH RO Plant', message: '' });
              }}
              className="px-5 py-3 rounded-full bg-brand-coolWhite border border-brand-border text-xs font-semibold text-brand-bodyText hover:text-brand-ink"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-brand-ink mb-1">
              Request a Technical Consultation or Quote
            </h3>
            <p className="text-xs text-brand-bodyText">
              Provide your details below to receive a formal quotation and system sizing review.
            </p>
          </div>

          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-brand-deepOcean mb-2">
              Full Name / Organization *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Patil / School Name"
              className={`w-full px-4 py-3 rounded-xl bg-brand-coolWhite border text-sm text-brand-ink placeholder-brand-bodyText/50 focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue focus:border-transparent transition-all ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-brand-border'
              }`}
            />
            {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-brand-deepOcean mb-2">
              Phone / Mobile Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className={`w-full px-4 py-3 rounded-xl bg-brand-coolWhite border text-sm text-brand-ink placeholder-brand-bodyText/50 focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue focus:border-transparent transition-all ${
                errors.phone ? 'border-red-400 bg-red-50/20' : 'border-brand-border'
              }`}
            />
            {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone}</span>}
          </div>

          {/* Requirement Field */}
          <div>
            <label htmlFor="contact-requirement" className="block text-xs font-semibold uppercase tracking-wider text-brand-deepOcean mb-2">
              System Requirement *
            </label>
            <select
              id="contact-requirement"
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-brand-coolWhite border border-brand-border text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue focus:border-transparent transition-all"
            >
              {formData.requirement &&
                !productsData.some((p) => p.name === formData.requirement) &&
                !['Service: AMC Contract', 'Service: Water Quality Testing', 'Service: Repair & Filter Replacement', 'Custom Water Treatment Project'].includes(formData.requirement) && (
                  <option value={formData.requirement}>{formData.requirement}</option>
                )}
              {productsData.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
              <option value="Service: AMC Contract">Annual Maintenance Contract (AMC)</option>
              <option value="Service: Water Quality Testing">Water Quality Testing & Analysis</option>
              <option value="Service: Repair & Filter Replacement">Repair & Membrane Replacement</option>
              <option value="Custom Water Treatment Project">Custom Project / Other</option>
            </select>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-brand-deepOcean mb-2">
              Message / Facility Details (Optional)
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your raw water source (borewell/municipal), estimated occupants, or site location in Solapur..."
              className="w-full px-4 py-3 rounded-xl bg-brand-coolWhite border border-brand-border text-sm text-brand-ink placeholder-brand-bodyText/50 focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 justify-center !py-3.5 text-sm font-semibold"
            >
              Submit Quotation Request
            </Button>

            <button
              type="button"
              onClick={sendViaWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-paleBlue border border-brand-softBlue text-brand-deepOcean text-sm font-semibold hover:bg-brand-softBlue transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-brand-primaryBlue" />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
