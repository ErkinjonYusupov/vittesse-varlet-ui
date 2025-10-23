<script lang="ts" setup>
import useFormRules from '~/composables/useFormRules';
import { vMaska } from 'maska/vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { regions } from '~/composables/useRegions';
import { IData } from '~/types';
const { required, min } = useFormRules()
const { t } = useI18n()
const phone = ref<string>('')
const region = ref<any>(null)
const city = ref<string>('')
const description = ref<string>('')
const user = ref<any | null>(null)

// localStorage'dan foydalanuvchi ma'lumotlarini o'qish funksiyasi
function getUserFromLocalStorage(): any | null {
  const userData = localStorage.getItem('telegram_user')
  user.value = userData ? JSON.parse(userData) : null
}


const data = ref<IData[]>([])

function init() {
  data.value = JSON.parse(localStorage.getItem('cart') || '[]')
}

onMounted(() => {
  init()
  getUserFromLocalStorage()
})

const form = ref<HTMLFormElement | null>(null)

function createOrderMessage(): string {
  // 1. Buyurtma ro'yxati
  const itemsList = data.value
    .map((el: IData, index: number) => 
      `${index + 1}. ${el.product.name} - ${el.count} × $${el.product.price}`
    )
    .join('\n')

  // 2. Umumiy summa
  const total = totoalSum.value

  // 3. Mijoz ma'lumotlari
  const customerInfo = `👤  Ism familya: ${user.value && user.value.first_name|| 'Belgilanmagan'} ${user.value && user.value.last_name|| 'Belgilanmagan'}\n`
  +`📍 <b>Viloyat:</b> ${region.value.name || 'Belgilanmagan'}\n`
  + `🏙️ Shahar/Tuman: ${city.value || 'Belgilanmagan'}\n`
  + ` Qo'shimcha ma'lumot: ${description.value || 'Belgilanmagan'}\n`
  + `📞 Telefon: +998 ${phone.value || 'Belgilanmagan'}\n`

  // 4. To'liq message
  return `🛒 **YANGI BUYURTMA**\n\n`
    + `${itemsList}\n\n`
    + `💰 **Jami: $${total}**\n\n`
    + `👤 **Mijoz ma'lumotlari:**\n`
    + `${customerInfo}\n`
    + `⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`
}
const router = useRouter()
// done() funksiyasini yangilash
async function done() {
  form.value?.validate().then(async (r: any) => {
    if (r) {
      const message = createOrderMessage()
      sendTelegramMessage(message)
      localStorage.removeItem('cart')
      alert("Buyurtmangiz qabul qilindi")
      router.replace('/')
    }
  })
}
const totoalSum = computed(() => {
  return data.value.reduce((total: number, el: IData) => total + Number(el.product.price) * el.count, 0)
})
</script>
<template>
  <div>
    <AppBar />
    <div p-4>
      <div text-18px font-600>Buyurtmalarim:</div>
      <div v-for="item in data" :key="item.product.id">
        <div border border-gray p-2 mb-1 rounded-2xl>
          <div>{{ item.product.name }}</div>
          <div flex justify-end items-end>
            <div>${{ item.product.price }} x {{ item.count }}</div>
          </div>
        </div>
      </div>
      <div flex justify-end items-end>
        <div text-18px font-600>Jami: $ {{ totoalSum }}</div>
      </div>
      <q-separator />
      <div text-18px font-600>Ma'lumotlarim:</div>
      <q-form ref="form" flex flex-col gap-2 mt-3>
        <q-select v-model="region" :options="regions" option-label="name" option-value="name" outlined clearable
          map-options color="#5925DC" behavior="menu" transition-show="jump-up" transition-hide="jump-up"
          :label="$t('tr17')" :rules="[required()]" @update:model-value="city = ''" />
        <q-select v-if="region" v-model="city" :options="region.children" option-label="name" option-value="name"
          outlined clearable map-options color="#5925DC" behavior="menu" transition-show="jump-up"
          transition-hide="jump-up" :label="$t('tr17')" :rules="[required()]" />
        <q-input v-model="phone" v-maska="'## ### ## ##'" outlined
          :rules="[required(), min(12, t('tr61', { count: 9 }))]">
          <template #prepend>
            <div flex items-center gap-2>
              <Icon icon="twemoji:flag-uzbekistan" width="20" height="20" />
              <div text-14px>
                +998
              </div>
            </div>
          </template>
        </q-input>
        <q-input v-model="description" label="Qo'shimcha ma'lumot" outlined type="textarea">
        </q-input>
      </q-form>
      <div mt-2>
        <Button w-full size="large" @click="done" label="Buyurtmani rasmiylashtirish" />
      </div>
    </div>
  </div>
</template>

<style>
.q-field--outlined .q-field__control {
  padding: 0 16px;
  color: #00954a;
  border-radius: 10px;
}

/* Dropdown menyusining umumiy orqa rangi */
.q-menu {
  background-color: #f0f0f0;
  /* O'zingiz xohlagan rang */
  border-radius: 8px;
  /* Agar dropdown menyusiga yumaloq burchaklar kerak bo'lsa */
}

/* Har bir option (q-item) uchun stillar */
.q-menu .q-item {
  background-color: #ffffff;
  /* Har bir optionning orqa rangi */
  color: #333;
  /* Matn rangi */
  transition: background-color 0.3s;
  /* Hover effekti uchun silliq o'tish */
}

/* Hover holatida optionning orqa rangi */
.q-menu .q-item:hover {
  background-color: #e0e0e0;
  /* Hover holatida rang */
}

/* Tanlangan optionning orqa rangi */
.q-menu .q-item--active {
  background-color: #00954a;
  /* Tanlangan optionning orqa rangi */
  color: #ffffff;
  /* Tanlangan optionning matn rangi */
}

.custom-select-style:focus-within {
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #00954a;
}
</style>