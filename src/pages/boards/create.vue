<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-xs-12">
        <form @submit.prevent="onSubmit">
          <div class="text-end">
            <RouterLink class="btn btn-primary" to="/boards">목록</RouterLink>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">글제목</label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="제목"
              v-model="form.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">내용</label>
            <textarea
              class="form-control"
              id="content"
              rows="3"
              v-model="form.content"
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">등록</button>
          </div>
        </form>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup>
import { useAxios } from '@/composables/useAxios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()

const form = ref({
  title: '',
  content: '',
})

const { execute } = useAxios(
  '/boards',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      console.log('success')
      alert('등록 되었습니다.')
      route.push('/boards')
    },
    onError: () => {
      console.log('error')
      alert('에러 입니다.')
    },
  },
)

const onSubmit = () => {
  execute({ ...form.value })
}
</script>

<style lang="scss" scoped></style>
