(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[172],{266:function(t,a){!function(t){t.languages.http={"request-line":{pattern:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,inside:{property:/^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,"attr-name":/:\w+/}},"response-status":{pattern:/^HTTP\/1.[01] \d+.*/m,inside:{property:{pattern:/(^HTTP\/1.[01] )\d+.*/i,lookbehind:!0}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var a,e=t.languages,n={"application/javascript":e.javascript,"application/json":e.json||e.javascript,"application/xml":e.xml,"text/xml":e.xml,"text/html":e.html,"text/css":e.css},p={"application/json":!0,"application/xml":!0};function s(t){var a=t.replace(/^[a-z]+\//,"");return"(?:"+t+"|"+("\\w+/(?:[\\w.-]+\\+)+"+a+"(?![+\\w.-])")+")"}for(var i in n)if(n[i]){a=a||{};var r=p[i]?s(i):i;a[i.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+r+"[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*","i"),lookbehind:!0,inside:n[i]}}a&&t.languages.insertBefore("http","header-name",a)}(Prism)}}]);
//# sourceMappingURL=172.4e0a0fb3.chunk.js.map