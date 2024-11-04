"use client";
import "./innerListTabs.css";
import { InnerTabProps } from "@/app/lib/types";
import InnerTab from "../atoms/InnerTab";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function InnerListTabs({ tabs }: { tabs: InnerTabProps[] }) {
  const actualRoute = usePathname();
  const params = useParams();
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      const targetElement = container.current?.querySelector("#selected");
      targetElement?.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <div className="inner-tabs-container" ref={container}>
      {tabs.map((t, index: number) => {
        return (
          <InnerTab
            key={index}
            name={t.name}
            id={t.id}
            root={actualRoute.split("/").slice(0, -1).join("/")}
            selected={params.companyId == t.id}
          />
        );
      })}
    </div>
  );
}

export default InnerListTabs;
