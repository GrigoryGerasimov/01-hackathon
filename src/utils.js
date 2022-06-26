export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getMenuSize(elem, param, desiredVal) {
  return (getComputedStyle(elem)[param] !== 'auto') ? parseInt(getComputedStyle(elem)[param]) : desiredVal
}