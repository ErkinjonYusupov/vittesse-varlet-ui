<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'

interface IData {
  product: {
    id: string | number
    name: string
    price: string
  }
  count: number
}

const data = ref<IData[]>([])

function init() {
  data.value = JSON.parse(localStorage.getItem('cart') || '[]')
}

onMounted(() => {
  init()
})

function updateCartQuantity(action: 'increment' | 'decrement', index: number) {
  if (index !== -1) {
    const product = data.value[index]
    if (action === 'increment') {
      product.count = (product.count || 1) + 1
    }
    else if (action === 'decrement') {
      product.count = (product.count || 1) - 1
      if (product.count <= 0) {
        deleteProduct(index)
      }
    }
    localStorage.setItem('cart', JSON.stringify(data.value))
  }
  else {
    console.error(`Mahsulot topilmadi: ID ${index}`)
  }
}
function deleteProduct(index: number) {
  if (index > -1) {
    data.value.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(data.value))
  }
}
const totoalSum = computed(() => {
  return data.value.reduce((total: number, el: IData) => total + Number(el.product.price) * el.count, 0)
})
</script>

<template>
  <div>
    <AppBar>
      <div flex items-center justify-between bg-white p-4 dark:bg-gray-8>
        <div text-18px font-600>
          Savatcha
        </div>
        <div v-if="totoalSum">
          <span text-gray>Jami: </span>$ {{ totoalSum }}
        </div>
      </div>
    </AppBar>
    <div v-if="data.length" py-2>
      <div v-for="(item, index) in data" :key="item.product.id" mx-2 mb-2 rounded-2xl bg-white p-4 dark:bg-gray-7>
        <div flex items-center justify-between>
          <div>
            <div font-700>
              {{ item.product.name }}
            </div>
            <div mt-2 inline-block border border-green-5 rounded-10px px-3 text-green-6 font-600>
              $ {{
                item.product.price }}
            </div>
          </div>
          <Counter
            :initial-value="item.count" :min="1" :max="99"
            @on-tap="action => updateCartQuantity(action, index)"
          />
        </div>
      </div>
    </div>
    <div v-else flex flex-col items-center pt-5 text-center>
      <Icon icon="material-symbols:production-quantity-limits" mb-4 text-64px text-gray />
      <div text-gray>
        Mahsulotlar mavjud emas
      </div>
    </div>
  </div>
</template>
