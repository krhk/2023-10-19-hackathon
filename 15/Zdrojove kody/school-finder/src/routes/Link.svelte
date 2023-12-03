<script>
    export let href = ''
    export let title = undefined
</script>

<a {href} {title} class="text-blue-600 underline"><slot></slot></a>