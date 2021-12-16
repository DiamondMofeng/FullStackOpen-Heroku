(this.webpackJsonpthephonebooks=this.webpackJsonpthephonebooks||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var r=n(17),o=n.n(r),s=n(5),c=n(3),i=n(2),a=n(4),u=n.n(a),l="http://localhost:3001/api/persons",d=function(){return u.a.get(l).then((function(e){return e.data}))},j=function(e){return u.a.post(l,e).then((function(e){return e.data}))},b=function(e,t){return u.a.put("".concat(l,"/").concat(e),t).then((function(e){return e.data}))},f=function(e){return u.a.delete("".concat(l,"/").concat(e))},m=n(0),h=function(e){var t=e.filter,n=e.setFilter;return Object(m.jsxs)("div",{children:["Name Filter (case insensitive) ",Object(m.jsx)("input",{value:t,onChange:function(e){n(e.target.value)}})]})},p=function(e){var t=e.persons,n=e.setPersons,r=e.setMessage,o=e.setMessageType,a=Object(i.useState)(""),u=Object(c.a)(a,2),l=u[0],d=u[1],f=Object(i.useState)(""),h=Object(c.a)(f,2),p=h[0],O=h[1],g=function(e,t){return-1!==t.indexOf(e)};return Object(m.jsxs)("form",{children:[Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{children:["name: ",Object(m.jsx)("input",{value:l,onChange:function(e){d(e.target.value)}})]}),Object(m.jsxs)("p",{children:["number:",Object(m.jsx)("input",{value:p,onChange:function(e){O(e.target.value)}})]})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",onClick:function(e){if(e.preventDefault(),g(l,t.map((function(e){return e.name})))){var c=t.find((function(e){return e.name===l})),i=c.id,a=Object(s.a)(Object(s.a)({},c),{},{number:p});return window.confirm(l+" is already added to phonebook. Would you like to replace the old number?")?(b(i,a).then((function(e){n(t.map((function(e){return e.id!==i?e:a}))),r("".concat(l," 's number is updated")),o("normal"),setTimeout((function(){r(null),o("normal")}),3e3)})).catch((function(e){r("Person '".concat(l,"' was already removed from server")),o("error"),n(t.filter((function(e){return e.id!==i}))),setTimeout((function(){r(null),o("normal")}),3e3)})),d(""),void O("")):void 0}j({name:l,number:p}).then((function(e){n(t.concat(e)),d(""),O(""),r("".concat(l," is added")),o("normal"),setTimeout((function(){r(null),o("normal")}),3e3)}))},children:"add"})})]})},O=function(e){var t=e.persons,n=e.filter,r=e.setPersons,o=e.setMessage,s=e.setMessageType,c=""===n?t:t.filter((function(e){return e.name.toLowerCase().match(n.toLowerCase())}));return Object(m.jsx)("div",{children:c.map((function(e){return Object(m.jsxs)("p",{children:[e.name," ",e.number,Object(m.jsx)(g,{id:e.id,name:e.name,persons:t,setPersons:r,setMessage:o,setMessageType:s})]},e.id)}))})},g=function(e){var t=e.id,n=e.name,r=e.persons,o=e.setPersons,s=e.setMessage,c=e.setMessageType;return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("button",{onClick:function(e,t,n,r,o,s){console.log(e,t);return function(){window.confirm("Delete "+t+" ?")&&f(e).then((function(){r(n.filter((function(t){return t.id!==e}))),console.log(n),o("".concat(t," is removed")),s("normal"),setTimeout((function(){o(null)}),3e3)})).catch((function(){r(n.filter((function(t){return t.id!==e}))),o("Failed to remove ".concat(t," from server but locally. \n            It might have been removed from the server.")),s("error"),setTimeout((function(){o(null),s("normal")}),3e3)}))}}(t,n,r,o,s,c),children:"delete"})})},v=function(e){var t=e.message,n=e.type,r={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},o=Object(s.a)(Object(s.a)({},r),{},{color:"red"});return t?"error"===n?Object(m.jsx)("div",{style:o,children:Object(m.jsx)("p",{children:t})}):Object(m.jsx)("div",{style:r,children:Object(m.jsx)("p",{children:t})}):null},x=function(){console.log("app is rendering");var e=Object(i.useState)([]),t=Object(c.a)(e,2),n=t[0],r=t[1],o=Object(i.useState)(""),s=Object(c.a)(o,2),a=s[0],u=s[1],l=Object(i.useState)(""),j=Object(c.a)(l,2),b=j[0],f=j[1],g=Object(i.useState)("normal"),x=Object(c.a)(g,2),y=x[0],M=x[1];return Object(i.useEffect)((function(){console.log("getting data from jsServer"),d().then((function(e){return r(e)}))}),[]),console.log("render",n.length,"persons"),console.log(n),Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(v,{message:b,type:y}),Object(m.jsx)(h,{filter:a,setFilter:u}),Object(m.jsx)("h2",{children:"add a new"}),Object(m.jsx)(p,{persons:n,setPersons:r,setMessage:f,setMessageType:M}),Object(m.jsx)("h2",{children:"Numbers"}),Object(m.jsx)(O,{persons:n,filter:a,setPersons:r,setMessage:f,setMessageType:M})]})};o.a.render(Object(m.jsx)(x,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.368fb925.chunk.js.map