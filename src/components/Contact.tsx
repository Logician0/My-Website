'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, MessageSquare, User, Briefcase, AlertCircle } from 'lucide-react';
import { services } from '@/lib/data';
import { cn } from '@/utils/cn';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (min 20 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState({ status: 'loading', message: '' });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    setFormState({
      status: 'success',
      message: "Thanks for reaching out! We'll get back to you within 24 hours.",
    });

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', service: '', message: '' });
      setFormState({ status: 'idle', message: '' });
    }, 5000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-10 md:py-32 px-6 overflow-hidden"
      style={{ willChange: 'transform' }} // Optimization: GPU acceleration
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-gradient-to-t from-violet-500/10 via-fuchsia-500/5 to-transparent blur-3xl" 
          style={{ willChange: 'transform, opacity' }} // Optimization: Hardware acceleration for large blurred div
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ willChange: 'transform, opacity' }} // Optimization: GPU acceleration for motion
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.span>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6" style={{ letterSpacing: '-0.03em' }}>
              <span className="text-white">Let's Create </span>
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-10" style={{ lineHeight: 1.7 }}>
              Ready to transform your digital presence? Tell us about your vision 
              and we'll craft a strategy tailored to your goals.
            </p>

            {/* Quick Info */}
            <div className="space-y-4">
              <motion.a
                href="mailto:hello@logiciancreatives.com"
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-violet-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-zinc-500">Email us at</div>
                  <div className="text-white font-medium hover:text-cyan-400 transition-colors">hello@logiciancreatives.com</div>
                </div>
              </motion.a>
              
              <motion.div 
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: 5, borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Response time</div>
                  <div className="text-white font-medium">Within 24 hours</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 5, borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Availability</div>
                  <div className="text-white font-medium">Accepting new projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ willChange: 'transform, opacity' }} // Optimization: GPU acceleration
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8"
              style={{ transform: 'translateZ(0)' }} // Optimization: Triggers GPU for backdrop-blur
            >
              <AnimatePresence mode="wait">
                {formState.status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-zinc-400">{formState.message}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Your Name <span className="text-pink-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          className={cn(
                            'w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border',
                            'text-white placeholder:text-zinc-600',
                            'focus:outline-none focus:bg-white/10',
                            'transition-all duration-300',
                            errors.name 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-violet-500/50'
                          )}
                        />
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Email Address <span className="text-pink-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@company.com"
                          className={cn(
                            'w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border',
                            'text-white placeholder:text-zinc-600',
                            'focus:outline-none focus:bg-white/10',
                            'transition-all duration-300',
                            errors.email 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-violet-500/50'
                          )}
                        />
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1 mt-2 text-red-400 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Service Interested In
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none z-10" />
                        <select
                          value={formData.service}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                          className={cn(
                            'w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10',
                            'text-white appearance-none',
                            'focus:outline-none focus:border-violet-500/50 focus:bg-white/10',
                            'transition-all duration-300'
                          )}
                        >
                          <option value="" className="bg-zinc-900">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.slug} className="bg-zinc-900">
                              {service.title}
                            </option>
                          ))}
                          <option value="other" className="bg-zinc-900">Other / Not Sure</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-400 mb-2">
                        Tell Us About Your Project <span className="text-pink-400">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Describe your vision, goals, timeline, and any specific requirements..."
                        rows={5}
                        className={cn(
                          'w-full px-4 py-4 rounded-xl bg-white/5 border',
                          'text-white placeholder:text-zinc-600 resize-none',
                          'focus:outline-none focus:bg-white/10',
                          'transition-all duration-300',
                          errors.message 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-white/10 focus:border-violet-500/50'
                        )}
                      />
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 mt-2 text-red-400 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.div>
                      )}
                      <div className="text-right mt-2 text-xs text-zinc-600">
                        {formData.message.length} / 20 min characters
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState.status === 'loading'}
                      className={cn(
                        'w-full py-4 rounded-xl font-medium text-lg',
                        'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500',
                        'text-white flex items-center justify-center gap-3',
                        'hover:opacity-90 transition-opacity',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      {formState.status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-zinc-500">
                      By submitting, you agree to our privacy policy. We'll never spam you.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}