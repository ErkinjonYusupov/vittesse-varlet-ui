<template>
  <q-layout view="lhh LpR lff">
    <q-page-container class="page-container ">
      <q-page mb-0 bg-gray-2 dark:bg-gray-900 >
        <router-view #="{ Component, route }" >
          <transition name="fade" mode="out-in">
            <div :key="route.name || 'fallback-route-name'">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
