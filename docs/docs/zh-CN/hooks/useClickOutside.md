::: field useClickOutside
:::

```html
<div ref='dropdownRef'></div>
```

```javascript
const dropdownRef = ref<null | HTMLElement>(null)
const isClickOutside = useClickOutside(dropdownRef)

watch(isClickOutside, () => {
    
})
```