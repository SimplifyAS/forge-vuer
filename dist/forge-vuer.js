!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.ForgeVuer=n():e.ForgeVuer=n()}(window,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n,t){var r=t(2);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,t(5).default)("45982507",r,!1,{})},function(e,n,t){"use strict";var r=t(0);t.n(r).a},function(e,n,t){(e.exports=t(3)(!1)).push([e.i,"\n.user-pop{\n  color: inherit;\n  text-decoration: none;\n}\n.user-pop:hover{\n    text-decoration: none;\n    color: inherit;\n}\n.user-popover{\n        position: absolute;\n        width: 200px;\n        background: #fff;\n        border: none;\n        border-radius: 5px;\n        box-shadow: 0 6px 6px rgba(16, 16, 16, 0.04), 0 6px 6px rgba(0, 0, 0, 0.05);\n        z-index:999;\n        text-align: left;\n}\n.user-popover--img{\n  background: rgb(237, 27, 27);\n  background-position: center !important;\n  background-size: cover !important;\n  height: 100px;\n  width: 100%;\n  padding: 12px;\n  text-align:left;\n  vertical-align: bottom;\n}\n.user-popover--inner{\n  padding: 10px;\n}\n.img-inner{\n  color:rgb(237, 27, 27);\n  font-size: 17px;\n}\n",""])},function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map(function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[t].concat(i).concat([o]).join("\n")}var s;return[t].join("\n")}(n,e);return n[2]?"@media "+n[2]+"{"+t+"}":t}).join("")},n.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<e.length;o++){var s=e[o];null!=s[0]&&r[s[0]]||(t&&!s[2]?s[2]=t:t&&(s[2]="("+s[2]+") and ("+t+")"),n.push(s))}},n}},function(e,n,t){"use strict";t.r(n);var r=function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n    Forge Vuer\n")])};r._withStripped=!0;var o={data:()=>({timer:"",isInInfo:!1,showPopup:!1}),mounted:function(){console.log("vuer has been mounted!")},methods:{}};t(1);var i=function(e,n,t,r,o,i,s,a){var u,c="function"==typeof e?e.options:e;if(n&&(c.render=n,c.staticRenderFns=t,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=u):o&&(u=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var d=c.render;c.render=function(e,n){return u.call(n),d(e,n)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:e,options:c}}(o,r,[],!1,null,null,null);i.options.__file="src/ForgeVuer.vue";var s=i.exports;n.default={install(e,n){e.component("forge-vuer",s)}}},function(e,n,t){"use strict";function r(e,n){for(var t=[],r={},o=0;o<n.length;o++){var i=n[o],s=i[0],a={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):t.push(r[s]={id:s,parts:[a]})}return t}t.r(n),t.d(n,"default",function(){return v});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},s=o&&(document.head||document.getElementsByTagName("head")[0]),a=null,u=0,c=!1,d=function(){},f=null,p="data-vue-ssr-id",l="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(e,n,t,o){c=t,f=o||{};var s=r(e,n);return h(s),function(n){for(var t=[],o=0;o<s.length;o++){var a=s[o];(u=i[a.id]).refs--,t.push(u)}n?h(s=r(e,n)):s=[];for(o=0;o<t.length;o++){var u;if(0===(u=t[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete i[u.id]}}}}function h(e){for(var n=0;n<e.length;n++){var t=e[n],r=i[t.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](t.parts[o]);for(;o<t.parts.length;o++)r.parts.push(m(t.parts[o]));r.parts.length>t.parts.length&&(r.parts.length=t.parts.length)}else{var s=[];for(o=0;o<t.parts.length;o++)s.push(m(t.parts[o]));i[t.id]={id:t.id,refs:1,parts:s}}}}function g(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function m(e){var n,t,r=document.querySelector("style["+p+'~="'+e.id+'"]');if(r){if(c)return d;r.parentNode.removeChild(r)}if(l){var o=u++;r=a||(a=g()),n=x.bind(null,r,o,!1),t=x.bind(null,r,o,!0)}else r=g(),n=function(e,n){var t=n.css,r=n.media,o=n.sourceMap;r&&e.setAttribute("media",r);f.ssrId&&e.setAttribute(p,n.id);o&&(t+="\n/*# sourceURL="+o.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}.bind(null,r),t=function(){r.parentNode.removeChild(r)};return n(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;n(e=r)}else t()}}var b,y=(b=[],function(e,n){return b[e]=n,b.filter(Boolean).join("\n")});function x(e,n,t,r){var o=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(n,o);else{var i=document.createTextNode(o),s=e.childNodes;s[n]&&e.removeChild(s[n]),s.length?e.insertBefore(i,s[n]):e.appendChild(i)}}}])});