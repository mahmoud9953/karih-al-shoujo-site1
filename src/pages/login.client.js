// src/pages/login.client.js
import { auth, googleProvider } from "/src/lib/firebase.js";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

if (typeof window !== "undefined") {
  const $ = (s) => document.querySelector(s);
  const googleBtn = $("#googleBtn");
  const emailLogin = $("#emailLogin");
  const emailRegister = $("#emailRegister");
  const logoutBtn = $("#logoutBtn");
  const email = $("#email");
  const password = $("#password");
  const msg = $("#msg");

  const show = (t) => {
    if (msg) msg.textContent = t || "";
  };

  googleBtn?.addEventListener("click", async () => {
    show("جاري تسجيل الدخول…");
    try {
      await signInWithPopup(auth, googleProvider);
      show("تم تسجيل الدخول ✅");
      window.location.assign("/"); // redirect to home
    } catch (e) {
      show(e?.message || e?.code || "حدث خطأ");
      console.error(e);
    }
  });

  emailLogin?.addEventListener("click", async () => {
    show("…");
    try {
      await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
      show("تم تسجيل الدخول ✅");
      window.location.assign("/"); // redirect to home
    } catch (e) {
      show(e?.message || e?.code || "حدث خطأ");
      console.error(e);
    }
  });

  emailRegister?.addEventListener("click", async () => {
    show("…");
    try {
      await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
      show("تم إنشاء الحساب ✅");
      window.location.assign("/"); // redirect to home
    } catch (e) {
      show(e?.message || e?.code || "حدث خطأ");
      console.error(e);
    }
  });

  logoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
    show("تم تسجيل الخروج.");
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (logoutBtn) logoutBtn.style.display = "inline-flex";
      show(`مرحبًا ${user.displayName || user.email}`);
      if (location.pathname === "/login") window.location.replace("/");
    } else {
      if (logoutBtn) logoutBtn.style.display = "none";
      show("");
    }
  });
}
