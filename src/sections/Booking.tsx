import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, Phone, Linkedin, Mail, MessageSquare, X, ArrowLeft } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); onSuccess() }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-muted">
            Name <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" type="text" required
            className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-muted">
            Email <span className="text-primary">*</span>
          </label>
          <input id="email" name="email" type="email" required
            className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-muted">
            Phone <span className="text-muted/50 text-xs font-normal">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel"
            className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
            placeholder="Your number" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm font-medium text-muted">
            Company
          </label>
          <input id="company" name="company" type="text"
            className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-muted">
          Message <span className="text-primary">*</span>
        </label>
        <textarea id="message" name="message" rows={4} required
          placeholder="Tell me about your idea, project, or challenge..."
          className="w-full resize-none rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary" />
      </div>
      <p className="flex items-center gap-2 text-sm text-muted/70">
        <Mail className="h-3.5 w-3.5 shrink-0" />
        Or email me directly at{' '}
        <a href="mailto:connect@lourensvanderzee.com" className="text-accent hover:text-primary transition-colors font-medium">
          connect@lourensvanderzee.com
        </a>
      </p>
      <button type="submit" disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        {loading
          ? <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          : <><Send className="h-4 w-4" /> Send Message</>
        }
      </button>
    </form>
  )
}

export default function Booking() {
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [mobileFormOpen, setMobileFormOpen] = useState(false)

  return (
    <section id="contact" className="sticky-section z-[50] bg-bg" aria-label="Book a call">
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-3 text-center text-3xl font-bold md:text-4xl"
        >
          Let's Build Something
        </motion.h2>
        <motion.p
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-10 text-center text-muted"
        >
          Have an idea? Let's talk about making it real.
        </motion.p>

        {/* ── Mobile layout: 4 contact buttons + form drawer ── */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success-mob" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-card-border bg-card p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="text-sm text-muted">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.div key="options" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
                <div className="grid grid-cols-2 gap-3">
                  {/* Send a message */}
                  <motion.button
                    variants={reduced ? undefined : fadeInUp}
                    onClick={() => setMobileFormOpen(true)}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">Send a message</span>
                  </motion.button>

                  {/* Email */}
                  <motion.a
                    variants={reduced ? undefined : fadeInUp}
                    href="mailto:connect@lourensvanderzee.com"
                    className="flex flex-col items-center gap-2 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">Email me</span>
                  </motion.a>

                  {/* Call */}
                  <motion.a
                    variants={reduced ? undefined : fadeInUp}
                    href="tel:+4915251416379"
                    className="flex flex-col items-center gap-2 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold">Call me</span>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    variants={reduced ? undefined : fadeInUp}
                    href="https://linkedin.com/in/lourens-van-der-zee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.12)] text-center"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a66c2]/20">
                      <Linkedin className="h-5 w-5 text-[#0a66c2]" />
                    </div>
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile form drawer — slides up from bottom as fixed overlay */}
          <AnimatePresence>
            {mobileFormOpen && (
              <motion.div
                key="drawer"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                className="fixed inset-0 z-[100] bg-bg overflow-y-auto"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              >
                <div className="flex items-center gap-3 sticky top-0 bg-bg/95 backdrop-blur-sm px-5 py-4 border-b border-card-border">
                  <button
                    onClick={() => setMobileFormOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-muted hover:text-text"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <h3 className="text-base font-semibold">Send a message</h3>
                  <button
                    onClick={() => setMobileFormOpen(false)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-card text-muted hover:text-text"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="px-5 py-6">
                  <ContactForm onSuccess={() => { setMobileFormOpen(false); setSubmitted(true) }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop: two-column layout ── */}
        <div className="hidden lg:grid gap-10 lg:grid-cols-[1fr_320px]">
          <motion.div
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-card-border bg-card p-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Message Sent!</h3>
                  <p className="text-sm text-muted">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <ContactForm onSuccess={() => setSubmitted(true)} />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            <motion.div variants={reduced ? undefined : fadeInUp} className="rounded-2xl border border-card-border bg-card p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Phone</p>
              <a href="tel:+4915251416379" className="flex items-center gap-2.5 text-text font-semibold hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                +49 152 514 163 79
              </a>
              <p className="mt-1.5 text-xs text-muted/60">Available Mon–Fri, 9:00–18:00 CET</p>
            </motion.div>

            <motion.a
              variants={reduced ? undefined : fadeInUp}
              href="https://linkedin.com/in/lourens-van-der-zee"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-card-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0a66c2]/20">
                  <Linkedin className="h-5 w-5 text-[#0a66c2]" />
                </div>
                <div>
                  <p className="font-semibold text-text leading-tight">Lourens van der Zee</p>
                  <p className="text-xs text-muted mt-0.5">Product Builder · AI Prototyper</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-primary font-medium group-hover:text-accent transition-colors">
                View my LinkedIn profile →
              </p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
