export const validateInput = input => {
    if (!input.includes(':')) {
        alert('Пожалуйста, введите данные в корректном формате!')
        return false
    } else if (isNaN(Number(input.slice(0, input.indexOf(':'))))
        || isNaN(Number(input.slice(input.indexOf(':')+1)))) {
        alert('К сожалению, параметры времени не были введены в числовом виде. Пожалуйста, попробуйте ещё раз!')
        return false
    }
    return true
}