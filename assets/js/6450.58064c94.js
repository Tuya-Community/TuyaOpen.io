"use strict";(self.webpackChunktuyaopen_io_website=self.webpackChunktuyaopen_io_website||[]).push([["6450"],{17802:function(e,t,a){function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}a.d(t,{A:()=>i}),(0,a(4171).eW)(i,"populateCommonDb")},93595:function(e,t,a){a.d(t,{diagram:()=>D});var i=a(17802),l=a(72216),r=a(33417),s=a(4171),n=a(3194),o=a(75910),c=s.vZ.pie,p={sections:new Map,showData:!1,config:c},d=p.sections,u=p.showData,g=structuredClone(c),f=(0,s.eW)(()=>structuredClone(g),"getConfig"),h=(0,s.eW)(()=>{d=new Map,u=p.showData,(0,s.ZH)()},"clear"),x=(0,s.eW)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);d.has(e)||(d.set(e,t),s.cM.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,s.eW)(()=>d,"getSections"),m=(0,s.eW)(e=>{u=e},"setShowData"),$=(0,s.eW)(()=>u,"getShowData"),y={getConfig:f,clear:h,setDiagramTitle:s.g2,getDiagramTitle:s.Kr,setAccTitle:s.GN,getAccTitle:s.eu,setAccDescription:s.U$,getAccDescription:s.Mx,addSection:x,getSections:w,setShowData:m,getShowData:$},S=(0,s.eW)((e,t)=>{(0,i.A)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),T={parse:(0,s.eW)(async e=>{let t=await (0,n.Qc)("pie",e);s.cM.debug(t),S(t,y)},"parse")},v=(0,s.eW)(e=>`
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
`,"getStyles"),b=(0,s.eW)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return(0,o.ve8)().value(e=>e.value)(a)},"createPieArcs"),D={parser:T,db:y,renderer:{draw:(0,s.eW)((e,t,a,i)=>{s.cM.debug("rendering pie chart\n"+e);let n=i.db,c=(0,s.nV)(),p=(0,l.Rb)(n.getConfig(),c.pie),d=(0,r.P)(t),u=d.append("g");u.attr("transform","translate(225,225)");let{themeVariables:g}=c,[f]=(0,l.VG)(g.pieOuterStrokeWidth);f??=2;let h=p.textPosition,x=(0,o.Nb1)().innerRadius(0).outerRadius(185),w=(0,o.Nb1)().innerRadius(185*h).outerRadius(185*h);u.append("circle").attr("cx",0).attr("cy",0).attr("r",185+f/2).attr("class","pieOuterCircle");let m=n.getSections(),$=b(m),y=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],S=0;m.forEach(e=>{S+=e});let T=$.filter(e=>"0"!==(e.data.value/S*100).toFixed(0)),v=(0,o.PKp)(y);u.selectAll("mySlices").data(T).enter().append("path").attr("d",x).attr("fill",e=>v(e.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(T).enter().append("text").text(e=>(e.data.value/S*100).toFixed(0)+"%").attr("transform",e=>"translate("+w.centroid(e)+")").style("text-anchor","middle").attr("class","slice"),u.append("text").text(n.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText");let D=[...m.entries()].map(([e,t])=>({label:e,value:t})),C=u.selectAll(".legend").data(D).enter().append("g").attr("class","legend").attr("transform",(e,t)=>"translate(216,"+(22*t-22*D.length/2)+")");C.append("rect").attr("width",18).attr("height",18).style("fill",e=>v(e.label)).style("stroke",e=>v(e.label)),C.append("text").attr("x",22).attr("y",14).text(e=>n.getShowData()?`${e.label} [${e.value}]`:e.label);let W=512+Math.max(...C.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0));d.attr("viewBox",`0 0 ${W} 450`),(0,s.v2)(d,450,W,p.useMaxWidth)},"draw")},styles:v}}}]);