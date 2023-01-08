export function VueAccounting(Vue) {
    window.accounting = require("../../Lib/accounting");
    Vue.prototype.$accounting = window.accounting;
    // @ts-ignore
    Vue.accounting = window.accounting;
    // @ts-ignore
    Vue.$accounting = window.accounting;
}
//# sourceMappingURL=index.js.map