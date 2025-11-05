// src/lib/auth-ui.js
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const $ = (s) => document.querySelector(s);
const authLink   = $('#authLink');
const authAvatar = $('#authAvatar');
const authMenu   = $('#authMenu');
const menuBtn    = $('#authMenuBtn');
const menuList   = $('#authMenuList');
const signOutBtn = $('#signOutBtn');

function showSignedOut() {
  if (authLink) {
    authLink.textContent = 'تسجيل الدخول';
    authLink.href = '/login';
    authLink.onclick = null;
  }
  if (authAvatar) authAvatar.style.display = 'none';
  if (authMenu)   authMenu.style.display   = 'none';
}

function showSignedIn(user) {
  const name =
    user.displayName ||
    (user.email ? user.email.split('@')[0] : 'مستخدم');

  if (authLink) {
    authLink.textContent = name;
    authLink.href = '#';
    authLink.onclick = (e) => {
      e.preventDefault();
      if (menuList) {
        const open = menuList.style.display === 'block';
        menuList.style.display = open ? 'none' : 'block';
      }
    };
  }

  if (authAvatar) {
    authAvatar.src =
      user.photoURL ||
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" rx="32" fill="%23222"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%23bbb">🙂</text></svg>';
    authAvatar.style.display = 'inline-block';
  }

  if (authMenu) authMenu.style.display = 'inline-block';

  // close menu on outside click
  document.addEventListener('click', (ev) => {
    if (!authMenu.contains(ev.target)) {
      if (menuList) menuList.style.display = 'none';
    }
  });

  if (signOutBtn) {
    signOutBtn.onclick = async () => {
      await signOut(auth);
      location.replace('/'); // back home after sign out
    };
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    showSignedIn(user);
    if (location.pathname === '/login') {
      // already signed in? send home
      location.replace('/');
    }
  } else {
    showSignedOut();
  }
});
