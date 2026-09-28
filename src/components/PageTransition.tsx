import { ViewTransition, type ReactNode } from "react";

// Обвива съдържанието на всяка страница. При навигация с тип „curtain“ старата страница
// остава видима, докато завесата покрие екрана, а новата се показва, когато завесата се вдигне.
// При тип „morph“ (от карта на проект) снимката „отлита“, а останалото съдържание влиза отдолу.
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ curtain: "page-curtain", morph: "page-fade", default: "none" }}
      exit={{ curtain: "page-curtain", morph: "page-fade", default: "none" }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
