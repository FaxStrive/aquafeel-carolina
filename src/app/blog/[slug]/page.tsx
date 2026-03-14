"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/blog/posts";
import { useI18n } from "@/lib/i18n/context";

/* ─────────────────── HERO ─────────────────── */

function PostHero({ post }: { post: BlogPost }) {
  const { t, locale } = useI18n();
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
      className="relative min-h-[440px] flex items-center overflow-hidden"
    >
      {/* Gradient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.07, 0.13, 0.07],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-5%] right-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.05, 0.95, 1.05],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 text-white/50 text-sm font-body mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-white/80 transition-colors">
            {t.blogPage.breadcrumbHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-white/80 transition-colors">
            {t.blogPage.breadcrumbBlog}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/80 line-clamp-1">{post.title}</span>
        </motion.nav>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan font-heading font-semibold text-xs uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] max-w-3xl"
          >
            {post.title}
          </motion.h1>
        </div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center gap-5 mt-6 text-sm text-white/60 font-body"
        >
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}

/* ─────────────────── POST IMAGE ─────────────────── */

function PostImage({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      ref={ref}
      className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-navy/10"
      >
        <div className="relative h-[280px] sm:h-[380px] lg:h-[460px] overflow-hidden">
          <motion.div style={{ y: imageY }} className="absolute inset-[-40px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────── CONTENT AREA ─────────────────── */

function PostContent({ post }: { post: BlogPost }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="relative py-8 sm:py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-surface)] to-white" />
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[20%] left-[8%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)] opacity-[0.03]" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog link */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-brand-cyan hover:gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blogPage.backToAllArticles}
          </Link>
        </div>
      </motion.div>

      {/* Content typography styles */}
      <style jsx global>{`
        .blog-content h3 {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.4;
          color: var(--color-text-primary);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .blog-content p {
          font-family: var(--font-body);
          color: var(--color-text-secondary);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }

        .blog-content ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.25rem;
        }

        .blog-content ul li {
          font-family: var(--font-body);
          color: var(--color-text-secondary);
          line-height: 1.75;
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 0.75rem;
        }

        .blog-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #06b6d4;
        }

        .blog-content ul li strong {
          color: var(--color-text-primary);
          font-weight: 600;
        }

        .blog-content a {
          color: #06b6d4;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: #0e7490;
        }
      `}</style>
    </section>
  );
}

/* ─────────────────── RELATED POSTS ─────────────────── */

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const related = getRelatedPosts(currentSlug, 3);

  if (related.length === 0) return null;

  return (
    <section ref={ref} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] opacity-[0.03]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)] opacity-[0.04]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block font-heading font-semibold text-sm uppercase tracking-wider text-brand-cyan mb-3">
            {t.blogPage.keepReading}
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[var(--color-text-primary)]">
            {t.blogPage.relatedArticles}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {related.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] h-full hover:shadow-xl hover:shadow-brand-cyan/5 hover:-translate-y-1 transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-primary)] font-heading font-semibold text-xs uppercase tracking-wider">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] font-body mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[var(--color-text-primary)] leading-snug group-hover:text-brand-navy-light transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-brand-cyan group-hover:gap-3 transition-all duration-300">
                        {t.blogPage.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── POST CTA ─────────────────── */

function PostCTA() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-secondary-dark)]" />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.07, 0.13, 0.07],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-5 right-[12%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-secondary-light),transparent_70%)]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-5 left-[8%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,var(--color-accent-light),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            {t.blogPage.postCtaHeadlinePre}{" "}
            <span className="text-brand-cyan">{t.blogPage.postCtaHeadlineHighlight}</span>
          </h2>
          <p className="font-body text-white/70 text-lg sm:text-xl mt-5 max-w-2xl mx-auto leading-relaxed">
            {t.blogPage.postCtaDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
            >
              {t.blogPage.postCtaButton}
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

/* ─────────────────── NOT FOUND ─────────────────── */

function PostNotFound() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-white" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-4">
          {t.blogPage.postNotFoundTitle}
        </h1>
        <p className="font-body text-[var(--color-text-secondary)] text-lg mb-8 max-w-md mx-auto">
          {t.blogPage.postNotFoundDescription}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-heading font-semibold text-sm hover:bg-[var(--color-primary-light)] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.blogPage.backToBlog}
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Header />
        <main>
          <PostNotFound />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <PostHero post={post} />
        <PostImage post={post} />
        <PostContent post={post} />
        <RelatedPosts currentSlug={slug} />
        <PostCTA />
      </main>
      <Footer />
    </>
  );
}
