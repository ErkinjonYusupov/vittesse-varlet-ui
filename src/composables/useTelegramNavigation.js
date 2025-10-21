import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export function useTelegramNavigation() {
  const WebApp = window.Telegram?.WebApp
  const router = useRouter()
  const isBackButtonVisible = ref(false)

  // Tugma holatini yangilash
  function updateButtonVisibility() {
    const isHomePage = router.currentRoute.value.path === '/'
    const hasHistory = window.history.length > 1

    if (isHomePage) {
      // Bosh sahifada BackButton yashiriladi, yopish tugmasi sahifa ichida boshqariladi
      isBackButtonVisible.value = false
      WebApp.BackButton.hide()
    }
    else if (hasHistory) {
      // Boshqa sahifalarda va orqa sahifa bo‘lsa: Orqaga tugmasi
      isBackButtonVisible.value = true
      WebApp.BackButton.show()
    }
    else {
      // Boshqa sahifalarda va orqa sahifa yo‘q: Hech qanday tugma ko‘rinmaydi
      isBackButtonVisible.value = false
      WebApp.BackButton.hide()
    }

    // MainButton har doim yashiriladi
    WebApp.MainButton.hide()
  }

  // BackButton bosilganda orqaga qaytish
  function handleBackButtonClick() {
    router.back()
  }

  onMounted(() => {
    if (!WebApp) {
      console.error('Telegram WebApp topilmadi')
      return
    }

    WebApp.ready()
    WebApp.BackButton.onClick(handleBackButtonClick)

    // Dastlabki holatni yangilash
    updateButtonVisibility()

    // Router o‘zgarishlarini kuzatish
    router.afterEach(() => {
      updateButtonVisibility()
    })

    // History o‘zgarishlarini kuzatish
    window.addEventListener('popstate', updateButtonVisibility)
  })

  onUnmounted(() => {
    if (WebApp) {
      WebApp.BackButton.offClick(handleBackButtonClick)
    }
    window.removeEventListener('popstate', updateButtonVisibility)
  })

  return {
    isBackButtonVisible,
    updateButtonVisibility,
  }
}
