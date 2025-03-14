<template>
  <template v-if="loading">
    <div>loading...</div>
  </template>
  <template v-else-if="error">{{ error }}</template>
  <template v-else>
    <div class="container mt-5">
      <div class="row">
        <div class="col-xs-12">
          <form class="row g-3" @submit.prevent="doSearch">
            <div class="col-auto">
              <label for="title" class="visually-hidden">검색어</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="제목 검색"
                v-model="searchValue"
              />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-3">검색</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="text-end mb-3">
            <RouterLink class="btn btn-primary" to="/boards/create">글쓰기</RouterLink>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="board in boards" :key="board.id">
                <td>{{ board.id }}</td>
                <td>
                  <RouterLink :to="`/boards/${board.id}/detail`">{{ board.title }}</RouterLink>
                </td>
                <td>{{ board.content }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav aria-label="page navigation text-center">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="params._page > 1 ? params._page-- : null"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pages" :key="page">
          <a
            class="page-link"
            href="#"
            :class="{ active: page === params._page }"
            @click.prevent="params._page = page"
            >{{ page }}
          </a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="params._page < pages ? params._page++ : null"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/useAxios'

const params = ref({
  _sort: 'id',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
})

const { data: boards, response, loading, error } = useAxios('/boards', { params })
const totalCount = computed(() => response?.value.headers['x-total-count'])
const pages = computed(() => Math.ceil(totalCount?.value / params?.value._limit))

const searchValue = ref('')
const doSearch = () => {
  params.value.title_like = searchValue.value
  searchValue.value = ''
}
</script>
