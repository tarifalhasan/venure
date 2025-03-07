import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

const tabs = [
  "Overview",
  "Space Size",
  "Details",
  "Features",
  "Packages",
  "Reviews",
];

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationTabs = ({
  activeTab,
  onTabChange,
}: NavigationTabsProps) => {
  const [activeSection, setActiveSection] = useState<string>(activeTab);

  useEffect(() => {
    // IntersectionObserver to detect which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe each section
    tabs.forEach((tab) => {
      const section = document.getElementById(tab);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setActiveSection(tab);

    // Smooth scroll to the section with the corresponding ID
    const section = document.getElementById(tab);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card className="mb-2">
      <CardContent className="flex flex-wrap md:flex-nowrap gap-4 p-3">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={"ghost"}
            onClick={() => handleTabClick(tab)}
            className={clsx(
              "px-4 py-2 text-sm font-medium",
              activeSection === tab
                ? "text-primary bg-gray-100 hover:bg-gray-200"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
