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
    methods: {
        handleSocialMediaLogin() {
            // I have not implemented this so for now it will just allow the user to login just to make it interactive.


        }
    }
}
</script>

<style scoped>

</style>