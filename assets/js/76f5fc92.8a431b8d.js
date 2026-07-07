"use strict";(self.webpackChunktuyaopen_io_website=self.webpackChunktuyaopen_io_website||[]).push([["8484"],{11651(e,t,r){r.d(t,{A:()=>o});let o={page:"page_VEEO",split:"split_Q7yX",leftPanel:"leftPanel_TZEC",auroraLayer:"auroraLayer_o_bP",auroraVeil:"auroraVeil_lgBA",leftInner:"leftInner_u8Mu",leftTitle:"leftTitle_uCfX",fadeUp:"fadeUp_tYpC",accent:"accent_fVsV",shimmer:"shimmer_j6aA",leftSub:"leftSub_MYlX",tagline:"tagline_T_dV",scrollCue:"scrollCue_mZA4",rightScroll:"rightScroll_rg5E",rightInner:"rightInner_W0v0",pageLabel:"pageLabel_FDSl",block:"block_NW_K",blockDivider:"blockDivider_bTFs",quoteMark:"quoteMark_HB4c",quoteText:"quoteText_M5bW",quoteAttr:"quoteAttr_yaKb",kicker:"kicker_iD3_",sectionTitle:"sectionTitle_j9Zt",prose:"prose_hHvG",cardGrid:"cardGrid_UEuq",card:"card_Ez__",cardIcon:"cardIcon_iKrx",cardTitle:"cardTitle_zdiR",cardBody:"cardBody_Q44_",stats:"stats_SovZ",statNum:"statNum_AM4S",statLabel:"statLabel_vxhm",statsNote:"statsNote_r1Rd",githubLink:"githubLink_yFi7",reveal:"reveal_tjxF",revealVisible:"revealVisible_wuee"}},44971(e,t,r){r.d(t,{A:()=>p});var o=r(74848),i=r(29412),s=r(17325),n=r(29169),a=r(4347),l=r(92085),c=r(96540);let u=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,d=`#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;function p(e){let{colorStops:t=["#5227FF","#7cff67","#5227FF"],amplitude:r=1,blend:p=.5}=e,h=(0,c.useRef)(e);h.current=e;let m=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let e,o=m.current;if(!o)return;let c=new i.A({alpha:!0,premultipliedAlpha:!0,antialias:!0}),x=c.gl;function f(){if(!o)return;let t=o.offsetWidth,r=o.offsetHeight;c.setSize(t,r),e&&(e.uniforms.uResolution.value=[t,r])}x.clearColor(0,0,0,0),x.enable(x.BLEND),x.blendFunc(x.ONE,x.ONE_MINUS_SRC_ALPHA),x.canvas.style.backgroundColor="transparent",window.addEventListener("resize",f);let v=new s.l(x);v.attributes.uv&&delete v.attributes.uv;let g=t.map(e=>{let t=new n.Q(e);return[t.r,t.g,t.b]});e=new a.B(x,{vertex:u,fragment:d,uniforms:{uTime:{value:0},uAmplitude:{value:r},uColorStops:{value:g},uResolution:{value:[o.offsetWidth,o.offsetHeight]},uBlend:{value:p}}});let y=new l.e(x,{geometry:v,program:e});o.appendChild(x.canvas);let A=0,b=r=>{A=requestAnimationFrame(b);let{time:o=.01*r,speed:i=1}=h.current;e.uniforms.uTime.value=o*i*.1,e.uniforms.uAmplitude.value=h.current.amplitude??1,e.uniforms.uBlend.value=h.current.blend??p;let s=h.current.colorStops??t;e.uniforms.uColorStops.value=s.map(e=>{let t=new n.Q(e);return[t.r,t.g,t.b]}),c.render({scene:y})};return A=requestAnimationFrame(b),f(),()=>{cancelAnimationFrame(A),window.removeEventListener("resize",f),o&&x.canvas.parentNode===o&&o.removeChild(x.canvas),x.getExtension("WEBGL_lose_context")?.loseContext()}},[r]),(0,o.jsx)("div",{ref:m,className:"aurora-container"})}},13569(e,t,r){r.d(t,{A:()=>a});var o=r(74848),i=r(96540),s=r(14915);let n=({text:e,as:t="div",typingSpeed:r=50,initialDelay:n=0,pauseDuration:a=2e3,deletingSpeed:l=30,loop:c=!0,className:u="",showCursor:d=!0,hideCursorWhileTyping:p=!1,cursorCharacter:h="|",cursorClassName:m="",cursorBlinkDuration:x=.5,textColors:f=[],variableSpeed:v,onSentenceComplete:g,startOnVisible:y=!1,reverseMode:A=!1,...b})=>{let[j,k]=(0,i.useState)(""),[_,C]=(0,i.useState)(0),[w,N]=(0,i.useState)(!1),[T,S]=(0,i.useState)(0),[L,E]=(0,i.useState)(!y),I=(0,i.useRef)(null),M=(0,i.useRef)(null),q=(0,i.useMemo)(()=>Array.isArray(e)?e:[e],[e]),B=(0,i.useCallback)(()=>{if(!v)return r;let{min:e,max:t}=v;return Math.random()*(t-e)+e},[v,r]);(0,i.useEffect)(()=>{if(!y||!M.current)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&E(!0)})},{threshold:.1});return e.observe(M.current),()=>e.disconnect()},[y]),(0,i.useEffect)(()=>{d&&I.current&&(s.os.set(I.current,{opacity:1}),s.os.to(I.current,{opacity:0,duration:x,repeat:-1,yoyo:!0,ease:"power2.inOut"}))},[d,x]),(0,i.useEffect)(()=>{let e;if(!L)return;let t=q[T],o=A?t.split("").reverse().join(""):t,i=()=>{if(w)if(""===j){if(N(!1),T===q.length-1&&!c)return;g&&g(q[T],T),S(e=>(e+1)%q.length),C(0),e=setTimeout(()=>{},a)}else e=setTimeout(()=>{k(e=>e.slice(0,-1))},l);else if(_<o.length)e=setTimeout(()=>{k(e=>e+o[_]),C(e=>e+1)},v?B():r);else if(q.length>=1){if(!c&&T===q.length-1)return;e=setTimeout(()=>{N(!0)},a)}};return 0!==_||w||""!==j?i():e=setTimeout(i,n),()=>clearTimeout(e)},[_,j,w,r,l,a,q,T,c,n,L,A,v,g]);let F=p&&(_<q[T].length||w);return(0,i.createElement)(t,{ref:M,className:`text-type ${u}`,...b},(0,o.jsx)("span",{className:"text-type__content",style:{color:(0===f.length?"inherit":f[T%f.length])||"inherit"},children:j}),d&&(0,o.jsx)("span",{ref:I,className:`text-type__cursor ${m} ${F?"text-type__cursor--hidden":""}`,children:h}))};function a({pre:e,em:t,post:r,speed:s=35,cursorCharacter:l="|"}){let c=(0,i.useRef)(null),[u,d]=(0,i.useState)(!1),[p,h]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=c.current;if(!e)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(d(!0),t.disconnect())})},{threshold:.35});return t.observe(e),()=>t.disconnect()},[]),(0,i.useEffect)(()=>{if(!u)return;let r=e.length*s+160,o=t.length*s+160,i=[setTimeout(()=>h(1),r),setTimeout(()=>h(2),r+o)];return()=>i.forEach(clearTimeout)},[u,e,t,s]),(0,o.jsxs)("span",{ref:c,className:"typed-quote","aria-hidden":"true",children:[(0,o.jsxs)("span",{className:"typed-quote__ghost",children:[e,(0,o.jsx)("em",{children:t}),r,(0,o.jsx)("span",{className:"text-type__cursor",children:l})]}),(0,o.jsx)("span",{className:"typed-quote__live",children:u&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{as:"span",text:[e],typingSpeed:s,loop:!1,showCursor:0===p,cursorCharacter:l}),p>=1&&(0,o.jsx)(n,{as:"em",text:[t],typingSpeed:s,loop:!1,showCursor:1===p,cursorCharacter:l}),p>=2&&(0,o.jsx)(n,{as:"span",text:[r],typingSpeed:s,loop:!1,showCursor:!0,cursorCharacter:l})]})})]})}},32214(e,t,r){r.r(t),r.d(t,{default:()=>v});var o=r(74848),i=r(9526),s=r(53572),n=r(95310),a=r(10898),l=r(19793),c=r(34164),u=r(96540),d=r(13569),p=r(11651);let h=["#7c3aed","#22d3ee","#5227FF"],m={connect:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("circle",{cx:"5",cy:"12",r:"2.5"}),(0,o.jsx)("circle",{cx:"19",cy:"5",r:"2.5"}),(0,o.jsx)("circle",{cx:"19",cy:"19",r:"2.5"}),(0,o.jsx)("path",{d:"M7.2 11 16.8 6.2M7.2 13l9.6 4.8"})]}),open:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"4",y:"11",width:"16",height:"10",rx:"2"}),(0,o.jsx)("path",{d:"M8 11V7a4 4 0 0 1 7.5-2"})]}),community:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("circle",{cx:"9",cy:"8",r:"3"}),(0,o.jsx)("path",{d:"M3 20a6 6 0 0 1 12 0"}),(0,o.jsx)("path",{d:"M16 5.5a3 3 0 0 1 0 5M17 14.5a6 6 0 0 1 4 5.5"})]}),ship:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("path",{d:"M13 2 4.5 12h6L9 22l9.5-12h-6L13 2Z"})})},x=(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:(0,o.jsx)("path",{d:"M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"})}),f={en:{meta:{title:"Our Mission",description:"Make agentic hardware simple \u2014 bringing agent connectivity and open protocols to the full spectrum of hardware."},label:"Our Mission",hero:{titlePre:"Make agentic hardware ",titleAccent:"simple.",sub:"The simplest \u2014 and the industry\u2019s most powerful \u2014 multimodal Agent capabilities for developers, building a complete hardware-interaction ecosystem.",tagline:"Agent First Design"},quote:{mark:"\u201C",pre:"The next generation of hardware won\u2019t just run apps. It will ",em:"understand intent and act on it.",post:" Our job is to make that capability the default \u2014 for every device.",attr:"\u2014 The TuyaOpen team"},story:{kicker:"Why we exist",title:"Hardware is shifting from app-first to agent-first",body:["For a decade, smart devices meant an app with fixed buttons, and the intelligence lived in menus the user had to learn. That era is ending.","The next wave routes human intent through an AI agent that reaches the device\u2019s real capabilities \u2014 but building that today is **hard**: fragmented chips, closed protocols, and months of plumbing before the first conversation.","We believe agentic capability should be a **default, not a privilege**. TuyaOpen exists to collapse that gap \u2014 so a maker, a startup, and an enterprise can all ship intelligent hardware on the same open foundation."]},pillars:{kicker:"What we stand for",title:"The principles behind everything we build",items:[{icon:"connect",title:"Agent connectivity for every device",body:"Bring AI agent connectivity and protocol capabilities to the full hardware spectrum \u2014 from low-power Wi-Fi & BLE MCUs to Linux-class boards."},{icon:"open",title:"Open by default",body:"Open source, open protocols, no lock-in. Proven on billions of devices, free for you to inspect, fork, and ship."},{icon:"community",title:"Community-driven",body:"Built in the open with developers worldwide. Roadmaps, issues, and code evolve together with the people who use them."},{icon:"ship",title:"Simple to production",body:"Prototype in hours, mass-produce in days. The hard parts \u2014 security, OTA, cloud, certification \u2014 come integrated."}]},github:"Star us on GitHub"},zh:{meta:{title:"\u6211\u4EEC\u7684\u4F7F\u547D",description:"\u8BA9\u667A\u80FD\u4F53 AI \u786C\u4EF6\u53D8\u5F97\u7B80\u5355\u2014\u2014\u628A\u667A\u80FD\u4F53\u8FDE\u63A5\u80FD\u529B\u4E0E\u5F00\u653E\u534F\u8BAE\u5E26\u7ED9\u5168\u8C31\u7CFB\u7684\u786C\u4EF6\u3002"},hero:{titlePre:"\u8BA9\u667A\u80FD\u4F53 AI \u786C\u4EF6\uFF0C\u53D8\u5F97",titleAccent:"\u7B80\u5355\u3002",sub:"\u4E3A\u5F00\u53D1\u8005\u63D0\u4F9B\u6700\u7B80\u5355\u3001\u4E5F\u662F\u884C\u4E1A\u6700\u5F3A\u5927\u7684\u591A\u6A21\u6001 Agent \u80FD\u529B\uFF0C\u6784\u5EFA\u5B8C\u6574\u7684\u786C\u4EF6\u4EA4\u4E92\u751F\u6001\u3002",tagline:"Agent First Design"},label:"\u6211\u4EEC\u7684\u4F7F\u547D",quote:{mark:"\u201C",pre:"\u4E0B\u4E00\u4EE3\u786C\u4EF6\u4E0D\u53EA\u662F\u8FD0\u884C App\uFF0C\u5B83\u5C06\u80FD\u591F",em:"\u7406\u89E3\u610F\u56FE\uFF0C\u5E76\u4ED8\u8BF8\u884C\u52A8\u3002",post:" \u800C\u6211\u4EEC\u7684\u4F7F\u547D\uFF0C\u662F\u8BA9\u8FD9\u79CD\u80FD\u529B\u6210\u4E3A\u6BCF\u4E2A\u786C\u4EF6\u7684\u9ED8\u8BA4\u9009\u9879\u3002",attr:"\u2014\u2014 TuyaOpen \u56E2\u961F"},story:{kicker:"\u6211\u4EEC\u4E3A\u4F55\u5B58\u5728",title:"\u786C\u4EF6\u6B63\u4ECE\u300CApp \u4F18\u5148\u300D\u8D70\u5411\u300C\u667A\u80FD\u4F53\u4F18\u5148\u300D",body:["\u8FC7\u53BB\u5341\u5E74\uFF0C\u667A\u80FD\u8BBE\u5907\u610F\u5473\u7740\u4E00\u4E2A\u5E26\u7740\u56FA\u5B9A\u6309\u94AE\u7684 App\uFF0C\u667A\u80FD\u85CF\u5728\u7528\u6237\u5FC5\u987B\u5B66\u4E60\u7684\u83DC\u5355\u91CC\u3002\u8FD9\u4E2A\u65F6\u4EE3\u6B63\u5728\u843D\u5E55\u3002","\u65B0\u4E00\u4EE3\u4EA7\u54C1\u628A\u4EBA\u7684\u610F\u56FE\u7ECF\u7531 AI \u667A\u80FD\u4F53\u8DEF\u7531\u5230\u8BBE\u5907\u771F\u6B63\u7684\u80FD\u529B\u4E0A\u2014\u2014\u4F46\u4ECA\u5929\u8981\u505A\u5230\u8FD9\u4E00\u70B9\u4F9D\u7136**\u5F88\u96BE**\uFF1A\u82AF\u7247\u788E\u7247\u5316\u3001\u534F\u8BAE\u5C01\u95ED\uFF0C\u5728\u7B2C\u4E00\u6B21\u5BF9\u8BDD\u4E4B\u524D\u5F80\u5F80\u8981\u5148\u586B\u4E0A\u6570\u6708\u7684\u5DE5\u7A0B\u3002","\u6211\u4EEC\u76F8\u4FE1\uFF0C\u667A\u80FD\u4F53\u80FD\u529B\u5E94\u5F53\u662F**\u9ED8\u8BA4\uFF0C\u800C\u975E\u7279\u6743**\u3002TuyaOpen \u7684\u5B58\u5728\uFF0C\u5C31\u662F\u4E3A\u4E86\u62B9\u5E73\u8FD9\u9053\u9E3F\u6C9F\u2014\u2014\u8BA9\u521B\u5BA2\u3001\u521D\u521B\u56E2\u961F\u4E0E\u4F01\u4E1A\uFF0C\u90FD\u80FD\u5728\u540C\u4E00\u4E2A\u5F00\u653E\u5E95\u5EA7\u4E0A\u4EA4\u4ED8\u667A\u80FD\u786C\u4EF6\u3002"]},pillars:{kicker:"\u6211\u4EEC\u575A\u6301\u7684\u539F\u5219",title:"\u652F\u6491\u6211\u4EEC\u6240\u505A\u4E00\u5207\u7684\u4FE1\u5FF5",items:[{icon:"connect",title:"\u8BA9\u6BCF\u53F0\u8BBE\u5907\u90FD\u62E5\u6709\u667A\u80FD\u4F53\u8FDE\u63A5",body:"\u628A AI \u667A\u80FD\u4F53\u8FDE\u63A5\u4E0E\u534F\u8BAE\u80FD\u529B\u5E26\u7ED9\u5168\u8C31\u7CFB\u786C\u4EF6\u2014\u2014\u4ECE\u4F4E\u529F\u8017 Wi-Fi \u4E0E BLE MCU\uFF0C\u5230 Linux \u7EA7\u522B\u7684\u5F00\u53D1\u677F\u3002"},{icon:"open",title:"\u5F00\u653E\u662F\u9ED8\u8BA4\u9009\u9879",body:"\u5F00\u6E90\u3001\u5F00\u653E\u534F\u8BAE\u3001\u4E0D\u9501\u5B9A\u3002\u4EE3\u7801\u7ECF\u6570\u5341\u4EBF\u8BBE\u5907\u9A8C\u8BC1\uFF0C\u4F9B\u4F60\u81EA\u7531\u5BA1\u9605\u3001Fork \u4E0E\u91CF\u4EA7\u3002"},{icon:"community",title:"\u7531\u793E\u533A\u9A71\u52A8",body:"\u4E0E\u5168\u7403\u5F00\u53D1\u8005\u4E00\u540C\u5728\u5F00\u653E\u4E2D\u6784\u5EFA\u3002\u8DEF\u7EBF\u56FE\u3001Issue \u4E0E\u4EE3\u7801\uFF0C\u4E0E\u4F7F\u7528\u5B83\u4EEC\u7684\u4EBA\u5171\u540C\u6F14\u8FDB\u3002"},{icon:"ship",title:"\u4E00\u8DEF\u7B80\u5355\u76F4\u8FBE\u91CF\u4EA7",body:"\u6570\u5C0F\u65F6\u51FA\u539F\u578B\uFF0C\u6570\u5929\u53EF\u91CF\u4EA7\u3002\u5B89\u5168\u3001OTA\u3001\u4E91\u7AEF\u3001\u8BA4\u8BC1\u8FD9\u4E9B\u96BE\u70B9\uFF0C\u90FD\u5DF2\u4E3A\u4F60\u96C6\u6210\u3002"}]},github:"\u5728 GitHub \u70B9\u4EAE Star"}};function v(){let{i18n:e}=(0,a.A)(),t="zh"===e.currentLocale?"zh":"en",v=f[t],g=(0,u.useRef)(null);return(0,u.useEffect)(()=>{let e=g.current;if(!e)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(p.A.revealVisible),t.unobserve(e.target))})},{rootMargin:"0px 0px -8% 0px",threshold:.08});return e.querySelectorAll(`.${p.A.reveal}`).forEach(e=>t.observe(e)),()=>t.disconnect()},[g]),(0,o.jsxs)(l.A,{title:v.meta.title,description:v.meta.description,children:[(0,o.jsxs)(s.A,{children:[(0,o.jsx)("meta",{name:"keywords",content:"tuyaopen mission, open source iot platform, aiot innovation, open source ai, smart device development"}),(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,o.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,o.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",rel:"stylesheet"})]}),(0,o.jsx)("div",{ref:g,className:p.A.page,children:(0,o.jsxs)("div",{className:p.A.split,children:[(0,o.jsxs)("aside",{className:p.A.leftPanel,children:[(0,o.jsx)("div",{className:p.A.auroraLayer,"aria-hidden":!0,children:(0,o.jsx)(i.A,{children:()=>{let e=r(44971).A;return(0,o.jsx)(e,{colorStops:h,blend:.3,amplitude:1.1,speed:.8})}})}),(0,o.jsx)("div",{className:p.A.auroraVeil,"aria-hidden":!0}),(0,o.jsxs)("div",{className:p.A.leftInner,children:[(0,o.jsxs)("h1",{className:p.A.leftTitle,children:[v.hero.titlePre,(0,o.jsx)("span",{className:p.A.accent,children:v.hero.titleAccent})]}),(0,o.jsx)("p",{className:p.A.leftSub,children:v.hero.sub}),(0,o.jsx)("p",{className:p.A.tagline,children:v.hero.tagline})]}),(0,o.jsxs)("div",{className:p.A.scrollCue,"aria-hidden":!0,children:[(0,o.jsx)("span",{}),"zh"===t?"\u5411\u4E0B\u6EDA\u52A8":"Scroll"]})]}),(0,o.jsx)("div",{className:p.A.rightScroll,children:(0,o.jsxs)("div",{className:p.A.rightInner,children:[(0,o.jsx)("p",{className:p.A.pageLabel,children:v.label}),(0,o.jsxs)("section",{className:(0,c.A)(p.A.block,p.A.reveal),children:[(0,o.jsx)("div",{className:p.A.quoteMark,"aria-hidden":!0,children:v.quote.mark}),(0,o.jsx)("p",{className:p.A.quoteText,"aria-label":`${v.quote.pre}${v.quote.em}${v.quote.post}`,children:(0,o.jsx)(d.A,{pre:v.quote.pre,em:v.quote.em,post:v.quote.post})}),(0,o.jsx)("p",{className:p.A.quoteAttr,children:v.quote.attr})]}),(0,o.jsxs)("section",{className:(0,c.A)(p.A.block,p.A.blockDivider,p.A.reveal),children:[(0,o.jsx)("span",{className:p.A.kicker,children:v.story.kicker}),(0,o.jsx)("h2",{className:p.A.sectionTitle,children:v.story.title}),(0,o.jsx)("div",{className:p.A.prose,children:v.story.body.map((e,t)=>(0,o.jsx)("p",{dangerouslySetInnerHTML:{__html:e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}},t))})]}),(0,o.jsxs)("section",{className:(0,c.A)(p.A.block,p.A.blockDivider,p.A.reveal),children:[(0,o.jsx)("span",{className:p.A.kicker,children:v.pillars.kicker}),(0,o.jsx)("h2",{className:p.A.sectionTitle,children:v.pillars.title}),(0,o.jsx)("div",{className:p.A.cardGrid,children:v.pillars.items.map((e,t)=>(0,o.jsxs)("div",{className:p.A.card,children:[(0,o.jsx)("span",{className:p.A.cardIcon,children:m[e.icon]}),(0,o.jsx)("h3",{className:p.A.cardTitle,children:e.title}),(0,o.jsx)("p",{className:p.A.cardBody,children:e.body})]},t))})]}),(0,o.jsx)("section",{className:(0,c.A)(p.A.block,p.A.blockDivider,p.A.reveal),children:(0,o.jsxs)(n.A,{className:p.A.githubLink,to:"https://github.com/tuya/TuyaOpen",children:[x,v.github]})})]})})]})})]})}}}]);