import { getActiveUser, ACTIVITY } from "./data/profileData.js";
import { renderProfile } from "./components/profileCard.js";
import { createActivityRow } from "./components/activityList.js";
import { syncNavigation } from "./components/navigation.js";
import { mountLogout } from "./components/auth.js";

function requireElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

function bootstrap(): void {
  const activeUser = getActiveUser();
  syncNavigation(activeUser);
  renderProfile(activeUser);
  mountLogout();


  const list = requireElement<HTMLUListElement>("activity-list");
  list.append(...ACTIVITY.map(createActivityRow));

 list.addEventListener("click", (event) => {
    const row = (event.target as HTMLElement).closest<HTMLButtonElement>(".activity-row");
    if (!row || !row.dataset.id) return;

    if (row.dataset.id === "notifications") {
      const panel = document.getElementById("notifications-panel");
      if (panel) {
        panel.hidden = !panel.hidden;
      }
      return;
    }

    const routes: Record<string, string> = {
      donations: "donate.html",
      claims: "requests.html",
      favorites: "index.html",
      transactions: "impact.html",
    };

    const target = routes[row.dataset.id];
    if (target) {
      window.location.href = target;
    }
  });
  requireElement<HTMLButtonElement>("edit-profile").addEventListener("click", () => {
    alert(`Editing profile for ${activeUser.name} (${activeUser.role}).`);
  });
}

bootstrap();
