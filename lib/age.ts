export const AGE_KEY = "ageVerified";

export function isAgeVerified(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AGE_KEY) === "true";
}

export function setAgeVerified(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) {
    window.localStorage.setItem(AGE_KEY, "true");
  } else {
    window.localStorage.removeItem(AGE_KEY);
  }
}

export function clearAgeVerified() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AGE_KEY);
  }
}
