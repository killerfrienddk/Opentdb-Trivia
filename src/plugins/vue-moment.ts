import _Vue from "vue";
import * as moment from 'moment';

export function VueMoment<T>(Vue: typeof _Vue): void {
    window.moment = moment;
    Vue.prototype.$moment = window.moment;
    // @ts-ignore
    Vue.moment = window.moment;
    // @ts-ignore
    Vue.$moment = window.moment;
}
