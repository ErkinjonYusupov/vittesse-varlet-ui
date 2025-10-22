<script lang="ts" setup>
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
</script>

<template>
  <div>
    <AppBar>
      <div bg-white p-4 text-18px font-600 dark:bg-gray-8>
        Savatcha
      </div>
    </AppBar>
    <div py-2>
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
  </div>
</template>
