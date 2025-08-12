"use strict";(self.webpackChunktuyaopen_io_website=self.webpackChunktuyaopen_io_website||[]).push([["3396"],{41444:function(e,t,i){function a(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}i.d(t,{A:()=>a}),(0,i(134).eW)(a,"populateCommonDb")},75304:function(e,t,i){i.d(t,{diagram:()=>W});var a=i(41444),l=i(19085),r=i(27395),n=i(134),s=i(3194),o=i(75910),c=n.vZ.pie,p={sections:new Map,showData:!1,config:c},d=p.sections,u=p.showData,g=structuredClone(c),f=(0,n.eW)(()=>structuredClone(g),"getConfig"),h=(0,n.eW)(()=>{d=new Map,u=p.showData,(0,n.ZH)()},"clear"),x=(0,n.eW)(({label:e,value:t})=>{d.has(e)||(d.set(e,t),n.cM.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),m=(0,n.eW)(()=>d,"getSections"),w=(0,n.eW)(e=>{u=e},"setShowData"),y=(0,n.eW)(()=>u,"getShowData"),S={getConfig:f,clear:h,setDiagramTitle:n.g2,getDiagramTitle:n.Kr,setAccTitle:n.GN,getAccTitle:n.eu,setAccDescription:n.U$,getAccDescription:n.Mx,addSection:x,getSections:m,setShowData:w,getShowData:y},T=(0,n.eW)((e,t)=>{(0,a.A)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),$={parse:(0,n.eW)(async e=>{let t=await (0,s.Qc)("pie",e);n.cM.debug(t),T(t,S)},"parse")},D=(0,n.eW)(e=>`
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
`,"getStyles"),C=(0,n.eW)(e=>{let t=[...e.entries()].map(e=>({label:e[0],value:e[1]})).sort((e,t)=>t.value-e.value);return(0,o.ve8)().value(e=>e.value)(t)},"createPieArcs"),W={parser:$,db:S,renderer:{draw:(0,n.eW)((e,t,i,a)=>{n.cM.debug("rendering pie chart\n"+e);let s=a.db,c=(0,n.nV)(),p=(0,l.Rb)(s.getConfig(),c.pie),d=(0,r.P)(t),u=d.append("g");u.attr("transform","translate(225,225)");let{themeVariables:g}=c,[f]=(0,l.VG)(g.pieOuterStrokeWidth);f??=2;let h=p.textPosition,x=(0,o.Nb1)().innerRadius(0).outerRadius(185),m=(0,o.Nb1)().innerRadius(185*h).outerRadius(185*h);u.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let w=s.getSections(),y=C(w),S=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],T=(0,o.PKp)(S);u.selectAll("mySlices").data(y).enter().append("path").attr("d",x).attr("fill",e=>T(e.data.label)).attr("class","pieCircle");let $=0;w.forEach(e=>{$+=e}),u.selectAll("mySlices").data(y).enter().append("text").text(e=>(e.data.value/$*100).toFixed(0)+"%").attr("transform",e=>"translate("+m.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let D=u.selectAll(".legend").data(T.domain()).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*T.domain().length/2)+")");D.append("rect").attr("width",18).attr("height",18).style("fill",T).style("stroke",T),D.data(y).append("text").attr("x",22).attr("y",14).text(e=>{let{label:t,value:i}=e.data;return s.getShowData()?`${t} [${i}]`:t});let W=512+Math.max(...D.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));d.attr("viewBox",`0 0 ${W} 450`),(0,n.v2)(d,450,W,p.useMaxWidth)},"draw")},styles:D}}}]);