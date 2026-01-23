export const AUTH_STORAGE_KEY = "auth_state";
export const AUTH_USER_KEY = "auth_user";
export const AUTH_EVENT = "auth-change";

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "logged_in";
};

export const getAuthUser = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_USER_KEY);
};

export const setAuthSession = (username: string): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, "logged_in");
  window.localStorage.setItem(AUTH_USER_KEY, username);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuthSession = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};
