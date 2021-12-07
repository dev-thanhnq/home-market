export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email không được bỏ trống."
  if (!re.test(email)) return 'Địa chỉ email không hợp lệ.'
  return ''
}
