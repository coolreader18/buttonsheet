function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=n.parcelRequirea1f0;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},n.parcelRequirea1f0=i),i.register("kyEFX",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i.register("kwljN",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});var n=i("aOgjX");e.exports.iterate=n.iterate,e.exports.zip=n.zip,e.exports.default=n.iterate})),i.register("aOgjX",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});var n=i("6vjrP"),r=i("1xt6a"),o=i("Sq1HQ"),u=i("bXlVX"),l=i("e9GuG"),c=i("gDxL1"),s=i("d3HCh"),a=Symbol.iterator;class f{next(){return this.source.next()}[a](){return this}map(e){return new f(new u.MapIterator(this.source,e))}filter(e){return new f(new r.FilterIterator(this.source,e))}concat(e){return new f(new n.ConcatIterator([this.source,c.toIterator(e)]))}take(e){return new f(new l.SliceIterator(this.source,0,e+1))}drop(e){return new f(new l.SliceIterator(this.source,e,1/0))}slice(e,t=1/0){return new f(new l.SliceIterator(this.source,e,t))}flatten(){return new f(new o.FlattenIterator(this.source))}reduce(e,t){let n;if(void 0===t){if(n=this.source.next(),n.done)throw new TypeError("Reduce of empty Iterator with no initial value");t=n.value}for(;n=this.source.next(),!n.done;)t=e(t,n.value);return t}find(e){let t;for(;;){if(t=this.source.next(),t.done)return;if(e(t.value))return t.value}}includes(e){let t;do{if(t=this.source.next(),!t.done&&t.value===e)return!0}while(!t.done);return!1}some(e){let t;do{if(t=this.source.next(),!t.done&&e(t.value))return!0}while(!t.done);return!1}every(e){let t;do{if(t=this.source.next(),!t.done&&!e(t.value))return!1}while(!t.done);return!0}forEach(e){let t;for(;t=this.source.next(),!t.done;)e(t.value)}join(e=","){let t,n="";for(;t=this.source.next(),!t.done;)n+=e+t.value;return n.substr(e.length)}toArray(){return Array.from(this)}toSet(){const e=new Set;for(;;){const{value:t,done:n}=this.next();if(n)return e;e.add(t)}}toMap(){return new Map(this)}constructor(e){this.source=e}}function _(e){return new f(c.toIterator(e))}e.exports.IteratorWithOperators=f,e.exports.iterate=_,e.exports.zip=function(e,t){return new f(new s.ZipIterator(c.toIterator(e),c.toIterator(t)))},e.exports.default=_})),i.register("6vjrP",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});e.exports.ConcatIterator=class{next(){if(0===this.toConcat.length)return{done:!0};const e=this.toConcat[0].next();return e.done?(this.toConcat.shift(),this.next()):e}constructor(e){this.toConcat=e}}})),i.register("1xt6a",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});e.exports.FilterIterator=class{next(){let e;do{e=this.source.next()}while(!e.done&&!this.predicate(e.value));return e}constructor(e,t){this.source=e,this.predicate=t}}})),i.register("Sq1HQ",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});var n=i("gDxL1");e.exports.FlattenIterator=class{next(){if(this.inner){const e=this.inner.next();if(!e.done)return e;this.inner=void 0}const{value:e,done:t}=this.outer.next();return n.isIterable(e)?(this.inner=e[Symbol.iterator](),this.next()):{value:e,done:t}}constructor(e){this.outer=e}}})),i.register("gDxL1",(function(e,t){function n(e){return"object"==typeof e&&null!==e&&"function"==typeof e.next}function r(e){return"object"==typeof e&&null!==e&&"function"==typeof e[Symbol.iterator]}Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.isIterator=n,e.exports.isIterable=r,e.exports.toIterator=function(e){if(n(e))return e;if(r(e))return e[Symbol.iterator]();throw new Error("Passed collection is neither an Iterator nor an Iterable")}})),i.register("bXlVX",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});e.exports.MapIterator=class{next(){const{value:e,done:t}=this.source.next();return{value:!t&&this.iteratee(e),done:t}}constructor(e,t){this.source=e,this.iteratee=t}}})),i.register("e9GuG",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});e.exports.SliceIterator=class{next(){for(;this.i<this.start;){const e=this.source.next();if(e.done)return e;this.i++}return this.i++,this.i>=this.end?{done:!0}:this.source.next()}constructor(e,t,n=1/0){this.source=e,this.start=t,this.end=n,this.i=0}}})),i.register("d3HCh",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0});e.exports.ZipIterator=class{next(){const e=this.a.next();if(e.done)return{done:!0};const t=this.b.next();return t.done?{done:!0}:{value:[e.value,t.value],done:!1}}constructor(e,t){this.a=e,this.b=t}}})),i.register("dZ4Pc",(function(e,t){e.exports=import("./"+i("kyEFX").resolve("j021v")).then((()=>i("jHUzP")))})),i("kyEFX").register(JSON.parse('{"2lyl3":"index.a9a553ec.js","j021v":"genpdf.b419c0c0.js","cvQVd":"html2canvas.023808a9.js","6GF5t":"purify.46f3d419.js","ddqwU":"index.es.47b8b111.js","aldH9":"index.f083b2ee.css"}'));var u,l,c,s,a,f,_={},d=[],p=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function h(e,t){for(var n in t)e[n]=t[n];return e}function v(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n){var r,o,i,l={};for(i in t)"key"==i?r=t[i]:"ref"==i?o=t[i]:l[i]=t[i];if(arguments.length>2&&(l.children=arguments.length>3?u.call(arguments,2):n),"function"==typeof e&&null!=e.defaultProps)for(i in e.defaultProps)void 0===l[i]&&(l[i]=e.defaultProps[i]);return b(e,l,r,o,null)}function b(e,t,n,r,o){var i={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++c:o};return null==o&&null!=l.vnode&&l.vnode(i),i}function m(e){return e.children}function g(e,t){this.props=e,this.context=t}function x(e,t){if(null==t)return e.__?x(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?x(e):null}function w(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return w(e)}}function P(e){(!e.__d&&(e.__d=!0)&&s.push(e)&&!k.__r++||f!==l.debounceRendering)&&((f=l.debounceRendering)||a)(k)}function k(){for(var e;k.__r=s.length;)e=s.sort((function(e,t){return e.__v.__b-t.__v.__b})),s=[],e.some((function(e){var t,n,r,o,i,u;e.__d&&(i=(o=(t=e).__v).__e,(u=t.__P)&&(n=[],(r=h({},o)).__v=o.__v+1,D(u,o,r,t.__n,void 0!==u.ownerSVGElement,null!=o.__h?[i]:null,n,null==i?x(o):i,o.__h),F(n,o),o.__e!=i&&w(o)))}))}function O(e,t,n,r,o,i,u,l,c,s){var a,f,p,h,v,y,g,w=r&&r.__k||d,P=w.length;for(n.__k=[],a=0;a<t.length;a++)if(null!=(h=n.__k[a]=null==(h=t[a])||"boolean"==typeof h?null:"string"==typeof h||"number"==typeof h||"bigint"==typeof h?b(null,h,null,null,h):Array.isArray(h)?b(m,{children:h},null,null,null):h.__b>0?b(h.type,h.props,h.key,null,h.__v):h)){if(h.__=n,h.__b=n.__b+1,null===(p=w[a])||p&&h.key==p.key&&h.type===p.type)w[a]=void 0;else for(f=0;f<P;f++){if((p=w[f])&&h.key==p.key&&h.type===p.type){w[f]=void 0;break}p=null}D(e,h,p=p||_,o,i,u,l,c,s),v=h.__e,(f=h.ref)&&p.ref!=f&&(g||(g=[]),p.ref&&g.push(p.ref,null,h),g.push(f,h.__c||v,h)),null!=v?(null==y&&(y=v),"function"==typeof h.type&&h.__k===p.__k?h.__d=c=S(h,c,e):c=A(e,h,p,w,v,c),"function"==typeof n.type&&(n.__d=c)):c&&p.__e==c&&c.parentNode!=e&&(c=x(p))}for(n.__e=y,a=P;a--;)null!=w[a]&&("function"==typeof n.type&&null!=w[a].__e&&w[a].__e==n.__d&&(n.__d=x(r,a+1)),H(w[a],w[a]));if(g)for(a=0;a<g.length;a++)C(g[a],g[++a],g[++a])}function S(e,t,n){for(var r,o=e.__k,i=0;o&&i<o.length;i++)(r=o[i])&&(r.__=e,t="function"==typeof r.type?S(r,t,n):A(n,r,r,o,r.__e,t));return t}function A(e,t,n,r,o,i){var u,l,c;if(void 0!==t.__d)u=t.__d,t.__d=void 0;else if(null==n||o!=i||null==o.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(o),u=null;else{for(l=i,c=0;(l=l.nextSibling)&&c<r.length;c+=2)if(l==o)break e;e.insertBefore(o,i),u=i}return void 0!==u?u:o.nextSibling}function j(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||p.test(t)?n:n+"px"}function E(e,t,n,r,o){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||j(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||j(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?r||e.addEventListener(t,i?M:I,i):e.removeEventListener(t,i?M:I,i);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function I(e){this.l[e.type+!1](l.event?l.event(e):e)}function M(e){this.l[e.type+!0](l.event?l.event(e):e)}function D(e,t,n,r,o,i,c,s,a){var f,d,p,y,b,w,P,k,S,A,j,I=t.type;if(void 0!==t.constructor)return null;null!=n.__h&&(a=n.__h,s=t.__e=n.__e,t.__h=null,i=[s]),(f=l.__b)&&f(t);try{e:if("function"==typeof I){if(k=t.props,S=(f=I.contextType)&&r[f.__c],A=f?S?S.props.value:f.__:r,n.__c?P=(d=t.__c=n.__c).__=d.__E:("prototype"in I&&I.prototype.render?t.__c=d=new I(k,A):(t.__c=d=new g(k,A),d.constructor=I,d.render=N),S&&S.sub(d),d.props=k,d.state||(d.state={}),d.context=A,d.__n=r,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=I.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=h({},d.__s)),h(d.__s,I.getDerivedStateFromProps(k,d.__s))),y=d.props,b=d.state,p)null==I.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==I.getDerivedStateFromProps&&k!==y&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(k,A),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(k,d.__s,A)||t.__v===n.__v){d.props=k,d.state=d.__s,t.__v!==n.__v&&(d.__d=!1),d.__v=t,t.__e=n.__e,t.__k=n.__k,t.__k.forEach((function(e){e&&(e.__=t)})),d.__h.length&&c.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(k,d.__s,A),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(y,b,w)}))}d.context=A,d.props=k,d.state=d.__s,(f=l.__r)&&f(t),d.__d=!1,d.__v=t,d.__P=e,f=d.render(d.props,d.state,d.context),d.state=d.__s,null!=d.getChildContext&&(r=h(h({},r),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(w=d.getSnapshotBeforeUpdate(y,b)),j=null!=f&&f.type===m&&null==f.key?f.props.children:f,O(e,Array.isArray(j)?j:[j],t,n,r,o,i,c,s,a),d.base=t.__e,t.__h=null,d.__h.length&&c.push(d),P&&(d.__E=d.__=null),d.__e=!1}else null==i&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=function(e,t,n,r,o,i,l,c){var s,a,f,d=n.props,p=t.props,h=t.type,y=0;if("svg"===h&&(o=!0),null!=i)for(;y<i.length;y++)if((s=i[y])&&"setAttribute"in s==!!h&&(h?s.localName===h:3===s.nodeType)){e=s,i[y]=null;break}if(null==e){if(null===h)return document.createTextNode(p);e=o?document.createElementNS("http://www.w3.org/2000/svg",h):document.createElement(h,p.is&&p),i=null,c=!1}if(null===h)d===p||c&&e.data===p||(e.data=p);else{if(i=i&&u.call(e.childNodes),a=(d=n.props||_).dangerouslySetInnerHTML,f=p.dangerouslySetInnerHTML,!c){if(null!=i)for(d={},y=0;y<e.attributes.length;y++)d[e.attributes[y].name]=e.attributes[y].value;(f||a)&&(f&&(a&&f.__html==a.__html||f.__html===e.innerHTML)||(e.innerHTML=f&&f.__html||""))}if(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||E(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||E(e,i,t[i],n[i],r)}(e,p,d,o,c),f)t.__k=[];else if(y=t.props.children,O(e,Array.isArray(y)?y:[y],t,n,r,o&&"foreignObject"!==h,i,l,i?i[0]:n.__k&&x(n,0),c),null!=i)for(y=i.length;y--;)null!=i[y]&&v(i[y]);c||("value"in p&&void 0!==(y=p.value)&&(y!==d.value||y!==e.value||"progress"===h&&!y)&&E(e,"value",y,d.value,!1),"checked"in p&&void 0!==(y=p.checked)&&y!==e.checked&&E(e,"checked",y,d.checked,!1))}return e}(n.__e,t,n,r,o,i,c,a);(f=l.diffed)&&f(t)}catch(e){t.__v=null,(a||null!=i)&&(t.__e=s,t.__h=!!a,i[i.indexOf(s)]=null),l.__e(e,t,n)}}function F(e,t){l.__c&&l.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){l.__e(e,t.__v)}}))}function C(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){l.__e(e,n)}}function H(e,t,n){var r,o;if(l.unmount&&l.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||C(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){l.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(o=0;o<r.length;o++)r[o]&&H(r[o],t,"function"!=typeof e.type);n||null==e.__e||v(e.__e),e.__e=e.__d=void 0}function N(e,t,n){return this.constructor(e,n)}function R(e,t,n){var r,o,i;l.__&&l.__(e,t),o=(r="function"==typeof n)?null:n&&n.__k||t.__k,i=[],D(t,e=(!r&&n||t).__k=y(m,null,[e]),o||_,_,void 0!==t.ownerSVGElement,!r&&n?[n]:o?null:t.firstChild?u.call(t.childNodes):null,i,!r&&n?n:o?o.__e:t.firstChild,r),F(i,e)}u=d.slice,l={__e:function(e,t){for(var n,r,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&null!=r.getDerivedStateFromError&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(t){e=t}throw e}},c=0,g.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=h({},this.state),"function"==typeof e&&(e=e(h({},n),this.props)),e&&h(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),P(this))},g.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),P(this))},g.prototype.render=m,s=[],a="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,k.__r=0;var T,U,z,L=0,W=[],X=l.__b,q=l.__r,B=l.diffed,G=l.__c,$=l.unmount;function K(e,t){l.__h&&l.__h(U,e,L||t),L=0;var n=U.__H||(U.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function Z(e){return L=1,t=ee,n=e,(o=K(T++,2)).t=t,o.__c||(o.__=[r?r(n):ee(void 0,n),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=U),o.__;var t,n,r,o}function V(){for(var e;e=W.shift();)if(e.__P)try{e.__H.__h.forEach(Q),e.__H.__h.forEach(Y),e.__H.__h=[]}catch(t){e.__H.__h=[],l.__e(t,e.__v)}}l.__b=function(e){U=null,X&&X(e)},l.__r=function(e){q&&q(e),T=0;var t=(U=e.__c).__H;t&&(t.__h.forEach(Q),t.__h.forEach(Y),t.__h=[])},l.diffed=function(e){B&&B(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==W.push(t)&&z===l.requestAnimationFrame||((z=l.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),J&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);J&&(t=requestAnimationFrame(n))})(V)),U=null},l.__c=function(e,t){t.some((function(e){try{e.__h.forEach(Q),e.__h=e.__h.filter((function(e){return!e.__||Y(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],l.__e(n,e.__v)}})),G&&G(e,t)},l.unmount=function(e){$&&$(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach((function(e){try{Q(e)}catch(e){t=e}})),t&&l.__e(t,n.__v))};var J="function"==typeof requestAnimationFrame;function Q(e){var t=U,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),U=t}function Y(e){var t=U;e.__c=e.__(),U=t}function ee(e,t){return"function"==typeof t?t(e):t}var te={};!function(){var e={}.hasOwnProperty;function t(){for(var n=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var i=typeof o;if("string"===i||"number"===i)n.push(o);else if(Array.isArray(o)){if(o.length){var u=t.apply(null,o);u&&n.push(u)}}else if("object"===i)if(o.toString===Object.prototype.toString)for(var l in o)e.call(o,l)&&o[l]&&n.push(l);else n.push(o.toString())}}return n.join(" ")}te?(t.default=t,te=t):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],(function(){return t})):window.classNames=t}();var ne=i("kwljN");function re(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw Error("[Immer] minified error nr: "+e+(n.length?" "+n.map((function(e){return"'"+e+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function oe(e){return!!e&&!!e[Ge]}function ie(e){return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Ke}(e)||Array.isArray(e)||!!e[Be]||!!e.constructor[Be]||_e(e)||de(e))}function ue(e,t,n){void 0===n&&(n=!1),0===le(e)?(n?Object.keys:Ze)(e).forEach((function(r){n&&"symbol"==typeof r||t(r,e[r],e)})):e.forEach((function(n,r){return t(r,n,e)}))}function le(e){var t=e[Ge];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:_e(e)?2:de(e)?3:0}function ce(e,t){return 2===le(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function se(e,t){return 2===le(e)?e.get(t):e[t]}function ae(e,t,n){var r=le(e);2===r?e.set(t,n):3===r?(e.delete(t),e.add(n)):e[t]=n}function fe(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function _e(e){return Le&&e instanceof Map}function de(e){return We&&e instanceof Set}function pe(e){return e.o||e.t}function he(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=Ve(e);delete t[Ge];for(var n=Ze(t),r=0;r<n.length;r++){var o=n[r],i=t[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(Object.getPrototypeOf(e),t)}function ve(e,t){return void 0===t&&(t=!1),be(e)||oe(e)||!ie(e)||(le(e)>1&&(e.set=e.add=e.clear=e.delete=ye),Object.freeze(e),t&&ue(e,(function(e,t){return ve(t,!0)}),!0)),e}function ye(){re(2)}function be(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function me(e){var t=Je[e];return t||re(18,e),t}function ge(e,t){Je[e]||(Je[e]=t)}function xe(){return Ue}function we(e,t){t&&(me("Patches"),e.u=[],e.s=[],e.v=t)}function Pe(e){ke(e),e.p.forEach(Se),e.p=null}function ke(e){e===Ue&&(Ue=e.l)}function Oe(e){return Ue={p:[],l:Ue,h:e,m:!0,_:0}}function Se(e){var t=e[Ge];0===t.i||1===t.i?t.j():t.O=!0}function Ae(e,t){t._=t.p.length;var n=t.p[0],r=void 0!==e&&e!==n;return t.h.g||me("ES5").S(t,e,r),r?(n[Ge].P&&(Pe(t),re(4)),ie(e)&&(e=je(t,e),t.l||Ie(t,e)),t.u&&me("Patches").M(n[Ge].t,e,t.u,t.s)):e=je(t,n,[]),Pe(t),t.u&&t.v(t.u,t.s),e!==qe?e:void 0}function je(e,t,n){if(be(t))return t;var r=t[Ge];if(!r)return ue(t,(function(o,i){return Ee(e,r,t,o,i,n)}),!0),t;if(r.A!==e)return t;if(!r.P)return Ie(e,r.t,!0),r.t;if(!r.I){r.I=!0,r.A._--;var o=4===r.i||5===r.i?r.o=he(r.k):r.o;ue(3===r.i?new Set(o):o,(function(t,i){return Ee(e,r,o,t,i,n)})),Ie(e,o,!1),n&&e.u&&me("Patches").R(r,n,e.u,e.s)}return r.o}function Ee(e,t,n,r,o,i){if(oe(o)){var u=je(e,o,i&&t&&3!==t.i&&!ce(t.D,r)?i.concat(r):void 0);if(ae(n,r,u),!oe(u))return;e.m=!1}if(ie(o)&&!be(o)){if(!e.h.F&&e._<1)return;je(e,o),t&&t.A.l||Ie(e,o)}}function Ie(e,t,n){void 0===n&&(n=!1),e.h.F&&e.m&&ve(t,n)}function Me(e,t){var n=e[Ge];return(n?pe(n):e)[t]}function De(e,t){if(t in e)for(var n=Object.getPrototypeOf(e);n;){var r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=Object.getPrototypeOf(n)}}function Fe(e){e.P||(e.P=!0,e.l&&Fe(e.l))}function Ce(e){e.o||(e.o=he(e.t))}function He(e,t,n){var r=_e(t)?me("MapSet").N(t,n):de(t)?me("MapSet").T(t,n):e.g?function(e,t){var n=Array.isArray(e),r={i:n?1:0,A:t?t.A:xe(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},o=r,i=Qe;n&&(o=[r],i=Ye);var u=Proxy.revocable(o,i),l=u.revoke,c=u.proxy;return r.k=c,r.j=l,c}(t,n):me("ES5").J(t,n);return(n?n.A:xe()).p.push(r),r}function Ne(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return he(e)}function Re(){function e(e,t){function n(){this.constructor=e}o(e,t),e.prototype=(n.prototype=t.prototype,new n)}function t(e){e.o||(e.D=new Map,e.o=new Map(e.t))}function n(e){e.o||(e.o=new Set,e.t.forEach((function(t){if(ie(t)){var n=He(e.A.h,t,e);e.p.set(t,n),e.o.add(n)}else e.o.add(t)})))}function r(e){e.O&&re(3,JSON.stringify(pe(e)))}var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},i=function(){function n(e,t){return this[Ge]={i:2,l:t,A:t?t.A:xe(),P:!1,I:!1,o:void 0,D:void 0,t:e,k:this,C:!1,O:!1},this}e(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return pe(this[Ge]).size}}),o.has=function(e){return pe(this[Ge]).has(e)},o.set=function(e,n){var o=this[Ge];return r(o),pe(o).has(e)&&pe(o).get(e)===n||(t(o),Fe(o),o.D.set(e,!0),o.o.set(e,n),o.D.set(e,!0)),this},o.delete=function(e){if(!this.has(e))return!1;var n=this[Ge];return r(n),t(n),Fe(n),n.t.has(e)?n.D.set(e,!1):n.D.delete(e),n.o.delete(e),!0},o.clear=function(){var e=this[Ge];r(e),pe(e).size&&(t(e),Fe(e),e.D=new Map,ue(e.t,(function(t){e.D.set(t,!1)})),e.o.clear())},o.forEach=function(e,t){var n=this;pe(this[Ge]).forEach((function(r,o){e.call(t,n.get(o),o,n)}))},o.get=function(e){var n=this[Ge];r(n);var o=pe(n).get(e);if(n.I||!ie(o))return o;if(o!==n.t.get(e))return o;var i=He(n.A.h,o,n);return t(n),n.o.set(e,i),i},o.keys=function(){return pe(this[Ge]).keys()},o.values=function(){var e,t=this,n=this.keys();return(e={})[$e]=function(){return t.values()},e.next=function(){var e=n.next();return e.done?e:{done:!1,value:t.get(e.value)}},e},o.entries=function(){var e,t=this,n=this.keys();return(e={})[$e]=function(){return t.entries()},e.next=function(){var e=n.next();if(e.done)return e;var r=t.get(e.value);return{done:!1,value:[e.value,r]}},e},o[$e]=function(){return this.entries()},n}(),u=function(){function t(e,t){return this[Ge]={i:3,l:t,A:t?t.A:xe(),P:!1,I:!1,o:void 0,t:e,k:this,p:new Map,O:!1,C:!1},this}e(t,Set);var o=t.prototype;return Object.defineProperty(o,"size",{get:function(){return pe(this[Ge]).size}}),o.has=function(e){var t=this[Ge];return r(t),t.o?!!t.o.has(e)||!(!t.p.has(e)||!t.o.has(t.p.get(e))):t.t.has(e)},o.add=function(e){var t=this[Ge];return r(t),this.has(e)||(n(t),Fe(t),t.o.add(e)),this},o.delete=function(e){if(!this.has(e))return!1;var t=this[Ge];return r(t),n(t),Fe(t),t.o.delete(e)||!!t.p.has(e)&&t.o.delete(t.p.get(e))},o.clear=function(){var e=this[Ge];r(e),pe(e).size&&(n(e),Fe(e),e.o.clear())},o.values=function(){var e=this[Ge];return r(e),n(e),e.o.values()},o.entries=function(){var e=this[Ge];return r(e),n(e),e.o.entries()},o.keys=function(){return this.values()},o[$e]=function(){return this.values()},o.forEach=function(e,t){for(var n=this.values(),r=n.next();!r.done;)e.call(t,r.value,r.value,this),r=n.next()},t}();ge("MapSet",{N:function(e,t){return new i(e,t)},T:function(e,t){return new u(e,t)}})}var Te,Ue,ze="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),Le="undefined"!=typeof Map,We="undefined"!=typeof Set,Xe="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,qe=ze?Symbol.for("immer-nothing"):((Te={})["immer-nothing"]=!0,Te),Be=ze?Symbol.for("immer-draftable"):"__$immer_draftable",Ge=ze?Symbol.for("immer-state"):"__$immer_state",$e="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Ke=""+Object.prototype.constructor,Ze="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,Ve=Object.getOwnPropertyDescriptors||function(e){var t={};return Ze(e).forEach((function(n){t[n]=Object.getOwnPropertyDescriptor(e,n)})),t},Je={},Qe={get:function(e,t){if(t===Ge)return e;var n=pe(e);if(!ce(n,t))return function(e,t,n){var r,o=De(t,n);return o?"value"in o?o.value:null===(r=o.get)||void 0===r?void 0:r.call(e.k):void 0}(e,n,t);var r=n[t];return e.I||!ie(r)?r:r===Me(e.t,t)?(Ce(e),e.o[t]=He(e.A.h,r,e)):r},has:function(e,t){return t in pe(e)},ownKeys:function(e){return Reflect.ownKeys(pe(e))},set:function(e,t,n){var r=De(pe(e),t);if(null==r?void 0:r.set)return r.set.call(e.k,n),!0;if(!e.P){var o=Me(pe(e),t),i=null==o?void 0:o[Ge];if(i&&i.t===n)return e.o[t]=n,e.D[t]=!1,!0;if(fe(n,o)&&(void 0!==n||ce(e.t,t)))return!0;Ce(e),Fe(e)}return e.o[t]===n&&"number"!=typeof n&&(void 0!==n||t in e.o)||(e.o[t]=n,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==Me(e.t,t)||t in e.t?(e.D[t]=!1,Ce(e),Fe(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var n=pe(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:r.enumerable,value:n[t]}:r},defineProperty:function(){re(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){re(12)}},Ye={};ue(Qe,(function(e,t){Ye[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Ye.deleteProperty=function(e,t){return Ye.set.call(this,e,t,void 0)},Ye.set=function(e,t,n){return Qe.set.call(this,e[0],t,n,e[0])};var et=function(){function e(e){var t=this;this.g=Xe,this.F=!0,this.produce=function(e,n,r){if("function"==typeof e&&"function"!=typeof n){var o=n;n=e;var i=t;return function(e){var t=this;void 0===e&&(e=o);for(var r=arguments.length,u=Array(r>1?r-1:0),l=1;l<r;l++)u[l-1]=arguments[l];return i.produce(e,(function(e){var r;return(r=n).call.apply(r,[t,e].concat(u))}))}}var u;if("function"!=typeof n&&re(6),void 0!==r&&"function"!=typeof r&&re(7),ie(e)){var l=Oe(t),c=He(t,e,void 0),s=!0;try{u=n(c),s=!1}finally{s?Pe(l):ke(l)}return"undefined"!=typeof Promise&&u instanceof Promise?u.then((function(e){return we(l,r),Ae(e,l)}),(function(e){throw Pe(l),e})):(we(l,r),Ae(u,l))}if(!e||"object"!=typeof e){if(void 0===(u=n(e))&&(u=e),u===qe&&(u=void 0),t.F&&ve(u,!0),r){var a=[],f=[];me("Patches").M(e,u,a,f),r(a,f)}return u}re(21,e)},this.produceWithPatches=function(e,n){if("function"==typeof e)return function(n){for(var r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return t.produceWithPatches(n,(function(t){return e.apply(void 0,[t].concat(o))}))};var r,o,i=t.produce(e,n,(function(e,t){r=e,o=t}));return"undefined"!=typeof Promise&&i instanceof Promise?i.then((function(e){return[e,r,o]})):[i,r,o]},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){ie(e)||re(8),oe(e)&&(e=function(e){return oe(e)||re(22,e),function e(t){if(!ie(t))return t;var n,r=t[Ge],o=le(t);if(r){if(!r.P&&(r.i<4||!me("ES5").K(r)))return r.t;r.I=!0,n=Ne(t,o),r.I=!1}else n=Ne(t,o);return ue(n,(function(t,o){r&&se(r.t,t)===o||ae(n,t,e(o))})),3===o?new Set(n):n}(e)}(e));var t=Oe(this),n=He(this,e,void 0);return n[Ge].C=!0,ke(t),n},t.finishDraft=function(e,t){var n=(e&&e[Ge]).A;return we(n,t),Ae(void 0,n)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!Xe&&re(20),this.g=e},t.applyPatches=function(e,t){var n;for(n=t.length-1;n>=0;n--){var r=t[n];if(0===r.path.length&&"replace"===r.op){e=r.value;break}}n>-1&&(t=t.slice(n+1));var o=me("Patches").$;return oe(e)?o(e,t):this.produce(e,(function(e){return o(e,t)}))},e}(),tt=new et,nt=tt.produce,rt=(tt.produceWithPatches.bind(tt),tt.setAutoFreeze.bind(tt),tt.setUseProxies.bind(tt),tt.applyPatches.bind(tt),tt.createDraft.bind(tt),tt.finishDraft.bind(tt),nt);Re();let ot=0;const it=()=>ot++,ut=()=>({blob:new Blob,full:!1}),lt=()=>new Map([[it(),ut()]]),ct=i("dZ4Pc"),st=()=>{const[e,n]=Z((()=>new Map([[it(),lt()]])));return y("div",{className:"form_55ddf4"},y("h2",null,"Button sheet generator"),y("p",null,'The rows are layers, the different images in each row are "alts" - they\'ll be tiled on the output sheet, so if you have 2 layers made of alts X, Y, Z and A, B the output will be XA, YB, ZA, XB, etc.'),t(ne)(e).map((([e,t])=>y(ft,{key:e,alts:t,update:(t,r)=>{n((n=>rt(n,(n=>{const o=n.get(e),i=r(o.get(t));i?o.set(t,i):o.delete(t)}))))},addAlt:()=>{n((t=>rt(t,(t=>{t.get(e).set(it(),ut())}))))},removeLayer:()=>{n((t=>rt(t,(t=>{t.delete(e)}))))}}))).toArray(),y("p",null,y("button",{onClick:()=>n((e=>rt(e,(e=>e.set(it(),lt())))))},"Add Layer")),y("p",null,y("button",{onClick:()=>(async e=>{const{genPdf:n}=await ct,r=window.open();r.document.write('<h1 style="text-align:center;">Please wait...</h1>');try{const o=await n(t(ne)(e.values()).map((e=>Array.from(e.values()))).toArray());r.location=o.output("bloburi").toString()}catch(e){r.close(),alert("Error while generating pdf: "+e)}})(e)},"Create")))},at=({update:e,full:n})=>{const[r,o]=Z(void 0);return y("div",{className:"button-layer_55ddf4"},y("label",{className:"d-contents_55ddf4"},y("input",{type:"file",className:"hidden_55ddf4",onInput:t=>{const n=t.target.files[0];o(`url(${URL.createObjectURL(n)})`),e((e=>({...e,blob:n})))}}),y("div",{role:"button",className:t(te)("layer-img_55ddf4",r?null:"upload-icon_55ddf4",n&&"layer-img-full_55ddf4"),style:{backgroundImage:r}})),y("div",{className:t(te)("layer-config_55ddf4","h100_55ddf4")},y("button",{className:t(te)("h100_55ddf4","text-button_55ddf4"),onClick:()=>e((()=>null))},"🗙"),y("input",{className:t(te)("h100_55ddf4","text-button_55ddf4","checkbox_55ddf4"),type:"checkbox",checked:n,onChange:t=>e((e=>({...e,full:t.target.checked}))),style:{appearance:"none"},checkedMark:"◎",uncheckedMark:"○"})))},ft=({alts:e,update:n,addAlt:r,removeLayer:o})=>y("div",{className:"layers-row_55ddf4"},y("button",{className:t(te)("text-button_55ddf4","remove-layer_55ddf4"),onClick:o},"🗙"),t(ne)(e).map((([e,t])=>y(at,{key:e,update:t=>n(e,t),full:t.full}))).toArray(),y("div",{className:t(te)("add-alt_55ddf4","text-button_55ddf4"),onClick:r,style:{fontSize:"1.5em"}},"＋"));R(y(st,null),document.getElementById("app"));
//# sourceMappingURL=index.a9a553ec.js.map
