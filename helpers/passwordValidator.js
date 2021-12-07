export function passwordValidator(password) {
  if (!password) return "Mật khẩu không được bỏ trống."
  if (password.length < 5) return 'Mật khẩu phải lớn hơn 5 kí tự.'
  return ''
}
