(this.webpackJsonpwafflow=this.webpackJsonpwafflow||[]).push([[78],{163:function(e,s){!function(e){function s(e,s){return e.replace(/<<(\d+)>>/g,(function(e,n){return"(?:"+s[+n]+")"}))}function n(e,n,r){return RegExp(s(e,n),r||"")}function r(e,s){for(var n=0;n<s;n++)e=e.replace(/<<self>>/g,(function(){return"(?:"+e+")"}));return e.replace(/<<self>>/g,"[^\\s\\S]")}var a="bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",t="class enum interface struct",o="add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where where",i="abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";function c(e){return"\\b(?:"+e.trim().replace(/ /g,"|")+")\\b"}var u=c(t),l=RegExp(c(a+" "+t+" "+o+" "+i)),d=c(t+" "+o+" "+i),p=c(a+" "+t+" "+i),g=r(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source,2),b=r(/\((?:[^()]|<<self>>)*\)/.source,2),h=/@?\b[A-Za-z_]\w*\b/.source,f=s(/<<0>>(?:\s*<<1>>)?/.source,[h,g]),m=s(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source,[d,f]),k=/\[\s*(?:,\s*)*\]/.source,y=s(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source,[m,k]),w=s(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source,[g,b,k]),v=s(/\(<<0>>+(?:,<<0>>+)+\)/.source,[w]),x=s(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source,[v,m,k]),$={keyword:l,punctuation:/[<>()?,.:[\]]/},_=/'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source,B=/"(?:\\.|[^\\"\r\n])*"/.source,E=/@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;e.languages.csharp=e.languages.extend("clike",{string:[{pattern:n(/(^|[^$\\])<<0>>/.source,[E]),lookbehind:!0,greedy:!0},{pattern:n(/(^|[^@$\\])<<0>>/.source,[B]),lookbehind:!0,greedy:!0},{pattern:RegExp(_),greedy:!0,alias:"character"}],"class-name":[{pattern:n(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source,[m]),lookbehind:!0,inside:$},{pattern:n(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source,[h,x]),lookbehind:!0,inside:$},{pattern:n(/(\busing\s+)<<0>>(?=\s*=)/.source,[h]),lookbehind:!0},{pattern:n(/(\b<<0>>\s+)<<1>>/.source,[u,f]),lookbehind:!0,inside:$},{pattern:n(/(\bcatch\s*\(\s*)<<0>>/.source,[m]),lookbehind:!0,inside:$},{pattern:n(/(\bwhere\s+)<<0>>/.source,[h]),lookbehind:!0},{pattern:n(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source,[y]),lookbehind:!0,inside:$},{pattern:n(/\b<<0>>(?=\s+(?!<<1>>)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source,[x,p,h]),inside:$}],keyword:l,number:/(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,operator:/>>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,punctuation:/\?\.?|::|[{}[\];(),.:]/}),e.languages.insertBefore("csharp","number",{range:{pattern:/\.\./,alias:"operator"}}),e.languages.insertBefore("csharp","punctuation",{"named-parameter":{pattern:n(/([(,]\s*)<<0>>(?=\s*:)/.source,[h]),lookbehind:!0,alias:"punctuation"}}),e.languages.insertBefore("csharp","class-name",{namespace:{pattern:n(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source,[h]),lookbehind:!0,inside:{punctuation:/\./}},"type-expression":{pattern:n(/(\b(?:default|typeof|sizeof)\s*\(\s*)(?:[^()\s]|\s(?!\s*\))|<<0>>)*(?=\s*\))/.source,[b]),lookbehind:!0,alias:"class-name",inside:$},"return-type":{pattern:n(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source,[x,m]),inside:$,alias:"class-name"},"constructor-invocation":{pattern:n(/(\bnew\s+)<<0>>(?=\s*[[({])/.source,[x]),lookbehind:!0,inside:$,alias:"class-name"},"generic-method":{pattern:n(/<<0>>\s*<<1>>(?=\s*\()/.source,[h,g]),inside:{function:n(/^<<0>>/.source,[h]),generic:{pattern:RegExp(g),alias:"class-name",inside:$}}},"type-list":{pattern:n(/\b((?:<<0>>\s+<<1>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>)(?:\s*,\s*(?:<<3>>|<<4>>))*(?=\s*(?:where|[{;]|=>|$))/.source,[u,f,h,x,l.source]),lookbehind:!0,inside:{keyword:l,"class-name":{pattern:RegExp(x),greedy:!0,inside:$},punctuation:/,/}},preprocessor:{pattern:/(^\s*)#.*/m,lookbehind:!0,alias:"property",inside:{directive:{pattern:/(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,lookbehind:!0,alias:"keyword"}}}});var R=B+"|"+_,S=s(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source,[R]),P=r(s(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[S]),2),z=/\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source,j=s(/<<0>>(?:\s*\(<<1>>*\))?/.source,[m,P]);e.languages.insertBefore("csharp","class-name",{attribute:{pattern:n(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source,[z,j]),lookbehind:!0,greedy:!0,inside:{target:{pattern:n(/^<<0>>(?=\s*:)/.source,[z]),alias:"keyword"},"attribute-arguments":{pattern:n(/\(<<0>>*\)/.source,[P]),inside:e.languages.csharp},"class-name":{pattern:RegExp(m),inside:{punctuation:/\./}},punctuation:/[:,]/}}});var A=/:[^}\r\n]+/.source,J=r(s(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[S]),2),F=s(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[J,A]),U=r(s(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source,[R]),2),Z=s(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[U,A]);function q(s,r){return{interpolation:{pattern:n(/((?:^|[^{])(?:\{\{)*)<<0>>/.source,[s]),lookbehind:!0,inside:{"format-string":{pattern:n(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source,[r,A]),lookbehind:!0,inside:{punctuation:/^:/}},punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-csharp",inside:e.languages.csharp}}},string:/[\s\S]+/}}e.languages.insertBefore("csharp","string",{"interpolation-string":[{pattern:n(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source,[F]),lookbehind:!0,greedy:!0,inside:q(F,J)},{pattern:n(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source,[Z]),lookbehind:!0,greedy:!0,inside:q(Z,U)}]})}(Prism),Prism.languages.dotnet=Prism.languages.cs=Prism.languages.csharp}}]);
//# sourceMappingURL=78.b49fa469.chunk.js.map