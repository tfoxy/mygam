!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=10)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(1),o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=0,a=function(){function t(){r(this,t),s+=1,this.id=s,this.color="gray",this.size=i.d,this.position=i.d,this.angle=0,this.resetMomentum(),this.acceleration=0,this.angularAcceleration=0,this.maxAcceleration=0,this.maxAngularAcceleration=0,this.oppositionModule=0,this.angularOpposition=0}return o(t,[{key:"resetMomentum",value:function(){this.speed=i.e,this.angularSpeed=0}},{key:"changeAcceleration",value:function(t,e){this.acceleration=t*this.maxAcceleration,this.angularAcceleration=e*this.maxAngularAcceleration}},{key:"_getPolygonPoints",value:function(t){var e=t.x,n=t.y,r=this.size,i=r.x,o=r.y,s=this.angle,a=Math.sqrt(i*i+o*o)/2,u=Math.atan(o/i);return[{x:e+Math.cos(s-u)*a,y:n+Math.sin(s-u)*a},{x:e+Math.cos(s+u)*a,y:n+Math.sin(s+u)*a},{x:e+Math.cos(s+(Math.PI-u))*a,y:n+Math.sin(s+(Math.PI-u))*a},{x:e+Math.cos(s-(Math.PI-u))*a,y:n+Math.sin(s-(Math.PI-u))*a}]}},{key:"polygonPoints",get:function(){return this._getPolygonPoints(this.position)}}]),t}();e.a=a},function(t,e,n){"use strict";function r(t,e){return{x:t*Math.cos(e),y:t*Math.sin(e)}}function i(t,e){return{x:t.x+e.x,y:t.y+e.y}}function o(t){return Math.sqrt(t.x*t.x+t.y*t.y)}n.d(e,"e",function(){return s}),n.d(e,"d",function(){return a}),e.b=r,e.a=i,e.c=o;var s={x:0,y:0},a={x:NaN,y:NaN}},function(t,e,n){"use strict";var r=n(7);e.a=r.a},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){var n=t.indexOf(e);n>=0&&t.splice(n,1)}var s=n(13),a=(n.n(s),n(1)),u=n(8),c=n(9),h=n(6),p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=2*Math.PI,f=function(){function t(){i(this,t),this.map=new h.a,this.entities=[],this.tickrate=128,this.loopInterval=1e3/this.tickrate,this.playersData=[{ship:new u.a({color:"green"}),shot:new c.a,lives:10},{ship:new u.a({color:"red"}),shot:new c.a,lives:10}]}return p(t,[{key:"start",value:function(){if(this.loop!==t.prototype.loop)throw new Error("Game already started");this.startRound(),this.loop=this.loop.bind(this),this.loop()}},{key:"loop",value:function(){var t=this;this.entities.forEach(function(e){t.accelerateEntity(e),t.moveEntity(e)}),this.makeShots(),this.checkCollisions(),setTimeout(this.loop,this.loopInterval)}},{key:"startRound",value:function(){var t;this.entities.length=0,this.playersData.forEach(function(t){return t.ship.resetMomentum()}),Object.assign(this.playersData[0].ship,{position:{x:.25*this.width,y:.25*this.height},angle:0}),Object.assign(this.playersData[1].ship,{position:{x:.75*this.width,y:.75*this.height},angle:Math.PI}),(t=this.entities).push.apply(t,r(this.playersData.filter(function(t){return t.lives>0}).map(function(t){return t.ship})))}},{key:"makeShots",value:function(){var t=this;this.playersData.forEach(function(e){var r=e.ship,i=e.shot;r.shooting&&(i.maxSpeed=1.5*r.maxSpeed,i.maxAcceleration=8*r.maxAcceleration,i.oppositionModule=4*r.oppositionModule,i.position=n.i(a.a)(r.position,n.i(a.b)(.75*r.size.x,r.angle)),i.angle=r.angle,i.speed=r.speed,i.acceleration=i.maxAcceleration,t.entities.includes(i)||t.entities.push(i))})}},{key:"checkCollisions",value:function(){var t=this;this.entities.some(function(e,n){var i=t.getEntitySatPolygonList(e),s=t.entities.slice(n+1).find(function(e){return t.testCollision(i,t.getEntitySatPolygonList(e))});if(s){var a=!1;if([e,s].forEach(function(e){o(t.entities,e);var n=t.playersData.find(function(t){return t.ship===e});n&&(n.lives-=1,a=!0)}),a){var u;return t.startRound(),(u=console).log.apply(u,r(t.playersData.map(function(t){return t.lives}))),!0}}return!1})}},{key:"getEntitySatPolygonList",value:function(t){return this.map.getEntityPolygons(t).map(function(t){return new s.Polygon(void 0,t.map(function(t){return new s.Vector(t.x,t.y)}))})}},{key:"testCollision",value:function(t,e){return t.some(function(t){return e.some(function(e){return n.i(s.testPolygonPolygon)(t,e)})})}},{key:"moveEntity",value:function(t){var e=t.speed;if(t.angularSpeed){var n=t.angle;n+=t.angularSpeed,n%=l,t.angle=n}if(e.x||e.y){var r=t.position,i=(r.x+e.x)%this.width,o=(r.y+e.y)%this.height;i<0&&(i+=this.width),o<0&&(o+=this.height),t.position={x:i,y:o}}}},{key:"accelerateEntity",value:function(t){var e=t.acceleration,r=t.angularAcceleration,i=r;if(i-=t.angularOpposition*t.angularSpeed){var o=i/this.tickrate,s=t.angularSpeed+o;t.angularSpeed=s}if(e){var u=e/this.tickrate,c=t.speed,h=t.angle,p=n.i(a.b)(u,h),l=n.i(a.a)(c,p);t.speed=l}if(t.speed.x||t.speed.y){var f=t.speed,y=t.oppositionModule,v=n.i(a.c)(f),d=y*v,g=d/this.tickrate,b=(v-g)/v,w={x:f.x*b,y:f.y*b};t.speed=w}}},{key:"width",get:function(){return this.map.width}},{key:"height",get:function(){return this.map.height}}]),t}();e.a=f},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(){r(this,t)}return i(t,[{key:"start",value:function(t){if(this.game)throw new Error("Renderer is already rendering a Game");this.game=t;var e=document.createElement("canvas");e.width=Math.min(window.innerWidth,2*this.game.width),e.height=Math.min(window.innerHeight,2*this.game.height),this.canvas=e,this.canvasContext=e.getContext("2d"),this.render=this.render.bind(this),this.render()}},{key:"render",value:function(){var t=this;this.canvasContext.clearRect(0,0,this.width,this.height),this.game.entities.forEach(function(e){return t.drawEntity(e)}),window.requestAnimationFrame(this.render)}},{key:"drawEntity",value:function(t){var e=t.canvas,n=t.angle,r=t.position,i=this.canvasContext,o=this.game,s=o.width,a=o.height,u=r.x+(this.width-s)/2,c=r.y+(this.height-a)/2,h=t.size,p=h.x,l=h.y;[{x:u,y:c},{x:u,y:c+a},{x:u,y:c-a},{x:u+s,y:c},{x:u+s,y:c+a},{x:u+s,y:c-a},{x:u-s,y:c},{x:u-s,y:c+a},{x:u-s,y:c-a}].forEach(function(t){var r=t.x,o=t.y;i.translate(r,o),i.rotate(n),i.drawImage(e,-p/2,-l/2),i.rotate(-n),i.translate(-r,-o)})}},{key:"width",get:function(){return this.canvas.width}},{key:"height",get:function(){return this.canvas.height}}]),t}();e.a=o},function(t,e,n){var r=n(11);"string"==typeof r&&(r=[[t.i,r,""]]);var i={};i.transform=void 0;n(14)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(){r(this,t),this.width=640,this.height=640}return i(t,[{key:"getEntityPolygons",value:function(t){var e=t.position,n=e.x,r=e.y,i=this.width,o=this.height;n>this.width/2&&(i*=-1),r>this.height/2&&(o*=-1);var s=t.polygonPoints;return[s,s.map(function(t){return{x:t.x+i,y:t.y}}),s.map(function(t){return{x:t.x,y:t.y+o}}),s.map(function(t){return{x:t.x+i,y:t.y+o}})]}},{key:"getEntityPositions",value:function(t){var e=t.position,n=e.x,r=e.y,i=this.width,o=this.height;return n>this.width/2&&(i*=-1),r>this.height/2&&(o*=-1),[t.position,{x:n+i,y:r},{x:n,y:r+o},{x:n+i,y:r+o}]}}]),t}();e.a=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=1/Math.sqrt(2),s={r:0,a:0},a={FX:{r:1,a:0},XL:{r:0,a:-1},XR:{r:0,a:1},FL:{r:o,a:-o},FR:{r:o,a:o},XX:s},u={FORWARD:"ArrowUp",LEFT:"ArrowLeft",RIGHT:"ArrowRight",SHOOT:"Period"},c=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;r(this,t),this.keyBindings=e,this.entity=null,this.currentKeys=[],this.currentKeySet=new Set,this.currentDirection=s,this.keyboardListener=this.keyboardListener.bind(this)}return i(t,[{key:"setEntity",value:function(t){if(this.entity)throw new Error("Entity already set for Controls");this.entity=t,window.addEventListener("keydown",this.keyboardListener),window.addEventListener("keyup",this.keyboardListener)}},{key:"keyboardListener",value:function(t){var e=t.code,n=t.type;if("keydown"!==n||this.currentKeySet.has(e)){if("keyup"===n&&this.currentKeySet.delete(e)){var r=this.currentKeys.indexOf(e);this.currentKeys.splice(r,1)}}else this.currentKeys.push(e),this.currentKeySet.add(e);this.updateCurrentDirection(),this.updateShooting()}},{key:"updateCurrentDirection",value:function(){var t=this.keyBindings,e=t.FORWARD,n=t.LEFT,r=t.RIGHT,i="X",o="X";this.currentKeys.forEach(function(t){switch(t){case e:i="F";break;case n:o="L";break;case r:o="R"}});var s=a[i+o];this.currentDirection=s,this.entity.changeAcceleration(s.r,s.a)}},{key:"updateShooting",value:function(){this.currentKeySet.has(this.keyBindings.SHOOT)?this.entity.startShooting():this.entity.stopShooting()}}]),t}();e.a=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=n(0),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.size={x:35,y:25},n.maxAcceleration=10,n.maxAngularAcceleration=Math.PI/24,n.oppositionModule=2,n.angularOpposition=Math.PI,n.shooting=!1,Object.assign(n,t),n}return o(e,t),a(e,[{key:"startShooting",value:function(){this.shooting=!0}},{key:"stopShooting",value:function(){this.shooting=!1}},{key:"canvas",get:function(){var t=this._canvas;if(!t){t=document.createElement("canvas");var e=this.size,n=e.x,r=e.y;t.width=n,t.height=r;var i=t.getContext("2d");i.fillStyle="gray",i.fillRect(0,0,5,r),i.fillStyle=this.color,i.fillRect(5,0,n,r),this._canvas=t}return this._canvas}}]),e}(s.a);e.a=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=n(0),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function(t){function e(t){r(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.color="yellow",n.size={x:10,y:4},Object.assign(n,t),n}return o(e,t),a(e,[{key:"canvas",get:function(){var t=this._canvas;if(!t){t=document.createElement("canvas");var e=this.size,n=e.x,r=e.y;t.width=n,t.height=r;var i=t.getContext("2d");i.fillStyle=this.color,i.fillRect(0,0,n,r),this._canvas=t}return this._canvas}}]),e}(s.a);e.a=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(4),o=n(2),s=n(5),a=(n.n(s),new r.a),u=new o.a,c=new o.a({FORWARD:"KeyW",LEFT:"KeyA",RIGHT:"KeyD",SHOOT:"ShiftLeft"});u.setEntity(a.playersData[0].ship),c.setEntity(a.playersData[1].ship);var h=new i.a;h.start(a),a.start(),document.body.appendChild(h.canvas)},function(t,e,n){e=t.exports=n(12)(void 0),e.push([t.i,"body{margin:0;overflow:hidden;background:gray;text-align:center;position:absolute;height:100%;width:100%;display:flex}canvas{background:#000;margin:auto}",""])},function(t,e){function n(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=r(i);return[n].concat(i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var r=n(e,t);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var r,i;/** @preserve SAT.js - Version 0.6.0 - Copyright 2012 - 2016 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */
!function(o,s){"use strict";r=s,void 0!==(i="function"==typeof r?r.call(e,n,e,t):r)&&(t.exports=i)}(0,function(){"use strict";function t(t,e){this.x=t||0,this.y=e||0}function e(e,n){this.pos=e||new t,this.r=n||0}function n(e,n){this.pos=e||new t,this.angle=0,this.offset=new t,this.setPoints(n||[])}function r(e,n,r){this.pos=e||new t,this.w=n||0,this.h=r||0}function i(){this.a=null,this.b=null,this.overlapN=new t,this.overlapV=new t,this.clear()}function o(t,e,n){for(var r=Number.MAX_VALUE,i=-Number.MAX_VALUE,o=t.length,s=0;s<o;s++){var a=t[s].dot(e);a<r&&(r=a),a>i&&(i=a)}n[0]=r,n[1]=i}function s(t,e,n,r,i,s){var a=g.pop(),u=g.pop(),c=v.pop().copy(e).sub(t),h=c.dot(i);if(o(n,i,a),o(r,i,u),u[0]+=h,u[1]+=h,a[0]>u[1]||u[0]>a[1])return v.push(c),g.push(a),g.push(u),!0;if(s){var p=0;if(a[0]<u[0])if(s.aInB=!1,a[1]<u[1])p=a[1]-u[0],s.bInA=!1;else{var l=a[1]-u[0],f=u[1]-a[0];p=l<f?l:-f}else if(s.bInA=!1,a[1]>u[1])p=a[0]-u[1],s.aInB=!1;else{var l=a[1]-u[0],f=u[1]-a[0];p=l<f?l:-f}var y=Math.abs(p);y<s.overlap&&(s.overlap=y,s.overlapN.copy(i),p<0&&s.overlapN.reverse())}return v.push(c),g.push(a),g.push(u),!1}function a(t,e){var n=t.len2(),r=e.dot(t);return r<0?x:r>n?k:m}function u(t,e){var n=v.pop().copy(t).sub(e.pos),r=e.r*e.r,i=n.len2();return v.push(n),i<=r}function c(t,e){w.pos.copy(t),b.clear();var n=f(w,e,b);return n&&(n=b.aInB),n}function h(t,e,n){var r=v.pop().copy(e.pos).sub(t.pos),i=t.r+e.r,o=i*i,s=r.len2();if(s>o)return v.push(r),!1;if(n){var a=Math.sqrt(s);n.a=t,n.b=e,n.overlap=i-a,n.overlapN.copy(r.normalize()),n.overlapV.copy(r).scale(n.overlap),n.aInB=t.r<=e.r&&a<=e.r-t.r,n.bInA=e.r<=t.r&&a<=t.r-e.r}return v.push(r),!0}function p(t,e,n){for(var r=v.pop().copy(e.pos).sub(t.pos),i=e.r,o=i*i,s=t.calcPoints,u=s.length,c=v.pop(),h=v.pop(),p=0;p<u;p++){var l=p===u-1?0:p+1,f=0===p?u-1:p-1,y=0,d=null;c.copy(t.edges[p]),h.copy(r).sub(s[p]),n&&h.len2()>o&&(n.aInB=!1);var g=a(c,h);if(g===x){c.copy(t.edges[f]);var b=v.pop().copy(r).sub(s[f]);if((g=a(c,b))===k){var w=h.len();if(w>i)return v.push(r),v.push(c),v.push(h),v.push(b),!1;n&&(n.bInA=!1,d=h.normalize(),y=i-w)}v.push(b)}else if(g===k){if(c.copy(t.edges[l]),h.copy(r).sub(s[l]),(g=a(c,h))===x){var w=h.len();if(w>i)return v.push(r),v.push(c),v.push(h),!1;n&&(n.bInA=!1,d=h.normalize(),y=i-w)}}else{var m=c.perp().normalize(),w=h.dot(m),A=Math.abs(w);if(w>0&&A>i)return v.push(r),v.push(m),v.push(h),!1;n&&(d=m,y=i-w,(w>=0||y<2*i)&&(n.bInA=!1))}d&&n&&Math.abs(y)<Math.abs(n.overlap)&&(n.overlap=y,n.overlapN.copy(d))}return n&&(n.a=t,n.b=e,n.overlapV.copy(n.overlapN).scale(n.overlap)),v.push(r),v.push(c),v.push(h),!0}function l(t,e,n){var r=p(e,t,n);if(r&&n){var i=n.a,o=n.aInB;n.overlapN.reverse(),n.overlapV.reverse(),n.a=n.b,n.b=i,n.aInB=n.bInA,n.bInA=o}return r}function f(t,e,n){for(var r=t.calcPoints,i=r.length,o=e.calcPoints,a=o.length,u=0;u<i;u++)if(s(t.pos,e.pos,r,o,t.normals[u],n))return!1;for(var u=0;u<a;u++)if(s(t.pos,e.pos,r,o,e.normals[u],n))return!1;return n&&(n.a=t,n.b=e,n.overlapV.copy(n.overlapN).scale(n.overlap)),!0}var y={};y.Vector=t,y.V=t,t.prototype.copy=t.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this},t.prototype.clone=t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.perp=t.prototype.perp=function(){var t=this.x;return this.x=this.y,this.y=-t,this},t.prototype.rotate=t.prototype.rotate=function(t){var e=this.x,n=this.y;return this.x=e*Math.cos(t)-n*Math.sin(t),this.y=e*Math.sin(t)+n*Math.cos(t),this},t.prototype.reverse=t.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.normalize=t.prototype.normalize=function(){var t=this.len();return t>0&&(this.x=this.x/t,this.y=this.y/t),this},t.prototype.add=t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.sub=t.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.scale=t.prototype.scale=function(t,e){return this.x*=t,this.y*=e||t,this},t.prototype.project=t.prototype.project=function(t){var e=this.dot(t)/t.len2();return this.x=e*t.x,this.y=e*t.y,this},t.prototype.projectN=t.prototype.projectN=function(t){var e=this.dot(t);return this.x=e*t.x,this.y=e*t.y,this},t.prototype.reflect=t.prototype.reflect=function(t){var e=this.x,n=this.y;return this.project(t).scale(2),this.x-=e,this.y-=n,this},t.prototype.reflectN=t.prototype.reflectN=function(t){var e=this.x,n=this.y;return this.projectN(t).scale(2),this.x-=e,this.y-=n,this},t.prototype.dot=t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.len2=t.prototype.len2=function(){return this.dot(this)},t.prototype.len=t.prototype.len=function(){return Math.sqrt(this.len2())},y.Circle=e,e.prototype.getAABB=e.prototype.getAABB=function(){var e=this.r;return new r(this.pos.clone().sub(new t(e,e)),2*e,2*e).toPolygon()},y.Polygon=n,n.prototype.setPoints=n.prototype.setPoints=function(e){if(!this.points||this.points.length!==e.length){var n,r=this.calcPoints=[],i=this.edges=[],o=this.normals=[];for(n=0;n<e.length;n++)r.push(new t),i.push(new t),o.push(new t)}return this.points=e,this._recalc(),this},n.prototype.setAngle=n.prototype.setAngle=function(t){return this.angle=t,this._recalc(),this},n.prototype.setOffset=n.prototype.setOffset=function(t){return this.offset=t,this._recalc(),this},n.prototype.rotate=n.prototype.rotate=function(t){for(var e=this.points,n=e.length,r=0;r<n;r++)e[r].rotate(t);return this._recalc(),this},n.prototype.translate=n.prototype.translate=function(t,e){for(var n=this.points,r=n.length,i=0;i<r;i++)n[i].x+=t,n[i].y+=e;return this._recalc(),this},n.prototype._recalc=function(){var t,e=this.calcPoints,n=this.edges,r=this.normals,i=this.points,o=this.offset,s=this.angle,a=i.length;for(t=0;t<a;t++){var u=e[t].copy(i[t]);u.x+=o.x,u.y+=o.y,0!==s&&u.rotate(s)}for(t=0;t<a;t++){var c=e[t],h=t<a-1?e[t+1]:e[0],p=n[t].copy(h).sub(c);r[t].copy(p).perp().normalize()}return this},n.prototype.getAABB=n.prototype.getAABB=function(){for(var e=this.calcPoints,n=e.length,i=e[0].x,o=e[0].y,s=e[0].x,a=e[0].y,u=1;u<n;u++){var c=e[u];c.x<i?i=c.x:c.x>s&&(s=c.x),c.y<o?o=c.y:c.y>a&&(a=c.y)}return new r(this.pos.clone().add(new t(i,o)),s-i,a-o).toPolygon()},y.Box=r,r.prototype.toPolygon=r.prototype.toPolygon=function(){var e=this.pos,r=this.w,i=this.h;return new n(new t(e.x,e.y),[new t,new t(r,0),new t(r,i),new t(0,i)])},y.Response=i,i.prototype.clear=i.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var v=[],d=0;d<10;d++)v.push(new t);for(var g=[],d=0;d<5;d++)g.push([]);var b=new i,w=new r(new t,1e-6,1e-6).toPolygon();y.isSeparatingAxis=s;var x=-1,m=0,k=1;return y.pointInCircle=u,y.pointInPolygon=c,y.testCircleCircle=h,y.testPolygonCircle=p,y.testCirclePolygon=l,y.testPolygonPolygon=f,y})},function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=y[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(h(r.parts[o],e))}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(h(r.parts[o],e));y[r.id]={id:r.id,refs:1,parts:s}}}}function i(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],s=e.base?o[0]+e.base:o[0],a=o[1],u=o[2],c=o[3],h={css:a,media:u,sourceMap:c};r[s]?r[s].parts.push(h):n.push(r[s]={id:s,parts:[h]})}return n}function o(t,e){var n=d(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=w[w.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function a(t){var e=document.createElement("style");return t.attrs.type="text/css",c(e,t.attrs),o(t,e),e}function u(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",c(e,t.attrs),o(t,e),e}function c(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function h(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var c=b++;n=g||(g=a(e)),r=p.bind(null,n,c,!1),i=p.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(e),r=f.bind(null,n,e),i=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),r=l.bind(null,n),i=function(){s(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function p(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function l(t,e){var n=e.css,r=e.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function f(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=x(r)),i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var y={},v=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),d=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,b=0,w=[],x=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=v()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=i(t,e);return r(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var a=n[s],u=y[a.id];u.refs--,o.push(u)}if(t){r(i(t,e),e)}for(var s=0;s<o.length;s++){var u=o[s];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete y[u.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i))return t;var o;return o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}}]);