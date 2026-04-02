export const EXPECTED_NAME_B64 = "Z3Vs"; // "gul"
export const EXPECTED_DATE_B64 = "MDMvMDQvMjAwMw=="; // "03/04/2003"
export const MAX_ATTEMPTS = 5;

/**
 * Checks if the provided credentials match the encoded ones.
 */
export const login = (name, date) => {
  // Normalize inputs: lowercase name, trim spaces
  const normalizedName = name.trim().toLowerCase();
  const normalizedDate = date.trim();
  
  const encodedName = btoa(normalizedName);
  const encodedDate = btoa(normalizedDate);

  if (encodedName === EXPECTED_NAME_B64 && encodedDate === EXPECTED_DATE_B64) {
    localStorage.setItem('access_granted', 'true');
    return { success: true };
  } else {
    // Track attempts in session storage
    let attempts = parseInt(sessionStorage.getItem('auth_attempts') || '0', 10);
    attempts += 1;
    sessionStorage.setItem('auth_attempts', attempts.toString());
    
    if (attempts >= MAX_ATTEMPTS) {
      return { success: false, lockedOut: true };
    }
    return { success: false, lockedOut: false };
  }
};

/**
 * Checks if user is authenticated
 */
export const isAuthenticated = () => {
  return localStorage.getItem('access_granted') === 'true';
};

/**
 * Revokes access
 */
export const logout = () => {
  localStorage.removeItem('access_granted');
  sessionStorage.removeItem('auth_attempts');
};
