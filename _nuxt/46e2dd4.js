(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{351:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return v})),n.d(t,"c",(function(){return d}));var r=n(352),o=n(1),l=Object(o.h)("v-card__actions"),c=Object(o.h)("v-card__subtitle"),v=Object(o.h)("v-card__text"),d=Object(o.h)("v-card__title");r.a},481:function(e,t,n){"use strict";n.r(t);var r={components:{},data:function(){return{weaponNames:["刀剣","長柄","打撃","射撃","魔法"],materialName:["金属","木材","皮革"]}},props:{materials:Object,materialsCorrection:Object},computed:{cMaterials:{get:function(){return this.materials},set:function(e){this.$emit("update:materials",e)}},cMaterialsCorrection:{get:function(){return this.materialsCorrection},set:function(e){this.$emit("update:materialsCorrection",e)}}}},o=n(83),l=n(108),c=n.n(l),v=n(352),d=n(351),_=n(386),m=n(387),f=n(439),w=n(440),x=n(441),k=n(442),h=n(388),C=n(523),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",e._l(e.weaponNames,(function(t){return n("v-col",{key:t},[n("v-card",[n("v-card-title",[e._v(e._s(t))]),e._v(" "),n("v-expansion-panels",{attrs:{accordion:"",focusable:"",multiple:""}},e._l([0,1,2,3,4,5],(function(r){return n("v-expansion-panel",{key:r},[n("v-expansion-panel-header",[e._v("武器ランク:"+e._s(r))]),e._v(" "),n("v-expansion-panel-content",e._l(e.materialName,(function(o){return n("v-row",{key:o},[n("v-col",[n("v-row",[n("v-col",[e._v("【"+e._s(o)+"】")])],1),e._v(" "),n("v-row",[n("v-col",[n("v-row",[n("v-col",[e._v("基礎値")])],1),e._v(" "),n("v-row",e._l([0,1,2],(function(l){return n("v-col",{key:l},[n("v-text-field",{attrs:{label:String(l)},model:{value:e.cMaterials[t][r].materialList[o][l],callback:function(n){e.$set(e.cMaterials[t][r].materialList[o],l,n)},expression:"cMaterials[weapon][wRank].materialList[material][mRank]"}})],1)})),1)],1),e._v(" "),n("v-divider",{attrs:{vertical:""}}),e._v(" "),n("v-col",[n("v-row",[n("v-col",[e._v("補正値")])],1),e._v(" "),n("v-row",e._l([0,1,2],(function(l){return n("v-col",{key:l},[n("v-text-field",{attrs:{label:String(l)},model:{value:e.cMaterialsCorrection[t][r].materialList[o][l],callback:function(n){e.$set(e.cMaterialsCorrection[t][r].materialList[o],l,n)},expression:"cMaterialsCorrection[weapon][wRank].materialList[material][mRank]"}})],1)})),1)],1)],1),e._v(" "),n("v-divider")],1)],1)})),1)],1)})),1)],1)],1)})),1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VCard:v.a,VCardTitle:d.c,VCol:_.a,VDivider:m.a,VExpansionPanel:f.a,VExpansionPanelContent:w.a,VExpansionPanelHeader:x.a,VExpansionPanels:k.a,VRow:h.a,VTextField:C.a})}}]);