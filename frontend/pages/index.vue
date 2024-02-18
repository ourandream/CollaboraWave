<template>
  <div class="w-[500px] h-full bg-[white]">
    <div
      class="relative border-x-[#f0f2f6] border-x-[1px] border-solid border-b-[#f0f2f6] border-b-[1px]"
    >
      <div class="flex">
        <div class="border-b-[1px] border-b-solid border-green-600 mx-5 py-2">
          Incoming
        </div>
        <div
          class="mx-5 py-2 hover:text-green-600 hover:cursor-pointer"
          v-for="item in ['Sent', 'Archive']"
        >
          {{ item }}
        </div>
      </div>
      <div class="absolute right-0 top-0">
        <UButton
          icon="i-material-symbols-filter-alt-outline"
          color="gray"
          variant="ghost"
        />
        <UButton
          icon="i-material-symbols-more-horiz"
          color="gray"
          variant="ghost"
        />
      </div>
    </div>
    <div>
      <div v-for="notifation in notifations">
        <div
          :class="{
            'bg-[#f5f2eb]': notifation.type === 'warn',
            'bg-[#ebf5f3]': notifation.type === 'primary',
            'bg-[#f0f8ff]': notifation.type === 'information',
          }"
          class="m-2 p-2 rounded-2xl relative"
        >
          <div>
            <h1 class="text-lg font-bold">{{ notifation.head }}</h1>
            <div>{{ notifation.content }}</div>
          </div>
          <UButton
            icon="i-material-symbols-close"
            color="gray"
            variant="ghost"
            class="absolute right-2 top-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const notifations = [
  {
    type: "warn",
    icon: "",
    head: "Inbox helps you stay updated. You’ll get notifications when:",
    content:
      "You’re assigned a new task or project. You’re @mentioned by someone else. You’re given access to some new info. When you need to be in the loop",
  },
  {
    type: "primary",
    icon: "",
    head: "Inbox helps you stay updated. You’ll get notifications when:",
    content:
      "You’re assigned a new task or project. You’re @mentioned by someone else. You’re given access to some new info. When you need to be in the loop",
  },
  {
    type: "information",
    icon: "",
    head: "Inbox helps you stay updated. You’ll get notifications when:",
    content:
      "You’re assigned a new task or project. You’re @mentioned by someone else. You’re given access to some new info. When you need to be in the loop",
  },
];
</script>
