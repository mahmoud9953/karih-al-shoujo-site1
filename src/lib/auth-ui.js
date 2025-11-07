// src/lib/auth-ui.js
import { auth } from "./firebase.js"; // <-- same folder, no leading slash
import { onAuthStateChanged, signOut } from "firebase/auth";

if (typeof window !== "undefined") {
  const authLink = document.getElementById("authLink");
  const authAvatar = document.getElementById("authAvatar");
  const authMenu = document.getElementById("authMenu");
  const authMenuBtn = document.getElementById("authMenuBtn");
  const authMenuList = document.getElementById("authMenuList");
  const signOutBtn = document.getElementById("signOutBtn");

  function setSignedOut() {
    if (authAvatar) authAvatar.style.display = "none";
    if (authMenu) authMenu.style.display = "none";
    if (authLink) {
      authLink.href = "/login";
      authLink.className = "btn btn-ghost";
      authLink.textContent = "تسجيل الدخول";
      authLink.style.display = "inline-flex";
    }
  }

  function setSignedIn(user) {
    if (authLink) {
      authLink.textContent = user.displayName || user.email || "حسابي";
      authLink.href = "/";
      authLink.className = "btn btn-ghost";
      authLink.style.display = "inline-flex";
    }
    if (authAvatar) {
      const url =
        user.photoURL ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(user.displayName || "User");
      authAvatar.src = url;
      authAvatar.alt = "avatar";
      authAvatar.style.display = "inline-block";
    }
    if (authMenu) authMenu.style.display = "inline-block";
    if (location.pathname === "/login") window.location.replace("/");
  }

  onAuthStateChanged(auth, (user) => {
    if (user) setSignedIn(user);
    else setSignedOut();
  });

  authMenuBtn?.addEventListener("click", () => {
    if (!authMenuList) return;
    const vis = authMenuList.style.display === "block";
    authMenuList.style.display = vis ? "none" : "block";
  });

  signOutBtn?.addEventListener("click", async () => {
    await signOut(auth);
    setSignedOut();
    window.location.href = "/";
  });

  document.addEventListener("click", (e) => {
    if (!authMenu || !authMenuList) return;
    if (!authMenu.contains(e.target)) authMenuList.style.display = "none";
  });
}
