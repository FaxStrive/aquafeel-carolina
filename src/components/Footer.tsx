"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useI18n();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/financing", label: t.nav.financing },
    { href: "/warranty", label: t.nav.warranty },
    { href: "/careers", label: t.nav.careers },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: t.nav.contact },
  ];

  const serviceLinks = [
    { href: "/services/city-water", label: t.services.cityWater },
    { href: "/services/reverse-osmosis", label: t.services.reverseOsmosis },
    { href: "/services/alkaline-ro", label: t.services.alkalineRo },
    { href: "/services/well-water", label: t.services.wellWater },
    { href: "/services/commercial", label: t.services.commercial },
    { href: "/services/water-testing", label: t.services.freeWaterTesting },
  ];

  return (
    <footer className="relative bg-[var(--color-primary-dark)] overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--color-primary-light)_0%,transparent_70%)] opacity-[0.06]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/client/logo-light.jpeg"
                alt="Aquafeel Solutions"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <span className="font-heading font-bold text-lg text-white">
                  Aquafeel
                </span>
                <span className="font-heading font-medium text-lg text-white/60 ml-1">
                  Solutions
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm font-body leading-relaxed max-w-xs mb-4">
              {t.footer.brandDescription}
            </p>
            {/* Veteran Operated Badge */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 w-fit">
              <Shield className="w-5 h-5 text-brand-cyan" />
              <span className="font-heading text-sm text-white/80 tracking-wider uppercase font-bold">
                {t.common.locallyOwnedBadge}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              {t.footer.company}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-brand-cyan text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-brand-cyan text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:9842123558"
                  className="flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm font-body transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {t.common.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:fahada@aquafeelsolutionsnc.com"
                  className="flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm font-body transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="break-all">{t.common.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/50 text-sm font-body">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {t.footer.servingArea}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/50 text-xs font-body transition-colors"
            >
              {t.footer.privacyPolicy}
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/50 text-xs font-body transition-colors"
            >
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
