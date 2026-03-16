"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Droplets, Recycle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const SYSTEM_COST = 2500;

function AnimatedNumber({
  value,
  prefix = "$",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  decimals?: number;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 25 });
  const display = useTransform(spring, (v) => {
    const num = Math.max(0, v);
    if (decimals > 0) {
      return `${prefix}${num.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`;
    }
    return `${prefix}${Math.round(num).toLocaleString("en-US")}`;
  });

  motionVal.set(value);

  return <motion.span>{display}</motion.span>;
}

function BarChart({
  bottledCosts,
  aquafeelCost,
  labels,
  bottledLabel,
}: {
  bottledCosts: number[];
  aquafeelCost: number;
  labels: string[];
  bottledLabel: string;
}) {
  const maxVal = Math.max(...bottledCosts, aquafeelCost);

  return (
    <div className="space-y-5">
      {labels.map((label, i) => {
        const bottled = bottledCosts[i];
        const bottledPct = maxVal > 0 ? (bottled / maxVal) * 100 : 0;
        const aquaPct = maxVal > 0 ? (aquafeelCost / maxVal) * 100 : 0;

        return (
          <div key={label} className="space-y-2">
            <p className="font-heading text-sm font-semibold text-[var(--color-text-primary)]">
              {label}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-body text-[var(--color-text-muted)] w-20 shrink-0">
                {bottledLabel}
              </span>
              <div className="flex-1 h-7 bg-[var(--color-surface-alt)] rounded-md overflow-hidden">
                <motion.div
                  className="h-full rounded-md flex items-center justify-end pr-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(bottledPct, 3)}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <span className="text-white text-[10px] font-heading font-bold whitespace-nowrap">
                    ${bottled.toLocaleString()}
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-body text-[var(--color-text-muted)] w-20 shrink-0">
                Aquafeel
              </span>
              <div className="flex-1 h-7 bg-[var(--color-surface-alt)] rounded-md overflow-hidden">
                <motion.div
                  className="h-full rounded-md flex items-center justify-end pr-2"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent) 0%, var(--color-secondary-light) 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(aquaPct, 3)}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.15 + 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <span className="text-white text-[10px] font-heading font-bold whitespace-nowrap">
                    Aquafeel
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SavingsCalculator() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [bottles, setBottles] = useState(24);
  const [costPerBottle, setCostPerBottle] = useState(1.5);

  const calcs = useMemo(() => {
    const weekly = bottles * costPerBottle;
    const monthly = weekly * 4.33;
    const yearly = monthly * 12;
    const fiveYear = yearly * 5;
    const tenYear = yearly * 10;
    const yearSavings = yearly - SYSTEM_COST;
    const fiveYearSavings = fiveYear - SYSTEM_COST;
    const tenYearSavings = tenYear - SYSTEM_COST;
    const bottlesPerYear = bottles * 52;

    return {
      weekly,
      monthly,
      yearly,
      fiveYear,
      tenYear,
      yearSavings,
      fiveYearSavings,
      tenYearSavings,
      bottlesPerYear,
    };
  }, [bottles, costPerBottle]);

  const bestSavings = Math.max(0, calcs.tenYearSavings);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background with water texture */}
      <div className="absolute inset-0 bg-[var(--color-surface)]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(/images/water/water-droplet.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] via-transparent to-[var(--color-surface)] pointer-events-none" />
      <div
        className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-secondary-light) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full opacity-[0.03] pointer-events-none animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-heading text-sm tracking-[0.15em] uppercase text-[var(--color-secondary)] font-semibold mb-3">
            {t.calculator.sectionLabel}
          </p>
          <h2
            className="font-heading font-extrabold text-[var(--color-text-primary)] mb-4"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {t.calculator.headline}
          </h2>
          <p className="font-body text-[var(--color-text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            {t.calculator.description}
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 rounded-2xl p-[1.5px] pointer-events-none">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-secondary-light), var(--color-accent-light), var(--color-primary-light))",
                opacity: 0.35,
              }}
            />
          </div>

          <div className="relative bg-white rounded-2xl border border-[var(--color-border)] shadow-lg">
            <div className="grid lg:grid-cols-2 gap-0 lg:gap-px">
              {/* Left: Inputs */}
              <div className="p-6 sm:p-8 lg:p-10">
                <h3 className="font-heading font-bold text-lg text-[var(--color-text-primary)] mb-8">
                  {t.calculator.usageTitle}
                </h3>

                {/* Bottles per week slider */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                      {t.calculator.bottlesPerWeek}
                    </label>
                    <span className="font-heading font-bold text-lg text-[var(--color-primary)]">
                      {bottles}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={bottles}
                    onChange={(e) => setBottles(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-secondary-light) 0%, var(--color-secondary-light) ${
                        ((bottles - 1) / 99) * 100
                      }%, var(--color-border) ${
                        ((bottles - 1) / 99) * 100
                      }%, var(--color-border) 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-body text-[var(--color-text-muted)]">
                      1
                    </span>
                    <span className="text-xs font-body text-[var(--color-text-muted)]">
                      100
                    </span>
                  </div>
                </div>

                {/* Cost per bottle */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-body text-sm font-medium text-[var(--color-text-secondary)]">
                      {t.calculator.costPerBottle}
                    </label>
                    <div className="flex items-center gap-1">
                      <span className="font-heading font-bold text-lg text-[var(--color-primary)]">
                        ${costPerBottle.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0.25}
                    max={5}
                    step={0.25}
                    value={costPerBottle}
                    onChange={(e) => setCostPerBottle(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-secondary-light) 0%, var(--color-secondary-light) ${
                        ((costPerBottle - 0.25) / 4.75) * 100
                      }%, var(--color-border) ${
                        ((costPerBottle - 0.25) / 4.75) * 100
                      }%, var(--color-border) 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-body text-[var(--color-text-muted)]">
                      $0.25
                    </span>
                    <span className="text-xs font-body text-[var(--color-text-muted)]">
                      $5.00
                    </span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 border-t border-[var(--color-border)] pt-6">
                  <h4 className="font-heading font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                    {t.calculator.costBreakdownTitle}
                  </h4>
                  {[
                    { label: t.calculator.weekly, value: calcs.weekly },
                    { label: t.calculator.monthly, value: calcs.monthly },
                    { label: t.calculator.yearly, value: calcs.yearly },
                    { label: t.calculator.fiveYears, value: calcs.fiveYear },
                    { label: t.calculator.tenYears, value: calcs.tenYear },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <span className="font-body text-sm text-[var(--color-text-secondary)]">
                        {item.label}
                      </span>
                      <span className="font-heading font-bold text-[var(--color-text-primary)]">
                        <AnimatedNumber value={item.value} decimals={2} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Results */}
              <div className="p-6 sm:p-8 lg:p-10 bg-[var(--color-surface)] rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl">
                {/* Savings highlight */}
                <div className="text-center mb-8">
                  <p className="font-heading text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wider mb-2">
                    {t.calculator.savingsTitle}
                  </p>
                  <div className="relative inline-block">
                    <motion.div
                      className="font-heading font-extrabold text-[var(--color-primary)]"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                    >
                      <AnimatedNumber value={bestSavings} />
                    </motion.div>
                    <AnimatePresence>
                      {bestSavings > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute -top-2 -right-8 bg-emerald-500 text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded-full"
                        >
                          {t.calculator.saved}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="font-body text-sm text-[var(--color-text-muted)] mt-1">
                    {t.calculator.savingsSubtitle}
                  </p>
                </div>

                {/* Environmental impact */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[var(--color-border)] mb-8"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-light)]/10 flex items-center justify-center shrink-0">
                    <Recycle className="w-6 h-6 text-[var(--color-accent-dark)]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-lg text-[var(--color-text-primary)]">
                      <AnimatedNumber
                        value={calcs.bottlesPerYear}
                        prefix=""
                      />{" "}
                      {t.calculator.bottles}
                    </p>
                    <p className="font-body text-sm text-[var(--color-text-muted)]">
                      {t.calculator.bottlesSavedPerYear}
                    </p>
                  </div>
                </motion.div>

                {/* Bar chart comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <h4 className="font-heading font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-wider mb-5">
                    {t.calculator.costComparison}
                  </h4>
                  <BarChart
                    bottledCosts={[
                      Math.round(calcs.yearly),
                      Math.round(calcs.fiveYear),
                      Math.round(calcs.tenYear),
                    ]}
                    aquafeelCost={SYSTEM_COST}
                    labels={[t.calculator.oneYear, t.calculator.fiveYears, t.calculator.tenYears]}
                    bottledLabel={t.calculator.bottled}
                  />
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-8"
                >
                  <motion.a
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-colors duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Droplets className="w-5 h-5" />
                    {t.calculator.ctaButton}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slider thumb styling */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-secondary-light);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-secondary-light);
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
