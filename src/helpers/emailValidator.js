export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email không được bỏ trống."
    if (!re.test(email)) return 'Email không đúng định dạng.'
    return ''
}