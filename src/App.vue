<script setup lang="ts">
import { Dark } from 'quasar'
import { useVariablesStore } from './stores/variables'
import { useTelegramNavigation } from './composables/useTelegramNavigation'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
const store = useVariablesStore()
async function listenDark() {
  if (isDark.value)
    Dark.set(true)
  else Dark.set(false)
}

// Telegram Web App ma'lumotlarini localStorage'ga saqlash
const saveUserToLocalStorage = () => {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    const userData = webApp.initDataUnsafe?.user;

    if (userData) {
      localStorage.setItem('telegram_user', JSON.stringify(userData));
      webApp.expand();
    } else {
      console.log('Foydalanuvchi ma\'lumotlari mavjud emas');
    }
  } else {
    console.log('Telegram WebApp mavjud emas');
  }
};

onMounted(() => {
  listenDark()
  saveUserToLocalStorage()

})
useTelegramNavigation()
</script>

<template>
  <RouterView />
  <q-inner-loading :showing="store.overlay" z-100000>
    <q-spinner-cube color="red" size="3em" />
  </q-inner-loading>
</template>
