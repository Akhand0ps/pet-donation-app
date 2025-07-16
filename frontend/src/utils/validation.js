export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateAmount = (amount) => {
  const numAmount = Number.parseFloat(amount)
  return !isNaN(numAmount) && numAmount > 0
}

export const validateRequired = (value) => {
  return value && value.trim().length > 0
}
