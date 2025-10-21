<script setup lang="ts">
import { Dark } from 'quasar'
import { useVariablesStore } from './stores/variables'
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

// localStorage'dan foydalanuvchi ma'lumotlarini o'qish
const getUserFromLocalStorage = (): any | null => {
  const user = localStorage.getItem('telegram_user');
  return user ? JSON.parse(user) : null;
};

// Telegram Web App ma'lumotlarini localStorage'ga saqlash
const saveUserToLocalStorage = () => {
  if (window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    const userData = webApp.initDataUnsafe?.user;

    if (userData) {
      // localStorage'da mavjud ma'lumotni tekshirish
      const existingUser = getUserFromLocalStorage();

      // Agar localStorage'da ma'lumot yo'q bo'lsa yoki foydalanuvchi ID'si boshqacha bo'lsa, saqlash
      if (!existingUser || existingUser.id !== userData.id) {
        localStorage.setItem('telegram_user', JSON.stringify(userData));
        console.log('Foydalanuvchi ma\'lumotlari saqlandi:', userData);
      } else {
        console.log('Foydalanuvchi ma\'lumotlari allaqachon mavjud:', existingUser);
      }

      // Telegram Web App-ni kengaytirish
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
</script>

<template>
 <RouterView />
  <q-inner-loading :showing="store.overlay" z-100000>
    <q-spinner-cube color="red" size="3em" />
  </q-inner-loading>
</template>
