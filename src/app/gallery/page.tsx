"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Camera,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── TYPES ─────────────────── */

type Category = "all" | "installations" | "before-after" | "products" | "team";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  category: Category;
  span: "normal" | "tall" | "wide";
}

/* ─────────────────── HERO ─────────────────── */

function GalleryHero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[420px] flex items-center overflow-hidden"
    >
      {/* Gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]" />
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.14, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        {/* Sweep line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
        >
          <Link href="/" className="hover:text-white/80 transition-colors">
            {t.galleryPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.galleryPage.breadcrumbGallery}</span>
        </motion.nav>

        {/* Headline with stagger */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl"
          >
            {t.galleryPage.heroHeadlinePre}<span className="text-brand-cyan">{t.galleryPage.heroHeadlineHighlight}</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.galleryPage.heroDescription}
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── FILTER TABS ─────────────────── */

function FilterTabs({
  active,
  onChange,
  categories,
}: {
  active: Category;
  onChange: (c: Category) => void;
  categories: { key: Category; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`relative px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${
            active === cat.key
              ? "text-white"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
          }`}
        >
          {active === cat.key && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────── GALLERY GRID ─────────────────── */

function GalleryGrid({
  items,
  onSelect,
  categories,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
  categories: { key: Category; label: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            layout
            layoutId={`card-${item.id}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.92 }
            }
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{
              duration: 0.45,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
              layout: { type: "spring", stiffness: 300, damping: 30 },
            }}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={
                  item.span === "tall"
                    ? 750
                    : item.span === "wide"
                    ? 380
                    : 500
                }
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-3.5 h-3.5 text-brand-cyan" />
                    <span className="font-heading font-semibold text-xs uppercase tracking-wider text-brand-cyan">
                      {
                        categories.find((c) => c.key === item.category)
                          ?.label
                      }
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── LIGHTBOX MODAL ─────────────────── */

function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentIndex = items.findIndex((i) => i.id === item.id);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-50 font-heading font-semibold text-sm text-white/50">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <ChevronRightIcon className="w-5 h-5 text-white" />
      </button>

      {/* Image + caption */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full mx-4 sm:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl overflow-hidden bg-black/20">
          <Image
            src={item.src}
            alt={item.title}
            width={1200}
            height={800}
            className="w-full h-auto max-h-[75vh] object-contain"
            priority
          />
        </div>
        <div className="mt-5 text-center">
          <h3 className="font-heading font-bold text-white text-xl sm:text-2xl">
            {item.title}
          </h3>
          <p className="font-body text-white/60 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            {item.caption}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── GALLERY SECTION ─────────────────── */

function GallerySection() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t.galleryPage.filterAll },
    { key: "installations", label: t.galleryPage.filterInstallations },
    { key: "before-after", label: t.galleryPage.filterBeforeAfter },
    { key: "products", label: t.galleryPage.filterProducts },
    { key: "team", label: t.galleryPage.filterTeam },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/images/client/photo-01.jpeg",
      title: t.galleryPage.item1Title,
      caption: t.galleryPage.item1Caption,
      category: "installations",
      span: "tall",
    },
    {
      id: 2,
      src: "/images/client/photo-02.jpeg",
      title: t.galleryPage.item2Title,
      caption: t.galleryPage.item2Caption,
      category: "installations",
      span: "normal",
    },
    {
      id: 3,
      src: "/images/client/photo-03.jpeg",
      title: t.galleryPage.item3Title,
      caption: t.galleryPage.item3Caption,
      category: "products",
      span: "normal",
    },
    {
      id: 4,
      src: "/images/client/photo-04.jpeg",
      title: t.galleryPage.item4Title,
      caption: t.galleryPage.item4Caption,
      category: "before-after",
      span: "wide",
    },
    {
      id: 5,
      src: "/images/client/photo-05.jpeg",
      title: t.galleryPage.item5Title,
      caption: t.galleryPage.item5Caption,
      category: "before-after",
      span: "normal",
    },
    {
      id: 6,
      src: "/images/client/photo-06.jpeg",
      title: t.galleryPage.item6Title,
      caption: t.galleryPage.item6Caption,
      category: "team",
      span: "tall",
    },
    {
      id: 7,
      src: "/images/client/photo-07.png",
      title: t.galleryPage.item7Title,
      caption: t.galleryPage.item7Caption,
      category: "products",
      span: "wide",
    },
    {
      id: 8,
      src: "/images/client/photo-08.jpeg",
      title: t.galleryPage.item8Title,
      caption: t.galleryPage.item8Caption,
      category: "installations",
      span: "normal",
    },
    {
      id: 9,
      src: "/images/client/photo-09.jpeg",
      title: t.galleryPage.item9Title,
      caption: t.galleryPage.item9Caption,
      category: "before-after",
      span: "normal",
    },
    {
      id: 10,
      src: "/images/client/photo-10.jpeg",
      title: t.galleryPage.item10Title,
      caption: t.galleryPage.item10Caption,
      category: "installations",
      span: "tall",
    },
    {
      id: 11,
      src: "/images/client/photo-11.webp",
      title: t.galleryPage.item11Title,
      caption: t.galleryPage.item11Caption,
      category: "team",
      span: "normal",
    },
    {
      id: 12,
      src: "/images/client/photo-12.jpeg",
      title: t.galleryPage.item12Title,
      caption: t.galleryPage.item12Caption,
      category: "installations",
      span: "normal",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handlePrev = useCallback(() => {
    if (!selectedItem) return;
    const idx = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIdx = idx <= 0 ? filteredItems.length - 1 : idx - 1;
    setSelectedItem(filteredItems[prevIdx]);
  }, [selectedItem, filteredItems]);

  const handleNext = useCallback(() => {
    if (!selectedItem) return;
    const idx = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIdx = idx >= filteredItems.length - 1 ? 0 : idx + 1;
    setSelectedItem(filteredItems[nextIdx]);
  }, [selectedItem, filteredItems]);

  return (
    <>
      <section ref={sectionRef} className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
          <div className="absolute top-[50%] right-[30%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
              {t.galleryPage.sectionLabel}
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
              {t.galleryPage.sectionHeadline}
            </h2>
            <p className="font-body text-[var(--color-text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
              {t.galleryPage.sectionDescription}
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12"
          >
            <FilterTabs active={activeFilter} onChange={setActiveFilter} categories={categories} />
          </motion.div>

          {/* Gallery grid */}
          <GalleryGrid items={filteredItems} onSelect={setSelectedItem} categories={categories} />
        </div>
      </section>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            items={filteredItems}
            onClose={() => setSelectedItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────── CTA ─────────────────── */

function GalleryCTA() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background: deep gradient with floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.1, 0.06],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-10 left-[5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            {t.galleryPage.ctaHeadlinePre}
            <span className="text-brand-cyan">{t.galleryPage.ctaHeadlineHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.galleryPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.galleryPage.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t.galleryPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryHero />
        <GallerySection />
        <GalleryCTA />
      </main>
      <Footer />
    </>
  );
}
