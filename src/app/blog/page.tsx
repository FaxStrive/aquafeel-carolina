"use client";

import { useRef, useState } from "react";
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
  Calendar,
  Clock,
  Tag,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, type BlogPost } from "@/lib/blog/posts";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── TYPES ─────────────────── */

type CategoryFilter = "All" | "News" | "Tips" | "Fun Facts";

/* ─────────────────── HERO ─────────────────── */

function BlogHero({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (c: CategoryFilter) => void;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const categoryFilterMap: { key: CategoryFilter; label: string }[] = [
    { key: "All", label: t.blogPage.categoryAll },
    { key: "News", label: t.blogPage.categoryNews },
    { key: "Tips", label: t.blogPage.categoryTips },
    { key: "Fun Facts", label: t.blogPage.categoryFunFacts },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[480px] flex items-center overflow-hidden"
    >
      {/* Gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-[20%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute top-[30%] left-[40%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-primary-light),transparent_70%)]"
        />
        {/* Directional sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" />
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
            {t.blogPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80">{t.blogPage.breadcrumbBlog}</span>
        </motion.nav>

        {/* Headline */}
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
            {t.blogPage.heroHeadlinePre}{" "}
            <span className="text-brand-cyan">{t.blogPage.heroHeadlineHighlight}</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl leading-relaxed"
        >
          {t.blogPage.heroDescription}
        </motion.p>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mt-8"
        >
          {categoryFilterMap.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`relative px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${
                active === key
                  ? "text-[var(--color-primary-dark)]"
                  : "text-white/60 hover:text-white/90 hover:bg-white/10"
              }`}
            >
              {active === key && (
                <motion.div
                  layoutId="blogCategoryPill"
                  className="absolute inset-0 rounded-full bg-brand-cyan"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── FEATURED POST CARD ─────────────────── */

function FeaturedPostCard({ post }: { post: BlogPost }) {
  const { t, locale } = useI18n();

  return (
    <motion.div
      layout
      layoutId={`blog-card-${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-xl hover:shadow-brand-cyan/5 transition-all duration-500">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative h-64 md:h-[400px] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-surface)] opacity-0 md:opacity-100" />
            </div>

            {/* Content side */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan font-heading font-semibold text-xs uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="text-[var(--color-text-muted)] text-sm font-body">
                  {t.blogPage.featured}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--color-text-primary)] leading-snug group-hover:text-brand-navy-light transition-colors duration-300">
                {post.title}
              </h2>

              <p className="font-body text-[var(--color-text-secondary)] text-base mt-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 mt-6 text-sm text-[var(--color-text-muted)] font-body">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-brand-cyan group-hover:gap-3 transition-all duration-300">
                  {t.blogPage.readFullArticle}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────── POST CARD ─────────────────── */

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const { t, locale } = useI18n();

  return (
    <motion.div
      layout
      layoutId={`blog-card-${post.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: "spring", stiffness: 300, damping: 30 },
      }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="relative rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] h-full hover:shadow-xl hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-500">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-primary)] font-heading font-semibold text-xs uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] font-body mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)] leading-snug group-hover:text-brand-navy-light transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="font-body text-[var(--color-text-secondary)] text-sm mt-3 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-brand-cyan group-hover:gap-3 transition-all duration-300">
                {t.blogPage.readMore}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────── BLOG GRID ─────────────────── */

function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <BookOpen className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-4" />
        <h3 className="font-heading font-semibold text-lg text-[var(--color-text-primary)]">
          {t.blogPage.noPostsTitle}
        </h3>
        <p className="font-body text-[var(--color-text-secondary)] mt-2">
          {t.blogPage.noPostsDescription}
        </p>
      </motion.div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div ref={ref}>
      <AnimatePresence mode="popLayout">
        {/* Featured post */}
        {isInView && (
          <div className="mb-10">
            <FeaturedPostCard post={featured} />
          </div>
        )}

        {/* Grid of remaining posts */}
        {isInView && rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── CTA SECTION ─────────────────── */

function BlogCTA() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
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
            {t.blogPage.ctaHeadlinePre}{" "}
            <span className="text-brand-cyan">{t.blogPage.ctaHeadlineHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.blogPage.ctaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.blogPage.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9842123558"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white/20 text-white font-heading font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              {t.blogPage.ctaCall}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Sort by date descending
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header />
      <main>
        <BlogHero active={activeCategory} onChange={setActiveCategory} />

        {/* Blog grid section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
            <div className="absolute top-[5%] right-[8%] w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
            <div className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
            <div className="absolute top-[45%] left-[35%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogGrid posts={sortedPosts} />
          </div>
        </section>

        <BlogCTA />
      </main>
      <Footer />
    </>
  );
}
