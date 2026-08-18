<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  kicker?: string
}>(), {
  title: 'CodeIsle',
  description: '',
  kicker: '',
})
</script>

<template>
  <div
    style="display: flex; width: 1200px; height: 630px; background: #f6f1e8; color: #1c2a28; padding: 72px; flex-direction: column; justify-content: space-between; font-family: 'Noto Sans SC';"
  >
    <div style="display: flex; align-items: center;">
      <div style="width: 48px; height: 48px; border-radius: 24px; background: #1f6f68; color: #f6f1e8; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center;">
        屿
      </div>
      <div style="display: flex; flex-direction: column; margin-left: 16px;">
        <div style="font-size: 28px; font-weight: 700;">
          CodeIsle
        </div>
        <div style="font-size: 16px; color: #5c6b68;">
          代码之屿
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column;">
      <div
        v-if="kicker"
        style="font-size: 18px; color: #1f6f68; margin-bottom: 12px;"
      >
        {{ kicker }}
      </div>
      <div style="font-size: 52px; font-weight: 700; line-height: 1.2;">
        {{ title }}
      </div>
      <div
        v-if="description"
        style="font-size: 24px; color: #5c6b68; margin-top: 20px; line-height: 1.4;"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
