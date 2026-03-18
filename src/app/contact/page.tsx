"use client";

import { useState, useRef, FormEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";



export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  Stagger + slide-in animation variants                              */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  US States for the dropdown                                         */
/* ------------------------------------------------------------------ */
const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV",
  "NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN",
  "TX","UT","VT","VA","WA","WV","WI","WY",
];

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function ContactPage() {
  const { t } = useI18n();

  /* ---- FAQ data (inside component to use translations) ----------- */
  const faqs = [
    { q: t.contactPage.faq1Q, a: t.contactPage.faq1A },
    { q: t.contactPage.faq2Q, a: t.contactPage.faq2A },
    { q: t.contactPage.faq3Q, a: t.contactPage.faq3A },
    { q: t.contactPage.faq4Q, a: t.contactPage.faq4A },
  ];

  /* ---- Contact info cards (inside component to use translations) -- */
  const contactCards = [
    {
      icon: Phone,
      label: t.contactPage.cardPhone,
      value: t.common.phone,
      href: "tel:9842123558",
      action: t.contactPage.cardCallUs,
    },
    {
      icon: Mail,
      label: t.contactPage.cardEmail,
      value: t.common.email,
      href: "mailto:info@aquafeelcarolina.com",
      action: t.contactPage.cardEmailUs,
    },
    {
      icon: MapPin,
      label: t.contactPage.cardLocation,
      value: t.contactPage.cardLocationValue,
      sub: t.contactPage.cardLocationSub,
    },
    {
      icon: Clock,
      label: t.contactPage.cardHours,
      value: t.contactPage.cardHoursValue,
      sub: t.contactPage.cardHoursSub,
    },
  ];

  /* ---- Form state ------------------------------------------------ */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "NC",
    zip: "",
    ownerRenter: "owner",
    occupants: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  /* ---- FAQ toggle ------------------------------------------------ */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ---- Scroll-linked parallax for hero orbs ---------------------- */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOrb1Y = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOrb2Y = useTransform(heroScroll, [0, 1], [0, -60]);

  /* ---- Mouse glow for form card ---------------------------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const glowBg = useMotionTemplate`radial-gradient(480px circle at ${glowX}px ${glowY}px, rgba(6,182,212,0.06), transparent 70%)`;
  const formRef = useRef<HTMLDivElement>(null);

  function handleFormMouse(e: React.MouseEvent) {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  /* ---- Validation ------------------------------------------------ */
  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = t.contactPage.errorFirstName;
    if (!form.lastName.trim()) e.lastName = t.contactPage.errorLastName;
    if (!form.email.trim()) e.email = t.contactPage.errorEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t.contactPage.errorEmailInvalid;
    if (!form.phone.trim()) e.phone = t.contactPage.errorPhone;
    if (!form.city.trim()) e.city = t.contactPage.errorCity;
    if (!form.zip.trim()) e.zip = t.contactPage.errorZip;
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form" }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ firstName: t.contactPage.errorGeneric });
    }
  }

  function updateField(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  /* ---- Scroll-based section reveal ------------------------------- */
  const formSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: formScroll } = useScroll({
    target: formSectionRef,
    offset: ["start end", "start 0.4"],
  });
  const formSectionY = useTransform(formScroll, [0, 1], [60, 0]);
  const formSectionOpacity = useTransform(formScroll, [0, 0.6], [0, 1]);
  const formSectionYSmooth = useSpring(formSectionY, {
    stiffness: 120,
    damping: 25,
  });

  /* ================================================================ */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What water treatment services does Aquafeel Solutions Carolina offer?","acceptedAnswer":{"@type":"Answer","text":"Aquafeel Solutions Carolina offers water filtration, water softeners, reverse osmosis systems, and water testing in your area."}},{"@type":"Question","name":"How do I know if I need a water softener?","acceptedAnswer":{"@type":"Answer","text":"Signs you need a water softener include hard water deposits on faucets, dry skin after bathing, and spots on dishes. Contact us for a free water test."}},{"@type":"Question","name":"How long does installation take?","acceptedAnswer":{"@type":"Answer","text":"Most water treatment system installations take 2–4 hours. Our technicians work efficiently to minimize disruption to your home."}}]}) }}
      />
      <Header />
      <main>
        {/* ============================================================ */}
        {/*  HERO                                                         */}
        {/* ============================================================ */}
        <section
          ref={heroRef}
          className="relative min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #171751 0%, #252772 40%, #0e7490 100%)",
          }}
        >
          {/* Orbs - scroll-linked parallax */}
          <motion.div
            style={{ y: heroOrb1Y }}
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_65%)] animate-float" />
          </motion.div>
          <motion.div
            style={{ y: heroOrb2Y }}
            className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.12)_0%,transparent_60%)] animate-float-slow" />
          </motion.div>

          {/* Diagonal accent line */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(120deg, transparent 42%, rgba(6,182,212,0.6) 42.5%, transparent 43%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80 transition-colors">
                {t.contactPage.breadcrumbHome}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white/80">{t.contactPage.breadcrumbContact}</span>
            </motion.nav>

            {/* Headline - blur-in stagger per word */}
            <h1
              className="font-heading font-bold text-white leading-[1.1] mb-4"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {t.contactPage.heroHeadline.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-white/70 font-body max-w-lg"
              style={{ fontSize: "var(--text-body)" }}
            >
              {t.contactPage.heroDescription}
            </motion.p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FORM + INFO SECTION                                          */}
        {/* ============================================================ */}
        <section
          ref={formSectionRef}
          className="relative py-20 sm:py-28 overflow-hidden"
        >
          {/* Background - sweeping gradient + organic mesh */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(170deg, var(--color-surface) 0%, #ffffff 35%, var(--color-surface-alt) 100%)",
              }}
            />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,39,114,0.04)_0%,transparent_60%)] translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.04)_0%,transparent_55%)] -translate-x-1/4 translate-y-1/4" />
            {/* Subtle wave SVG */}
            <svg
              className="absolute bottom-0 left-0 w-full opacity-[0.035]"
              viewBox="0 0 1440 200"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100C240 20 480 160 720 100C960 40 1200 140 1440 80V200H0Z"
                fill="var(--color-primary)"
              />
            </svg>
          </div>

          <motion.div
            style={{
              y: formSectionYSmooth,
              opacity: formSectionOpacity,
            }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
              {/* ---- LEFT: Form (3 cols) ---- */}
              <div
                ref={formRef}
                onMouseMove={handleFormMouse}
                className="lg:col-span-3 relative"
              >
                <motion.div
                  style={{ background: glowBg }}
                  className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                />
                <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl p-8 sm:p-10 shadow-xl shadow-brand-navy/[0.03]">
                  {status === "success" ? (
                    /* ---- Success state ---- */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                          delay: 0.15,
                        }}
                        className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </motion.div>
                      <h3
                        className="font-heading font-bold text-[var(--color-text-primary)] mb-3"
                        style={{ fontSize: "var(--text-h3)" }}
                      >
                        {t.contactPage.successTitle}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] font-body max-w-sm mb-8">
                        {t.contactPage.successMessage}
                      </p>
                      <button
                        onClick={() => {
                          setStatus("idle");
                          setForm({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            address: "",
                            city: "",
                            state: "NC",
                            zip: "",
                            ownerRenter: "owner",
                            occupants: "",
                            message: "",
                          });
                        }}
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--color-surface-alt)] text-[var(--color-primary)] font-heading font-semibold text-sm hover:bg-[var(--color-border)] transition-colors"
                      >
                        {t.contactPage.sendAnother}
                      </button>
                    </motion.div>
                  ) : (
                    /* ---- Form ---- */
                    <>
                      <div className="mb-8">
                        <h2
                          className="font-heading font-bold text-[var(--color-text-primary)] mb-2"
                          style={{ fontSize: "var(--text-h3)" }}
                        >
                          {t.contactPage.formTitle}
                        </h2>
                        <p className="text-[var(--color-text-secondary)] font-body text-sm">
                          {t.contactPage.formSubtitle}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                          className="space-y-5"
                        >
                          {/* Row: First + Last */}
                          <div className="grid sm:grid-cols-2 gap-5">
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelFirstName}
                              </label>
                              <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) =>
                                  updateField("firstName", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.firstName
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderFirstName}
                              />
                              {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.firstName}
                                </p>
                              )}
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelLastName}
                              </label>
                              <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) =>
                                  updateField("lastName", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.lastName
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderLastName}
                              />
                              {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.lastName}
                                </p>
                              )}
                            </motion.div>
                          </div>

                          {/* Row: Email + Phone */}
                          <div className="grid sm:grid-cols-2 gap-5">
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelEmail}
                              </label>
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                  updateField("email", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.email
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderEmail}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.email}
                                </p>
                              )}
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelPhone}
                              </label>
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) =>
                                  updateField("phone", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.phone
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderPhone}
                              />
                              {errors.phone && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.phone}
                                </p>
                              )}
                            </motion.div>
                          </div>

                          {/* Address */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                              {t.contactPage.labelAddress}
                            </label>
                            <input
                              type="text"
                              value={form.address}
                              onChange={(e) =>
                                updateField("address", e.target.value)
                              }
                              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow"
                              placeholder={t.contactPage.placeholderAddress}
                            />
                          </motion.div>

                          {/* Row: City + State + Zip */}
                          <div className="grid sm:grid-cols-3 gap-5">
                            <motion.div
                              variants={itemVariants}
                              className="sm:col-span-1"
                            >
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelCity}
                              </label>
                              <input
                                type="text"
                                value={form.city}
                                onChange={(e) =>
                                  updateField("city", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.city
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderCity}
                              />
                              {errors.city && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.city}
                                </p>
                              )}
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelState}
                              </label>
                              <select
                                value={form.state}
                                onChange={(e) =>
                                  updateField("state", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow appearance-none"
                              >
                                {US_STATES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelZip}
                              </label>
                              <input
                                type="text"
                                value={form.zip}
                                onChange={(e) =>
                                  updateField("zip", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg border font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow ${
                                  errors.zip
                                    ? "border-red-400"
                                    : "border-[var(--color-border)]"
                                }`}
                                placeholder={t.contactPage.placeholderZip}
                              />
                              {errors.zip && (
                                <p className="text-red-500 text-xs mt-1 font-body">
                                  {errors.zip}
                                </p>
                              )}
                            </motion.div>
                          </div>

                          {/* Row: Owner/Renter + Occupants */}
                          <div className="grid sm:grid-cols-2 gap-5">
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelOwnerRenter}
                              </label>
                              <select
                                value={form.ownerRenter}
                                onChange={(e) =>
                                  updateField("ownerRenter", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow appearance-none"
                              >
                                <option value="owner">{t.contactPage.optionOwner}</option>
                                <option value="renter">{t.contactPage.optionRenter}</option>
                              </select>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                                {t.contactPage.labelOccupants}
                              </label>
                              <input
                                type="text"
                                value={form.occupants}
                                onChange={(e) =>
                                  updateField("occupants", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow"
                                placeholder={t.contactPage.placeholderOccupants}
                              />
                            </motion.div>
                          </div>

                          {/* Message */}
                          <motion.div variants={itemVariants}>
                            <label className="block text-xs font-heading font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5">
                              {t.contactPage.labelMessage}
                            </label>
                            <textarea
                              value={form.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/40 transition-shadow resize-none"
                              placeholder={t.contactPage.placeholderMessage}
                            />
                          </motion.div>

                          {/* Submit */}
                          <motion.div variants={itemVariants}>
                            <button
                              type="submit"
                              disabled={status === "loading"}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-sm tracking-wide hover:bg-[var(--color-accent)] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-aqua/20"
                            >
                              {status === "loading" ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  {t.contactPage.submitting}
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  {t.contactPage.submitButton}
                                </>
                              )}
                            </button>
                          </motion.div>
                        </motion.div>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* ---- RIGHT: Info cards (2 cols) ---- */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {contactCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group relative bg-white/80 backdrop-blur-sm border border-[var(--color-border)] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-brand-cyan/30 transition-all duration-300"
                  >
                    {/* Hover glow accent */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-[var(--color-surface-alt)] flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/10 transition-colors">
                        <card.icon className="w-5 h-5 text-[var(--color-primary)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading font-semibold text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                          {card.label}
                        </p>
                        {card.href ? (
                          <a
                            href={card.href}
                            className="font-body text-sm text-[var(--color-text-primary)] hover:text-brand-cyan transition-colors break-all"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <p className="font-body text-sm text-[var(--color-text-primary)]">
                            {card.value}
                          </p>
                        )}
                        {card.sub && (
                          <p className="font-body text-xs text-[var(--color-text-muted)] mt-0.5">
                            {card.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Map placeholder */}
                <motion.div
                  initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative rounded-xl overflow-hidden border border-[var(--color-border)] flex-1 min-h-[200px]"
                >
                  <div className="absolute inset-0 bg-[var(--color-surface-alt)] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2 opacity-40" />
                      <p className="font-heading font-semibold text-sm text-[var(--color-text-muted)]">
                        {t.contactPage.cardLocationValue}
                      </p>
                      <p className="font-body text-xs text-[var(--color-text-muted)] mt-1">
                        {t.contactPage.mapServingCustomers}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
        <section className="relative py-20 sm:py-24 overflow-hidden">
          {/* Background - angled gradient sweep */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(200deg, #ffffff 0%, var(--color-surface) 50%, #ffffff 100%)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(37,39,114,0.025)_0%,transparent_60%)]" />
            {/* Top-right accent curve */}
            <svg
              className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.04]"
              viewBox="0 0 300 300"
              fill="none"
            >
              <circle
                cx="300"
                cy="0"
                r="250"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
              />
              <circle
                cx="300"
                cy="0"
                r="180"
                stroke="var(--color-secondary-light)"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-cyan mb-3">
                {t.contactPage.faqLabel}
              </p>
              <h2
                className="font-heading font-bold text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t.contactPage.faqHeadline}
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm hover:border-brand-cyan/20 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-heading font-semibold text-sm text-[var(--color-text-primary)]">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[var(--color-text-secondary)] font-body text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  CTA SECTION                                                  */}
        {/* ============================================================ */}
        <section className="relative py-20 sm:py-24 overflow-hidden">
          {/* Background - navy gradient with animated orbs */}
          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #171751 0%, #252772 45%, #0e7490 100%)",
              }}
            />
            <div className="absolute top-10 left-1/4 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_60%)] animate-float pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.1)_0%,transparent_55%)] animate-float-slow pointer-events-none" />
            {/* Angled line */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(145deg, transparent 48%, rgba(255,255,255,0.4) 48.5%, transparent 49%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-brand-cyan mb-4">
                {t.contactPage.ctaLabel}
              </p>
              <h2
                className="font-heading font-bold text-white leading-tight mb-5"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {t.contactPage.ctaHeadline}
              </h2>
              <p className="text-white/60 font-body max-w-lg mx-auto mb-8">
                {t.contactPage.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:9842123558"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-sm hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-brand-aqua/30"
                >
                  <Phone className="w-4 h-4" />
                  {t.contactPage.ctaCall}
                </a>
                <a
                  href="mailto:info@aquafeelcarolina.com"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/10 text-white font-heading font-semibold text-sm hover:bg-white/20 transition-all duration-200 border border-white/20"
                >
                  <Mail className="w-4 h-4" />
                  {t.contactPage.ctaEmail}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
