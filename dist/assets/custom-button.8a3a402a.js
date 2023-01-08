import{n as l}from"./index.6f587571.js";var i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function f(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function p(t){var e=t.default;if(typeof e=="function"){var o=function(){return e.apply(this,arguments)};o.prototype=e.prototype}else o={};return Object.defineProperty(o,"__esModule",{value:!0}),Object.keys(t).forEach(function(n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(o,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}),o}const a={name:"custom-button",data(){return{largeButton:"px-7 py-3"}},computed:{backgroundColorGetter(){return this.backgroundColor.includes("#")?"bg-["+this.backgroundColor+"]":this.backgroundColor}},props:{disabled:{default:!1},contents:{default:null},buttonSize:{default:"large"},backgroundColor:{default:"bg-black"},backgroundHoverColor:{default:"hover:bg-gray-800"},icon:{default:null},text:{default:null},textColor:{default:"text-white"},customClass:{default:null},removeNormalClasses:{default:!1}}};var s=function(){var e=this,o=e._self._c;return o("button",{staticClass:"flex w-full justify-center items-center disabled:opacity-25 disabled:cursor-not-allowed select-none focus:ring-0 drop-shadow-md hover:drop-shadow-lg text-sm rounded focus:shadow-lg focus:outline-none",class:[{"px-7 py-3":e.buttonSize==="large"},e.backgroundColorGetter,e.backgroundHoverColor,e.textColor,e.customClass],attrs:{disabled:e.disabled},on:{click:function(n){return e.$emit("click")}}},[e._t("contents",function(){return[e.icon?o("font-awesome-icon",{attrs:{size:"xl",icon:e.icon}}):e._e(),o("span",{staticClass:"ml-2.5 text-base font-medium"},[e._v(e._s(e.text))])]})],2)},u=[],c=l(a,s,u,!1,null,"3a1c711c",null,null);const b=c.exports;export{b as C,p as a,i as c,f as g};
