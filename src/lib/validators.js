/**
 * Form Validation Functions
 * Simple validators for user input
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { valid: boolean, message: string }
 */
export function isValidPassword(password) {
  if (!password || password.length < 6) {
    return {
      valid: false,
      message: 'Password must be at least 6 characters',
    };
  }
  return { valid: true, message: '' };
}

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} Is valid
 */
export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate age range
 * @param {number} age - Age to validate
 * @returns {Object} { valid: boolean, message: string }
 */
export function isValidAge(age) {
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
    return {
      valid: false,
      message: 'Please enter a valid age (16-100)',
    };
  }
  return { valid: true, message: '' };
}

/**
 * Validate budget amount
 * @param {number} budget - Budget to validate
 * @returns {Object} { valid: boolean, message: string }
 */
export function isValidBudget(budget) {
  const budgetNum = parseInt(budget);
  if (isNaN(budgetNum) || budgetNum < 500) {
    return {
      valid: false,
      message: 'Budget must be at least ₦500',
    };
  }
  return { valid: true, message: '' };
}
