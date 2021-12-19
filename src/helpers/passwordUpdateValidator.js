export function passwordUpdateValidator(password) {
    if (password && password.length < 5) return 'Mật khẩu phải lớn hơn 5 kí tự.'
    return ''
}
