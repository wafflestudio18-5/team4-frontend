(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[120],{285:function(a,e){!function(a){a.languages.etlua={delimiter:{pattern:/^<%[-=]?|-?%>$/,alias:"punctuation"},"language-lua":{pattern:/[\s\S]+/,inside:a.languages.lua}},a.hooks.add("before-tokenize",(function(e){a.languages["markup-templating"].buildPlaceholders(e,"etlua",/<%[\s\S]+?%>/g)})),a.hooks.add("after-tokenize",(function(e){a.languages["markup-templating"].tokenizePlaceholders(e,"etlua")}))}(Prism)}}]);
//# sourceMappingURL=120.ade84f43.chunk.js.map