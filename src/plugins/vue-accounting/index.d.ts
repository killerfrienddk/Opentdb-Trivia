import * as accounting from "accounting";
import Vue from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        $accounting: accounting.Static;
    }
    interface VueConstructor {
        $accounting: accounting.Static;
        accounting: accounting.Static;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        $accounting: accounting.Static;
    }
}