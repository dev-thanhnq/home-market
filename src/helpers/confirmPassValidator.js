export function confirmPassValidator(confirmPassword, newPassword) {
    if (newPassword && !confirmPassword) return "Xác nhận mật khẩu"
    if (newPassword && (newPassword !== confirmPassword)) return 'Mật khẩu không chính xác'
    return ''
}