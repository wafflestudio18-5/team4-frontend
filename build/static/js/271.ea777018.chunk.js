(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[271],{365:function(a,e){!function(a){var e=/\{[^\r\n\[\]{}]*\}/,n={"quoted-string":{pattern:/"(?:[^"\\]|\\.)*"/,alias:"operator"},"command-param-id":{pattern:/(\s)\w+:/,lookbehind:!0,alias:"property"},"command-param-value":[{pattern:e,alias:"selector"},{pattern:/([\t ])\S+/,lookbehind:!0,greedy:!0,alias:"operator"},{pattern:/\S(?:.*\S)?/,alias:"operator"}]};function t(a){return"string"==typeof a?a:Array.isArray(a)?a.map(t).join(""):t(a.content)}a.languages.naniscript={comment:{pattern:/^([\t ]*);.*/m,lookbehind:!0},define:{pattern:/^>.+/m,alias:"tag",inside:{value:{pattern:/(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/,lookbehind:!0,alias:"operator"},key:{pattern:/(^>)\w+/,lookbehind:!0}}},label:{pattern:/^([\t ]*)#[\t ]*\w+[\t ]*$/m,lookbehind:!0,alias:"regex"},command:{pattern:/^([\t ]*)@\w+(?=[\t ]|$).*/m,lookbehind:!0,alias:"function",inside:{"command-name":/^@\w+/,expression:{pattern:e,greedy:!0,alias:"selector"},"command-params":{pattern:/[\s\S]*\S[\s\S]*/,inside:n}}},"generic-text":{pattern:/(^[ \t]*)[^#@>;\s].*/m,lookbehind:!0,alias:"punctuation",inside:{"escaped-char":/\\[{}\[\]"]/,expression:{pattern:e,greedy:!0,alias:"selector"},"inline-command":{pattern:/\[[\t ]*\w+[^\r\n\[\]]*\]/,greedy:!0,alias:"function",inside:{"command-params":{pattern:/(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/,lookbehind:!0,inside:n},"command-param-name":{pattern:/^(\[[\t ]*)\w+/,lookbehind:!0,alias:"name"},"start-stop-char":/[\[\]]/}}}}},a.languages.nani=a.languages.naniscript,a.hooks.add("after-tokenize",(function(a){a.tokens.forEach((function(a){if("string"!=typeof a&&"generic-text"===a.type){var e=t(a);(function(a){for(var e=[],n=0;n<a.length;n++){var t=a[n],r="[]{}".indexOf(t);if(-1!==r)if(r%2==0)e.push(r+1);else if(e.pop()!==r)return!1}return 0===e.length})(e)||(a.type="bad-line",a.content=e)}}))}))}(Prism)}}]);
//# sourceMappingURL=271.ea777018.chunk.js.map