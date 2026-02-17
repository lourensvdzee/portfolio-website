import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

export default function Booking() {
  const reduced = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Mock API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section
      id="contact"
      className="sticky-section z-[70] bg-bg"
      aria-label="Book a call"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold md:text-4xl"
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

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-md"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-card-border bg-card p-8 text-center"
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
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                ].map((field) => (
                  <motion.div key={field.name} variants={reduced ? undefined : fadeInUp}>
                    <label
                      htmlFor={field.name}
                      className="mb-1 block text-sm font-medium text-muted"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required
                      className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                    />
                  </motion.div>
                ))}
                <motion.div variants={reduced ? undefined : fadeInUp}>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                  />
                </motion.div>
                <motion.div variants={reduced ? undefined : fadeInUp}>
                  <label
                    htmlFor="time"
                    className="mb-1 block text-sm font-medium text-muted"
                  >
                    Preferred Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="text"
                    placeholder="e.g. Mornings CET"
                    className="w-full rounded-xl border border-card-border bg-card px-4 py-3 text-text placeholder-muted/50 outline-none transition-colors focus:border-primary"
                  />
                </motion.div>
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
      </div>
    </section>
  )
}
