<template>
  <template v-if="loading">
    <div>...loading</div>
  </template>
  <template v-else-if="error">
    <div>{{ error }}</div>
  </template>
  <template v-else>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="text-end">
            <RouterLink class="btn btn-primary" to="/boards">목록</RouterLink>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ board.id }}</td>
                <td>
                  {{ board.title }}
                </td>
                <td>{{ board.content }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mt-3">
        <div class="text-center">
          <RouterLink class="btn btn-primary" :to="`/boards/${board.id}/edit`">수정</RouterLink>
          <button type="button" class="btn btn-danger ms-3" @click="doDelete">삭제</button>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { useAxios } from '@/composables/useAxios'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const id = route.params.id
const { data: board, loading, error } = useAxios(`/boards/${id}`)

const { execute } = useAxios(
  `/boards/${id}`,
  {
    method: 'delete',
  },
  {
    immediate: false,
    onSuccess: () => {
      alert('삭제 되었습니다.')
      router.push('/boards')
    },
    onError: () => {
      alert('에러가 발생했습니다.')
    },
  },
)

const doDelete = () => {
  if (confirm('삭제 하시겠습니까?')) {
    execute()
  }
}
</script>

<style lang="scss" scoped></style>
