import React, { createContext, useContext, useState, useEffect } from "react";
import { EMPLOYEES } from "../../data";

const AuthContext = createContext(null);
const STORAGE_KEY = "pia_ams_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    const normalized = email.trim().toLowerCase();
    const record = EMPLOYEES.find(
      (e) => Array.isArray(e.emails) && e.emails.some((em) => em.toLowerCase() === normalized)
    );

    if (!record) {
      return { ok: false, error: "Incorrect email or password." };
    }
    // Employee exists but was never given portal access (no password/role set)
    if (!record.password || !record.role) {
      return { ok: false, error: "This account doesn't have portal access. Contact your administrator." };
    }
    if (record.password !== password) {
      return { ok: false, error: "Incorrect email or password." };
    }

    const { password: _pw, ...safeUser } = record; // don't keep password in state/storage
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  // Prototype only: mutates the in-memory EMPLOYEES record directly since
  // there's no backend. This resets whenever the app reloads from source —
  // good enough to demo the flow, not for anything real.
  function changePassword(currentPassword, newPassword) {
    if (!user) return { ok: false, error: "You're not signed in." };
    const record = EMPLOYEES.find((e) => e.id === user.id);
    if (!record || record.password !== currentPassword) {
      return { ok: false, error: "Current password is incorrect." };
    }
    if (!newPassword || newPassword.length < 6) {
      return { ok: false, error: "New password must be at least 6 characters." };
    }
    record.password = newPassword;
    return { ok: true };
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}