<style scoped lang="scss">
/*tailwind does not have the necessary colors so custom css it is.*/
::v-deep.facebook-button {
    background-color: #1877f2 !important;

    &:hover {
        background-color: #166fe5 !important;
    }
}
::v-deep.google-button {
    background-color: white !important;
    color: unset;

    &:hover {
        background-color: #FFFFFFB2 !important;
    }
}

</style>

<template>
    <custom-button @click="$emit('click')" :custom-class="socialNetworkClass" :text="text" :icon="icon"></custom-button>
</template>

<script>
import CustomButton from "@/components/core/buttons/custom-button.vue";

export default {
    name: "social-media-button",
    components: {CustomButton},
    props: {
        socialNetworkClass: {
            default: null,
        },
        text: {
            default: null,
        },
        icon: {
            default: null,
        }
    },
}
</script>

<style scoped>

</style>