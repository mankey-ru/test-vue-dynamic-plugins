System.register([],(function(e){return{execute:function(){e(function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n,r){e.exports=r(1)},function(e,n){(()=>{const e=[],n=window.System;function r(e,r,t){return(o,u)=>{if(e.sourceCode)o(t.component(`plug__${r}__${e.sourceCode.name}`,e.sourceCode));else{if(!e.sourceUrl)throw"Neither sourceCode nor sourceUrl present";n.import(e.sourceUrl).then(e=>o(e.default)).catch(u)}}}function t(e){if(!e.preload||!e.sourceUrl)return;const n=document.createElement("link");n.href=e.sourceUrl,n.rel="preload",n.as="script",document.head.appendChild(n)}window.WflowPluginManager={registerPlugin:function(n){e.push(n)},getRoutes:function(n){const o=[];return e.forEach(e=>{e.routes.forEach(u=>{t(u),o.push({name:`plug__${e.name}__${u.name}`,path:`/plug__${e.name}__${u.path}`,component:()=>({component:new Promise(r(u,e.name,n))})})})}),o},registerGlobalComps:function(n){e.forEach(e=>{e.globalComps.forEach(o=>{t(o),n.component("PLUGCMP",r(o,e.name,n))})})},getPlugin:function(n){return e.find(e=>e.name===n)}}})()}]))}}}));
//# sourceMappingURL=pluginManager.js.map