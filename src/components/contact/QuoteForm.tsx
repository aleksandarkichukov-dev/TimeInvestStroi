"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { quoteSteps, type QuoteChoiceId, type QuotePayload } from "@/content/quote";
import { site } from "@/content/site";
import { ArrowLeft, ArrowRight, Check } from "@/components/icons";
import s from "./QuoteForm.module.css";

type Choices = Record<QuoteChoiceId, string>;
const empty: Choices = { type: "", area: "", stage: "", timeline: "" };
const TOTAL = quoteSteps.length + 1;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<Choices>(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, status]);

  const choose = (id: QuoteChoiceId, value: string) => {
    setChoices((c) => ({ ...c, [id]: value }));
    setTimeout(() => setStep((st) => Math.min(st + 1, TOTAL - 1)), 220);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: QuotePayload = {
      ...choices,
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      startedAt: startedAt.current,
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/oferta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Възникна грешка при изпращането.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Възникна грешка при изпращането.");
    }
  };

  if (status === "sent") {
    return (
      <div className={s.form}>
        <div className={s.done} role="status">
          <span className={s.doneIcon}>
            <Check width={32} height={32} />
          </span>
          <h3 ref={heading} tabIndex={-1} className={s.stepTitle}>
            Благодарим! Запитването е изпратено.
          </h3>
          <p className="lead muted">
            Телефон:{" "}
            <a href={site.phoneHref} className="link-underline">
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    );
  }

  const current = quoteSteps[step];

  return (
    <div className={s.form}>
      <div className={s.progress} aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} data-done={i < step || undefined} data-active={i === step || undefined} />
        ))}
      </div>
      <p className="mono muted" aria-live="polite">
        Стъпка {step + 1} от {TOTAL}
      </p>

      {current ? (
        <fieldset key={current.id} className={s.step} aria-labelledby={`q-${current.id}`}>
          <h3 id={`q-${current.id}`} ref={heading} tabIndex={-1} className={s.stepTitle}>
            {current.title}
          </h3>
          <div className={s.options}>
            {current.options.map((opt) => (
              <label key={opt} className={s.option} data-selected={choices[current.id] === opt || undefined}>
                <input
                  type="radio"
                  name={current.id}
                  value={opt}
                  checked={choices[current.id] === opt}
                  onChange={() => choose(current.id, opt)}
                  className="sr-only"
                />
                <span>{opt}</span>
                <span className={s.optionMark} aria-hidden="true">
                  <Check width={16} height={16} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <form className={s.step} onSubmit={submit}>
          <h3 ref={heading} tabIndex={-1} className={s.stepTitle}>
            Как да се свържем с вас?
          </h3>
          <ul className={s.summary} aria-label="Вашият избор">
            {quoteSteps.map((q, i) => (
              <li key={q.id}>
                <button type="button" onClick={() => setStep(i)} title="Промени">
                  {choices[q.id] || "—"}
                </button>
              </li>
            ))}
          </ul>
          <div className={s.fields}>
            <label className={s.field}>
              <span>Име *</span>
              <input name="name" required autoComplete="name" minLength={2} maxLength={80} />
            </label>
            <label className={s.field}>
              <span>Телефон *</span>
              <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern={"[\\d\\s\\+\\-\\(\\)]{6,20}"} />
            </label>
            <label className={s.field}>
              <span>Имейл</span>
              <input name="email" type="email" autoComplete="email" maxLength={120} />
            </label>
            <label className={s.field}>
              <span>Местоположение на обекта</span>
              <input name="location" maxLength={120} placeholder="напр. Варна, м-ст Ален мак" />
            </label>
            <label className={`${s.field} ${s.full}`}>
              <span>Няколко думи за проекта</span>
              <textarea name="message" rows={4} maxLength={3000} />
            </label>
            {/* Скрито поле-капан за ботове. Хората не го виждат и не го попълват. */}
            <label className={s.trap} aria-hidden="true">
              Уебсайт
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <label className={`${s.consent} ${s.full}`}>
              <input type="checkbox" name="consent" required />
              <span>
                Съгласен съм личните ми данни да бъдат обработени, за да получа оферта, съгласно{" "}
                <Link href="/politika-za-poveritelnost" className="link-underline" target="_blank">
                  политиката за поверителност
                </Link>
                .
              </span>
            </label>
          </div>
          {status === "error" && (
            <p className={s.error} role="alert">
              {error} Можете да ни се обадите на <a href={site.phoneHref}>{site.phone}</a>.
            </p>
          )}
          <div className={s.submitRow}>
            <button type="submit" className="btn btn-accent" disabled={status === "sending"}>
              {status === "sending" ? "Изпращане…" : "Изпрати запитването"} <ArrowRight className="btn-arrow" />
            </button>
          </div>
        </form>
      )}

      {step > 0 && (
        <button type="button" className={s.back} onClick={() => setStep((st) => st - 1)}>
          <ArrowLeft width={16} height={16} /> Назад
        </button>
      )}
    </div>
  );
}
