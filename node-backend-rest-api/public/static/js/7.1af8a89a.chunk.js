(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{42:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(49);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(47),c=a.n(n),r=a(48),l=a(10),o=a(0),s=a.n(o),i=a(1),u=a(50),m=a(15),d=a(51),p=a(42),E=a(44),f=a(58),h=(a(65),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:n});new window.google.maps.Marker({position:a,map:e})}),[a,n]),s.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),v=a(11),b=(a(66),function(e){var t=Object(o.useContext)(v.a),a=Object(o.useState)(!1),n=Object(l.a)(a,2),b=n[0],O=n[1],g=Object(o.useState)(!1),j=Object(l.a)(g,2),w=j[0],C=j[1],N=Object(d.a)(),k=N.isLoading,_=N.error,y=N.sendRequest,D=N.clearError,I=(Object(i.g)(),function(){return O(!1)}),x=function(){C(!1)},L=function(){var a=Object(r.a)(c.a.mark((function a(){return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return C(!1),a.prev=1,a.next=4,y("".concat("http://localhost:5000/api","/places/").concat(e.id),"DELETE",null,{Authorization:"Bearer "+t.token});case 4:e.onDelete(e.id),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(1);case 9:case"end":return a.stop()}}),a,null,[[1,7]])})));return function(){return a.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(u.a,{error:_,onClear:D}),s.a.createElement(f.a,{show:b,onCancel:I,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:s.a.createElement(E.a,{onClick:I},"CLOSE")},s.a.createElement("div",{className:"map-container"},s.a.createElement(h,{center:e.coordinates,zoom:16}))),s.a.createElement(f.a,{show:w,onCancel:x,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:s.a.createElement(s.a.Fragment,null,s.a.createElement(E.a,{inverse:!0,onClick:x},"CANCEL"),s.a.createElement(E.a,{danger:!0,onClick:L},"DELETE"))},s.a.createElement("p",null,"Do you want to proceed and delete this place? Please note that it can't be undone thereafter.")),s.a.createElement("li",{className:"place-item"},s.a.createElement(p.a,{className:"place-item__content"},k&&s.a.createElement(m.a,{asOverlay:!0}),s.a.createElement("div",{className:"place-item__image"},s.a.createElement("img",{src:"".concat("http://localhost:5000","/").concat(e.image),alt:e.title})),s.a.createElement("div",{className:"place-item__info"},s.a.createElement("h2",null,e.title),s.a.createElement("h3",null,e.address),s.a.createElement("p",null,e.description)),s.a.createElement("div",{className:"place-item__actions"},s.a.createElement(E.a,{inverse:!0,onClick:function(){return O(!0)}},"VIEW ON MAP"),t.userId===e.creatorId&&s.a.createElement(E.a,{to:"/places/".concat(e.id)},"EDIT"),t.userId===e.creatorId&&s.a.createElement(E.a,{danger:!0,onClick:function(){C(!0)}},"DELETE")))))}),O=(a(67),function(e){return 0===e.items.length?s.a.createElement("div",{className:"place-list center"},s.a.createElement(p.a,null,s.a.createElement("h2",null,"No places found. Maybe create one?"),s.a.createElement(E.a,{to:"/places/new"},"Share Place"))):s.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return s.a.createElement(b,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(i.h)().userId,t=Object(o.useState)([]),a=Object(l.a)(t,2),n=a[0],p=a[1],E=Object(d.a)(),f=E.isLoading,h=E.error,v=E.sendRequest,b=E.clearError;Object(o.useEffect)((function(){(function(){var t=Object(r.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v("".concat("http://localhost:5000/api","/places/user/").concat(e));case 3:a=t.sent,p(a.places),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}})()()}),[v,e]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(u.a,{error:h,onClear:b}),f&&s.a.createElement(m.a,{asOverlay:!0}),!f&&n&&s.a.createElement(O,{items:n,onDeletePlace:function(e){p((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.1af8a89a.chunk.js.map