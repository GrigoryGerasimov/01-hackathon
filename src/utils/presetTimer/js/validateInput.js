export const validateInput = input => {
    if (!input.includes(':')) {
        alert('Please provide the required time in correct format!')
        return false
    } else if (isNaN(Number(input.slice(0, input.indexOf(':'))))
        || isNaN(Number(input.slice(input.indexOf(':')+1)))) {
        alert('Please provide the minutes and seconds correctly as time!')
        return false
    }
    return true
}