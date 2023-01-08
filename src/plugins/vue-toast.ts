import _Vue from "vue";


export function VueToast<T>(Vue: typeof _Vue): void {
    Object.defineProperties(Vue.prototype, {
        $toast: {
            get() {
                return (toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header: string, until: number}) => this.$store.dispatch("addToast", toast);
            }
        }
    });
    
    // @ts-ignore
    Vue.toast = (toast: {type: "danger" | "success" | "primary" | "info" | "secondary", text: string | Object, header: string, until: number}) => this.$store.dispatch("addToast", toast);
}
