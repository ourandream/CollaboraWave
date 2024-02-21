<template>
  <div class="flex">
    <div class="w-2/3 p-5 pt-0 overflow-auto">
      <div class="font-bold text-lg pt-2">User Interface Projects</div>
      <Task :task-info="task" type="main" v-for="task in tasks" class="mt-3" />
    </div>
    <div class="w-1/3 p-4">
      <div>
        <h2 class="font-bold text-lg mb-1">Milestore</h2>
        <UCard>
          <div v-for="milestone in milestones" class="mt-2">
            <div class="flex justify-between mb-2">
              <div
                class="flex flex-col items-center justify-center px-2 border-[1px] border-gray-600 border-solid"
              >
                <div>{{ monthStrMap[milestone.date.month] }}</div>
                <div>{{ milestone.date.day }}</div>
              </div>
              <div class="w-5/6 ml-2">
                <h2 class="font-media">{{ milestone.title }}</h2>
                <p class="text-sm">{{ milestone.description }}</p>
              </div>
            </div>
            <div class="flex items-end">
              <UProgress
                :value="milestone.progress"
                size="sm"
                color="pink"
                class="w-1/3 self-center"
              />
              <div class="leading-[1em] ml-2 text-xs">
                {{ milestone.progress }}% Complete
              </div>
            </div>
          </div>
        </UCard>
      </div>
      <div>
        <h2 class="font-bold text-lg">Meetings</h2>
        <UCard>
          <div>{{ date.toDateString() }}</div>
          <div class="flex justify-around">
            <div v-for="(day, index) in getCurrentWeekDays()">
              <div class="text-center">{{ weekWords[index] }}</div>
              <div
                @click="currentDay = index"
                class="rounded-full w-[1.5em] h-[1.5em] flex items-center justify-center"
                :class="
                  currentDay === index
                    ? 'bg-purple-950 text-white'
                    : 'hover:bg-purple-200 cursor-pointer'
                "
              >
                {{ day }}
              </div>
            </div>
          </div>
          <div>
            <div
              v-for="meeting in meetings.filter(
                (meeting) => meeting.weekday === currentDay
              )"
              class="my-3 relative"
            >
              <div class="font-bold">{{ meeting.title }}</div>
              <div>
                <UIcon name="i-material-symbols-location-on-rounded" />
                {{ meeting.place }}
              </div>
              <div
                class="absolute right-0 top-2 px-1 py-1 bg-[#d0d4d8] flex items-center justify-center text-xs"
              >
                {{ meeting.time }}
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tasks: TaskInfo[] = [
  {
    title: "create own types in Nuxt Typescript?",
    description:
      "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
    progress: 70,
    people: ["10051"],
    done: false,
    subTask: [
      {
        title: "create own types in Nuxt Typescript?",
        description:
          "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
        progress: 70,
        people: ["10051"],
        done: false,
      },
      {
        title: "create own types in Nuxt Typescript?",
        description:
          "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
        progress: 70,
        people: ["10051"],
        done: false,
      },
    ],
  },
  {
    title: "create own types in Nuxt Typescript?",
    description:
      "This directory is interesting if you want to learn more about the files Nuxt generates based on your directory structure.",
    progress: 70,
    people: ["10051"],
    done: false,
  },
];

const milestones = [
  {
    date: {
      month: 1,
      day: 18,
    },
    title: "Write 15 blog articles on Medium",
    description: "Office/Marketing",
    progress: 30,
  },
  {
    date: {
      month: 1,
      day: 18,
    },
    title: "Write 15 blog articles on Medium",
    description: "Office/Marketing",
    progress: 30,
  },
];
const monthStrMap = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const meetings = [
  {
    weekday: 1,
    title: "Meeting with new client",
    place: "Google meetup",
    time: "10am",
  },
  {
    weekday: 1,
    title: "Meeting with new client",
    place: "Google meetup",
    time: "10am",
  },
];
const weekWords = ["M", "T", "W", "T", "F", "S", "S"];
const date = new Date();
const currentDay = ref(1);
function getCurrentWeekDays() {
  const monday = date.getDate() - date.getDay();
  const finaldays: number[] = [];
  for (let day = monday; day < monday + 7; ++day) {
    finaldays.push(day);
  }
  return finaldays;
}
</script>
