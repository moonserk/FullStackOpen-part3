(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var o=t(14),r=t.n(o),c=t(3),a=t(1),u=t(4),i=t.n(u),s="/api/persons",d=function(){return i.a.get(s).then((function(e){return e.data}))},l=function(e){return i.a.post(s,e).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},j=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},f=t(0),h=function(e){var n=e.message,t=e.color,o={color:t,borderColor:t};return null===n?null:Object(f.jsx)("div",{className:"notification",style:o,children:n})},m=function(e){var n=e.filter,t=e.onChangeFilter;return Object(f.jsxs)("div",{children:["filter shown with ",Object(f.jsx)("input",{value:n,onChange:t})]})},O=function(e){var n=e.newName,t=e.newNumber,o=e.onSubmitHandler,r=e.onChangeNameHandler,c=e.onChangeNumberHandler;return Object(f.jsxs)("form",{onSubmit:o,children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:n,onChange:r})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:t,onChange:c})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var n=e.persons,t=e.onDeleteHandler;return Object(f.jsx)("div",{children:n.map((function(e){return Object(f.jsxs)("div",{children:[e.name," ",e.number,Object(f.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.name)}))})},v=(t(38),function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],r=Object(a.useState)(""),u=Object(c.a)(r,2),i=u[0],s=u[1],v=Object(a.useState)(""),g=Object(c.a)(v,2),x=g[0],w=g[1],C=Object(a.useState)(""),N=Object(c.a)(C,2),S=N[0],H=N[1],k=Object(a.useState)(null),y=Object(c.a)(k,2),D=y[0],E=y[1],F=Object(a.useState)("green"),I=Object(c.a)(F,2),J=I[0],L=I[1],A=function(e,n){L(n),E(e),setTimeout((function(){E(null)}),5e3)};Object(a.useEffect)((function(){d().then((function(e){o(e)})).catch((function(e){A(e.response.data.error,"red")}))}),[]);var B=S?t.filter((function(e){return e.name.includes(S)})):t;return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(h,{message:D,color:J}),Object(f.jsx)(m,{filter:S,onChangeFilter:function(e){H(e.target.value.toLocaleLowerCase())}}),Object(f.jsx)("h3",{children:"add a new"}),Object(f.jsx)(O,{newName:i,newNumber:x,onSubmitHandler:function(e){e.preventDefault();var n={name:i,number:x},r=t.map((function(e){return e.name})).indexOf(n.name),c=-1!==r?t[r].id:null;-1!==r?window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one"))&&j(c,n).then((function(e){o(t.map((function(n){return n.id!==c?n:e}))),s(""),w(""),A("Edited ".concat(n.name),"green")})).catch((function(e){console.log(e.response.data,"<-"),A(e.response.data.error,"red")})):l(n).then((function(e){console.log(e),o(t.concat(e)),s(""),w(""),A("Added ".concat(n.name),"green")})).catch((function(e){console.log(e.response.data,"<-"),A(e.response.data.error,"red")}))},onChangeNameHandler:function(e){s(e.target.value)},onChangeNumberHandler:function(e){w(e.target.value)}}),Object(f.jsx)("h2",{children:"Numbers"}),Object(f.jsx)(p,{persons:B,onDeleteHandler:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&b(e).then((function(n){console.log(n),o(t.filter((function(n){return n.id!==e})))})).catch((function(e){console.log(e),A("Information of ".concat(n.name," has already been removed from server"),"red")}))}})]})});r.a.render(Object(f.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.c0530e8f.chunk.js.map