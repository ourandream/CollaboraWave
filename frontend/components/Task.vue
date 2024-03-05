<template>
  <UCard
    :class="{
      'ring-0 shadow-none': !isMain,
    }"
    :ui="{
      body: {
        padding: isMain ? 'px-4 py-5 sm:p-6' : 'px-0 sm:px-0',
      },
    }"
  >
    <div class="flex justify-between">
      <UCheckbox
        :ui="{
          base: 'h-6 w-6 mt-4',
          rounded: 'rounded-full',
        }"
        @click="emit('doneChange')"
      />
      <div class="w-[90%]">
        <div class="relative">
          <div
            class="font-bold text-lg"
            :class="{ 'line-through': taskInfo.done }"
          >
            {{ taskInfo.title }}
          </div>
          <div
            class="absolute right-1 top-1 w-[36%] flex"
            :class="isMain ? 'justify-around' : 'justify-end'"
          >
            <UButton
              icon="i-material-symbols-alarm-outline"
              color="white"
              size="2xs"
              v-if="isMain"
              >Reminder</UButton
            >
            <UButton
              icon="i-material-symbols-low-priority"
              size="2xs"
              color="white"
              v-if="isMain"
              >Priority</UButton
            >
            <UButton
              icon="i-material-symbols-more-horiz"
              size="2xs"
              color="white"
            ></UButton>
          </div>
        </div>
        <div>There is so much great inspiration in the world</div>
        <div v-if="!taskInfo.subTask" class="flex relative">
          <UAvatar src="/imgs/avatar.jpg" />
          <div class="flex items-end ml-4">
            <UIcon name="i-material-symbols-alarm-add-outline" />
            <span class="leading-[1em] ml-2 text-sm"> 00:00:00 </span>
          </div>
          <div
            class="absolute right-0 bottom-0 w-1/2 flex justify-around items-end text-xs"
          >
            <div class="w-1/3 self-center">
              <UProgress :value="taskInfo.progress" size="sm" />
            </div>
            <div class="leading-[1em]">{{ taskInfo.progress }}% Complete</div>
          </div>
        </div>
        <div v-else>
          <Task :task-info="task" type="sub" v-for="task in taskInfo.subTask" />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{ taskInfo: TaskInfo; type: "main" | "sub" }>();
const isMain = computed(() => props.type === "main");
const emit = defineEmits(["doneChange"]);
</script>
