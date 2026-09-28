import Link from "next/link";
import { Dim } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import inner from "./inner.module.css";

export default function NotFound() {
  return (
    <section className={`${inner.pageHead} grid-paper`} style={{ minHeight: "80vh" }}>
      <div className="container">
        <p className="eyebrow">
          <b>404</b> Няма такава страница
        </p>
        <h1 className={inner.title}>Тук още не сме строили.</h1>
        <Dim label="404 · страницата не е намерена" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
          <Link href="/" className="btn btn-accent">
            Към началото <ArrowRight className="btn-arrow" />
          </Link>
          <Link href="/proekti" className="btn btn-ghost">
            Проекти
          </Link>
        </div>
      </div>
    </section>
  );
}
