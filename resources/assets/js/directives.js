// import Vue from 'vue'

// Vue.directive('deep-model', {
//     bind(el, binding, vnode) {
//         el.addEventListener('input', e => {
//             new Function('obj', 'v', `obj.${binding.value} = v`)(vnode.context.$data, e.target.value);
//         });
//     },
//     unbind(el) {
//         el.removeEventListener('input');
//     },
//     inserted(el, binding, vnode) {
//         el.value = new Function('obj', `return obj.${binding.value}`)(vnode.context.$data);
//     },
//     update(el, binding, vnode) {
//         el.value = new Function('obj', `return obj.${binding.value}`)(vnode.context.$data);
//     }
// });