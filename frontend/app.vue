<template>
  <div class="w-screen h-screen flex">
    <div
      class="w-1/5 h-screen bg-[#181f38] pl-2 pr-2 pt-3 pb-3 relative"
      v-show="showSidebar && showLayout"
    >
      <div class="pl-3 mb-5 relative">
        <img src="/imgs/logo.svg" class="inline-block w-1/6 mr-2" />
        <span class="text-white font-bold text-lg align-bottom"
          >CollaboraWave</span
        >
        <UButton
          icon="i-material-symbols-arrow-back-ios-new-rounded"
          size="2xs"
          variant="ghost"
          class="hover:bg-[rgba(255,255,255,0.2)] text-white absolute right-0 bottom-0"
          @click="() => (showSidebar = false)"
        />
      </div>

      <UVerticalNavigation
        :links="links"
        :ui="{
          active: 'before:bg-[rgba(255,255,255,0.2)] text-white',
          inactive:
            'text-gray-300 hover:text-white hover:before:bg-[rgba(255,255,255,0.2)]',
        }"
      >
        <template #icon="{ link }">
          <UIcon :name="link.icon" class="text-white w-5 h-5" />
        </template>
      </UVerticalNavigation>
      <div
        class="absolute w-full left-0 bottom-0 pl-5 pr-5 pb-2 pt-2 border-t-[1px] border-t-[#323f5e] border-solid"
      >
        <UButton size="2xs" icon="i-material-symbols-person-apron-outline" block
          >invite</UButton
        >
      </div>
    </div>
    <div :class="{ 'w-full': !showSidebar, 'w-4/5': showSidebar }">
      <div class="p-5 relative border-b-[1px] border-solid border-b-[#f0f2f6]">
        <UButton
          icon="i-material-symbols-menu-rounded"
          class="mr-2"
          color="gray"
          variant="ghost"
          size="xs"
          v-show="!showSidebar"
          @click="showSidebar = true"
        ></UButton>
        <div class="inline-block text-xl font-bold">
          {{ currentPage }}
        </div>
        <UButton
          icon="i-material-symbols-add-rounded"
          class="absolute right-5"
          size="xs"
        ></UButton>
      </div>
      <div>
        <NuxtPage
          :page-key="route => {currentPage=route.name!.toString();return route.fullPath}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref("");

const links = [
  {
    label: "Search",
    icon: "i-heroicons-magnifying-glass",
  },
  {
    label: "Inbox",
    icon: "i-heroicons-home",
    to: "/inbox",
  },
  {
    label: "Dashboard",
    icon: "i-material-symbols-dashboard",
    to: "/dashboard",
  },
  {
    label: "Report",
    icon: "i-heroicons-chart-bar",
    to: `/report`,
  },
  {
    label: "My to do",
    icon: "i-material-symbols-featured-play-list-outline",
    to: "/my-to-do",
  },
  {
    label: "Calendar",
    icon: "i-material-symbols-calendar-month",
    to: "/calendar",
  },
  {
    label: "Chat",
    icon: "i-material-symbols-mark-chat-unread-rounded",
    to: "/chat",
  },
];

const showSidebar = ref(true);
const showLayout = ref(true);
</script>
