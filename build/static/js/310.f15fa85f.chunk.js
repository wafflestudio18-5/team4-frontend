(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[310],{477:function(a,e){!function(a){var e=/(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source;a.languages.phpdoc=a.languages.extend("javadoclike",{parameter:{pattern:RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:"+e+"\\s+)?)\\$\\w+"),lookbehind:!0}}),a.languages.insertBefore("phpdoc","keyword",{"class-name":[{pattern:RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)"+e),lookbehind:!0,inside:{keyword:/\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/,punctuation:/[|\\[\]()]/}}]}),a.languages.javadoclike.addSupport("php",a.languages.phpdoc)}(Prism)}}]);
//# sourceMappingURL=310.f15fa85f.chunk.js.map