import axios from 'axios'
import { isRef, ref, unref, watchEffect } from 'vue'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

export const useAxios = (url, config = {}, options = {}) => {
  const defaultConfig = {
    method: 'get',
  }

  const defaultOptions = {
    immediate: true,
  }

  const { immediate, onSuccess, onError } = {
    ...defaultOptions,
    ...options,
  }

  const data = ref(null)
  const response = ref(null)
  const loading = ref(null)
  const error = ref(null)

  const { params } = config
  const execute = (body) => {
    loading.value = true
    error.value = null
    loading.value = true

    axios(unref(url), {
      ...defaultConfig,
      ...config,
      data: typeof body === 'object' ? body : {},
      params: unref(params),
    })
      .then((res) => {
        data.value = res.data
        response.value = res
        if (onSuccess) {
          console.log('onSuccess')
          onSuccess()
        }
      })
      .catch((err) => {
        error.value = err
        if (onError) {
          onError()
        }
      })
      .finally(() => {
        loading.value = null
      })
  }
  if (isRef(params) || isRef(url)) {
    watchEffect(execute)
  } else {
    if (immediate) {
      execute()
    }
  }

  return {
    data,
    response,
    loading,
    error,
    execute,
  }
}
