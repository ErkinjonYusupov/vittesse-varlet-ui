<script lang="ts" setup>
import { categoryFirmsMap } from '~/composables/useCategories'
import { useProducts } from '~/stores/products'

const store = useProducts()

const { t } = useI18n()
const route = useRoute()
const scrollContainer = ref<HTMLElement | null>(null)

function setupDragScroll() {
  if (!scrollContainer.value)
    return

  let isDown = false
  let startX: number
  let scrollLeft: number

  scrollContainer.value.addEventListener('mousedown', (e: MouseEvent) => {
    isDown = true
    scrollContainer.value!.classList.add('active')
    startX = e.pageX - scrollContainer.value!.offsetLeft
    scrollLeft = scrollContainer.value!.scrollLeft
  })

  scrollContainer.value.addEventListener('mouseleave', () => {
    isDown = false
    scrollContainer.value!.classList.remove('active')
  })

  scrollContainer.value.addEventListener('mouseup', () => {
    isDown = false
    scrollContainer.value!.classList.remove('active')
  })

  scrollContainer.value.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDown)
      return
    e.preventDefault()
    const x = e.pageX - scrollContainer.value!.offsetLeft
    const walk = (x - startX) * 2 // Scroll tezligini oshirish uchun
    scrollContainer.value!.scrollLeft = scrollLeft - walk
  })
}
</script>

<template>
  <AppBar :count="store.count">
    <div bg-white pb-2 dark:bg-gray-8>
      <div px-4 py-2 text-18px text-gray font-600>
        {{ t(route.query.title as string) }}
      </div>
      <div ref="scrollContainer" class="horizontal-scroll-container" mt-2 px-2 @vue:mounted="setupDragScroll">
        <div
          class="mb-2 mr-2 rounded-5px px-2 text-18px" :class="[
            store.selectedFirm === null ? 'bg-green-6 text-white' : 'bg-gray-2 text-gray-7',
          ]"
          mr-2 @click="store.setFirmFilter(null)"
        >
          {{ t('tr37') }}
        </div>
        <div v-for="firm in categoryFirmsMap[route.query.key as string]" :key="firm" class="news-card-wrapper">
          <div
            class="mb-2 mr-2 rounded-5px px-2 text-18px" :class="[
              store.selectedFirm === firm ? 'bg-green-6 text-white' : 'bg-gray-2 text-gray-7',
            ]"
            mr-2 @click="store.setFirmFilter(store.selectedFirm === firm ? null : firm)"
          >
            {{ firm.toUpperCase() }}
          </div>
        </div>
      </div>
      <div mx-2 border border-gray rounded-xl bg-white px-4 dark:bg-gray-6>
        <q-input
          v-model="store.search"
          dense :label="t('tr5')" borderless color="green-8"
          @update:model-value="store.searchProduct"
        />
      </div>
    </div>
  </AppBar>
</template>

<style scoped>
.horizontal-scroll-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
}

.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.horizontal-scroll-container.active {
  cursor: grabbing;
}

.news-card-wrapper {
  flex: 0 0 auto;
}
</style>
