function makeNode(tag){const own=Object.create(null),kids=[],listeners={};
 return new Proxy(function(){}, {get(_,k){
  if(k===Symbol.toPrimitive)return()=>'[node]'; if(k==='then')return undefined;
  if(k in own)return own[k];
  switch(k){
   case 'tagName':return String(tag||'div').toUpperCase(); case 'nodeType':return 1;
   case 'children': case 'childNodes': return kids;
   case 'appendChild': case 'append': case 'prepend': return c=>{kids.push(c);return c;};
   case 'insertBefore': return c=>{kids.push(c);return c;};
   case 'removeChild': case 'remove': case 'replaceChild': return ()=>{};
   case 'querySelector': case 'closest': return ()=>makeNode('div');
   case 'querySelectorAll': case 'getElementsByClassName': case 'getElementsByTagName': return ()=>[];
   case 'addEventListener': return (t,f)=>{(listeners[t]=listeners[t]||[]).push(f);};
   case 'removeEventListener': return ()=>{}; case 'dispatchEvent': return ()=>true;
   case 'focus': return opts=>{ if(global.__TRACE_FOCUS) global.__TRACE_FOCUS.push({tag,opts}); };
   case 'blur': case 'click': case 'scrollIntoView': return ()=>{};
   case 'setAttribute': return (a,v)=>{own['attr:'+a]=String(v);};
   case 'getAttribute': return a=>own['attr:'+a]!==undefined?own['attr:'+a]:null;
   case 'hasAttribute': return a=>own['attr:'+a]!==undefined;
   case 'removeAttribute': return a=>{delete own['attr:'+a];};
   case 'getBoundingClientRect': return ()=>({top:0,left:0,right:100,bottom:100,width:100,height:100,x:0,y:0});
   case 'classList': {const set=own.__cls=own.__cls||new Set();
     return own.__api=own.__api||{add:(...c)=>c.forEach(x=>set.add(x)),remove:(...c)=>c.forEach(x=>set.delete(x)),
       toggle:(c,f)=>{const on=f===undefined?!set.has(c):!!f;on?set.add(c):set.delete(c);return on;},contains:c=>set.has(c)};}
   case 'style': return own.style=own.style||Object.create(null);
   case 'dataset': return own.dataset=own.dataset||Object.create(null);
   case 'textContent': case 'innerHTML': case 'innerText': case 'value': case 'placeholder':
   case 'title': case 'id': case 'className': case 'type': return own[k]!==undefined?own[k]:'';
   case 'hidden': case 'disabled': case 'checked': case 'open': return own[k]!==undefined?own[k]:false;
   case 'parentElement': case 'parentNode': return own.__p=own.__p||makeNode('div');
   case 'firstChild': case 'lastChild': case 'nextSibling': case 'previousSibling': case 'ownerDocument': return null;
   case 'offsetWidth': case 'offsetHeight': case 'clientWidth': case 'clientHeight':
   case 'scrollTop': case 'scrollHeight': return 0;
   default: return own[k]=own[k]!==undefined?own[k]:makeNode(String(k));
  }},set(_,k,v){own[k]=v;return true;},has(){return true;},
  apply(){return makeNode('call');},construct(){return makeNode('new');}});}

function Ctl(){return makeNode('control');}
function makeMap(){return new Proxy({},{get(t,k){switch(k){
 case 'on': case 'once': return (ev,a,b)=>{ const f=typeof a==='function'?a:b;
   if(global.__TRACE_MAP){(global.__TRACE_MAP[ev]=global.__TRACE_MAP[ev]||[]).push(f);} return makeMap(); };
 case 'off': return ()=>makeMap();
 case 'getCanvas': return ()=>makeNode('canvas'); case 'getContainer': return ()=>makeNode('div');
 case 'getCenter': return ()=>({lng:2.4,lat:46.6}); case 'getZoom': return ()=>5;
 case 'getBounds': return ()=>({getWest:()=>-5,getEast:()=>9,getSouth:()=>41,getNorth:()=>51,toArray:()=>[[-5,41],[9,51]]});
 case 'queryRenderedFeatures': return ()=>[];
 case 'getSource': return ()=>({setData:()=>{},setTiles:()=>{}});
 case 'getLayer': return ()=>({id:'stub',type:'circle'});
 case 'getStyle': return ()=>({layers:[],sources:{}});
 case 'project': return ()=>({x:0,y:0}); case 'unproject': return ()=>({lng:0,lat:0});
 case 'loaded': case 'isStyleLoaded': case 'isMoving': return ()=>true;
 default: return ()=>makeMap();}}});}
