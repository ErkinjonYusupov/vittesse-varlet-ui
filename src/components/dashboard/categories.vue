<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { categories } from '~/composables/useCategories'

const { t } = useI18n()
const router = useRouter()
function showProducts(item: any) {
  router.push({ path: '/products', query: { key: item.key, title: item.title } })
}
</script>

<template>
  <div mx-auto my-0 max-w-500px p-2>
    <div v-for="(item, index) in categories" :key="index">
      <AnimationDivTwo :index="index">
        <div mx-2 mb-2 rounded-2xl bg-white p-5 dark:bg-gray-7 @click="showProducts(item)">
          <div flex items-center justify-between>
            <div flex items-center gap-2>
              <Icon :icon="item.icon" width="40" height="40" />
              <div text-20px>
                {{ t(item.title) }}
              </div>
            </div>
            <div class="rounded-full p-1" bg-gray-5>
              <Icon icon="mingcute:right-fill" color="white" text-24px />
            </div>
          </div>
        </div>
      </AnimationDivTwo>
    </div>
  </div>
</template>

<!-- <style>
.bg-gradient{
  @apply bg-gradient-to-br from-#C029DD to-#A825CB text-white;
}
</style> -->
