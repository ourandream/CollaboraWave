<template>
  <div class="w-screen h-screen flex bg-[#F8F9FB] overflow-hidden">
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
        <UButton
          size="2xs"
          icon="i-material-symbols-person-apron-outline"
          block
          @click="showAddPeople = true"
          >invite</UButton
        >
        <UModal v-model="showAddPeople">
          <UCard>
            <template #header>
              <h2 class="font-bold text-xl">邀请人员</h2>
            </template>
            <UFormGroup label="名字">
              <UInput v-model="people" />
            </UFormGroup>
            <UButton class="mt-2" block @click="addPeople">invite</UButton>
          </UCard>
        </UModal>
      </div>
    </div>
    <div
      :class="{ 'w-full': !showSidebar || !showLayout, 'w-4/5': showSidebar }"
    >
      <div
        class="p-5 relative border-b-[1px] border-solid border-b-[#f0f2f6] bg-white h-[10%]"
        v-if="showLayout"
      >
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
          @click="
            () => {
              console.log('click!');
              showAdd = true;
            }
          "
        ></UButton>
        <UModal v-model="showAdd">
          <UCard>
            <template #header>
              <h2 class="font-bold text-xl">添加项目</h2>
            </template>
            <UForm :state="taskToAdd" class="space-y-2" :validate="validate">
              <UFormGroup label="项目名">
                <UInput v-model="taskToAdd.title" />
              </UFormGroup>
              <UFormGroup label="项目描述">
                <UTextarea v-model="taskToAdd.description" />
              </UFormGroup>
              <UFormGroup label="开始日期">
                <input
                  type="date"
                  @input="
                    (e) => {
                      taskToAdd.start=new Date((e.target as HTMLInputElement).value);
                    }
                  "
                />
              </UFormGroup>
              <UFormGroup label="结束日期">
                <input
                  type="date"
                  @input="
                    (e) => {
                      taskToAdd.end=new Date((e.target as HTMLInputElement).value);
                    }
                  "
                />
              </UFormGroup>

              <UFormGroup label="成员">
                <USelectMenu
                  v-model="taskToAdd.people"
                  :options="peoples"
                  multiple
                />
              </UFormGroup>
              <UButton @click="addTask" block>add</UButton>
            </UForm>
          </UCard>
        </UModal>
      </div>
      <div class="h-[90%]">
        <NuxtPage
          :page-key="route => {currentPage=route.name!.toString();return route.fullPath}"
        />
      </div>
    </div>
    <UNotifications />
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
    to: "/",
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
    label: "Documents",
    icon: "i-material-symbols-edit-document-outline",
    to: "/documents",
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
const showLayout = computed(() => {
  return !["", "Login"].includes(currentPage.value);
});

const showAdd = ref(false);
const taskToAdd = ref<ProjectInfo>({
  title: "create own types in Nuxt Typescript?",
  start: new Date(),
  end: new Date(),
  description:
    "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
  progress: 0,
  people: [],
  tasks: [],
  done: false,
});
const peoples = useAppStore().people;
function addTask() {
  useAppStore().projects.push({ ...taskToAdd.value });
  useToast().add({ title: "Add success!" });
}

const showAddPeople = ref(false);
const people = ref("");
const toBeAddPeople = useAppStore().toBeAddPeople;
function addPeople() {
  if (toBeAddPeople.includes(people.value)) {
    useAppStore().people.push(people.value);
    useToast().add({ title: "Add new people!" });
  } else {
    useToast().add({ title: "People not found!" });
  }
}

function validate() {}
</script>
