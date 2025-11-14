"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import en from "@/locales/en.json";
import es from "@/locales/es.json";

import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

const translations = {
  en,
  es,
} as const;

type SupportedLanguage = keyof typeof translations;

type LandingCopy = (typeof translations)[SupportedLanguage]["landing"];

const featureIcons = [
  "globe",
  "window",
  "file",
] as const;

function resolveIcon(index: number) {
  const iconName = featureIcons[index % featureIcons.length];
  return `/` + iconName + `.svg`;
}

export function LandingPage() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const copy: LandingCopy = useMemo(() => translations[language].landing, [language]);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const copyright = copy.footer.copyright.replace("{{year}}", String(currentYear));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-[21.25rem] w-[68.75rem] rounded-full bg-gradient-to-br from-blue-500/70 via-indigo-500/70 to-cyan-400/60 opacity-40" />
        </div>

        <header className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-16 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-base font-bold text-slate-50 shadow-lg">
              {copy.brand.slice(0, 1)}
            </span>
            <span>{copy.brand}</span>
          </div>
          <nav className="flex flex-1 flex-wrap items-center justify-center gap-6 text-sm text-slate-200 sm:justify-end">
            <Link href="#product" className="transition hover:text-white">
              {copy.nav.product}
            </Link>
            <Link href="#features" className="transition hover:text-white">
              {copy.nav.pricing}
            </Link>
            <Link href="#resources" className="transition hover:text-white">
              {copy.nav.resources}
            </Link>
            <Link href="#contact" className="transition hover:text-white">
              {copy.nav.contact}
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/50 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
              <span>{copy.language.label}</span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { code: "en", label: copy.language.english },
                    { code: "es", label: copy.language.spanish },
                  ] as const
                ).map((item) => {
                  const active = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage(item.code)}
                      className={`rounded-full px-3 py-1 font-medium transition ${
                        active ? "bg-slate-50 text-slate-900" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </header>

        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 pb-24">
          <section id="product" className="grid gap-12 pb-12 pt-10 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div className="flex flex-col gap-8">
              <span className="w-fit rounded-full bg-slate-900/80 px-4 py-1 text-sm font-medium text-blue-200 shadow-md">
                {copy.hero.tagline}
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
                {copy.hero.title}
              </h1>
              <p className="text-lg text-slate-200 md:text-xl">
                {copy.hero.subtitle}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <PrimaryButton label={copy.hero.primaryCta} />
                <SecondaryButton label={copy.hero.secondaryCta} />
              </div>
              <dl className="grid gap-6 sm:grid-cols-3">
                {copy.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow">
                    <dt className="text-sm text-slate-400">{stat.label}</dt>
                    <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative hidden h-full items-center justify-center rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/60 p-10 shadow-2xl lg:flex">
              <div className="absolute -top-8 right-12 rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-widest text-slate-300 shadow">
                {copy.nav.resources}
              </div>
              <Image src="/globe.svg" alt="Product preview" width={280} height={280} className="opacity-80" />
            </div>
          </section>

          <section id="features" className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                {copy.nav.product}
              </span>
              <h2 className="text-pretty text-3xl font-semibold text-white md:text-4xl">
                {copy.features.title}
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {copy.features.items.map((feature, index) => (
                <article key={feature.title} className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition hover:-translate-y-1 hover:border-blue-400/60 hover:bg-slate-900/80">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950/60 shadow-inner">
                    <Image src={resolveIcon(index)} alt="" width={28} height={28} className="opacity-80" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="resources" className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-xl lg:grid-cols-[1fr,1.2fr]">
            <div className="flex flex-col gap-6">
              <h2 className="text-pretty text-3xl font-semibold text-white md:text-4xl">{copy.testimonials.title}</h2>
              <p className="text-lg leading-relaxed text-slate-200">{copy.testimonials.quote}</p>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{copy.testimonials.author}</span>
                <span className="text-sm text-slate-400">{copy.testimonials.role}</span>
              </div>
            </div>
            <dl className="grid gap-6">
              <dt className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">{copy.faqs.title}</dt>
              {copy.faqs.items.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
                  <dt className="text-base font-semibold text-white">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contact" className="rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 p-10 shadow-2xl">
            <div className="flex flex-col gap-6 text-white md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-4">
                <h2 className="text-3xl font-semibold md:text-4xl">{copy.cta.title}</h2>
                <p className="text-base text-white/80">{copy.cta.description}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PrimaryButton label={copy.cta.primaryCta} />
                <SecondaryButton label={copy.cta.secondaryCta} />
              </div>
            </div>
          </section>
        </main>

        <footer className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12 pt-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>{copyright}</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#privacy" className="transition hover:text-white">
              {copy.footer.privacy}
            </Link>
            <Link href="#terms" className="transition hover:text-white">
              {copy.footer.terms}
            </Link>
            <Link href="#status" className="transition hover:text-white">
              {copy.footer.status}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;


