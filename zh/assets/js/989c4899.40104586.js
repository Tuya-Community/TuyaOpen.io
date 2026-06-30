"use strict";(self.webpackChunktuyaopen_io_website=self.webpackChunktuyaopen_io_website||[]).push([["2703"],{11651(e,t,o){o.d(t,{A:()=>r});let r={page:"page_VEEO",split:"split_Q7yX",leftPanel:"leftPanel_TZEC",auroraLayer:"auroraLayer_o_bP",auroraVeil:"auroraVeil_lgBA",leftInner:"leftInner_u8Mu",leftTitle:"leftTitle_uCfX",fadeUp:"fadeUp_tYpC",accent:"accent_fVsV",shimmer:"shimmer_j6aA",leftSub:"leftSub_MYlX",tagline:"tagline_T_dV",scrollCue:"scrollCue_mZA4",rightScroll:"rightScroll_rg5E",rightInner:"rightInner_W0v0",pageLabel:"pageLabel_FDSl",block:"block_NW_K",blockDivider:"blockDivider_bTFs",quoteMark:"quoteMark_HB4c",quoteText:"quoteText_M5bW",quoteAttr:"quoteAttr_yaKb",kicker:"kicker_iD3_",sectionTitle:"sectionTitle_j9Zt",prose:"prose_hHvG",cardGrid:"cardGrid_UEuq",card:"card_Ez__",cardIcon:"cardIcon_iKrx",cardTitle:"cardTitle_zdiR",cardBody:"cardBody_Q44_",stats:"stats_SovZ",statNum:"statNum_AM4S",statLabel:"statLabel_vxhm",statsNote:"statsNote_r1Rd",githubLink:"githubLink_yFi7",reveal:"reveal_tjxF",revealVisible:"revealVisible_wuee"}},44971(e,t,o){o.d(t,{A:()=>h});var r=o(74848),i=o(29412),s=o(17325),a=o(29169),l=o(4347),n=o(92085),c=o(96540);let d=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,u=`#version 300 es
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
`;function h(e){let{colorStops:t=["#5227FF","#7cff67","#5227FF"],amplitude:o=1,blend:h=.5}=e,m=(0,c.useRef)(e);m.current=e;let p=(0,c.useRef)(null);return(0,c.useEffect)(()=>{let e,r=p.current;if(!r)return;let c=new i.A({alpha:!0,premultipliedAlpha:!0,antialias:!0}),x=c.gl;function v(){if(!r)return;let t=r.offsetWidth,o=r.offsetHeight;c.setSize(t,o),e&&(e.uniforms.uResolution.value=[t,o])}x.clearColor(0,0,0,0),x.enable(x.BLEND),x.blendFunc(x.ONE,x.ONE_MINUS_SRC_ALPHA),x.canvas.style.backgroundColor="transparent",window.addEventListener("resize",v);let A=new s.l(x);A.attributes.uv&&delete A.attributes.uv;let f=t.map(e=>{let t=new a.Q(e);return[t.r,t.g,t.b]});e=new l.B(x,{vertex:d,fragment:u,uniforms:{uTime:{value:0},uAmplitude:{value:o},uColorStops:{value:f},uResolution:{value:[r.offsetWidth,r.offsetHeight]},uBlend:{value:h}}});let b=new n.e(x,{geometry:A,program:e});r.appendChild(x.canvas);let y=0,g=o=>{y=requestAnimationFrame(g);let{time:r=.01*o,speed:i=1}=m.current;e.uniforms.uTime.value=r*i*.1,e.uniforms.uAmplitude.value=m.current.amplitude??1,e.uniforms.uBlend.value=m.current.blend??h;let s=m.current.colorStops??t;e.uniforms.uColorStops.value=s.map(e=>{let t=new a.Q(e);return[t.r,t.g,t.b]}),c.render({scene:b})};return y=requestAnimationFrame(g),v(),()=>{cancelAnimationFrame(y),window.removeEventListener("resize",v),r&&x.canvas.parentNode===r&&r.removeChild(x.canvas),x.getExtension("WEBGL_lose_context")?.loseContext()}},[o]),(0,r.jsx)("div",{ref:p,className:"aurora-container"})}},94059(e,t,o){o.r(t),o.d(t,{default:()=>v});var r=o(74848),i=o(9526),s=o(53572),a=o(95310),l=o(10898),n=o(60795),c=o(34164),d=o(96540),u=o(11651);let h=["#06b6d4","#7c3aed","#a5b4fc"],m={heart:(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("path",{d:"M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.6 12 20 12 20Z"})}),branch:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("circle",{cx:"6",cy:"5",r:"2.5"}),(0,r.jsx)("circle",{cx:"6",cy:"19",r:"2.5"}),(0,r.jsx)("circle",{cx:"18",cy:"9",r:"2.5"}),(0,r.jsx)("path",{d:"M6 7.5v9M6 12a6 6 0 0 0 6-6h3.5"})]}),grid:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.5"}),(0,r.jsx)("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.5"}),(0,r.jsx)("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.5"}),(0,r.jsx)("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.5"})]})},p=(0,r.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:(0,r.jsx)("path",{d:"M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.48.1-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.8 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"})}),x={en:{meta:{title:"About Us",description:"A team inside Tuya dedicated to the open-source community \u2014 bringing agent connectivity and protocol capabilities to the full spectrum of hardware."},label:"About Us",hero:{titlePre:"A team inside Tuya, building agentic hardware ",titleAccent:"in the open.",sub:"We\u2019re the people behind TuyaOpen \u2014 a community-driven, open-source foundation that brings agent connectivity and protocols to every kind of device."},quote:{mark:"\u201C",pre:"We don\u2019t build for the community from the outside. ",em:"We build with it,",post:" in the open, one pull request and one device at a time.",attr:"\u2014 The TuyaOpen team"},story:{kicker:"Who we are",title:"Open source is how we work, not a side project",body:["TuyaOpen is built by a dedicated team **inside Tuya** whose whole focus is the open-source developer community. We sit close to the silicon, the cloud, and the AI stack \u2014 and we put all of it in the open.","Our work is **community-driven**: the roadmap is public, the issues are yours to file, and the code is yours to read, fork, and ship \u2014 backed by Tuya\u2019s scale across 200+ countries and regions.","We have one technical north star: **bring agent connectivity and protocol capabilities to the full spectrum of hardware** \u2014 from the smallest Wi-Fi MCU to Linux-class boards."]},tuya:{kicker:"The company behind us",title:"Backed by Tuya",body:["**Tuya Inc.** (NYSE: TUYA; HKEX: 2391) is a leading global AI cloud platform service provider. Through the TuyaOpen open-source framework and universal AI Agent engines, it integrates multimodal AI to lower the barrier to development and bring AI into the physical world \u2014 an open, neutral global AIoT ecosystem for brands, OEMs, integrators, and developers."]},stats:{items:[{num:"1.97M+",label:"Registered AI developers"},{num:"200+",label:"Countries & regions reached"},{num:"100%",label:"Open source \xb7 Apache-2.0"}],note:"* As of March 31, 2026"},values:{kicker:"How we work",title:"What community-driven means to us",items:[{icon:"heart",title:"Inside Tuya, for the community",body:"A dedicated team with the full backing of Tuya\u2019s connectivity, cloud, and AI \u2014 pointed entirely at open-source developers."},{icon:"branch",title:"Built in the open",body:"Public roadmaps, open issues, and code you can fork today. Contributions shape where TuyaOpen goes next."},{icon:"grid",title:"Agent connectivity for all hardware",body:"We meet your hardware where it is \u2014 bringing agent and protocol capabilities across the entire device spectrum."}]},github:"Star us on GitHub"},zh:{meta:{title:"\u5173\u4E8E\u6211\u4EEC",description:"\u4E00\u652F\u4E13\u6CE8\u4E8E\u5F00\u6E90\u793E\u533A\u7684\u6D82\u9E26\u56E2\u961F\u2014\u2014\u628A\u667A\u80FD\u4F53\u8FDE\u63A5\u80FD\u529B\u4E0E\u534F\u8BAE\u5E26\u7ED9\u5168\u8C31\u7CFB\u7684\u786C\u4EF6\u3002"},label:"\u5173\u4E8E\u6211\u4EEC",hero:{titlePre:"\u4E00\u652F\u6765\u81EA\u6D82\u9E26\u7684\u56E2\u961F\uFF0C\u548C\u793E\u533A\u4E00\u8D77",titleAccent:"\u628A\u667A\u80FD\u4F53 AI \u786C\u4EF6\u5F00\u6E90\u3002",sub:"\u6211\u4EEC\u5C31\u662F TuyaOpen \u80CC\u540E\u7684\u4EBA\u3002\u548C\u5168\u7403\u5F00\u53D1\u8005\u4E00\u8D77\uFF0C\u8BA9\u6BCF\u4E00\u7C7B\u786C\u4EF6\u90FD\u7528\u4E0A\u5F00\u653E\u7684\u667A\u80FD\u4F53\u8FDE\u63A5\u4E0E\u534F\u8BAE\u80FD\u529B\u3002"},quote:{mark:"\u201C",pre:"\u6700\u597D\u7684\u667A\u80FD\u4F53 AI \u786C\u4EF6\uFF0C\u4ECE\u6765\u4E0D\u662F\u95ED\u95E8\u9020\u8F66\u3002",em:"\u5B83\u5728\u793E\u533A\u91CC\u5171\u540C\u751F\u957F\u2014\u2014",post:"\u6BCF\u4E00\u4E2A PR\u3001\u6BCF\u4E00\u53F0\u8BBE\u5907\uFF0C\u90FD\u662F\u4F60\u6211\u5171\u540C\u5411\u524D\u7684\u4E00\u6B65\u3002",attr:"\u2014\u2014 TuyaOpen \u56E2\u961F"},story:{kicker:"\u6211\u4EEC\u662F\u8C01",title:"\u5F00\u6E90\u662F\u6211\u4EEC\u7684\u5DE5\u4F5C\u65B9\u5F0F\uFF0C\u800C\u975E\u526F\u4E1A",body:["TuyaOpen \u7531\u4E00\u652F**\u5C31\u5728\u6D82\u9E26\u5185\u90E8**\u3001\u5168\u8EAB\u5FC3\u6295\u5165\u5F00\u6E90\u5F00\u53D1\u8005\u793E\u533A\u7684\u56E2\u961F\u6253\u9020\u3002\u6211\u4EEC\u7D27\u8D34\u82AF\u7247\u3001\u4E91\u7AEF\u4E0E AI \u6280\u672F\u6808\u2014\u2014\u5E76\u628A\u8FD9\u4E00\u5207\u90FD\u653E\u5230\u5F00\u653E\u4E4B\u4E2D\u3002","\u6211\u4EEC\u7684\u5DE5\u4F5C**\u7531\u793E\u533A\u9A71\u52A8**\uFF1A\u8DEF\u7EBF\u56FE\u516C\u5F00\uFF0CIssue \u7531\u4F60\u63D0\u4EA4\uFF0C\u4EE3\u7801\u4F9B\u4F60\u5BA1\u9605\u3001Fork \u4E0E\u91CF\u4EA7\u2014\u2014\u80CC\u9760\u6D82\u9E26\u8986\u76D6 200+ \u4E2A\u56FD\u5BB6\u4E0E\u5730\u533A\u7684\u89C4\u6A21\u3002","\u6211\u4EEC\u6709\u4E00\u4E2A\u660E\u786E\u7684\u6280\u672F\u5317\u6781\u661F\uFF1A**\u628A\u667A\u80FD\u4F53\u8FDE\u63A5\u4E0E\u534F\u8BAE\u80FD\u529B\u5E26\u7ED9\u5168\u8C31\u7CFB\u786C\u4EF6**\u2014\u2014\u4ECE\u6700\u5C0F\u7684 Wi-Fi MCU \u5230 Linux \u7EA7\u522B\u7684\u5F00\u53D1\u677F\u3002"]},tuya:{kicker:"\u6211\u4EEC\u80CC\u540E\u7684\u516C\u53F8",title:"\u80CC\u9760\u6D82\u9E26",body:["**\u6D82\u9E26\u667A\u80FD**\uFF08\u7EBD\u4EA4\u6240\uFF1ATUYA\uFF1B\u6E2F\u4EA4\u6240\uFF1A2391\uFF09\u662F\u5168\u7403\u9886\u5148\u7684 AI \u4E91\u5E73\u53F0\u670D\u52A1\u63D0\u4F9B\u5546\u3002\u901A\u8FC7 TuyaOpen \u5F00\u6E90\u5F00\u53D1\u6846\u67B6\u4E0E\u901A\u7528 AI Agent \u5F15\u64CE\uFF0C\u96C6\u6210\u591A\u6A21\u6001 AI \u80FD\u529B\uFF0C\u964D\u4F4E\u5F00\u53D1\u95E8\u69DB\uFF0C\u8BA9 AI \u8D70\u8FDB\u7269\u7406\u4E16\u754C\u2014\u2014\u5E76\u63D0\u4F9B\u5F00\u653E\u4E2D\u7ACB\u7684\u5168\u7403\u5316 AIoT \u751F\u6001\uFF0C\u8FDE\u63A5\u54C1\u724C\u3001OEM\u3001\u7CFB\u7EDF\u96C6\u6210\u5546\u4E0E\u5F00\u53D1\u8005\u3002"]},stats:{items:[{num:"197\u4E07+",label:"\u6CE8\u518C AI \u5F00\u53D1\u8005"},{num:"200+",label:"\u8986\u76D6\u56FD\u5BB6\u4E0E\u5730\u533A"},{num:"100%",label:"\u5F00\u6E90 \xb7 Apache-2.0"}],note:"* \u622A\u81F3 2026 \u5E74 3 \u6708 31 \u65E5"},values:{kicker:"\u6211\u4EEC\u5982\u4F55\u5DE5\u4F5C",title:"\u300C\u793E\u533A\u9A71\u52A8\u300D\u5BF9\u6211\u4EEC\u610F\u5473\u7740\u4EC0\u4E48",items:[{icon:"heart",title:"\u8EAB\u5904\u6D82\u9E26\uFF0C\u670D\u52A1\u793E\u533A",body:"\u4E00\u652F\u4E13\u6CE8\u7684\u56E2\u961F\uFF0C\u80CC\u9760\u6D82\u9E26\u5B8C\u6574\u7684\u8FDE\u63A5\u3001\u4E91\u7AEF\u4E0E AI \u80FD\u529B\u2014\u2014\u5E76\u5C06\u5168\u90E8\u7CBE\u529B\u6295\u5411\u5F00\u6E90\u5F00\u53D1\u8005\u3002"},{icon:"branch",title:"\u5728\u5F00\u653E\u4E2D\u6784\u5EFA",body:"\u516C\u5F00\u7684\u8DEF\u7EBF\u56FE\u3001\u5F00\u653E\u7684 Issue\uFF0C\u4EE5\u53CA\u4ECA\u5929\u5C31\u80FD Fork \u7684\u4EE3\u7801\u3002\u793E\u533A\u7684\u8D21\u732E\uFF0C\u51B3\u5B9A TuyaOpen \u7684\u4E0B\u4E00\u6B65\u3002"},{icon:"grid",title:"\u4E3A\u5168\u90E8\u786C\u4EF6\u5E26\u6765\u667A\u80FD\u4F53\u8FDE\u63A5",body:"\u6211\u4EEC\u5728\u4F60\u7684\u786C\u4EF6\u6240\u5728\u4E4B\u5904\u4E0E\u5B83\u76F8\u9047\u2014\u2014\u628A\u667A\u80FD\u4F53\u4E0E\u534F\u8BAE\u80FD\u529B\u5E26\u7ED9\u6574\u4E2A\u8BBE\u5907\u8C31\u7CFB\u3002"}]},github:"\u5728 GitHub \u70B9\u4EAE Star"}};function v(){let{i18n:e}=(0,l.A)(),t="zh"===e.currentLocale?"zh":"en",v=x[t],A=(0,d.useRef)(null);return(0,d.useEffect)(()=>{let e=A.current;if(!e)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(u.A.revealVisible),t.unobserve(e.target))})},{rootMargin:"0px 0px -8% 0px",threshold:.08});return e.querySelectorAll(`.${u.A.reveal}`).forEach(e=>t.observe(e)),()=>t.disconnect()},[A]),(0,r.jsxs)(n.A,{title:v.meta.title,description:v.meta.description,children:[(0,r.jsxs)(s.A,{children:[(0,r.jsx)("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),(0,r.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"}),(0,r.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",rel:"stylesheet"})]}),(0,r.jsx)("div",{ref:A,className:u.A.page,children:(0,r.jsxs)("div",{className:u.A.split,children:[(0,r.jsxs)("aside",{className:u.A.leftPanel,children:[(0,r.jsx)("div",{className:u.A.auroraLayer,"aria-hidden":!0,children:(0,r.jsx)(i.A,{children:()=>{let e=o(44971).A;return(0,r.jsx)(e,{colorStops:h,blend:.3,amplitude:1.1,speed:.7})}})}),(0,r.jsx)("div",{className:u.A.auroraVeil,"aria-hidden":!0}),(0,r.jsxs)("div",{className:u.A.leftInner,children:[(0,r.jsxs)("h1",{className:u.A.leftTitle,children:[v.hero.titlePre,(0,r.jsx)("span",{className:u.A.accent,children:v.hero.titleAccent})]}),(0,r.jsx)("p",{className:u.A.leftSub,children:v.hero.sub})]}),(0,r.jsxs)("div",{className:u.A.scrollCue,"aria-hidden":!0,children:[(0,r.jsx)("span",{}),"zh"===t?"\u5411\u4E0B\u6EDA\u52A8":"Scroll"]})]}),(0,r.jsx)("div",{className:u.A.rightScroll,children:(0,r.jsxs)("div",{className:u.A.rightInner,children:[(0,r.jsx)("p",{className:u.A.pageLabel,children:v.label}),(0,r.jsxs)("section",{className:(0,c.A)(u.A.block,u.A.reveal),children:[(0,r.jsx)("div",{className:u.A.quoteMark,"aria-hidden":!0,children:v.quote.mark}),(0,r.jsxs)("p",{className:u.A.quoteText,children:[v.quote.pre,(0,r.jsx)("em",{children:v.quote.em}),v.quote.post]}),(0,r.jsx)("p",{className:u.A.quoteAttr,children:v.quote.attr})]}),(0,r.jsxs)("section",{className:(0,c.A)(u.A.block,u.A.blockDivider,u.A.reveal),children:[(0,r.jsx)("span",{className:u.A.kicker,children:v.story.kicker}),(0,r.jsx)("h2",{className:u.A.sectionTitle,children:v.story.title}),(0,r.jsx)("div",{className:u.A.prose,children:v.story.body.map((e,t)=>(0,r.jsx)("p",{dangerouslySetInnerHTML:{__html:e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}},t))})]}),(0,r.jsxs)("section",{className:(0,c.A)(u.A.block,u.A.blockDivider,u.A.reveal),children:[(0,r.jsx)("span",{className:u.A.kicker,children:v.tuya.kicker}),(0,r.jsx)("h2",{className:u.A.sectionTitle,children:v.tuya.title}),(0,r.jsx)("div",{className:u.A.prose,children:v.tuya.body.map((e,t)=>(0,r.jsx)("p",{dangerouslySetInnerHTML:{__html:e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}},t))})]}),(0,r.jsxs)("section",{className:(0,c.A)(u.A.block,u.A.blockDivider,u.A.reveal),children:[(0,r.jsx)("div",{className:u.A.stats,children:v.stats.items.map((e,t)=>(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:u.A.statNum,children:e.num}),(0,r.jsx)("div",{className:u.A.statLabel,children:e.label})]},t))}),(0,r.jsx)("p",{className:u.A.statsNote,children:v.stats.note})]}),(0,r.jsxs)("section",{className:(0,c.A)(u.A.block,u.A.blockDivider,u.A.reveal),children:[(0,r.jsx)("span",{className:u.A.kicker,children:v.values.kicker}),(0,r.jsx)("h2",{className:u.A.sectionTitle,children:v.values.title}),(0,r.jsx)("div",{className:u.A.cardGrid,children:v.values.items.map((e,t)=>(0,r.jsxs)("div",{className:u.A.card,children:[(0,r.jsx)("span",{className:u.A.cardIcon,children:m[e.icon]}),(0,r.jsx)("h3",{className:u.A.cardTitle,children:e.title}),(0,r.jsx)("p",{className:u.A.cardBody,children:e.body})]},t))})]}),(0,r.jsx)("section",{className:(0,c.A)(u.A.block,u.A.blockDivider,u.A.reveal),children:(0,r.jsxs)(a.A,{className:u.A.githubLink,to:"https://github.com/tuya/TuyaOpen",children:[p,v.github]})})]})})]})})]})}}}]);