import { auth, googleProvider } from './firebase.js';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export function setupLoginPage() {
  const $ = (sel) => document.querySelector(sel);
  const googleBtn = $('#googleBtn');
  const emailLogin = $('#emailLogin');
  const emailRegister = $('#emailRegister');
  const logoutBtn = $('#logoutBtn');
  const email = $('#email');
  const password = $('#password');
  const msg = $('#msg');

  const show = (t) => { msg.textContent = t || ''; };

  googleBtn?.addEventListener('click', async () => {
    show('جاري تسجيل الدخول...');
    try {
      await signInWithPopup(auth, googleProvider);
      show('تم تسجيل الدخول بنجاح ✅');
    } catch (e) {
      if (e.code === 'auth/operation-not-allowed') {
        show('مزود Google غير مُفعل في Firebase.');
      } else if (e.code === 'auth/unauthorized-domain') {
        show('يجب إضافة نطاق Vercel إلى Authorized Domains في Firebase.');
      } else {
        show('خطأ: ' + (e.message || e.code));
      }
      console.error(e);
    }
  });

  emailLogin?.addEventListener('click', async () => {
    show('...');
    try {
      await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
      show('تم تسجيل الدخول ✅');
    } catch (e) {
      show('خطأ: ' + (e.message || e.code));
      console.error(e);
    }
  });

  emailRegister?.addEventListener('click', async () => {
    show('...');
    try {
      await createUserWithEmailAndPassword(auth, email.value.trim(), password.value);
      show('تم إنشاء الحساب وتسجيل الدخول ✅');
    } catch (e) {
      show('خطأ: ' + (e.message || e.code));
      console.error(e);
    }
  });

  logoutBtn?.addEventListener('click', async () => {
    await signOut(auth);
    show('تم تسجيل الخروج.');
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      show('مسجّل دخول: ' + (user.email || user.displayName || 'مستخدم'));
    } else {
      show('');
    }
  });
}