function LngLat(lng,lat){this.lng=lng;this.lat=lat;}
LngLat.prototype.toArray=function(){return [this.lng,this.lat];};
LngLat.prototype.distanceTo=function(){return 0;};
LngLat.convert=v=>Array.isArray(v)?new LngLat(v[0],v[1]):v;

exports.sandbox=function(opts){
 opts=opts||{};
 if(opts.tracerFocus){ global.__TRACE_FOCUS=[]; global.__TRACE_MAP={}; }
 const docEls=Object.create(null);
 const document={createElement:t=>makeNode(t),createElementNS:(n,t)=>makeNode(t),
  createTextNode:()=>makeNode('#text'),createDocumentFragment:()=>makeNode('#f'),
  getElementById:id=>(docEls[id]=docEls[id]||makeNode('#'+id)),
  querySelector:s=>(docEls[s]=docEls[s]||makeNode(s)),querySelectorAll:()=>[],
  addEventListener:()=>{},removeEventListener:()=>{},body:makeNode('body'),head:makeNode('head'),
  documentElement:makeNode('html'),readyState:'complete',activeElement:null,hidden:false,
  fonts:{ready:Promise.resolve()}};
 const s={console,document,
  navigator:{userAgent:'node',language:'fr-FR',clipboard:{writeText:()=>Promise.resolve()},geolocation:{getCurrentPosition:()=>{}}},
  location:{href:'https://example.org/',search:'',hash:'',origin:'https://example.org'},
  URL,URLSearchParams,Promise,JSON,Math,Date,Array,Object,String,Number,Boolean,Map,Set,WeakMap,
  RegExp,Error,TypeError,isNaN,parseFloat,parseInt,encodeURIComponent,decodeURIComponent,
  AbortController,AbortSignal,Intl,TextDecoder,TextEncoder,setTimeout,clearTimeout,setInterval,clearInterval,
  requestAnimationFrame:f=>setTimeout(f,0),cancelAnimationFrame:()=>{},
  Image:function(){return makeNode('img');},
  fetch:()=>Promise.resolve({ok:true,status:200,headers:{get:()=>'application/json'},
    json:()=>Promise.resolve({type:'FeatureCollection',features:[]}),text:()=>Promise.resolve('')}),
  maplibregl:{Map:makeMap,Marker:function(){return makeNode('marker');},Popup:function(){return makeNode('popup');},
    NavigationControl:Ctl,GeolocateControl:Ctl,ScaleControl:Ctl,AttributionControl:Ctl,FullscreenControl:Ctl,
    LngLat,LngLatBounds:function(){return makeNode('b');}},
  CarteFacile:{mapStyles:{simple:{},desaturated:{},aerial:{},standard:{}},SearchControl:Ctl,MapSelectorControl:Ctl,mapStyle:{}}};
 s.window=s; s.globalThis=s; s.self=s; s.top=s; s.parent=s; s.frameElement=null;
 s.scrollX=0; s.scrollY=0; s.innerWidth=1400; s.innerHeight=900; s.devicePixelRatio=1;
 s.matchMedia=()=>({matches:false,addEventListener:()=>{},addListener:()=>{}});
 s.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
 s.addEventListener=()=>{}; s.removeEventListener=()=>{};
 s.performance={now:()=>Date.now()}; s.getComputedStyle=()=>({getPropertyValue:()=>''});
 if(opts.tracerFocus){ s.__focusCalls=global.__TRACE_FOCUS; s.__mapHandlers=global.__TRACE_MAP; }
 return s;};
