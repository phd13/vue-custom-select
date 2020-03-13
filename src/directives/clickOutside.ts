import { DirectiveOptions } from 'vue'

interface MyHTMLElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void;
}

const clickOutside: DirectiveOptions = {
  bind(el: MyHTMLElement, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;

    el.clickOutsideEvent = (event: any) => {
      if (!(el === event.target || el.contains(event.target))) {
        return callback.call(vm, event);
      }
    };

    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind(el: MyHTMLElement) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

export default clickOutside;
