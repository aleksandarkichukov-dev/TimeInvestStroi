import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/content/site";
import { privacyBlocks } from "@/content/privacy";
import inner from "../inner.module.css";
import s from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Политика за поверителност",
  description: `Политика за поверителност на ${site.legalName}.`,
  alternates: { canonical: "/politika-za-poveritelnost" },
};

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className={`${inner.pageHead} grid-paper`}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Политика за поверителност" }]} />
          <h1 className={`${s.title} h1-in`}>Политика за поверителност</h1>
        </div>
      </section>
      <section className="section-tight">
        <div className={`container prose ${s.body}`}>
          {privacyBlocks.map((block, i) => ("h" in block ? <h2 key={i}>{block.h}</h2> : <p key={i}>{block.p}</p>))}
        </div>
      </section>
    </PageTransition>
  );
}
