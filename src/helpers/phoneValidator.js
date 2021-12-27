export function phoneValidator(phone) {
    const re = /((^0|^84|^\+84|^\(\+84\))+([0-9]{2}))+([0-9]{7}|[0-9]{1}\.[0-9]{3}\.[0-9]{3}|[0-9]{1}-[0-9]{3}-[0-9]{3}|[0-9]{1}\s[0-9]{3}\s[0-9]{3}$)/
    if (!phone) return "Số điện thoại không được bỏ trống."
    if (!re.test(phone)) return 'Số điện thoại không đúng định dạng.'
    return ''
}