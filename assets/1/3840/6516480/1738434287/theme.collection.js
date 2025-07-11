!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).noUiSlider={})}(this,function(ot){"use strict";function n(t){return"object"==typeof t&&"function"==typeof t.to}function st(t){t.parentElement.removeChild(t)}function at(t){return null!=t}function lt(t){t.preventDefault()}function i(t){return"number"==typeof t&&!isNaN(t)&&isFinite(t)}function ut(t,e,r){0<r&&(ft(t,e),setTimeout(function(){dt(t,e)},r))}function ct(t){return Math.max(Math.min(t,100),0)}function pt(t){return Array.isArray(t)?t:[t]}function e(t){t=(t=String(t)).split(".");return 1<t.length?t[1].length:0}function ft(t,e){t.classList&&!/\s/.test(e)?t.classList.add(e):t.className+=" "+e}function dt(t,e){t.classList&&!/\s/.test(e)?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}function ht(t){var e=void 0!==window.pageXOffset,r="CSS1Compat"===(t.compatMode||"");return{x:e?window.pageXOffset:(r?t.documentElement:t.body).scrollLeft,y:e?window.pageYOffset:(r?t.documentElement:t.body).scrollTop}}function s(t,e){return 100/(e-t)}function a(t,e,r){return 100*e/(t[r+1]-t[r])}function l(t,e){for(var r=1;t>=e[r];)r+=1;return r}function r(t,e,r){if(r>=t.slice(-1)[0])return 100;var n=l(r,t),i=t[n-1],o=t[n],t=e[n-1],n=e[n];return t+(r=r,a(o=[i,o],o[0]<0?r+Math.abs(o[0]):r-o[0],0)/s(t,n))}function o(t,e,r,n){if(100===n)return n;var i=l(n,t),o=t[i-1],s=t[i];return r?(s-o)/2<n-o?s:o:e[i-1]?t[i-1]+(t=n-t[i-1],i=e[i-1],Math.round(t/i)*i):n}ot.PipsMode=void 0,(H=ot.PipsMode||(ot.PipsMode={})).Range="range",H.Steps="steps",H.Positions="positions",H.Count="count",H.Values="values",ot.PipsType=void 0,(H=ot.PipsType||(ot.PipsType={}))[H.None=-1]="None",H[H.NoValue=0]="NoValue",H[H.LargeValue=1]="LargeValue",H[H.SmallValue=2]="SmallValue";var u=(t.prototype.getDistance=function(t){for(var e=[],r=0;r<this.xNumSteps.length-1;r++)e[r]=a(this.xVal,t,r);return e},t.prototype.getAbsoluteDistance=function(t,e,r){var n=0;if(t<this.xPct[this.xPct.length-1])for(;t>this.xPct[n+1];)n++;else t===this.xPct[this.xPct.length-1]&&(n=this.xPct.length-2);r||t!==this.xPct[n+1]||n++;for(var i,o=1,s=(e=null===e?[]:e)[n],a=0,l=0,u=0,c=r?(t-this.xPct[n])/(this.xPct[n+1]-this.xPct[n]):(this.xPct[n+1]-t)/(this.xPct[n+1]-this.xPct[n]);0<s;)i=this.xPct[n+1+u]-this.xPct[n+u],100<e[n+u]*o+100-100*c?(a=i*c,o=(s-100*c)/e[n+u],c=1):(a=e[n+u]*i/100*o,o=0),r?(l-=a,1<=this.xPct.length+u&&u--):(l+=a,1<=this.xPct.length-u&&u++),s=e[n+u]*o;return t+l},t.prototype.toStepping=function(t){return t=r(this.xVal,this.xPct,t)},t.prototype.fromStepping=function(t){return function(t,e,r){if(100<=r)return t.slice(-1)[0];var n=l(r,e),i=t[n-1],o=t[n],t=e[n-1],n=e[n];return(r-t)*s(t,n)*((o=[i,o])[1]-o[0])/100+o[0]}(this.xVal,this.xPct,t)},t.prototype.getStep=function(t){return t=o(this.xPct,this.xSteps,this.snap,t)},t.prototype.getDefaultStep=function(t,e,r){var n=l(t,this.xPct);return(100===t||e&&t===this.xPct[n-1])&&(n=Math.max(n-1,1)),(this.xVal[n]-this.xVal[n-1])/r},t.prototype.getNearbySteps=function(t){t=l(t,this.xPct);return{stepBefore:{startValue:this.xVal[t-2],step:this.xNumSteps[t-2],highestStep:this.xHighestCompleteStep[t-2]},thisStep:{startValue:this.xVal[t-1],step:this.xNumSteps[t-1],highestStep:this.xHighestCompleteStep[t-1]},stepAfter:{startValue:this.xVal[t],step:this.xNumSteps[t],highestStep:this.xHighestCompleteStep[t]}}},t.prototype.countStepDecimals=function(){var t=this.xNumSteps.map(e);return Math.max.apply(null,t)},t.prototype.hasNoSize=function(){return this.xVal[0]===this.xVal[this.xVal.length-1]},t.prototype.convert=function(t){return this.getStep(this.toStepping(t))},t.prototype.handleEntryPoint=function(t,e){t="min"===t?0:"max"===t?100:parseFloat(t);if(!i(t)||!i(e[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");this.xPct.push(t),this.xVal.push(e[0]);e=Number(e[1]);t?this.xSteps.push(!isNaN(e)&&e):isNaN(e)||(this.xSteps[0]=e),this.xHighestCompleteStep.push(0)},t.prototype.handleStepPoint=function(t,e){e&&(this.xVal[t]!==this.xVal[t+1]?(this.xSteps[t]=a([this.xVal[t],this.xVal[t+1]],e,0)/s(this.xPct[t],this.xPct[t+1]),e=(this.xVal[t+1]-this.xVal[t])/this.xNumSteps[t],e=Math.ceil(Number(e.toFixed(3))-1),e=this.xVal[t]+this.xNumSteps[t]*e,this.xHighestCompleteStep[t]=e):this.xSteps[t]=this.xHighestCompleteStep[t]=this.xVal[t])},t);function t(e,t,r){var n;this.xPct=[],this.xVal=[],this.xSteps=[],this.xNumSteps=[],this.xHighestCompleteStep=[],this.xSteps=[r||!1],this.xNumSteps=[!1],this.snap=t;var i=[];for(Object.keys(e).forEach(function(t){i.push([pt(e[t]),t])}),i.sort(function(t,e){return t[0][0]-e[0][0]}),n=0;n<i.length;n++)this.handleEntryPoint(i[n][1],i[n][0]);for(this.xNumSteps=this.xSteps.slice(0),n=0;n<this.xNumSteps.length;n++)this.handleStepPoint(n,this.xNumSteps[n])}var c={to:function(t){return void 0===t?"":t.toFixed(2)},from:Number},p={target:"target",base:"base",origin:"origin",handle:"handle",handleLower:"handle-lower",handleUpper:"handle-upper",touchArea:"touch-area",horizontal:"horizontal",vertical:"vertical",background:"background",connect:"connect",connects:"connects",ltr:"ltr",rtl:"rtl",textDirectionLtr:"txt-dir-ltr",textDirectionRtl:"txt-dir-rtl",draggable:"draggable",drag:"state-drag",tap:"state-tap",active:"active",tooltip:"tooltip",pips:"pips",pipsHorizontal:"pips-horizontal",pipsVertical:"pips-vertical",marker:"marker",markerHorizontal:"marker-horizontal",markerVertical:"marker-vertical",markerNormal:"marker-normal",markerLarge:"marker-large",markerSub:"marker-sub",value:"value",valueHorizontal:"value-horizontal",valueVertical:"value-vertical",valueNormal:"value-normal",valueLarge:"value-large",valueSub:"value-sub"},mt={tooltips:".__tooltips",aria:".__aria"};function f(t,e){if(!i(e))throw new Error("noUiSlider: 'step' is not numeric.");t.singleStep=e}function d(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");t.keyboardPageMultiplier=e}function h(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");t.keyboardMultiplier=e}function m(t,e){if(!i(e))throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");t.keyboardDefaultStep=e}function g(t,e){if("object"!=typeof e||Array.isArray(e))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===e.min||void 0===e.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");t.spectrum=new u(e,t.snap||!1,t.singleStep)}function v(t,e){if(e=pt(e),!Array.isArray(e)||!e.length)throw new Error("noUiSlider: 'start' option is incorrect.");t.handles=e.length,t.start=e}function b(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'snap' option must be a boolean.");t.snap=e}function S(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'animate' option must be a boolean.");t.animate=e}function x(t,e){if("number"!=typeof e)throw new Error("noUiSlider: 'animationDuration' option must be a number.");t.animationDuration=e}function y(t,e){var r,n=[!1];if("lower"===e?e=[!0,!1]:"upper"===e&&(e=[!1,!0]),!0===e||!1===e){for(r=1;r<t.handles;r++)n.push(e);n.push(!1)}else{if(!Array.isArray(e)||!e.length||e.length!==t.handles+1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");n=e}t.connect=n}function w(t,e){switch(e){case"horizontal":t.ort=0;break;case"vertical":t.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function E(t,e){if(!i(e))throw new Error("noUiSlider: 'margin' option must be numeric.");0!==e&&(t.margin=t.spectrum.getDistance(e))}function P(t,e){if(!i(e))throw new Error("noUiSlider: 'limit' option must be numeric.");if(t.limit=t.spectrum.getDistance(e),!t.limit||t.handles<2)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.")}function C(t,e){var r;if(!i(e)&&!Array.isArray(e))throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");if(Array.isArray(e)&&2!==e.length&&!i(e[0])&&!i(e[1]))throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");if(0!==e){for(Array.isArray(e)||(e=[e,e]),t.padding=[t.spectrum.getDistance(e[0]),t.spectrum.getDistance(e[1])],r=0;r<t.spectrum.xNumSteps.length-1;r++)if(t.padding[0][r]<0||t.padding[1][r]<0)throw new Error("noUiSlider: 'padding' option must be a positive number(s).");var n=e[0]+e[1],e=t.spectrum.xVal[0];if(1<n/(t.spectrum.xVal[t.spectrum.xVal.length-1]-e))throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.")}}function N(t,e){switch(e){case"ltr":t.dir=0;break;case"rtl":t.dir=1;break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function V(t,e){if("string"!=typeof e)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var r=0<=e.indexOf("tap"),n=0<=e.indexOf("drag"),i=0<=e.indexOf("fixed"),o=0<=e.indexOf("snap"),s=0<=e.indexOf("hover"),a=0<=e.indexOf("unconstrained"),l=0<=e.indexOf("drag-all"),e=0<=e.indexOf("smooth-steps");if(i){if(2!==t.handles)throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");E(t,t.start[1]-t.start[0])}if(a&&(t.margin||t.limit))throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");t.events={tap:r||o,drag:n,dragAll:l,smoothSteps:e,fixed:i,snap:o,hover:s,unconstrained:a}}function k(t,e){if(!1!==e)if(!0===e||n(e)){t.tooltips=[];for(var r=0;r<t.handles;r++)t.tooltips.push(e)}else{if((e=pt(e)).length!==t.handles)throw new Error("noUiSlider: must pass a formatter for all handles.");e.forEach(function(t){if("boolean"!=typeof t&&!n(t))throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.")}),t.tooltips=e}}function M(t,e){if(e.length!==t.handles)throw new Error("noUiSlider: must pass a attributes for all handles.");t.handleAttributes=e}function A(t,e){if(!n(e))throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");t.ariaFormat=e}function U(t,e){if(!n(r=e)||"function"!=typeof r.from)throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");var r;t.format=e}function D(t,e){if("boolean"!=typeof e)throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");t.keyboardSupport=e}function O(t,e){t.documentElement=e}function L(t,e){if("string"!=typeof e&&!1!==e)throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");t.cssPrefix=e}function T(e,r){if("object"!=typeof r)throw new Error("noUiSlider: 'cssClasses' must be an object.");"string"==typeof e.cssPrefix?(e.cssClasses={},Object.keys(r).forEach(function(t){e.cssClasses[t]=e.cssPrefix+r[t]})):e.cssClasses=r}function gt(e){var r={margin:null,limit:null,padding:null,animate:!0,animationDuration:300,ariaFormat:c,format:c},n={step:{r:!1,t:f},keyboardPageMultiplier:{r:!1,t:d},keyboardMultiplier:{r:!1,t:h},keyboardDefaultStep:{r:!1,t:m},start:{r:!0,t:v},connect:{r:!0,t:y},direction:{r:!0,t:N},snap:{r:!1,t:b},animate:{r:!1,t:S},animationDuration:{r:!1,t:x},range:{r:!0,t:g},orientation:{r:!1,t:w},margin:{r:!1,t:E},limit:{r:!1,t:P},padding:{r:!1,t:C},behaviour:{r:!0,t:V},ariaFormat:{r:!1,t:A},format:{r:!1,t:U},tooltips:{r:!1,t:k},keyboardSupport:{r:!0,t:D},documentElement:{r:!1,t:O},cssPrefix:{r:!0,t:L},cssClasses:{r:!0,t:T},handleAttributes:{r:!1,t:M}},i={connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal",keyboardSupport:!0,cssPrefix:"noUi-",cssClasses:p,keyboardPageMultiplier:5,keyboardMultiplier:1,keyboardDefaultStep:10};e.format&&!e.ariaFormat&&(e.ariaFormat=e.format),Object.keys(n).forEach(function(t){if(at(e[t])||void 0!==i[t])n[t].t(r,(at(e[t])?e:i)[t]);else if(n[t].r)throw new Error("noUiSlider: '"+t+"' is required.")}),r.pips=e.pips;var t=document.createElement("div"),o=void 0!==t.style.msTransform,t=void 0!==t.style.transform;r.transformRule=t?"transform":o?"msTransform":"webkitTransform";return r.style=[["left","top"],["right","bottom"]][r.dir][r.ort],r}function j(t,f,o){var i,l,a,n,s,u,c=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},p=window.CSS&&CSS.supports&&CSS.supports("touch-action","none")&&function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}(),d=t,S=f.spectrum,h=[],m=[],g=[],v=0,b={},x=t.ownerDocument,y=f.documentElement||x.documentElement,w=x.body,E="rtl"===x.dir||1===f.ort?0:100;function P(t,e){var r=x.createElement("div");return e&&ft(r,e),t.appendChild(r),r}function C(t,e){var r,t=P(t,f.cssClasses.origin),n=P(t,f.cssClasses.handle);return P(n,f.cssClasses.touchArea),n.setAttribute("data-handle",String(e)),f.keyboardSupport&&(n.setAttribute("tabindex","0"),n.addEventListener("keydown",function(t){return function(t,e){if(V()||k(e))return!1;var r=["Left","Right"],n=["Down","Up"],i=["PageDown","PageUp"],o=["Home","End"];f.dir&&!f.ort?r.reverse():f.ort&&!f.dir&&(n.reverse(),i.reverse());var s=t.key.replace("Arrow",""),a=s===i[0],l=s===i[1],i=s===n[0]||s===r[0]||a,n=s===n[1]||s===r[1]||l,r=s===o[0],o=s===o[1];if(!(i||n||r||o))return!0;if(t.preventDefault(),n||i){var u=i?0:1,u=nt(e)[u];if(null===u)return!1;!1===u&&(u=S.getDefaultStep(m[e],i,f.keyboardDefaultStep)),u*=l||a?f.keyboardPageMultiplier:f.keyboardMultiplier,u=Math.max(u,1e-7),u*=i?-1:1,u=h[e]+u}else u=o?f.spectrum.xVal[f.spectrum.xVal.length-1]:f.spectrum.xVal[0];return Q(e,S.toStepping(u),!0,!0),I("slide",e),I("update",e),I("change",e),I("set",e),!1}(t,e)})),void 0!==f.handleAttributes&&(r=f.handleAttributes[e],Object.keys(r).forEach(function(t){n.setAttribute(t,r[t])})),n.setAttribute("role","slider"),n.setAttribute("aria-orientation",f.ort?"vertical":"horizontal"),0===e?ft(n,f.cssClasses.handleLower):e===f.handles-1&&ft(n,f.cssClasses.handleUpper),t}function N(t,e){return!!e&&P(t,f.cssClasses.connect)}function e(t,e){return!(!f.tooltips||!f.tooltips[e])&&P(t.firstChild,f.cssClasses.tooltip)}function V(){return d.hasAttribute("disabled")}function k(t){return l[t].hasAttribute("disabled")}function M(){s&&(Y("update"+mt.tooltips),s.forEach(function(t){t&&st(t)}),s=null)}function A(){M(),s=l.map(e),X("update"+mt.tooltips,function(t,e,r){s&&f.tooltips&&!1!==s[e]&&(t=t[e],!0!==f.tooltips[e]&&(t=f.tooltips[e].to(r[e])),s[e].innerHTML=t)})}function U(t,e){return t.map(function(t){return S.fromStepping(e?S.getStep(t):t)})}function D(d){var h=function(t){if(t.mode===ot.PipsMode.Range||t.mode===ot.PipsMode.Steps)return S.xVal;if(t.mode!==ot.PipsMode.Count)return t.mode===ot.PipsMode.Positions?U(t.values,t.stepped):t.mode===ot.PipsMode.Values?t.stepped?t.values.map(function(t){return S.fromStepping(S.getStep(S.toStepping(t)))}):t.values:[];if(t.values<2)throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");for(var e=t.values-1,r=100/e,n=[];e--;)n[e]=e*r;return n.push(100),U(n,t.stepped)}(d),m={},t=S.xVal[0],e=S.xVal[S.xVal.length-1],g=!1,v=!1,b=0;return(h=h.slice().sort(function(t,e){return t-e}).filter(function(t){return!this[t]&&(this[t]=!0)},{}))[0]!==t&&(h.unshift(t),g=!0),h[h.length-1]!==e&&(h.push(e),v=!0),h.forEach(function(t,e){var r,n,i,o,s,a,l,u,t=t,c=h[e+1],p=d.mode===ot.PipsMode.Steps,f=(f=p?S.xNumSteps[e]:f)||c-t;for(void 0===c&&(c=t),f=Math.max(f,1e-7),r=t;r<=c;r=Number((r+f).toFixed(7))){for(a=(o=(i=S.toStepping(r))-b)/(d.density||1),u=o/(l=Math.round(a)),n=1;n<=l;n+=1)m[(s=b+n*u).toFixed(5)]=[S.fromStepping(s),0];a=-1<h.indexOf(r)?ot.PipsType.LargeValue:p?ot.PipsType.SmallValue:ot.PipsType.NoValue,!e&&g&&r!==c&&(a=0),r===c&&v||(m[i.toFixed(5)]=[r,a]),b=i}}),m}function O(i,o,s){var t,a=x.createElement("div"),n=((t={})[ot.PipsType.None]="",t[ot.PipsType.NoValue]=f.cssClasses.valueNormal,t[ot.PipsType.LargeValue]=f.cssClasses.valueLarge,t[ot.PipsType.SmallValue]=f.cssClasses.valueSub,t),l=((t={})[ot.PipsType.None]="",t[ot.PipsType.NoValue]=f.cssClasses.markerNormal,t[ot.PipsType.LargeValue]=f.cssClasses.markerLarge,t[ot.PipsType.SmallValue]=f.cssClasses.markerSub,t),u=[f.cssClasses.valueHorizontal,f.cssClasses.valueVertical],c=[f.cssClasses.markerHorizontal,f.cssClasses.markerVertical];function p(t,e){var r=e===f.cssClasses.value;return e+" "+(r?u:c)[f.ort]+" "+(r?n:l)[t]}return ft(a,f.cssClasses.pips),ft(a,0===f.ort?f.cssClasses.pipsHorizontal:f.cssClasses.pipsVertical),Object.keys(i).forEach(function(t){var e,r,n;r=i[e=t][0],n=i[t][1],(n=o?o(r,n):n)!==ot.PipsType.None&&((t=P(a,!1)).className=p(n,f.cssClasses.marker),t.style[f.style]=e+"%",n>ot.PipsType.NoValue&&((t=P(a,!1)).className=p(n,f.cssClasses.value),t.setAttribute("data-value",String(r)),t.style[f.style]=e+"%",t.innerHTML=String(s.to(r))))}),a}function L(){n&&(st(n),n=null)}function T(t){L();var e=D(t),r=t.filter,t=t.format||{to:function(t){return String(Math.round(t))}};return n=d.appendChild(O(e,r,t))}function j(){var t=i.getBoundingClientRect(),e="offset"+["Width","Height"][f.ort];return 0===f.ort?t.width||i[e]:t.height||i[e]}function z(n,i,o,s){function e(t){var e,r=function(e,t,r){var n=0===e.type.indexOf("touch"),i=0===e.type.indexOf("mouse"),o=0===e.type.indexOf("pointer"),s=0,a=0;0===e.type.indexOf("MSPointer")&&(o=!0);if("mousedown"===e.type&&!e.buttons&&!e.touches)return!1;if(n){var l=function(t){t=t.target;return t===r||r.contains(t)||e.composed&&e.composedPath().shift()===r};if("touchstart"===e.type){n=Array.prototype.filter.call(e.touches,l);if(1<n.length)return!1;s=n[0].pageX,a=n[0].pageY}else{l=Array.prototype.find.call(e.changedTouches,l);if(!l)return!1;s=l.pageX,a=l.pageY}}t=t||ht(x),(i||o)&&(s=e.clientX+t.x,a=e.clientY+t.y);return e.pageOffset=t,e.points=[s,a],e.cursor=i||o,e}(t,s.pageOffset,s.target||i);return!!r&&(!(V()&&!s.doNotReject)&&(e=d,t=f.cssClasses.tap,!((e.classList?e.classList.contains(t):new RegExp("\\b"+t+"\\b").test(e.className))&&!s.doNotReject)&&(!(n===c.start&&void 0!==r.buttons&&1<r.buttons)&&((!s.hover||!r.buttons)&&(p||r.preventDefault(),r.calcPoint=r.points[f.ort],void o(r,s))))))}var r=[];return n.split(" ").forEach(function(t){i.addEventListener(t,e,!!p&&{passive:!0}),r.push([t,e])}),r}function H(t){var e,r,n=ct(n=100*(t-(n=i,e=f.ort,r=n.getBoundingClientRect(),n=(t=n.ownerDocument).documentElement,t=ht(t),/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)&&(t.x=0),e?r.top+t.y-n.clientTop:r.left+t.x-n.clientLeft))/j());return f.dir?100-n:n}function F(t,e){"mouseout"===t.type&&"HTML"===t.target.nodeName&&null===t.relatedTarget&&_(t,e)}function R(t,e){if(-1===navigator.appVersion.indexOf("MSIE 9")&&0===t.buttons&&0!==e.buttonsProperty)return _(t,e);t=(f.dir?-1:1)*(t.calcPoint-e.startCalcPoint);G(0<t,100*t/e.baseSize,e.locations,e.handleNumbers,e.connect)}function _(t,e){e.handle&&(dt(e.handle,f.cssClasses.active),--v),e.listeners.forEach(function(t){y.removeEventListener(t[0],t[1])}),0===v&&(dt(d,f.cssClasses.drag),K(),t.cursor&&(w.style.cursor="",w.removeEventListener("selectstart",lt))),f.events.smoothSteps&&(e.handleNumbers.forEach(function(t){Q(t,m[t],!0,!0,!1,!1)}),e.handleNumbers.forEach(function(t){I("update",t)})),e.handleNumbers.forEach(function(t){I("change",t),I("set",t),I("end",t)})}function B(t,e){var r,n,i,o;e.handleNumbers.some(k)||(1===e.handleNumbers.length&&(o=l[e.handleNumbers[0]].children[0],v+=1,ft(o,f.cssClasses.active)),t.stopPropagation(),n=z(c.move,y,R,{target:t.target,handle:o,connect:e.connect,listeners:r=[],startCalcPoint:t.calcPoint,baseSize:j(),pageOffset:t.pageOffset,handleNumbers:e.handleNumbers,buttonsProperty:t.buttons,locations:m.slice()}),i=z(c.end,y,_,{target:t.target,handle:o,listeners:r,doNotReject:!0,handleNumbers:e.handleNumbers}),o=z("mouseout",y,F,{target:t.target,handle:o,listeners:r,doNotReject:!0,handleNumbers:e.handleNumbers}),r.push.apply(r,n.concat(i,o)),t.cursor&&(w.style.cursor=getComputedStyle(t.target).cursor,1<l.length&&ft(d,f.cssClasses.drag),w.addEventListener("selectstart",lt,!1)),e.handleNumbers.forEach(function(t){I("start",t)}))}function r(t){t.stopPropagation();var i,o,s,e=H(t.calcPoint),r=(i=e,s=!(o=100),l.forEach(function(t,e){var r,n;k(e)||(r=m[e],((n=Math.abs(r-i))<o||n<=o&&r<i||100===n&&100===o)&&(s=e,o=n))}),s);!1!==r&&(f.events.snap||ut(d,f.cssClasses.tap,f.animationDuration),Q(r,e,!0,!0),K(),I("slide",r,!0),I("update",r,!0),f.events.snap?B(t,{handleNumbers:[r]}):(I("change",r,!0),I("set",r,!0)))}function q(t){var t=H(t.calcPoint),t=S.getStep(t),e=S.fromStepping(t);Object.keys(b).forEach(function(t){"hover"===t.split(".")[0]&&b[t].forEach(function(t){t.call(it,e)})})}function X(t,e){b[t]=b[t]||[],b[t].push(e),"update"===t.split(".")[0]&&l.forEach(function(t,e){I("update",e)})}function Y(t){var n=t&&t.split(".")[0],i=n?t.substring(n.length):t;Object.keys(b).forEach(function(t){var e=t.split(".")[0],r=t.substring(e.length);n&&n!==e||i&&i!==r||((e=r)!==mt.aria&&e!==mt.tooltips||i===r)&&delete b[t]})}function I(r,n,i){Object.keys(b).forEach(function(t){var e=t.split(".")[0];r===e&&b[t].forEach(function(t){t.call(it,h.map(f.format.to),n,h.slice(),i||!1,m.slice(),it)})})}function W(t,e,r,n,i,o,s){var a;return 1<l.length&&!f.events.unconstrained&&(n&&0<e&&(a=S.getAbsoluteDistance(t[e-1],f.margin,!1),r=Math.max(r,a)),i&&e<l.length-1&&(a=S.getAbsoluteDistance(t[e+1],f.margin,!0),r=Math.min(r,a))),1<l.length&&f.limit&&(n&&0<e&&(a=S.getAbsoluteDistance(t[e-1],f.limit,!1),r=Math.min(r,a)),i&&e<l.length-1&&(a=S.getAbsoluteDistance(t[e+1],f.limit,!0),r=Math.max(r,a))),f.padding&&(0===e&&(a=S.getAbsoluteDistance(0,f.padding[0],!1),r=Math.max(r,a)),e===l.length-1&&(a=S.getAbsoluteDistance(100,f.padding[1],!0),r=Math.min(r,a))),!((r=ct(r=!s?S.getStep(r):r))===t[e]&&!o)&&r}function $(t,e){var r=f.ort;return(r?e:t)+", "+(r?t:e)}function G(t,r,n,e,i){var o=n.slice(),s=e[0],a=f.events.smoothSteps,l=[!t,t],u=[t,!t];e=e.slice(),t&&e.reverse(),1<e.length?e.forEach(function(t,e){e=W(o,t,o[t]+r,l[e],u[e],!1,a);!1===e?r=0:(r=e-o[t],o[t]=e)}):l=u=[!0];var c=!1;e.forEach(function(t,e){c=Q(t,n[t]+r,l[e],u[e],!1,a)||c}),c&&(e.forEach(function(t){I("update",t),I("slide",t)}),null!=i&&I("drag",s))}function J(t,e){return f.dir?100-t-e:t}function K(){g.forEach(function(t){var e=50<m[t]?-1:1,e=3+(l.length+e*t);l[t].style.zIndex=String(e)})}function Q(t,e,r,n,i,o){return!1!==(e=i?e:W(m,t,e,r,n,!1,o))&&(e=e,m[t=t]=e,h[t]=S.fromStepping(e),e="translate("+$(J(e,0)-E+"%","0")+")",l[t].style[f.transformRule]=e,Z(t),Z(t+1),!0)}function Z(t){var e,r;a[t]&&(r=100,e="translate("+$(J(e=(e=0)!==t?m[t-1]:e,r=(r=t!==a.length-1?m[t]:r)-e)+"%","0")+")",r="scale("+$(r/100,"1")+")",a[t].style[f.transformRule]=e+" "+r)}function tt(t,e){return null===t||!1===t||void 0===t?m[e]:("number"==typeof t&&(t=String(t)),!1===(t=!1!==(t=f.format.from(t))?S.toStepping(t):t)||isNaN(t)?m[e]:t)}function et(t,e,r){var n=pt(t),t=void 0===m[0];e=void 0===e||e,f.animate&&!t&&ut(d,f.cssClasses.tap,f.animationDuration),g.forEach(function(t){Q(t,tt(n[t],t),!0,!1,r)});var i,o=1===g.length?0:1;for(t&&S.hasNoSize()&&(r=!0,m[0]=0,1<g.length&&(i=100/(g.length-1),g.forEach(function(t){m[t]=t*i})));o<g.length;++o)g.forEach(function(t){Q(t,m[t],!0,!0,r)});K(),g.forEach(function(t){I("update",t),null!==n[t]&&e&&I("set",t)})}function rt(t){if(t=void 0===t?!1:t)return 1===h.length?h[0]:h.slice(0);t=h.map(f.format.to);return 1===t.length?t[0]:t}function nt(t){var e=m[t],r=S.getNearbySteps(e),n=h[t],i=r.thisStep.step,t=null;if(f.snap)return[n-r.stepBefore.startValue||null,r.stepAfter.startValue-n||null];!1!==i&&n+i>r.stepAfter.startValue&&(i=r.stepAfter.startValue-n),t=n>r.thisStep.startValue?r.thisStep.step:!1!==r.stepBefore.step&&n-r.stepBefore.highestStep,100===e?i=null:0===e&&(t=null);e=S.countStepDecimals();return null!==i&&!1!==i&&(i=Number(i.toFixed(e))),[t=null!==t&&!1!==t?Number(t.toFixed(e)):t,i]}ft(t=d,f.cssClasses.target),0===f.dir?ft(t,f.cssClasses.ltr):ft(t,f.cssClasses.rtl),0===f.ort?ft(t,f.cssClasses.horizontal):ft(t,f.cssClasses.vertical),ft(t,"rtl"===getComputedStyle(t).direction?f.cssClasses.textDirectionRtl:f.cssClasses.textDirectionLtr),i=P(t,f.cssClasses.base),function(t,e){var r=P(e,f.cssClasses.connects);l=[],(a=[]).push(N(r,t[0]));for(var n=0;n<f.handles;n++)l.push(C(e,n)),g[n]=n,a.push(N(r,t[n+1]))}(f.connect,i),(u=f.events).fixed||l.forEach(function(t,e){z(c.start,t.children[0],B,{handleNumbers:[e]})}),u.tap&&z(c.start,i,r,{}),u.hover&&z(c.move,i,q,{hover:!0}),u.drag&&a.forEach(function(e,t){var r,n,i,o,s;!1!==e&&0!==t&&t!==a.length-1&&(r=l[t-1],n=l[t],i=[e],o=[r,n],s=[t-1,t],ft(e,f.cssClasses.draggable),u.fixed&&(i.push(r.children[0]),i.push(n.children[0])),u.dragAll&&(o=l,s=g),i.forEach(function(t){z(c.start,t,B,{handles:o,handleNumbers:s,connect:e})}))}),et(f.start),f.pips&&T(f.pips),f.tooltips&&A(),Y("update"+mt.aria),X("update"+mt.aria,function(t,e,o,r,s){g.forEach(function(t){var e=l[t],r=W(m,t,0,!0,!0,!0),n=W(m,t,100,!0,!0,!0),i=s[t],t=String(f.ariaFormat.to(o[t])),r=S.fromStepping(r).toFixed(1),n=S.fromStepping(n).toFixed(1),i=S.fromStepping(i).toFixed(1);e.children[0].setAttribute("aria-valuemin",r),e.children[0].setAttribute("aria-valuemax",n),e.children[0].setAttribute("aria-valuenow",i),e.children[0].setAttribute("aria-valuetext",t)})});var it={destroy:function(){for(Y(mt.aria),Y(mt.tooltips),Object.keys(f.cssClasses).forEach(function(t){dt(d,f.cssClasses[t])});d.firstChild;)d.removeChild(d.firstChild);delete d.noUiSlider},steps:function(){return g.map(nt)},on:X,off:Y,get:rt,set:et,setHandle:function(t,e,r,n){if(!(0<=(t=Number(t))&&t<g.length))throw new Error("noUiSlider: invalid handle number, got: "+t);Q(t,tt(e,t),!0,!0,n),I("update",t),r&&I("set",t)},reset:function(t){et(f.start,t)},__moveHandles:function(t,e,r){G(t,e,m,r)},options:o,updateOptions:function(e,t){var r=rt(),n=["margin","limit","padding","range","animate","snap","step","format","pips","tooltips"];n.forEach(function(t){void 0!==e[t]&&(o[t]=e[t])});var i=gt(o);n.forEach(function(t){void 0!==e[t]&&(f[t]=i[t])}),S=i.spectrum,f.margin=i.margin,f.limit=i.limit,f.padding=i.padding,f.pips?T(f.pips):L(),(f.tooltips?A:M)(),m=[],et(at(e.start)?e.start:r,t)},target:d,removePips:L,removeTooltips:M,getPositions:function(){return m.slice()},getTooltips:function(){return s},getOrigins:function(){return l},pips:T};return it}function z(t,e){if(!t||!t.nodeName)throw new Error("noUiSlider: create requires a single element, got: "+t);if(t.noUiSlider)throw new Error("noUiSlider: Slider was already initialized.");e=j(t,gt(e),e);return t.noUiSlider=e}var H={__spectrum:u,cssClasses:p,create:z};ot.create=z,ot.cssClasses=p,ot.default=H,Object.defineProperty(ot,"__esModule",{value:!0})});
$(document).ready(() => {

	const filterWidget = $('.filter')
	const filterForm = filterWidget.find('[data-filter-form]')
	const filterSettings = filterForm.data('filter-form')

	const filterPage = filterForm.find('[name="page"]')
	const filterPageSize = filterForm.find('[name="page_size"]')
	const filterOrder = filterForm.find('[name="order"]')
	const filterOnlyAvailable = filterForm.find('[name="only_available"]')
	let filterOpenItems, filterActiveItem = [], filterAjax = null

	let filterShortScroll = 0

	const ajaxCollectionReload = '[data-ajax-collection-reload]'
	const ajaxCollectionContent = $('[data-ajax-collection-content]')

	let filter = {
		init: () => {
			let url = filterForm.attr('action') + location.search
			fetch('/front_api' + url).then((response) => {
				return response.json()
			}).then((data) => {
				filter.loadFilters(data)
			})
		},
		update: (action, paginate_url) => {

			ajaxCollectionContent.addClass('in-progress')
			$('.js-collection-short-filters').addClass('is-disabled')

			if (action == 'checkbox' || action == 'range' || action == 'order' || action == 'submit' || action == 'reset') {
				filterPage.prop('disabled', true)
				filterPage.val(filterPage.data('value-default'))
			}

			filterWidget.find('[data-value-default]').each((index, item) => {
				let itemTarget = $(item)
				let itemVal = itemTarget.val()
				let itemDefault = itemTarget.data('value-default')
				if (itemVal == itemDefault) {
					itemTarget.prop('disabled', true)
				}
			})

			window.history.replaceState({}, '', filterForm.data('action') + ((filterForm.serialize() != '') ? '?' : '') + filterForm.serialize())

			let url = filterForm.data('action') + location.search

			fetch('/front_api' + url).then((response) => {
				return response.json()
			}).then((data) => {
				filter.loadFilters(data)
				if (action == 'submit' || action == 'pagination' || action == 'order' || filterSettings['autosubmit']) {
					filter.loadProducts(url)
				}
				$.each(filterOpenItems, function (index, item) {
					$('.filter-item[data-item-id="' + item + '"]').addClass('is-open')
				})
			})
		},
		initRange: () => {
			filterWidget.find('[data-range]').each((index, item) => {
				let rangeItem = $(item)
				let rangeSettings = rangeItem.data('range')
				let rangeSlider = rangeItem[0]
				let rangeInputs = []
				if (rangeSettings['type'] == 'prices') {
					rangeInputs = [
						$('[name="price_min"]')[0],
						$('[name="price_max"]')[0]
					]
				} else {
					rangeInputs = [
						$('[name="properties_gt[' + rangeSettings['id'] + ']"]')[0],
						$('[name="properties_lt[' + rangeSettings['id'] + ']"]')[0]
					]
				}
				let rangeOptions = {
					start: [
						rangeSettings['from'],
						rangeSettings['to']
					],
					connect: true,
					behaviour: 'drag-tap',
					tooltips: {
						to: (numericValue) => (rangeSettings['type'] == 'prices') ? Shop.money.format(numericValue) : Math.round(numericValue)
					},
					format: {
						from: (numericValue) => Math.round(numericValue),
						to: (numericValue) => Math.round(numericValue)
					},
					range: {
						'min': rangeSettings['min'],
						'max': rangeSettings['max']
					},
					pips: {
						mode: 'count',
						values: 2,
						density: 2,
						format: {
							to: (numericValue) => (rangeSettings['type'] == 'prices') ? Shop.money.format(numericValue) : Math.round(numericValue)
						}
					}
				}
				rangeOptions.tooltips = false
				rangeOptions.pips = false
				noUiSlider.create(rangeSlider, rangeOptions)
				rangeSlider.noUiSlider.on('update', (values, handle) => {
					rangeInputs[handle].value = values[handle]
				})
				rangeSlider.noUiSlider.on('change', (values, handle) => {
					//filterActiveItem = rangeItem.closest('[data-filter-item]').data('filter-item')
					filter.update('range')
				})
				rangeInputs.forEach((input, handle) => {
					input.addEventListener('change', (e) => {
						let targetItem = e.target
						if (isNaN(parseInt(targetItem.value))) {
							targetItem.value = (handle === 0) ? rangeSettings['from'] : rangeSettings['to']
						}
						rangeSlider.noUiSlider.setHandle(handle, targetItem.value)
						filter.update('range')
					})
				})
			})
		},
		loadFilters: (data) => {

			filterPage.prop('disabled', false)
			filterPageSize.prop('disabled', false)
			filterOrder.prop('disabled', false)
			filterOnlyAvailable.prop('disabled', false)

			filterWidget.find('[data-filter-count]').text(declOfNum(data.count, Messages.finded) + ' ' + data.count + ' ' + declOfNum(data.count))
			if (filterSettings['options']) {
				$.each(data['options'], (index, item) => {
					if ((filterActiveItem).toString() != (item.id).toString()) {
						filterWidget.find('[data-filter-item="' + item.id + '"] .js-filter-values').html(templateLodashRender({
							item: item
						}, 'filter-item-option'))
					}
					//подумать этот момент с выделением
					if (filterWidget.find('[data-filter-item="' + item.id + '"] :checked').length > 0) {
						filterWidget.find('[data-filter-item="' + item.id + '"]').addClass('is-active').addClass('is-open')
					} else {
						filterWidget.find('[data-filter-item="' + item.id + '"]').removeClass('is-active')
					}
					if (filterWidget.find('[data-filter-item="' + item.id + '"] input:enabled').length > 0) {
						filterWidget.find('[data-filter-item="' + item.id + '"]').removeClass('is-disabled')
					} else {
						filterWidget.find('[data-filter-item="' + item.id + '"]').addClass('is-disabled')
					}
				})
			}
			if (filterSettings['properties']) {
				$.each(data['properties'], (index, item) => {
					if ((filterActiveItem).toString() != (item.id).toString()) {
						if (item['is_numeric?'] && item['characteristics'].length > 1) {
							filterWidget.find('[data-filter-item="' + item.id + '"] .js-filter-values').html(templateLodashRender({
								item: item
							}, 'filter-item-range'))
						} else {
							filterWidget.find('[data-filter-item="' + item.id + '"] .js-filter-values').html(templateLodashRender({
								item: item
							}, 'filter-item-property'))
						}
					}
					//подумать этот момент с выделением
					if (filterWidget.find('[data-filter-item="' + item.id + '"] .js-filter-values :checked').length > 0 || filterWidget.find('[data-filter-item="' + item.id + '"] .active-range').length > 0) {
						filterWidget.find('[data-filter-item="' + item.id + '"]').addClass('is-active').addClass('is-open')
					} else {
						filterWidget.find('[data-filter-item="' + item.id + '"]').removeClass('is-active')
					}
					if (filterWidget.find('[data-filter-item="' + item.id + '"] input:enabled').length > 0) {
						filterWidget.find('[data-filter-item="' + item.id + '"]').removeClass('is-disabled')
					} else {
						filterWidget.find('[data-filter-item="' + item.id + '"]').addClass('is-disabled')
					}
				})
			}
			if (filterSettings['prices']) {
				filterWidget.find('[data-filter-item="0"] .js-filter-values').html(templateLodashRender({
					current_price_min: getUrlParameter('price_min') || null,
					current_price_max: getUrlParameter('price_max') || null
				}, 'filter-item-price'))
				//подумать этот момент с выделением
				if (filterWidget.find('[data-filter-item="0"] .active-range').length > 0) {
					filterWidget.find('[data-filter-item="0"]').addClass('is-active').addClass('is-open')
				} else {
					filterWidget.find('[data-filter-item="0"]').removeClass('is-active')
				}
			}
			filter.initRange()
			filter.isFiltered()
			filter.shortFilters()
			filterActiveItem = ''
		},
		loadProducts: (url) => {
			$('.js-collection-short-filters').addClass('is-disabled')
			if (filterAjax != null) {
				filterAjax.abort()
			}
			filterAjax = $.ajax({
				url: url,
				type: 'GET',
				dataType: 'html',
				success: (products) => {
					filter.reloadItems(products)
					filterAjax = null
					$('form.product-card').each((index, item) => {
						Products.initInstance($(item))
					})
					lazyLoad.update()
					FavoritesProducts.update()
					Compare.update()
					if (globalFunctions.seoCutItems) {
						globalFunctions.seoCutItems()
					}
					filter.shortFilters()
					setTimeout(() => {
						ajaxCollectionContent.removeClass('in-progress')
						$('.js-collection-short-filters').removeClass('is-disabled')
					}, 200)
				}
			})
		},
		reloadItems: (products) => {
			$(ajaxCollectionReload).each((index, item) => {
				let name = $(item).attr('data-ajax-collection-reload')
				let target = '[data-ajax-collection-reload="' + name + '"]'
				$(target).html($(products).find(target).html())
				if ($(target).children().length == 0) {
					$(target).addClass('is-empty')
				} else {
					$(target).removeClass('is-empty')
				}
			})
		},
		isFiltered: () => {
			let filteredCount = location.search.includes('only_available') + location.search.includes('options') + location.search.includes('characteristics') + location.search.includes('properties_gt') + location.search.includes('properties_lt') + location.search.includes('price_min') + location.search.includes('price_max') || 0
			if (filteredCount > 0 || filterSettings['seo']) {
				filterForm.addClass('is-filtered')
			} else {
				filterForm.removeClass('is-filtered')
			}
			filterForm.addClass('is-init')
		},
		reset: () => {
			filterSettings['seo'] = false;
			filterOnlyAvailable.prop('checked', false)
			filterForm.find('.js-filter-values :input').prop('disabled', true)
			filter.update('reset')
		},
		resetItem: (item) => {
			item.removeClass('is-active')
			item.find('.js-filter-values :input').prop('disabled', true)
			filter.update('reset')
		},
		selectAll: (item) => {
			item.addClass('is-active')
			item.find('.js-filter-values :input:enabled').prop('checked', true)
			filter.update('checkbox')
		},
		shortFilters: () => {
			let filtersShort = $('.js-collection-short-filters')
			let filterCounter = 0
			filtersShort.html('').addClass('is-empty')
			$.each($('[data-filter-item]'), function (index, item) {
				let filterItem = $(this)
				let filterItemId = Number($(this).data('filter-item'))
				let filterShortText = ''
				switch (filterItemId) {
					case -1:
						let only_available = $('[name="only_available"]')
						if (only_available.prop('checked')) {
							filterShortText = only_available.data('title')
							filtersShort.append(templateLodashRender({
								item: filterItemId,
								type: 'available',
								text: filterShortText
							}, 'filter-item-short')).removeClass('is-empty')
							filterCounter++
						}
						break;
					case 0:
						let filterItemPrice = filterItem.find('.js-filter-values .active-range')
						if (filterItemPrice.length > 0) {
							filterShortText = Shop.money.format($('[name="price_min"]').val()) + ' – ' + Shop.money.format($('[name="price_max"]').val())
							filtersShort.append(templateLodashRender({
								item: filterItemId,
								type: 'range',
								text: filterShortText
							}, 'filter-item-short')).removeClass('is-empty')
							filterCounter++
						}
						break;
					default:
						let filterItemChecked = filterItem.find('.js-filter-values :checked')
						if (filterItemChecked.length > 0) {
							$.each(filterItemChecked, function (index, item) {
								filterItemId = $(item).val()
								filterShortText = $(item).data('title')
								filtersShort.append(templateLodashRender({
									item: filterItemId,
									type: 'value',
									text: filterShortText
								}, 'filter-item-short')).removeClass('is-empty')
								filterCounter++
							})
						}
						let filterItemRange = filterItem.find('.js-filter-values .active-range')
						if (filterItemRange.length > 0) {
							filterShortText = $('[name="properties_gt[' + filterItemId + ']"]').val() + ' – ' + $('[name="properties_lt[' + filterItemId + ']"]').val()
							filtersShort.append(templateLodashRender({
								item: filterItemId,
								type: 'range',
								text: filterShortText
							}, 'filter-item-short')).removeClass('is-empty')
							filterCounter++
						}
				}
			})
			if (filterCounter > 1) {
				filtersShort.prepend(templateLodashRender({}, 'filter-item-short-reset'))
			}
			filtersShort.scrollLeft(filterShortScroll)
		}
	}

	if (filterWidget.length > 0) {
		filter.init()
	}

	$(document).on('click', '[data-filter-submit]', function (e) {
		e.preventDefault()
		if (filterSettings['ajax']) {
			$('body').removeClass('is-overflow')
			filterWidget.removeClass('is-open')
			let scrollMargin = $('.js-header-main-sticky').outerHeight()
			scrollToElement($('.js-collection-filter-scroll-target:first'), scrollMargin)
			/*$('.js-collection-short-filters').scrollLeft(0)*/
		} else {
			filterForm.submit()
		}
	})

	$(document).on('click', '[data-filter-reset]', function (e) {
		e.preventDefault()
		/*filterWidget.removeClass('is-open')
		let scrollMargin = $('.js-header-main-sticky').outerHeight()
		scrollToElement($('.js-collection-filter-scroll-target:first'), scrollMargin)*/
		filter.reset()
	})

	$(document).on('click', '[data-paginate-part]', function (e) {
		if (filterSettings['ajax']) {
			e.preventDefault()
			let scrollMargin = $('.js-header-main-sticky').outerHeight()
			scrollToElement($('.js-collection-filter-scroll-target:first'), scrollMargin)
			filterPage.val($(this).data('paginate-part') || 1)
			filter.update('pagination')
		}
	})
	$(document).on('change', '[data-paginate-select]', function (e) {
		if (filterSettings['ajax']) {
			e.preventDefault()
			let scrollMargin = $('.js-header-main-sticky').outerHeight()
			scrollToElement($('.js-collection-filter-scroll-target:first'), scrollMargin)
			filterPage.val($(this).val() || 1)
			filter.update('pagination')
		}
	})

	$(document).on('change', '.js-order', function (e) {
		filterOrder.val($(this).val())
		filter.update('order')
	})

	$(document).on('click', '.js-filter-toggle', function (e) {
		e.preventDefault()
		if ($(e.target).closest('.js-filter-item-reset').length) {
			filter.resetItem($(this).closest('.js-filter-item'))
		} else {
			$(this).closest('.js-filter-item').toggleClass('is-open')
			filterOpenItems = $('.js-filter-item.is-open').map(function () {
				return $(this).data('filter-item')
			}).get()
			// для фильтра над товарами
			if (!$(this).closest('.js-filter-item').hasClass('is-inline-open')) {
				$('.is-inline-open', filterForm).removeClass('is-inline-open')
			}
			$(this).closest('.js-filter-item').toggleClass('is-inline-open')
		}
	})

	$(document).on('click', '[data-filter-reset_item]', function (e) {
		e.preventDefault()
		filter.resetItem($(this).closest('.js-filter-item'))
	})

	$(document).on('click', '[data-filter-select_all]', function (e) {
		e.preventDefault()
		filter.selectAll($(this).closest('.js-filter-item'))
	})

	$(document).on('click', (e) => {
		if ($(e.target).closest('.js-filter-item').length == 0) {
			$('.is-inline-open', filterForm).removeClass('is-inline-open')
		}
	})

	filterWidget.on('change', '[type="checkbox"]', function (e) {
		filterActiveItem = $(this).closest('[data-filter-item]').data('filter-item')
		filter.update('checkbox')
	})

	filterForm.on('submit', function (e) {
		e.preventDefault()
		filter.update('submit')
	})

	$(document).on('click', '[data-filter-mobile-toggle]', function (e) {
		e.preventDefault()
		filterWidget.toggleClass('is-open')
		if (filterWidget.hasClass('is-open')) {
			$('body').addClass('is-overflow')
		} else {
			$('body').removeClass('is-overflow')
		}
	})

	$(document).on('click', '[data-filter-short-reset]', function (e) {
		e.preventDefault()
		let filterShort = $('.js-collection-short-filters')
		let target = $(this).data('filter-short-reset')
		let type = $(this).data('filter-short-type')
		filterShortScroll = filterShort.scrollLeft()
		filterShort.addClass('is-disabled')
		switch (type) {
			case 'available':
				$('[name="only_available"]').prop('checked', false).trigger('change')
				break
			case 'range':
				$('[data-filter-item="' + target + '"]').find('.js-filter-item-reset').trigger('click')
				break
			default:
				$('#filter-item-' + target).prop('checked', false).trigger('change')
		}
		$(this).remove()
	})

})
;
$(document).ready(() => {
  let subcollectionsLargeItems = Number($('.js-subcollections-swiper-large').data('subcollections-items')) || 5
  const swiperLarge = new Swiper('.js-subcollections-swiper-large', {
    slidesPerView: subcollectionsLargeItems,
    slidesPerGroup: subcollectionsLargeItems,
    spaceBetween: 20,
    loop: false,
    touchEventsTarget: 'container',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20
      },
      1025: {
        slidesPerView: subcollectionsLargeItems,
        slidesPerGroup: subcollectionsLargeItems,
        spaceBetween: 20
      }
    }
  })
  
  let subcollectionsCompactItems = Number($('.js-subcollections-swiper-compact').data('subcollections-items')) - 1 || 4
  const swiperCompact = new Swiper('.js-subcollections-swiper-compact', {
    slidesPerView: subcollectionsCompactItems,
    slidesPerGroup: subcollectionsCompactItems,
    spaceBetween: 20,
    loop: false,
    touchEventsTarget: 'container',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10
      },
      376: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10
      },
      576: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20
      },
      1025: {
        slidesPerView: subcollectionsCompactItems,
        slidesPerGroup: subcollectionsCompactItems,
        spaceBetween: 20
      }
    }
  })
})
;
$(document).ready(() => {

	$('.js-collection-nav-toggle').on('click', function (e) {
		e.preventDefault()
		$(this).closest('[data-nav-item]').toggleClass('is-open')
	})

	$.each(Site.current_collections, (index, item) => {
		$('.collection-nav [data-nav-item="' + item.id + '"]').addClass('is-active is-open')
	})

	$.each(Site.current_collections_all, (index, item) => {
		$('.collection-nav [data-nav-item="' + item.id + '-all"]').addClass('is-active is-open')
	})

})
;
$(document).ready(() => {

  $(document).on('click', '.js-seo-filters-toggle', function () {
    $('.js-seo-filters').toggleClass('is-open');
  })

  function seoCutItems () {
    $('.js-seo-filters').addClass('is-overflow')
    $('.js-seo-filters .seo-filters__item.is-active').css('order', -1)
    $('.js-seo-filters .seo-filters__item.is-toggle').removeClass('is-hidden')
    let width = $('.js-seo-filters').outerWidth()
    let hideAllNext = false
    let moreWidth = $('.js-seo-filters .is-toggle').outerWidth()
    let moreHeight = $('.js-seo-filters .is-toggle').outerHeight() + 5
    let moreActive = 0
    let moreLines = Number($('.js-seo-filters').data('lines'))
    if ($('.js-seo-filters .is-active').length > 0) {
      if ($('.js-seo-filters .is-active').position().top > moreHeight) {
        moreActive = $('.js-seo-filters .is-active').outerWidth() + 5
      }
    }
    $('.js-seo-filters a.seo-filters__item').each((index, item) => {
      $(item).removeClass('is-hidden')
      if (!hideAllNext) {
        if ($(item).position().top < moreHeight * moreLines) {
          if (($(item).position().top >= moreHeight * (moreLines - 1)) && ($(item).position().left + $(item).outerWidth() + 5 + moreWidth + moreActive > width)) {
            hideAllNext = true
          }
        } else {
          hideAllNext = true
        }
      }
      if (hideAllNext) {
        $(item).addClass('is-hidden')
      }
    })
    if (hideAllNext) {
      $('.js-seo-filters .seo-filters__item.is-toggle').removeClass('is-hidden')
    } else {
      $('.js-seo-filters .seo-filters__item.is-toggle').addClass('is-hidden')
    }

    $('.js-seo-filters').removeClass('is-overflow')
    $('.js-seo-filters .seo-filters__item.is-active').css('order', '')

  }

  seoCutItems()

  globalFunctions.seoCutItems = () => {
    seoCutItems()
  }

})
;





