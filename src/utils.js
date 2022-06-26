export function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getMenuSize(elem, param, desiredVal) {
    return (getComputedStyle(elem)[param] !== 'auto') ? parseInt(getComputedStyle(elem)[param]) : desiredVal
}

export function colorRandom() {
    let color = '#'
    const HexadecimalValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < 6; i++) {
        color += HexadecimalValue[Math.floor(Math.random() * 16)];
    }
    return color
}