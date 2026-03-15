"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertTriangle,
  ShieldAlert,
  Droplets,
  ExternalLink,
  Loader2,
  MapPin,
  Users,
  FlaskConical,
  ChevronDown,
  Lock,
  Eye,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface Contaminant {
  name: string;
  effect: string;
  utilityLevel: string;
  legalLimit: string;
  ewgGuideline: string;
  timesAbove: string;
  sources: string[];
  filters: string[];
}

interface EWGResult {
  utilityName: string;
  location: string;
  populationServed: string;
  contaminantsExceed: number;
  totalContaminants: number;
  contaminants: Contaminant[];
  ewgUrl: string;
}

function ContaminantCard({
  contaminant,
  index,
}: {
  contaminant: Contaminant;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const times = parseInt(contaminant.timesAbove) || 0;

  const getSeverityColor = () => {
    if (times >= 100)
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        badge: "bg-red-100 text-red-800",
      };
    if (times >= 10)
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-800",
      };
    return {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100 text-yellow-800",
    };
  };

  const colors = getSeverityColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`${colors.bg} ${colors.border} border rounded-xl overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FlaskConical className={`w-4 h-4 shrink-0 ${colors.text}`} />
          <div className="min-w-0">
            <span className="font-heading font-bold text-sm text-[var(--color-text-primary)] block truncate">
              {contaminant.name}
            </span>
            {contaminant.effect && (
              <span className={`text-xs ${colors.text} capitalize`}>
                {contaminant.effect}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {contaminant.timesAbove && (
            <span
              className={`${colors.badge} text-xs font-bold px-2 py-1 rounded-full`}
            >
              {contaminant.timesAbove} EWG
            </span>
          )}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-inherit pt-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/60 rounded-lg p-2.5">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">
                    Detected
                  </span>
                  <span className="font-bold text-[var(--color-text-primary)]">
                    {contaminant.utilityLevel}
                  </span>
                </div>
                <div className="bg-white/60 rounded-lg p-2.5">
                  <span className="text-[var(--color-text-muted)] block mb-0.5">
                    EWG Guideline
                  </span>
                  <span className="font-bold text-emerald-700">
                    {contaminant.ewgGuideline}
                  </span>
                </div>
              </div>
              {contaminant.legalLimit && (
                <div className="text-xs text-[var(--color-text-muted)]">
                  Legal limit: {contaminant.legalLimit}
                </div>
              )}
              {contaminant.filters.length > 0 && (
                <div className="text-xs">
                  <span className="text-[var(--color-text-muted)]">
                    Filtered by:{" "}
                  </span>
                  <span className="font-semibold text-[var(--color-secondary)]">
                    {contaminant.filters.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function EWGChecker() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EWGResult | null>(null);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError(t.ewgChecker.errorInvalidZip);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setUnlocked(false);

    try {
      const res = await fetch(`/api/ewg?zip=${zip}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.ewgChecker.errorGeneric);
        return;
      }

      setResult(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch {
      setError(t.ewgChecker.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t.ewgChecker.errorName;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = t.ewgChecker.errorEmail;
    if (!formData.phone.trim()) errors.phone = t.ewgChecker.errorPhone;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name.split(" ")[0],
          lastName: formData.name.split(" ").slice(1).join(" ") || "-",
          email: formData.email,
          phone: formData.phone,
          city: zip,
          zip: zip,
          message: `EWG Water Report unlock for zip ${zip} - Utility: ${result?.utilityName || "N/A"}`,
        }),
      });
    } catch {
      // Still unlock even if contact API fails
    }

    setUnlocked(true);
    setSubmitting(false);
  };

  const visibleCount = result
    ? Math.max(1, Math.ceil(result.contaminants.length / 2))
    : 0;
  const hiddenCount = result
    ? result.contaminants.length - visibleCount
    : 0;

  return (
    <section
      ref={sectionRef}
      id="ewg-checker"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background with sink water texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-white to-[var(--color-surface-alt)]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(/images/water/sink-water.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-[var(--color-surface-alt)]" />
        <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ height: 100 }}>
          <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,40 1440,60 L1440,100 L0,100 Z" fill="var(--color-surface-alt)" fillOpacity="0.5" />
        </svg>
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_70%)] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-[var(--color-secondary)]" />
            <span className="font-heading text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold">
              {t.ewgChecker.sectionLabel}
            </span>
          </div>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)] mb-4"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.ewgChecker.headline}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg font-body leading-relaxed max-w-2xl mx-auto">
            {t.ewgChecker.description}
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zip}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setZip(val);
                  setError("");
                }}
                placeholder={t.ewgChecker.placeholder}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--color-border)] bg-white font-body text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || zip.length !== 5}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-primary)] text-white font-heading font-bold text-sm tracking-wide hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-primary)]/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? t.ewgChecker.searching : t.ewgChecker.searchButton}
            </button>
          </form>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center mt-3 font-body"
            >
              {error}
            </motion.p>
          )}

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3 font-body">
            {t.ewgChecker.poweredBy}
          </p>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              ref={resultsRef}
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Summary Card */}
              <div className="bg-white rounded-2xl shadow-xl shadow-brand-navy/5 border border-[var(--color-border)] overflow-hidden mb-6">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-[var(--color-text-primary)]">
                        {result.utilityName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[var(--color-text-muted)] font-body">
                        {result.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {result.location}
                          </span>
                        )}
                        {result.populationServed && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {result.populationServed} {t.ewgChecker.served}
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={result.ewgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[var(--color-secondary)] hover:text-[var(--color-secondary-dark)] transition-colors"
                      title={t.ewgChecker.viewFull}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="font-heading font-extrabold text-3xl text-red-600">
                        {result.contaminantsExceed}
                      </div>
                      <div className="text-xs text-red-600/70 font-body mt-1">
                        {t.ewgChecker.exceedGuidelines}
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="font-heading font-extrabold text-3xl text-amber-600">
                        {result.totalContaminants}
                      </div>
                      <div className="text-xs text-amber-600/70 font-body mt-1">
                        {t.ewgChecker.totalDetected}
                      </div>
                    </div>
                  </div>

                  {/* Contaminant List */}
                  {result.contaminants.length > 0 && (
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        {t.ewgChecker.contaminantsAbove}
                      </h4>

                      {/* Visible contaminants (first half) */}
                      <div className="space-y-2">
                        {result.contaminants
                          .slice(0, visibleCount)
                          .map((c, i) => (
                            <ContaminantCard
                              key={c.name}
                              contaminant={c}
                              index={i}
                            />
                          ))}
                      </div>

                      {/* Locked section */}
                      {!unlocked && hiddenCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="relative mt-4"
                        >
                          {/* Blurred preview of hidden contaminants */}
                          <div className="space-y-2 blur-[6px] select-none pointer-events-none" aria-hidden="true">
                            {result.contaminants
                              .slice(visibleCount, visibleCount + 2)
                              .map((c, i) => (
                                <div
                                  key={i}
                                  className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <FlaskConical className="w-4 h-4 text-amber-700" />
                                    <div>
                                      <span className="font-heading font-bold text-sm text-[var(--color-text-primary)]">
                                        {c.name}
                                      </span>
                                      <span className="text-xs text-amber-700 block capitalize">
                                        {c.effect}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                                    {c.timesAbove} EWG
                                  </span>
                                </div>
                              ))}
                          </div>

                          {/* Unlock overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--color-border)] p-6 sm:p-8 w-full max-w-md">
                              <div className="text-center mb-5">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-3">
                                  <Lock className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                                <h4 className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                                  {t.ewgChecker.unlockTitle}
                                </h4>
                                <p className="text-sm text-[var(--color-text-muted)] font-body mt-1">
                                  {hiddenCount} {t.ewgChecker.unlockDescription}
                                </p>
                              </div>

                              <form
                                onSubmit={handleUnlock}
                                className="space-y-3"
                              >
                                <div>
                                  <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder={t.ewgChecker.placeholderName}
                                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
                                  />
                                  {formErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {formErrors.name}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        email: e.target.value,
                                      })
                                    }
                                    placeholder={t.ewgChecker.placeholderEmail}
                                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
                                  />
                                  {formErrors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {formErrors.email}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                      })
                                    }
                                    placeholder={t.ewgChecker.placeholderPhone}
                                    className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
                                  />
                                  {formErrors.phone && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {formErrors.phone}
                                    </p>
                                  )}
                                </div>
                                <button
                                  type="submit"
                                  disabled={submitting}
                                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-heading font-bold text-sm hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 shadow-lg shadow-[var(--color-primary)]/20"
                                >
                                  {submitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                  {submitting
                                    ? t.ewgChecker.unlocking
                                    : t.ewgChecker.unlockButton}
                                </button>
                              </form>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Unlocked contaminants (second half) */}
                      {unlocked && hiddenCount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-2 mt-2"
                        >
                          {result.contaminants
                            .slice(visibleCount)
                            .map((c, i) => (
                              <ContaminantCard
                                key={c.name}
                                contaminant={c}
                                index={i}
                              />
                            ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-6 sm:p-8 text-center text-white"
              >
                <h3 className="font-heading font-bold text-xl mb-2">
                  {t.ewgChecker.ctaHeadline}
                </h3>
                <p className="font-body text-white/80 text-sm mb-5 max-w-lg mx-auto">
                  {t.ewgChecker.ctaDescription}
                </p>
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] font-heading font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  {t.ewgChecker.ctaButton}
                </a>
              </motion.div>

              {/* EWG Attribution */}
              <p className="text-center text-xs text-[var(--color-text-muted)] mt-4 font-body">
                {t.ewgChecker.attribution}{" "}
                <a
                  href={result.ewgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--color-secondary)]"
                >
                  {t.ewgChecker.viewFull}
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
