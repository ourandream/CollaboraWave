<template>
  <div class="p-3 h-[90vh] overflow-y-auto">
    <UCard>
      <template #header>
        <h2 class="font-bold text-xl">个人任务</h2>
        <UTable :rows="taskForCurrentUser">
          <template #done-data="{ row }">
            <UToggle v-model="row.done" />
          </template>
        </UTable>
      </template>
    </UCard>
    <UCard class="mt-4">
      <VChart class="h-[300px]" :option="option" />
    </UCard>
    <UCard class="mt-4">
      <VChart class="h-[300px]" :option="option2" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const option = {
  title: {
    text: "任务分布情况",
    subtext: "Test Data",
    left: "left",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

const option2 = {
  title: {
    text: "本周任务",
    subtext: "Test Data",
    left: "left",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [5, 3, 1, 4, 5, 7, 0],
      type: "line",
    },
  ],
};
const taskForCurrentUser = computed(() => {
  const tasks: Task[] = [];
  const userName = useAppStore().userName;
  useAppStore().projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.people === userName) {
        tasks.push(task);
      }
    });
  });

  return tasks;
});
</script>
