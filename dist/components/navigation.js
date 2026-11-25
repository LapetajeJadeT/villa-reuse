import { getActiveUser } from "../data/profileData.js";
export function syncNavigation(user) {
    const activeUser = user || getActiveUser();
    // 1. Sync Header Avatar & Balance
    const avatarEl = document.querySelector(".header .avatar");
    if (avatarEl) {
        avatarEl.textContent = activeUser.initials;
        avatarEl.title = `${activeUser.name} (${activeUser.role}) · Click to open Profile`;
        avatarEl.style.cursor = "pointer";
        avatarEl.onclick = () => {
            window.location.href = "profile.html";
        };
    }
    const balanceEl = document.getElementById("header-balance") || document.getElementById("coin-balance");
    if (balanceEl) {
        balanceEl.textContent = String(activeUser.coins);
    }
    // 2. Role-based Navigation Access Control:
    // ONLY Community Moderator can see the Moderation link in sidebar
    const modLinks = document.querySelectorAll('a[href="moderation.html"], [data-nav="moderation"]');
    modLinks.forEach((el) => {
        if (activeUser.role === "Community Moderator") {
            el.style.display = "flex";
        }
        else {
            el.style.display = "none";
        }
    });
    // ONLY System Administrator can see the Admin link in sidebar
    const adminLinks = document.querySelectorAll('a[href="admin.html"], [data-nav="admin"]');
    adminLinks.forEach((el) => {
        if (activeUser.role === "System Administrator") {
            el.style.display = "flex";
        }
        else {
            el.style.display = "none";
        }
    });
    const notifBtn = document.querySelector('.header [aria-label*="notification" i], .header .icon-btn, .header .notif-btn, .header .notification-btn, [data-notifications]');
    if (notifBtn) {
        notifBtn.style.cursor = "pointer";
        notifBtn.onclick = (event) => {
            event.preventDefault();
            const panel = document.getElementById("notifications-panel");
            if (panel) {
                panel.hidden = !panel.hidden;
                if (!panel.hidden) {
                    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            }
            else {
                window.location.href = "profile.html#notifications";
            }
        };
    }
    return activeUser;
}
