const button = document.querySelector('button')
const video = document.querySelector('.video2')
const container = document.querySelector('.container')

button.addEventListener('click' , ()=>{
    video.classList.add('play')
    video.load()
    container.classList.add('show')
    video.muted = false
})


const close = document.querySelector('.close-container p')

close.addEventListener('click' ,()=>{
    video.classList.remove('play')
    container.classList.remove('show')
    video.muted = true
})




"use strict"
const quantnodes = 222; //reduce the number of nodes to speed up work and enlarge to make it prettier
const surfWidth = 900;
const surfHeight = 600;
const radiusLimit = 14;
const nodesDistance = surfHeight/Math.sqrt(quantnodes/(surfWidth/surfHeight));
const quantColumn =  Math.floor( surfWidth / nodesDistance );  
const quantRow  =  Math.floor( surfHeight / nodesDistance );
const ScrDiag = Math.sqrt(Math.pow(surfWidth, 2) + Math.pow(surfHeight, 2));

let globalCounter = 0;
let ctrArr = [];  //array of coordinates of the centers of circles
let i = 0;
let outerCircle, innerCircle;  // animation objects [surface nodes]
let L;  //distance between cursor and circle center
let density = 267;    // 1 coefficient responsible for the type of surface
let typeFig = 0.915;  // 2 coefficient responsible for the type of surface
let r = 103, g = 10, b = 5;
let hue = 0;

function Circle(id, positionX, positionY, radius, fill, stroke, stroke_width) {
  // svg circle constructor function
  this.id = id;
  this.positionX = positionX;
  this.positionY = positionY;
  this.radius = radius;
  this.fill = fill;
  this.stroke = stroke;
  this.stroke_width = stroke_width;
  this.draw = function() {                       
    JS_content_creation.innerHTML += 
     `<circle id="${this.id}" cx="${this.positionX}" cy="${this.positionY}" 
      r="${this.radius}" fill="${this.fill}" 
      stroke="${this.stroke}" stroke-width="${this.stroke_width}"/>`;
  }
}

function randColor() {
  //random color generator [rgb]
  let r1 = Math.floor(Math.random() * (256)),
      g1 = Math.floor(Math.random() * (256)),
      b1 = Math.floor(Math.random() * (256));
  return '#' + r1.toString(16) + g1.toString(16) + b1.toString(16);
}

function surfaceBuilding() { 
  let outerCircleArray = [];
  let innerCircleArray = [];
  for (let j = 1; j < quantRow; j++) {
    for (let k = 1; k < quantColumn; k++) { 
      i++;
      outerCircleArray[i] = new Circle(i, k * nodesDistance, 
                            j * nodesDistance, 10, "black", randColor(), 2);
      outerCircleArray[i].draw();

      innerCircleArray[i] = new Circle("k" + i, k * nodesDistance, 
                            j*nodesDistance, 1, "yellow", randColor(), 1);
      innerCircleArray[i].draw();
      ctrArr.push([k * nodesDistance, j * nodesDistance]);
    }
  }
}
 
surfaceBuilding();
var div = document.querySelector(".page3");
div.addEventListener('mousemove', function(e) {
  let radius, dx, dy;
  i = 0;
  for (let j = 1; j < quantRow; j++) {
    for (let k = 1; k < quantColumn; k++) {
      i++;
      let cx = ctrArr[i-1][0], cy = ctrArr[i-1][1];

      outerCircle = document.getElementById(i);
      innerCircle = document.getElementById("k" + i);

      L = Math.sqrt(Math.pow((e.pageX - cx), 2) + Math.pow((e.pageY - cy), 2));

      dx = (e.pageX - cx) * density / (Math.pow(L, typeFig));
      dy = (e.pageY - cy) * density / (Math.pow(L, typeFig));

      outerCircle.setAttribute("cx", cx + dx);
      outerCircle.setAttribute("cy", cy + dy);

      innerCircle.setAttribute("cx", cx + dx);
      innerCircle.setAttribute("cy", cy + dy);

      outerCircle.setAttribute("stroke", rainbowColor());
      outerCircle.setAttribute("fill", rainbowColor());

      radius = ScrDiag / L;
      if (radius > radiusLimit) {radius = radiusLimit} ;
      outerCircle.setAttribute("r", radius);
      innerCircle.setAttribute("r", radius / 3);
      //console.log("typeFig: ", typeFig, "density: ", density);
    }
  }
}, false);

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-animation-cssanimations-smil-setclasses !*/
 !function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in w)if(w.hasOwnProperty(l)){if(e=[],n=w[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function s(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(b&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),b?_.className.baseVal=n:_.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):b?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e,n){return function(){return e.apply(n,arguments)}}function l(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?a(o,t||n):o);return!1}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return!!~(""+e).indexOf(n)}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var s=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(s){var i=s.error?"error":"log";s[i].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function p(){var e=n.body;return e||(e=i(b?"svg":"body"),e.fake=!0),e}function m(e,t,r,o){var s,a,l,u,f="modernizr",c=i("div"),d=p();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=o?o[r]:f+(r+1),c.appendChild(l);return s=i("style"),s.type="text/css",s.id="s"+f,(d.fake?d:c).appendChild(s),d.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),c.id=f,d.fake&&(d.style.background="",d.style.overflow="hidden",u=_.style.overflow,_.style.overflow="hidden",_.appendChild(d)),a=t(c,e),d.fake?(d.parentNode.removeChild(d),_.style.overflow=u,_.offsetHeight):c.parentNode.removeChild(c),!!a}function v(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+c(n[o])+":"+r+")");return s=s.join(" or "),m("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==d(e,null,"position")})}return t}function g(e,n,o,s){function a(){c&&(delete T.style,delete T.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var l=v(e,o);if(!r(l,"undefined"))return l}for(var c,d,p,m,g,y=["modernizr","tspan","samp"];!T.style&&y.length;)c=!0,T.modElem=i(y.shift()),T.style=T.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],g=T.style[m],f(m,"-")&&(m=u(m)),T.style[m]!==t){if(s||r(o,"undefined"))return a(),"pfx"==n?m:!0;try{T.style[m]=o}catch(h){}if(T.style[m]!=g)return a(),"pfx"==n?m:!0}return a(),!1}function y(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+P.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?g(a,n,o,s):(a=(e+" "+N.join(i+" ")+i).split(" "),l(a,n,t))}function h(e,n,r){return y(e,t,t,n,r)}var C=[],w=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){w.push({name:e,fn:n,options:t})},addAsyncTest:function(e){w.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var _=n.documentElement,b="svg"===_.nodeName.toLowerCase();Modernizr.addTest("webanimations","animate"in i("div"));var x={}.toString;Modernizr.addTest("smil",function(){return!!n.createElementNS&&/SVGAnimate/.test(x.call(n.createElementNS("http://www.w3.org/2000/svg","animate")))});var E="Moz O ms Webkit",N=S._config.usePrefixes?E.toLowerCase().split(" "):[];S._domPrefixes=N;var P=S._config.usePrefixes?E.split(" "):[];S._cssomPrefixes=P;var z={elem:i("modernizr")};Modernizr._q.push(function(){delete z.elem});var T={style:z.elem.style};Modernizr._q.unshift(function(){delete T.style}),S.testAllProps=y,S.testAllProps=h,Modernizr.addTest("cssanimations",h("animationName","a",!0)),o(),s(C),delete S.addTest,delete S.addAsyncTest;for(var j=0;j<Modernizr._q.length;j++)Modernizr._q[j]();e.Modernizr=Modernizr}(window,document);


 