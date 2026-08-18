import {
  Home,
  Plus,
  Target,
  History,
  BarChart3,
} from "lucide-react";

export type Page =
  | "dashboard"
  | "goal"
  | "new-farm"
  | "history"
  | "reports";

interface BottomNavigationProps {
  page: Page;
  onChange: (page: Page) => void;
}

export function BottomNavigation({
  page,
  onChange,
}: BottomNavigationProps) {
  const items = [
    {
      id: "dashboard" as const,
      label: "Início",
      icon: Home,
    },
    {
      id: "goal" as const,
      label: "Meta",
      icon: Target,
    },
    {
      id: "new-farm" as const,
      label: "Farm",
      icon: Plus,
    },
    {
      id: "history" as const,
      label: "Histórico",
      icon: History,
    },
    {
      id: "reports" as const,
      label: "Relatório",
      icon: BarChart3,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl justify-around">
        {items.map((item) => {
          const Icon = item.icon;

          const active = page === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs ${
                active
                  ? "text-violet-400"
                  : "text-zinc-500"
              }`}
            >
              <Icon size={21} />

              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}