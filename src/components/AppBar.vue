<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { Dark } from 'quasar'
import { useOverlay } from '~/composables/useOverlay'
import { loadLanguageAsync } from '~/modules/i18n'

const props = defineProps<IProps>()
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

interface IProps {
  count?: number
}
</script>

<template>
  <q-header reveal>
    <div>
      <div bg-white dark:bg-gray-800>
        <div mx-auto my-0 max-w-500px flex flex-wrap items-center justify-between py-2>
          <q-item v-ripple clickable dense style="width: 250px;">
            <q-item-section avatar>
              <q-avatar>
                <img v-if="user && isImageValid" :src="user?.photo_url" @error="handleImageError">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" text-black dark:text-white>
                {{ user && user.first_name }}
                {{ user && user.last_name }}
              </q-item-label>
              <q-item-label caption lines="1">
                ID: {{ user && user.id }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <div flex>
            <q-btn v-if="route.path !== '/cart' && route.path !== '/ordered'" flat @click="toCart">
              <Icon icon="lineicons:cart-1" text-24px color="gray" />
              <q-badge v-if="props.count" floating color="red" rounded>
                {{ props.count }}
              </q-badge>
            </q-btn>
            <q-btn flat>
              <Icon icon="solar:settings-linear" text-24px color="gray" />
              <q-menu transition-show="jump-down" transition-hide="jump-up" class="w-250px dark:bg-gray-800 bg-white">
                <q-list dark:bg-gray-800 bg-white>
                  <q-item v-close-popup clickable @click="toggleDarkFun">
                    <q-item-section>
                      <div flex items-center justify-between>
                        <div flex items-center gap-8px text-gray>
                          <div i="carbon-sun dark:carbon-moon" text-18px />
                          <div>Tungi rejim</div>
                        </div>
                        <q-toggle v-model="Dark.mode" dense color="" @click="toggleDarkFun" />
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <div flex items-center justify-between>
                        <div flex items-center gap-8px text-gray>
                          <Icon icon="material-symbols:language" width="20" height="20" />
                          <div>Dastur tili</div>
                        </div>
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
                      <q-menu dark:bg-gray-7 bg-white>
                        <q-list style="min-width: 200px">
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
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </q-header>
</template>
