<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Dark } from 'quasar'
import { useOverlay } from '~/composables/useOverlay'
import { loadLanguageAsync } from '~/modules/i18n'

const { locale } = useI18n()
function toggleDarkFun() {
  toggleDark()
  Dark.toggle()
}

async function toggleLocales(newLocale: string) {
  useOverlay(true)
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
  localStorage.setItem('language', newLocale)
  useOverlay(false)
}
const user = ref<any | null>(null)

// localStorage'dan foydalanuvchi ma'lumotlarini o'qish funksiyasi
function getUserFromLocalStorage(): any | null {
  const userData = localStorage.getItem('telegram_user')
  return userData ? JSON.parse(userData) : null
}
onMounted(() => {
  const lang = localStorage.getItem('language') || 'uz'
  toggleLocales(lang)
  const savedUser = getUserFromLocalStorage()
  if (savedUser) {
    user.value = savedUser
  }
})
const isImageValid = ref(true)

function handleImageError() {
  isImageValid.value = false
}
const router = useRouter()
const route = useRoute()
function toCart() {
  router.push('/cart')
}
</script>

<template>
  <q-header reveal>
    <div>
      <div bg-white dark:bg-gray-800>
        <div mx-auto my-0 max-w-500px flex flex-wrap items-center justify-between py-2 pl-24px>
          <div text-gray>
            <q-avatar color="indigo" cursor-pointer>
              <img v-if="user && isImageValid" :src="user?.photo_url" @error="handleImageError">
            </q-avatar>
          </div>
          <div flex>
            <div m-2 cursor-pointer>
              <div flat text-gray-8 color="white">
                <div flex items-center gap-2>
                  <div flex items-center gap-2 text-gray-8>
                    <Icon v-if="locale === 'uz'" icon="emojione:flag-for-uzbekistan" width="24" height="24" />
                    <Icon v-else icon="circle-flags:ru" width="24" height="24" />
                    <div v-if="locale === 'uz'" text-gray>
                      UZ
                    </div>
                    <div v-else text-gray>
                      RU
                    </div>
                  </div>
                </div>
                <q-menu dark:bg-gray-7>
                  <q-list style="min-width: 100px">
                    <q-item v-close-popup clickable @click="toggleLocales('uz')">
                      <q-item-section>
                        <div flex items-center gap-2>
                          <Icon icon="emojione:flag-for-uzbekistan" width="20" height="20" />
                          <div>O'zbekcha</div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item v-close-popup clickable @click="toggleLocales('ru')">
                      <q-item-section>
                        <div flex items-center gap-2>
                          <Icon icon="circle-flags:ru" width="20" height="20" />
                          <div>Русский</div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
            </div>
            <q-btn flat @click="toggleDarkFun">
              <Icon
                class="dark:text-gray" :icon="Dark.isActive ? 'carbon-sun' : 'carbon-moon'" text-24px
                color="gray"
              />
            </q-btn>
            <q-btn v-if="route.path !== '/cart'" flat @click="toCart">
              <Icon
                icon="lineicons:cart-1" text-24px
                color="gray"
              />
            </q-btn>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </q-header>
</template>
