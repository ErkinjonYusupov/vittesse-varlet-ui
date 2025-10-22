export default function useFormRules() {
  const { t } = useI18n()
  return {
    required:
      (message = '') =>
        (val: any) => {
          return !!val || message || t('tr62')
        },
    isDate:
      (message = '') =>
        (val: any) => {
          return !!val || message || t('tr62')
        },
    min:
      (length: number, message = '') =>
        (val: any) => {
          return (
            val.length >= length
            || message
            || t('tr61', { count: length })
          )
        },
    max:
      (length: number, message = '') =>
        (val: any) => {
          return (
            val.length <= length
            || message
            || t('tr63', { count: length })
          )
        },
    notNol:
      (length?: number, message = '') =>
        (val: any) => {
          return (
            val > 0 || message || t('tr64')
          )
        },
    minDate:
      (date: Date, message = '') =>
        (val: any) => {
          return (
            val.date > date
            || message
            || t('tr64')
          )
        },
    isEqual: (message: string, comparingValue: any) => (val: any) => {
      return val === comparingValue || message || 'Bu maydon to\'ldirishi shart'
    },
    notMinus:
      (length?: number, message = '') =>
        (val: any) => {
          return val >= 0 || message || 'Bu maydon musbat son bo\'lishi kerak'
        },
    // Yangi qoida: isValidBrithday
    isValidBirthday:
      (message = '') =>
        (val: any) => {
        // 1. Sana bo'sh bo'lmasligini tekshirish
          if (!val) {
            return message || t('tr62')
          }

          // 2. Sana DD-MM-YYYY formatida ekanligini tekshirish
          if (!/^\d{2}-\d{2}-\d{4}$/.test(val)) {
            return message || t('tr67')
          }

          // 3. Sanani Date obyektiga aylantirish
          const [day, month, year] = val.split('-').map(Number)
          const date = new Date(year, month - 1, day) // Oy 0 dan boshlanadi

          // 4. Sananing to'g'ri ekanligini tekshirish
          const isValidDate
          = date.getFullYear() === year
            && date.getMonth() === month - 1
            && date.getDate() === day

          if (!isValidDate) {
            return message || t('tr68')
          }

          // 5. Bugungi kundan keyingi sanani rad etish
          const today = new Date()
          if (date > today) {
            return message || t('tr69')
          }

          // Agar barcha shartlar bajarilgan bo'lsa, true qaytariladi
          return true
        },
  }
}
