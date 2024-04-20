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
              @click="showTasks = true"
            ></UButton>
            <UModal v-model="showTasks">
              <UCard>
                <template #header>
                  <div class="relative">
                    <h2 class="font-bold text-xl">任务列表</h2>
                    <UButton
                      class="absolute right-0 top-0"
                      icon="i-material-symbols-add-rounded"
                      @click="showAddTask = true"
                    ></UButton>
                    <UModal v-model="showAddTask">
                      <UCard>
                        <UForm :state="taskToAdd">
                          <UFormGroup label="Title">
                            <UInput v-model="taskToAdd.title" />
                          </UFormGroup>
                          <UFormGroup label="Description">
                            <UTextarea v-model="taskToAdd.description" />
                          </UFormGroup>
                          <UFormGroup label="People">
                            <USelectMenu
                              v-model="taskToAdd.people"
                              :options="people"
                            />
                          </UFormGroup>
                          <UButton class="mt-4" block @click="addTask"
                            >Add</UButton
                          >
                        </UForm>
                      </UCard>
                    </UModal>
                  </div>
                </template>

                <UTable :rows="taskInfo.tasks"></UTable
              ></UCard>
            </UModal>
          </div>
        </div>
        <div>{{ taskInfo.description }}</div>
        <div v-if="!taskInfo.subProject" class="flex relative">
          <UAvatar src="/imgs/avatar.jpg" />
          <div class="flex items-end ml-4">
            <UIcon name="i-material-symbols-alarm-add-outline" />
            <span class="leading-[1em] ml-2 text-sm"> 00:00:00 </span>
          </div>
          <div
            class="absolute right-0 bottom-0 w-1/2 flex justify-around items-end text-xs"
          >
            <div class="w-1/3 self-center">
              <UProgress :value="progress" size="sm" />
            </div>
            <div class="leading-[1em]">{{ progress }}% Complete</div>
          </div>
        </div>
        <div v-else>
          <Task
            :task-info="task"
            type="sub"
            v-for="task in taskInfo.subProject"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{ taskInfo: ProjectInfo; type: "main" | "sub" }>();
const isMain = computed(() => props.type === "main");
const emit = defineEmits(["doneChange"]);
const progress = computed(() => {
  if (!props.taskInfo.tasks || props.taskInfo.tasks.length === 0) {
    return 0;
  } else {
    const tasks = props.taskInfo.tasks;
    return (tasks.filter((task) => task.done).length / tasks.length) * 100;
  }
});

const showTasks = ref(false);
const showAddTask = ref(false);
const taskToAdd = ref<Task>({
  title: "",
  description: "",
  done: false,
  people: "",
});
const people = useAppStore().people;
function addTask() {
  props.taskInfo.tasks.push({ ...taskToAdd.value });
  showAddTask.value = false;
  useToast().add({ title: "Task add!" });
}
</script>
