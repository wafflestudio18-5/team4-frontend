(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[206],{371:function(e,t){!function(e){var t=e.languages.javascript["template-string"],n=t.pattern.source,r=t.inside.interpolation,a=r.inside["interpolation-punctuation"],i=r.pattern.source;function o(t,r){if(e.languages[t])return{pattern:RegExp("((?:"+r+")\\s*)"+n),lookbehind:!0,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},"embedded-code":{pattern:/[\s\S]+/,alias:t}}}}function s(e,t){return"___"+t.toUpperCase()+"_"+e+"___"}function p(t,n,r){var a={code:t,grammar:n,language:r};return e.hooks.run("before-tokenize",a),a.tokens=e.tokenize(a.code,a.grammar),e.hooks.run("after-tokenize",a),a.tokens}function l(t){var n={};n["interpolation-punctuation"]=a;var i=e.tokenize(t,n);if(3===i.length){var o=[1,1];o.push.apply(o,p(i[1],e.languages.javascript,"javascript")),i.splice.apply(i,o)}return new e.Token("interpolation",i,r.alias,t)}function u(t,n,r){var a=e.tokenize(t,{interpolation:{pattern:RegExp(i),lookbehind:!0}}),o=0,u={},c=p(a.map((function(e){if("string"===typeof e)return e;for(var n,a=e.content;-1!==t.indexOf(n=s(o++,r)););return u[n]=a,n})).join(""),n,r),g=Object.keys(u);return o=0,function e(t){for(var n=0;n<t.length;n++){if(o>=g.length)return;var r=t[n];if("string"===typeof r||"string"===typeof r.content){var a=g[o],i="string"===typeof r?r:r.content,s=i.indexOf(a);if(-1!==s){++o;var p=i.substring(0,s),c=l(u[a]),f=i.substring(s+a.length),y=[];if(p&&y.push(p),y.push(c),f){var v=[f];e(v),y.push.apply(y,v)}"string"===typeof r?(t.splice.apply(t,[n,1].concat(y)),n+=y.length-1):r.content=y}}else{var d=r.content;Array.isArray(d)?e(d):e([d])}}}(c),new e.Token(r,c,"language-"+r,t)}e.languages.javascript["template-string"]=[o("css",/\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source),o("html",/\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),o("svg",/\bsvg/.source),o("markdown",/\b(?:md|markdown)/.source),o("graphql",/\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),t].filter(Boolean);var c={javascript:!0,js:!0,typescript:!0,ts:!0,jsx:!0,tsx:!0};function g(e){return"string"===typeof e?e:Array.isArray(e)?e.map(g).join(""):g(e.content)}e.hooks.add("after-tokenize",(function(t){t.language in c&&function t(n){for(var r=0,a=n.length;r<a;r++){var i=n[r];if("string"!==typeof i){var o=i.content;if(Array.isArray(o))if("template-string"===i.type){var s=o[1];if(3===o.length&&"string"!==typeof s&&"embedded-code"===s.type){var p=g(s),l=s.alias,c=Array.isArray(l)?l[0]:l,f=e.languages[c];if(!f)continue;o[1]=u(p,f,c)}}else t(o);else"string"!==typeof o&&t([o])}}}(t.tokens)}))}(Prism)}}]);
//# sourceMappingURL=206.a7ecfdf3.chunk.js.map