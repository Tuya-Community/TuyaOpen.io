"use strict";(self.webpackChunktuyaopen_io_website=self.webpackChunktuyaopen_io_website||[]).push([["1638"],{42269:function(e,t,a){function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{S:()=>i}),(0,a(26116).K2)(i,"populateCommonDb")},48021:function(e,t,a){a.d(t,{diagram:()=>b});var i=a(42269),l=a(3349),r=a(61403),s=a(26116),n=a(70307),o=a(51345),c=s.UI.pie,p={sections:new Map,showData:!1,config:c},d=p.sections,u=p.showData,g=structuredClone(c),f=(0,s.K2)(()=>structuredClone(g),"getConfig"),h=(0,s.K2)(()=>{d=new Map,u=p.showData,(0,s.IU)()},"clear"),m=(0,s.K2)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);d.has(e)||(d.set(e,t),s.Rm.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,s.K2)(()=>d,"getSections"),x=(0,s.K2)(e=>{u=e},"setShowData"),S=(0,s.K2)(()=>u,"getShowData"),$={getConfig:f,clear:h,setDiagramTitle:s.ke,getDiagramTitle:s.ab,setAccTitle:s.SV,getAccTitle:s.iN,setAccDescription:s.EI,getAccDescription:s.m7,addSection:m,getSections:w,setShowData:x,getShowData:S},y=(0,s.K2)((e,t)=>{(0,i.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),D={parse:(0,s.K2)(async e=>{let t=await (0,n.qg)("pie",e);s.Rm.debug(t),y(t,$)},"parse")},T=(0,s.K2)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),C=(0,s.K2)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return(0,o.rLf)().value(e=>e.value)(a)},"createPieArcs"),b={parser:D,db:$,renderer:{draw:(0,s.K2)((e,t,a,i)=>{s.Rm.debug("rendering pie chart\n"+e);let n=i.db,c=(0,s.D7)(),p=(0,l.$t)(n.getConfig(),c.pie),d=(0,r.D)(t),u=d.append("g");u.attr("transform","translate(225,225)");let{themeVariables:g}=c,[f]=(0,l.I5)(g.pieOuterStrokeWidth);f??=2;let h=p.textPosition,m=(0,o.JLW)().innerRadius(0).outerRadius(185),w=(0,o.JLW)().innerRadius(185*h).outerRadius(185*h);u.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let x=n.getSections(),S=C(x),$=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],y=0;x.forEach(e=>{y+=e});let D=S.filter(e=>"0"!==(e.data.value/y*100).toFixed(0)),T=(0,o.UMr)($);u.selectAll("mySlices").data(D).enter().append("path").attr("d",m).attr("fill",e=>T(e.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(D).enter().append("text").text(e=>(e.data.value/y*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(n.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let b=[...x.entries()].map(([e,t])=>({label:e,value:t})),v=u.selectAll(".legend").data(b).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*b.length/2)+")");v.append("rect").attr("width",18).attr("height",18).style("fill",e=>T(e.label)).style("stroke",e=>T(e.label)),v.append("text").attr("x",22).attr("y",14).text(e=>n.getShowData()?`${e.label} [${e.value}]`:e.label);let k=512+Math.max(...v.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));d.attr("viewBox",`0 0 ${k} 450`),(0,s.a$)(d,450,k,p.useMaxWidth)},"draw")},styles:T}}}]);