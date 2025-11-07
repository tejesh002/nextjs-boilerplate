import { ReactNode } from "react";

type DashboardTemplateProps = {
  title: string;
  children: ReactNode;
};

export function DashboardTemplate({ title, children }: DashboardTemplateProps) {
  return (
    <main>
      <header>
        <h1>{title}</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}

