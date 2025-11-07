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
} // <-- closes the if (typeof window !== "undefined") block
