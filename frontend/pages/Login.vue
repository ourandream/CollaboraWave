<script setup lang="ts">
const loginInfo = ref({ username: "", passoword: "" });

async function submit() {
  const { token } = await apiFetch<{ token: string }>("/user/login", {
    method: "post",
    body: loginInfo.value,
  });
  const userStore = useUserStore();
  userStore.token = token;
  useRouter().push("/");
}
</script>

<template>
  <div class="flex">
    <div class="flex items-center justify-center h-screen w-full lg:w-1/2">
      <div class="block w-1/2">
        <h1 class="text-[53px] mt-1 mb-1">Log in</h1>
        <p class="text-[13px] mb-10">
          CollaboraWave，携手共创未来的协作新浪潮！
        </p>
        <UForm :state="loginInfo" @submit="submit">
          <UFormGroup label="Username" class="mt-2 mb-2">
            <UInput v-model="loginInfo.username" placeholder="Email or phone" />
          </UFormGroup>
          <UFormGroup label="Passoword" class="mt-2 mb-10">
            <UInput
              v-model="loginInfo.passoword"
              placeholder="Enter your password"
              type="password"
            />
          </UFormGroup>
          <UButton type="submit" size="xl" block> Login to Continue </UButton>
        </UForm>
        <p class="mt-2 text-[13px]">
          没有账号, 马上<ULink
            to="/signUp"
            ctive-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >注册</ULink
          >一个吧!
        </p>
      </div>
    </div>
    <div
      class="hidden lg:h-screen lg:flex lg:w-1/2 lg:items-center lg:justify-center"
    >
      <img src="/imgs/login.svg" class="block w-1/2" />
    </div>
  </div>
</template>
