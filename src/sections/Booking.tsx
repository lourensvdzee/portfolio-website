import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, Phone, Linkedin, Mail } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

export default function Booking() {
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section
      id="contact"
      className="sticky-section z-[50] bg-bg"
      aria-label="Book a call"
    >
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
          className="mb-12 text-center text-muted"
        >
          Have an idea? Let's talk about making it real.
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

          {/* ── Left: Form ─────────────────────────────────── */}
          <motion.div
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-card-border bg-card p-10 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Message Sent!</h3>
                  <p className="text-sm text-muted">
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name + Email row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div variants={reduced ? undefined : fadeInUp}>
                      <label htmlFor="name" className="mb-1 block text-sm font-medium text-muted">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                      />
                    </motion.div>
                    <motion.div variants={reduced ? undefined : fadeInUp}>
                      <label htmlFor="email" className="mb-1 block text-sm font-medium text-muted">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                      />
                    </motion.div>
                  </div>

                  {/* Phone + Company row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div variants={reduced ? undefined : fadeInUp}>
                      <label htmlFor="phone" className="mb-1 block text-sm font-medium text-muted">
                        Phone{' '}
                        <span className="text-muted/50 text-xs font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                        placeholder="+31 6 ..."
                      />
                    </motion.div>
                    <motion.div variants={reduced ? undefined : fadeInUp}>
                      <label htmlFor="company" className="mb-1 block text-sm font-medium text-muted">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                      />
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div variants={reduced ? undefined : fadeInUp}>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-muted">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your idea, project, or challenge..."
                      className="w-full resize-none rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                    />
                  </motion.div>

                  {/* Direct email line */}
                  <motion.p
                    variants={reduced ? undefined : fadeInUp}
                    className="flex items-center gap-2 text-sm text-muted/70"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    Or email me directly at{' '}
                    <a
                      href="mailto:connect@lourensvanderzee.com"
                      className="text-accent hover:text-primary transition-colors font-medium"
                    >
                      connect@lourensvanderzee.com
                    </a>
                  </motion.p>

                  {/* Submit */}
                  <motion.div variants={reduced ? undefined : fadeInUp}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {loading ? (
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          Send Message <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Contact info ────────────────────────── */}
          <motion.div
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Phone card */}
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="rounded-2xl border border-card-border bg-card p-5"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
                Phone
              </p>
              <a
                href="tel:+31612345678"
                className="flex items-center gap-2.5 text-text font-semibold hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-primary shrink-0" />
                +31 6 12 34 56 78
              </a>
              <p className="mt-1.5 text-xs text-muted/60">
                Available Mon–Fri, 9:00–18:00 CET
              </p>
            </motion.div>

            {/* LinkedIn card */}
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
                  <p className="font-semibold text-text leading-tight">
                    Lourens van der Zee
                  </p>
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
