import{B as j,G as re,H as se,m as K,y as R,Y as oe,N as le,Q as de,P as D,S as F,U as ue,L as $,ai as M,A as U,q as c,aO as ce,a0 as pe,o as i,c as d,b as r,a6 as q,a1 as g,n as h,a2 as E,a as v,t as m,l as Z,w as L,d as I,a3 as me,v as S,F as O,j as T,h as fe,u as b,aI as x,e as N,aP as be,f as he,af as ge,aQ as Q,aR as ve,aS as W,r as ye,aT as xe,aU as ke}from"./main-Dfxa_GYZ.js";import{O as we}from"./index-BL6foCSv.js";import{u as Ie}from"./useDarkMode-BdJNHfSU.js";import{_ as Le}from"./EzzeButton-CyDh3rG3.js";var _e=`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,Oe={root:function(t){var n=t.props;return["p-menu p-component",{"p-menu-overlay":n.popup}]},start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:function(t){var n=t.instance;return["p-menu-item",{"p-focus":n.id===n.focusedOptionId,"p-disabled":n.disabled()}]},itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},Se=j.extend({name:"menu",style:_e,classes:Oe}),Pe={name:"BaseMenu",extends:K,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:"body"},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:Se,provide:function(){return{$pcMenu:this,$parentInstance:this}}},J={name:"Menuitem",hostName:"Menu",extends:K,inheritAttrs:!1,emits:["item-click","item-mousemove"],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(t,n){return t&&t.item?ce(t.item[n]):void 0},getPTOptions:function(t){return this.ptm(t,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(t){var n=this.getItemProp(this.item,"command");n&&n({originalEvent:t,item:this.item.item}),this.$emit("item-click",{originalEvent:t,item:this.item,id:this.id})},onItemMouseMove:function(t){this.$emit("item-mousemove",{originalEvent:t,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},getMenuItemProps:function(t){return{action:c({class:this.cx("itemLink"),tabindex:"-1"},this.getPTOptions("itemLink")),icon:c({class:[this.cx("itemIcon"),t.icon]},this.getPTOptions("itemIcon")),label:c({class:this.cx("itemLabel")},this.getPTOptions("itemLabel"))}}},computed:{dataP:function(){return R({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:se}},Ce=["id","aria-label","aria-disabled","data-p-focused","data-p-disabled","data-p"],ze=["data-p"],Ae=["href","target"],$e=["data-p"],Me=["data-p"];function Ee(e,t,n,s,u,a){var k=pe("ripple");return a.visible()?(i(),d("li",c({key:0,id:n.id,class:[e.cx("item"),n.item.class],role:"menuitem",style:n.item.style,"aria-label":a.label(),"aria-disabled":a.disabled(),"data-p-focused":a.isItemFocused(),"data-p-disabled":a.disabled()||!1,"data-p":a.dataP},a.getPTOptions("item")),[r("div",c({class:e.cx("itemContent"),onClick:t[0]||(t[0]=function(y){return a.onItemClick(y)}),onMousemove:t[1]||(t[1]=function(y){return a.onItemMouseMove(y)}),"data-p":a.dataP},a.getPTOptions("itemContent")),[n.templates.item?n.templates.item?(i(),g(E(n.templates.item),{key:1,item:n.item,label:a.label(),props:a.getMenuItemProps(n.item)},null,8,["item","label","props"])):v("",!0):q((i(),d("a",c({key:0,href:n.item.url,class:e.cx("itemLink"),target:n.item.target,tabindex:"-1"},a.getPTOptions("itemLink")),[n.templates.itemicon?(i(),g(E(n.templates.itemicon),{key:0,item:n.item,class:h(e.cx("itemIcon"))},null,8,["item","class"])):n.item.icon?(i(),d("span",c({key:1,class:[e.cx("itemIcon"),n.item.icon],"data-p":a.dataP},a.getPTOptions("itemIcon")),null,16,$e)):v("",!0),r("span",c({class:e.cx("itemLabel"),"data-p":a.dataP},a.getPTOptions("itemLabel")),m(a.label()),17,Me)],16,Ae)),[[k]])],16,ze)],16,Ce)):v("",!0)}J.render=Ee;function G(e){return De(e)||Re(e)||Ke(e)||Te()}function Te(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ke(e,t){if(e){if(typeof e=="string")return B(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}function Re(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function De(e){if(Array.isArray(e))return B(e)}function B(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,s=Array(t);n<t;n++)s[n]=e[n];return s}var H={name:"Menu",extends:Pe,inheritAttrs:!1,emits:["show","hide","focus","blur"],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.target=null,this.container&&this.autoZIndex&&F.clear(this.container),this.container=null},methods:{itemClick:function(t){var n=t.item;this.disabled(n)||(n.command&&n.command(t),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==t.id&&(this.focusedOptionIndex=t.id))},itemMouseMove:function(t){this.focused&&(this.focusedOptionIndex=t.id)},onListFocus:function(t){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"ArrowUp":this.onArrowUpKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"Enter":case"NumpadEnter":this.onEnterKey(t);break;case"Space":this.onSpaceKey(t);break;case"Escape":this.popup&&($(this.target),this.hide());case"Tab":this.overlayVisible&&this.hide();break}},onArrowDownKey:function(t){var n=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()},onArrowUpKey:function(t){if(t.altKey&&this.popup)$(this.target),this.hide(),t.preventDefault();else{var n=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(n),t.preventDefault()}},onHomeKey:function(t){this.changeFocusedOptionIndex(0),t.preventDefault()},onEndKey:function(t){this.changeFocusedOptionIndex(M(this.container,'li[data-pc-section="item"][data-p-disabled="false"]').length-1),t.preventDefault()},onEnterKey:function(t){var n=U(this.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),s=n&&U(n,'a[data-pc-section="itemlink"]');this.popup&&$(this.target),s?s.click():n&&n.click(),t.preventDefault()},onSpaceKey:function(t){this.onEnterKey(t)},findNextOptionIndex:function(t){var n=M(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=G(n).findIndex(function(u){return u.id===t});return s>-1?s+1:0},findPrevOptionIndex:function(t){var n=M(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=G(n).findIndex(function(u){return u.id===t});return s>-1?s-1:0},changeFocusedOptionIndex:function(t){var n=M(this.container,'li[data-pc-section="item"][data-p-disabled="false"]'),s=t>=n.length?n.length-1:t<0?0:t;s>-1&&(this.focusedOptionIndex=n[s].getAttribute("id"))},toggle:function(t,n){this.overlayVisible?this.hide():this.show(t,n)},show:function(t,n){this.overlayVisible=!0,this.target=n??t.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(t){ue(t,{position:"absolute",top:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&F.set("menu",t,this.baseZIndex||this.$primevue.config.zIndex.menu),this.popup&&$(this.list),this.$emit("show")},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit("hide")},onAfterLeave:function(t){this.autoZIndex&&F.clear(t)},alignOverlay:function(){de(this.container,this.target);var t=D(this.target);t>D(this.container)&&(this.container.style.minWidth=D(this.target)+"px")},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){var s=t.container&&!t.container.contains(n.target),u=!(t.target&&(t.target===n.target||t.target.contains(n.target)));t.overlayVisible&&s&&u?t.hide():!t.popup&&s&&u&&(t.focusedOptionIndex=-1)},document.addEventListener("click",this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener,!0),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new le(this.target,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!oe()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},visible:function(t){return typeof t.visible=="function"?t.visible():t.visible!==!1},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},label:function(t){return typeof t.label=="function"?t.label():t.label},onOverlayClick:function(t){we.emit("overlay-click",{originalEvent:t,target:this.target})},containerRef:function(t){this.container=t},listRef:function(t){this.list=t}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null},dataP:function(){return R({popup:this.popup})}},components:{PVMenuitem:J,Portal:re}},Fe=["id","data-p"],Ne=["id","tabindex","aria-activedescendant","aria-label","aria-labelledby"],Be=["id"];function Ve(e,t,n,s,u,a){var k=Z("PVMenuitem"),y=Z("Portal");return i(),g(y,{appendTo:e.appendTo,disabled:!e.popup},{default:L(function(){return[I(me,c({name:"p-anchored-overlay",onEnter:a.onEnter,onLeave:a.onLeave,onAfterLeave:a.onAfterLeave},e.ptm("transition")),{default:L(function(){return[!e.popup||u.overlayVisible?(i(),d("div",c({key:0,ref:a.containerRef,id:e.$id,class:e.cx("root"),onClick:t[3]||(t[3]=function(){return a.onOverlayClick&&a.onOverlayClick.apply(a,arguments)}),"data-p":a.dataP},e.ptmi("root")),[e.$slots.start?(i(),d("div",c({key:0,class:e.cx("start")},e.ptm("start")),[S(e.$slots,"start")],16)):v("",!0),r("ul",c({ref:a.listRef,id:e.$id+"_list",class:e.cx("list"),role:"menu",tabindex:e.tabindex,"aria-activedescendant":u.focused?a.focusedOptionId:void 0,"aria-label":e.ariaLabel,"aria-labelledby":e.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return a.onListFocus&&a.onListFocus.apply(a,arguments)}),onBlur:t[1]||(t[1]=function(){return a.onListBlur&&a.onListBlur.apply(a,arguments)}),onKeydown:t[2]||(t[2]=function(){return a.onListKeyDown&&a.onListKeyDown.apply(a,arguments)})},e.ptm("list")),[(i(!0),d(O,null,T(e.model,function(l,p){return i(),d(O,{key:a.label(l)+p.toString()},[l.items&&a.visible(l)&&!l.separator?(i(),d(O,{key:0},[l.items?(i(),d("li",c({key:0,id:e.$id+"_"+p,class:[e.cx("submenuLabel"),l.class],role:"none"},{ref_for:!0},e.ptm("submenuLabel")),[S(e.$slots,e.$slots.submenulabel?"submenulabel":"submenuheader",{item:l},function(){return[fe(m(a.label(l)),1)]})],16,Be)):v("",!0),(i(!0),d(O,null,T(l.items,function(o,f){return i(),d(O,{key:o.label+p+"_"+f},[a.visible(o)&&!o.separator?(i(),g(k,{key:0,id:e.$id+"_"+p+"_"+f,item:o,templates:e.$slots,focusedOptionId:a.focusedOptionId,unstyled:e.unstyled,onItemClick:a.itemClick,onItemMousemove:a.itemMouseMove,pt:e.pt},null,8,["id","item","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"])):a.visible(o)&&o.separator?(i(),d("li",c({key:"separator"+p+f,class:[e.cx("separator"),l.class],style:o.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):v("",!0)],64)}),128))],64)):a.visible(l)&&l.separator?(i(),d("li",c({key:"separator"+p.toString(),class:[e.cx("separator"),l.class],style:l.style,role:"separator"},{ref_for:!0},e.ptm("separator")),null,16)):(i(),g(k,{key:a.label(l)+p.toString(),id:e.$id+"_"+p,item:l,index:p,templates:e.$slots,focusedOptionId:a.focusedOptionId,unstyled:e.unstyled,onItemClick:a.itemClick,onItemMousemove:a.itemMouseMove,pt:e.pt},null,8,["id","item","index","templates","focusedOptionId","unstyled","onItemClick","onItemMousemove","pt"]))],64)}),128))],16,Ne),e.$slots.end?(i(),d("div",c({key:1,class:e.cx("end")},e.ptm("end")),[S(e.$slots,"end")],16)):v("",!0)],16,Fe)):v("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo","disabled"])}H.render=Ve;const je={class:"flex items-center"},He=["onClick"],Ue={__name:"ThemeSwitcher",setup(e){const{theme:t,setTheme:n}=Ie(),s=N(),u=N([{id:"light",label:"Light",icon:"pi pi-sun",command:()=>n("light")},{id:"dark",label:"Dark",icon:"pi pi-moon",command:()=>n("dark")},{id:"system",label:"System",icon:"pi pi-desktop",command:()=>n("system")}]),a=l=>{s.value.toggle(l)},k=x(()=>{switch(t.value){case"light":return"pi pi-sun";case"dark":return"pi pi-moon";default:return"pi pi-desktop"}}),y={root:{class:"mt-sm min-w-[140px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden"},menu:{class:"py-xs list-none m-0"}};return(l,p)=>(i(),d("div",je,[I(Le,{type:"button",onClick:a,variant:"ghost",icon:k.value,class:"h-11! w-11! rounded-full px-0! py-0! bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200","aria-label":"Toggle theme"},null,8,["icon"]),I(b(H),{ref_key:"menu",ref:s,model:u.value,popup:!0,pt:y},{item:L(({item:o,props:f})=>[r("div",c({class:[[b(t)===o.id?"bg-slate-50 dark:bg-slate-700":""],"flex items-center px-lg py-md gap-md cursor-pointer group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"]},f.action,{onClick:o.command}),[r("i",{class:h([[o.icon,b(t)===o.id?"text-primary-500 dark:text-primary-400":"text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"],"text-base transition-colors"])},null,2),r("span",{class:h([[b(t)===o.id?" font-semibold text-primary-500 dark:text-primary-400":"text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white"],"text-sm transition-colors flex-1"])},m(o.label),3)],16,He)]),_:1},8,["model"])]))}};var Ze=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`,We={root:function(t){var n=t.props;return["p-avatar p-component",{"p-avatar-image":n.image!=null,"p-avatar-circle":n.shape==="circle","p-avatar-lg":n.size==="large","p-avatar-xl":n.size==="xlarge"}]},label:"p-avatar-label",icon:"p-avatar-icon"},Ge=j.extend({name:"avatar",style:Ze,classes:We}),Ye={name:"BaseAvatar",extends:K,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:Ge,provide:function(){return{$pcAvatar:this,$parentInstance:this}}};function C(e){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(e)}function Y(e,t,n){return(t=qe(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qe(e){var t=Qe(e,"string");return C(t)=="symbol"?t:t+""}function Qe(e,t){if(C(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var s=n.call(e,t);if(C(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var P={name:"Avatar",extends:Ye,inheritAttrs:!1,emits:["error"],methods:{onError:function(t){this.$emit("error",t)}},computed:{dataP:function(){return R(Y(Y({},this.shape,this.shape),this.size,this.size))}}},Je=["aria-labelledby","aria-label","data-p"],Xe=["data-p"],et=["data-p"],tt=["src","alt","data-p"];function nt(e,t,n,s,u,a){return i(),d("div",c({class:e.cx("root"),"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel},e.ptmi("root"),{"data-p":a.dataP}),[S(e.$slots,"default",{},function(){return[e.label?(i(),d("span",c({key:0,class:e.cx("label")},e.ptm("label"),{"data-p":a.dataP}),m(e.label),17,Xe)):e.$slots.icon?(i(),g(E(e.$slots.icon),{key:1,class:h(e.cx("icon"))},null,8,["class"])):e.icon?(i(),d("span",c({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon"),{"data-p":a.dataP}),null,16,et)):e.image?(i(),d("img",c({key:3,src:e.image,alt:e.ariaLabel,onError:t[0]||(t[0]=function(){return a.onError&&a.onError.apply(a,arguments)})},e.ptm("image"),{"data-p":a.dataP}),null,16,tt)):v("",!0)]})],16,Je)}P.render=nt;var at=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`,it={root:function(t){var n=t.props;return["p-tag p-component",{"p-tag-info":n.severity==="info","p-tag-success":n.severity==="success","p-tag-warn":n.severity==="warn","p-tag-danger":n.severity==="danger","p-tag-secondary":n.severity==="secondary","p-tag-contrast":n.severity==="contrast","p-tag-rounded":n.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},rt=j.extend({name:"tag",style:at,classes:it}),st={name:"BaseTag",extends:K,props:{value:null,severity:null,rounded:Boolean,icon:String},style:rt,provide:function(){return{$pcTag:this,$parentInstance:this}}};function z(e){"@babel/helpers - typeof";return z=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},z(e)}function ot(e,t,n){return(t=lt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function lt(e){var t=dt(e,"string");return z(t)=="symbol"?t:t+""}function dt(e,t){if(z(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var s=n.call(e,t);if(z(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var V={name:"Tag",extends:st,inheritAttrs:!1,computed:{dataP:function(){return R(ot({rounded:this.rounded},this.severity,this.severity))}}},ut=["data-p"];function ct(e,t,n,s,u,a){return i(),d("span",c({class:e.cx("root"),"data-p":a.dataP},e.ptmi("root")),[e.$slots.icon?(i(),g(E(e.$slots.icon),c({key:0,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(i(),d("span",c({key:1,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):v("",!0),e.value!=null||e.$slots.default?S(e.$slots,"default",{key:2},function(){return[r("span",c({class:e.cx("label")},e.ptm("label")),m(e.value),17)]}):v("",!0)],16,ut)}V.render=ct;const pt={class:"flex items-center"},mt={class:"flex items-center gap-md"},ft={class:"hidden min-w-0 text-left sm:block"},bt={class:"truncate text-sm font-bold leading-none text-heading"},ht={class:"mt-[2px] truncate text-[11px] font-medium leading-none text-muted"},gt={class:"border-b border-slate-100 px-lg py-lg dark:border-slate-700/70"},vt={class:"flex items-start gap-md"},yt={class:"min-w-0 flex-1"},xt={class:"truncate text-sm font-bold text-heading"},kt={class:"mt-xs truncate text-xs font-medium text-muted"},wt={class:"mt-sm flex flex-wrap gap-xs"},It=["onClick"],Lt={class:"min-w-0 flex-1"},_t={key:0,class:"mt-0.5 truncate text-xs text-muted"},Ot={__name:"CurrentUser",setup(e){const t=be("$session"),n=he(),s=N(),u=x(()=>t?.currentUser||null),a=x(()=>u.value?.full_name||u.value?.username||u.value?.user||"Admin User"),k=x(()=>u.value?.username||u.value?.user||"No username"),y=x(()=>u.value?.role_profile||"No role profile"),l=x(()=>u.value?.roles?.[0]||""),p=x(()=>{const _=u.value?.photo;return _?(_.startsWith("http"),_):null}),o=x(()=>a.value.split(" ").filter(Boolean).slice(0,2).map(A=>A[0]?.toUpperCase()).join("")||"EU"),f=x(()=>[{label:"Account Settings",description:"Review admin preferences and profile options.",icon:"pi pi-cog",trailingIcon:"pi pi-angle-right",command:()=>n.push("/menu-admin/settings")},{label:"Sign Out",description:"End the current session securely.",icon:"pi pi-sign-out",danger:!0,command:()=>t?.logout()}]);function X(_){s.value.toggle(_)}const ee={root:{class:"inline-flex items-center rounded-full border border-slate-200 bg-white p-[5px] shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800"}},te={root:{class:"mt-sm w-[320px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"},menu:{class:"list-none m-0 p-sm"},separator:{class:"my-xs border-t border-slate-100 dark:border-slate-700/70"}},ne={root:{class:"inline-flex items-center rounded-full bg-primary px-sm py-xs text-[11px] font-bold uppercase tracking-[0.12em] text-primary-contrast"}},ae={root:{class:"inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-sm py-xs text-[11px] font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-200"}};return(_,A)=>(i(),d("div",pt,[I(b(ge),{type:"button",onClick:X,pt:ee,"aria-label":"Open current user menu"},{default:L(()=>[r("div",mt,[p.value?(i(),g(b(P),{key:0,image:p.value,shape:"circle",class:"h-9 w-9 rounded-full overflow-hidden ring-2 ring-slate-100 shadow-sm dark:ring-slate-700"},null,8,["image"])):(i(),g(b(P),{key:1,label:o.value,shape:"circle",class:"h-9 w-9 rounded-full bg-primary text-xs font-bold text-primary-contrast ring-2 ring-slate-100 shadow-sm dark:ring-slate-700"},null,8,["label"])),r("div",ft,[r("p",bt,m(a.value),1),r("p",ht,m(y.value),1)]),A[0]||(A[0]=r("i",{class:"pi pi-chevron-down hidden text-[10px] text-muted sm:block"},null,-1))])]),_:1}),I(b(H),{ref_key:"userMenu",ref:s,model:f.value,popup:!0,pt:te},{start:L(()=>[r("div",gt,[r("div",vt,[p.value?(i(),g(b(P),{key:0,image:p.value,shape:"circle",class:"h-12 w-12 overflow-hidden ring-2 ring-slate-100 shadow-sm dark:ring-slate-700"},null,8,["image"])):(i(),g(b(P),{key:1,label:o.value,shape:"circle",class:"h-11 w-11 bg-primary text-sm font-bold text-primary-contrast ring-2 ring-slate-100 shadow-sm dark:ring-slate-700"},null,8,["label"])),r("div",yt,[r("p",xt,m(a.value),1),r("p",kt,m(k.value),1),r("div",wt,[I(b(V),{value:y.value,unstyled:"",pt:ne},null,8,["value"]),l.value?(i(),g(b(V),{key:0,value:l.value,unstyled:"",pt:ae},null,8,["value"])):v("",!0)])])])])]),item:L(({item:w,props:ie})=>[r("div",c(ie.action,{class:["group flex items-center gap-md px-lg py-md transition-colors",w.danger?"cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20":"cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"],onClick:Ut=>w.command?.()}),[r("div",{class:h(["flex h-9 w-9 items-center justify-center rounded-xl border transition-colors",w.danger?"border-red-200 text-red-500 dark:border-red-900/70 dark:text-red-400":"border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"])},[r("i",{class:h([w.icon,"text-sm"])},null,2)],2),r("div",Lt,[r("p",{class:h(["text-sm font-semibold transition-colors",w.danger?"text-red-600 dark:text-red-400":"text-heading group-hover:text-heading"])},m(w.label),3),w.description?(i(),d("p",_t,m(w.description),1)):v("",!0)]),w.trailingIcon?(i(),d("i",{key:0,class:h([w.trailingIcon,"text-xs text-muted"])},null,2)):v("",!0)],16,It)]),_:1},8,["model"])]))}},St={class:"space-y-xs"},Pt=["onClick"],Ct={class:"flex items-center gap-3"},zt={class:"mt-xs space-y-xs border-l border-border pl-md"},At={key:0,class:"rounded-2xl border border-dashed border-border px-md py-md text-sm text-muted"},$t={__name:"NavSidebar",setup(e){const t=Q(),n=xe(),s=ye({}),u=x(()=>n.value||[]);function a(l){s[l]=!s[l]}function k(l){return!!l&&t.path===l}function y(l=[]){return l.some(p=>p.url&&t.path===p.url)}return(l,p)=>(i(),d("nav",St,[(i(!0),d(O,null,T(u.value,o=>(i(),d("div",{key:o.value||o.label},[o.items?.length?(i(),d(O,{key:0},[r("button",{type:"button",class:h(["flex w-full items-center justify-between rounded-2xl px-md py-sm text-sm font-semibold text-body transition hover:bg-slate-100 dark:hover:bg-slate-800",y(o.items)?"bg-primary text-primary-contrast":""]),onClick:f=>a(o.value||o.label)},[r("span",Ct,[r("i",{class:h(["pi",o.icon||"pi-folder"])},null,2),r("span",null,m(o.label),1)]),r("i",{class:h(["pi pi-chevron-down text-xs transition-transform",s[o.value||o.label]||y(o.items)?"rotate-180":""])},null,2)],10,Pt),q(r("div",zt,[(i(!0),d(O,null,T(o.items,f=>(i(),g(b(W),{key:f.value||f.label,to:f.url||"#",class:h(["flex items-center gap-3 rounded-xl px-md py-sm text-sm font-medium transition",k(f.url)?"bg-primary text-primary-contrast":"text-body hover:bg-slate-100 dark:hover:bg-slate-800"])},{default:L(()=>[r("i",{class:h(["pi",f.icon||"pi-circle-fill text-[10px]"])},null,2),r("span",null,m(f.label),1)]),_:2},1032,["to","class"]))),128))],512),[[ve,s[o.value||o.label]||y(o.items)]])],64)):(i(),g(b(W),{key:1,to:o.url||"#",class:h(["flex items-center gap-3 rounded-2xl px-md py-sm text-sm font-semibold transition",k(o.url)?"bg-primary text-primary-contrast":"text-body hover:bg-slate-100 dark:hover:bg-slate-800"])},{default:L(()=>[r("i",{class:h(["pi",o.icon||"pi-angle-right"])},null,2),r("span",null,m(o.label),1)]),_:2},1032,["to","class"]))]))),128)),u.value.length?v("",!0):(i(),d("p",At," No sidebar routes found in `Frontend Route Setting` for this frontend project. "))]))}},Mt={class:"app-shell flex min-h-screen"},Et={class:"hidden w-72 shrink-0 border-r border-border bg-surface px-lg py-md lg:block"},Tt={class:"mb-xl"},Kt={class:"text-xs font-bold uppercase tracking-[0.24em] text-muted"},Rt={class:"flex min-h-screen flex-1 flex-col"},Dt={class:"sticky top-0 z-20 border-b border-border bg-surface/90 px-lg py-xs backdrop-blur"},Ft={class:"flex max-w-8xl items-center justify-between gap-3"},Nt={class:"text-lg font-bold leading-tight text-heading"},Bt={class:"flex items-center gap-sm"},Vt={class:"flex-1 px-lg py-xl"},jt={class:"max-w-9xl"},Ht={__name:"MainLayout",props:{title:{type:String,default:"Overview"},app_title:{type:String,default:"Overview"}},setup(e){return(t,n)=>(i(),d("div",Mt,[r("aside",Et,[r("div",Tt,[r("p",Kt,m(e.app_title),1),n[0]||(n[0]=r("h1",{class:"mt-xs text-2xl font-extrabold text-heading"},"Admin Console",-1))]),I($t)]),r("div",Rt,[r("header",Dt,[r("div",Ft,[r("div",null,[r("h2",Nt,m(e.title),1)]),r("div",Bt,[I(Ue),I(Ot)])])]),r("main",Vt,[r("div",jt,[S(t.$slots,"default")])])])]))}},qt={__name:"AdminShell",setup(e){const t=Q(),n=x(()=>localStorage.getItem("ezze-menu-admin-app-title")||"Admin Panel"),s=x(()=>t.meta.title||"Overview");return(u,a)=>(i(),g(Ht,{title:s.value,app_title:n.value},{default:L(()=>[I(b(ke))]),_:1},8,["title","app_title"]))}};export{qt as default};
