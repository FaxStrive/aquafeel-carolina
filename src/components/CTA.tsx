"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function CTA() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: (formData.get("name") as string)?.split(" ")[0] || "",
          lastName: (formData.get("name") as string)?.split(" ").slice(1).join(" ") || "",
          email: formData.get("email") || "",
          phone: formData.get("phone") || "",
          city: formData.get("cityzip") || "",
          zip: "",
          source: "homepage-cta",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/dark-water.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0f172a]/75" />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[5%] right-[15%] w-[400px] h-[400px] rounded-full opacity-[0.10] animate-float"
          style={{
            background:
              "radial-gradient(circle, var(--color-secondary-light) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full opacity-[0.08] animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-heading font-extrabold text-white mb-4"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {t.ctaSection.headline}
            </h2>
            <p className="text-white/70 text-lg font-body leading-relaxed mb-8 max-w-lg">
              {t.ctaSection.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <MagneticButton label={t.cta.bookNow} />
              <a
                href="tel:9842123558"
                className="flex items-center gap-2 text-white/80 hover:text-white font-heading font-semibold text-base transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                {t.common.phone}
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {t.ctaSection.thankYouTitle}
                </h3>
                <p className="text-white/70 font-body">
                  {t.ctaSection.thankYouMessage}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 sm:p-10 space-y-4"
              >
                <h3 className="font-heading font-bold text-xl text-white mb-1">
                  {t.ctaSection.formTitle}
                </h3>
                <p className="text-white/60 text-sm font-body mb-6">
                  {t.ctaSection.formSubtitle}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder={t.ctaSection.placeholderName}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.ctaSection.placeholderEmail}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.ctaSection.placeholderPhone}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-colors"
                  />
                  <input
                    type="text"
                    name="cityzip"
                    placeholder={t.ctaSection.placeholderCityZip}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  {t.cta.scheduleMyFreeTest}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  return (
    <motion.a
      ref={ref}
      href="/contact"
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-lg hover:bg-[var(--color-accent)] transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </motion.a>
  );
}
