export const vClickOutside = {
  mounted(element, binding) {
    element.clickOutsideEvent = (event) => {
      if (!(element === event.target || element.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", element.clickOutsideEvent);
  },
  unmounted(element) {
    if (element.clickOutsideEvent) {
      document.removeEventListener("click", element.clickOutsideEvent);
    }
  },
};
