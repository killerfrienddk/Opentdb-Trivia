import Vue from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        $toast(toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header?: string, until?: number}): void;
    }
    interface VueConstructor {
        $toast(toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header?: string, until?: number}): void;
        toast(toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header?: string, until?: number}): void;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        $toast(toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header?: string, until?: number}): void;
    }
}