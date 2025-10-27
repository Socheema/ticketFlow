import { defineComponent, h, ref } from 'vue'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export const ImageWithFallback = defineComponent({
  name: 'ImageWithFallback',
  props: {
    src: { type: String, required: false },
    alt: { type: String, required: false },
    className: { type: String, required: false },
    style: { type: Object, required: false },
  },
  setup(props) {
    const didError = ref(false)

    const handleError = () => {
      didError.value = true
    }

    return () =>
      didError.value
        ? h(
            'div',
            { class: `inline-block bg-gray-100 text-center align-middle ${props.className ?? ''}`, style: props.style },
            [h('div', { class: 'flex items-center justify-center w-full h-full' }, [h('img', { src: ERROR_IMG_SRC, alt: 'Error loading image' })])]
          )
        : h('img', { src: props.src, alt: props.alt, class: props.className, style: props.style, onError: handleError })
  },
})
