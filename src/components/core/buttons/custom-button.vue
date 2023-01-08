<template>
    <button @click="$emit('click')" :disabled="disabled" 
		class="flex w-full justify-center items-center disabled:opacity-25 disabled:cursor-not-allowed select-none focus:ring-0 drop-shadow-md hover:drop-shadow-lg text-sm rounded focus:shadow-lg focus:outline-none"
        :class="[{'px-7 py-3': buttonSize === 'large'}, backgroundColorGetter, backgroundHoverColor, textColor, customClass]">
        <slot name="contents">
            <font-awesome-icon v-if="icon" size="xl" :icon="icon"/>
            <span class="ml-2.5 text-base font-medium">{{ text }}</span>
        </slot>
    </button>
</template>

<script lang="ts">
export default {
    name: "custom-button",
    data() {
        return {
            largeButton: "px-7 py-3",
        }
    },
    computed: {
        backgroundColorGetter() {
            return this.backgroundColor.includes('#') ? 'bg-[' + this.backgroundColor + ']' : this.backgroundColor;
        },
    },
    props: {
		disabled: {
			default: false,
		},
        contents: {default: null},
        buttonSize: {
            default: "large",
        },
        backgroundColor: {
            default: "bg-black"
        },
        backgroundHoverColor: {
            default: "hover:bg-gray-800",
        },
        icon: {
            default: null,
        },
        text: {
            default: null
        },
        textColor: {
            default: "text-white",
        },
        customClass: {
            default: null,
        },
        removeNormalClasses: {
            default: false,
        }
    },
}
</script>

<style scoped>
.custom-button {
    transition: 200ms cubic-bezier(.08, .52, .52, 1) background-color, 200ms cubic-bezier(.08, .52, .52, 1) box-shadow, 200ms cubic-bezier(.08, .52, .52, 1) transform;
    transition-duration: 200ms, 200ms, 200ms;
    transition-timing-function: cubic-bezier(0.08, 0.52, 0.52, 1), cubic-bezier(0.08, 0.52, 0.52, 1), cubic-bezier(0.08, 0.52, 0.52, 1);
    transition-delay: 0s, 0s, 0s;
    transition-property: background-color, box-shadow, transform;
}
</style>