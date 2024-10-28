"use client";
import "./innerListTabs.css";
import { useParams, usePathname } from "next/navigation";
import { InnerTabProps } from "@/app/lib/types";
import InnerTab from "../atoms/InnerTab";

function InnerListTabs({ tabs }: { tabs: InnerTabProps[] }) {
  const actualRoute = usePathname();
  const params = useParams();

  return (
    <div className="inner-tabs-container">
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
