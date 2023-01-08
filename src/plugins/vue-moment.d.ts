import { Moment, MomentFormatSpecification, MomentInput, Duration, DurationInputArg2, DurationInputArg1 } from 'moment';
import { PluginObject } from 'vue';



declare module 'vue/types/vue' {
	interface Vue {
		$moment(inp?: MomentInput, strict?: boolean): Moment;
		$moment(inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
		$moment(inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;
	}
	interface VueConstructor<V extends Vue = Vue> {
		
		$moment: VueMomentPlugin;
		moment: VueMomentPlugin;
	}
}

type VueMoment = PluginObject<undefined>;

declare const VueMoment: VueMoment;

export default VueMoment;