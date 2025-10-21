<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { Dark } from 'quasar';
import { useOverlay } from '~/composables/useOverlay';
import { loadLanguageAsync } from '~/modules/i18n';
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
const user = ref<any | null>(null);

// localStorage'dan foydalanuvchi ma'lumotlarini o'qish funksiyasi
const getUserFromLocalStorage = (): any | null => {
  const userData = localStorage.getItem('telegram_user');
  return userData ? JSON.parse(userData) : null;
};
onMounted(() => {
    const lang = localStorage.getItem('language') || 'uz'
    toggleLocales(lang)
    const savedUser = getUserFromLocalStorage();
  if (savedUser) {
    user.value = savedUser;
    console.log('Foydalanuvchi ma\'lumotlari:', savedUser);
  } else {
    console.log('localStorage\'da foydalanuvchi ma\'lumotlari topilmadi');
  }
})
</script>
<template>
    <q-header reveal>
        <div bg-white dark:bg-gray-800>
            <div flex flex-wrap items-center justify-between px-24px py-4 mx-auto my-0 max-w-500px>
                <div text-gray>
                    {{ user }}
                </div>
                <div flex>
                    <div m-2 cursor-pointer px-4 py-2>
                        <div flat text-gray-8 color="white">
                            <div flex items-center gap-2>
                                <div flex items-center gap-2 text-gray-8>
                                    <Icon v-if="locale === 'uz'" icon="emojione:flag-for-uzbekistan" width="24"
                                        height="24" />
                                    <Icon v-else icon="circle-flags:ru" width="24" height="24" />
                                    <div v-if="locale === 'uz'" text-gray>
                                        UZ
                                    </div>
                                    <div v-else text-gray>
                                        RU
                                    </div>
                                </div>
                            </div>
                            <q-menu>
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
                        <Icon class="dark:text-gray" :icon="Dark.isActive ? 'carbon-sun' : 'carbon-moon'" text-24px
                            color="gray" />
                    </q-btn>
                </div>

            </div>
        </div>
    </q-header>
</template>