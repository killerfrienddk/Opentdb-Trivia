import _Vue from "vue";

export function VueAccounting<T>(Vue: typeof _Vue): void {
    window.accounting = require("../../Lib/accounting");
    Vue.prototype.$accounting = window.accounting;
    // @ts-ignore
    Vue.accounting = window.accounting
    // @ts-ignore
    Vue.$accounting = window.accounting
}