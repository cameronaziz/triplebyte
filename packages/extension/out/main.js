var w=Object.create;var d=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var P=(t,e)=>{for(var s in e)d(t,s,{get:e[s],enumerable:!0})},f=(t,e,s,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of x(e))!k.call(t,r)&&r!==s&&d(t,r,{get:()=>e[r],enumerable:!(o=g(e,r))||o.enumerable});return t};var T=(t,e,s)=>(s=t!=null?w(y(t)):{},f(e||!t||!t.__esModule?d(s,"default",{value:t,enumerable:!0}):s,t)),U=t=>f(d({},"__esModule",{value:!0}),t);var l=(t,e,s)=>new Promise((o,r)=>{var a=i=>{try{c(s.next(i))}catch(m){r(m)}},p=i=>{try{c(s.throw(i))}catch(m){r(m)}},c=i=>i.done?o(i.value):Promise.resolve(i.value).then(a,p);c((s=s.apply(t,e)).next())});var M={};P(M,{activate:()=>E,deactivate:()=>F});module.exports=U(M);var h=T(require("path")),n=require("vscode"),b=t=>{let e=n.workspace.workspaceFolders;return e?e.map(s=>s.uri):[]},j=t=>l(void 0,null,function*(){let s=(yield n.workspace.fs.readDirectory(t)).filter(([o])=>!o.startsWith(".")&&!o.startsWith("node_modules")).map(([o,r])=>n.Uri.file(h.default.join(t.fsPath,o)));return u(s)}),u=t=>l(void 0,null,function*(){let e=[];for(let s=0;s<t.length;s++){let o=t[s];switch((yield n.workspace.fs.stat(o)).type){case n.FileType.Directory:{let a=yield j(o);e.push(...a)}case n.FileType.File:o.path.endsWith("package.json")&&e.push(o)}}return e}),C=(t,e)=>l(void 0,null,function*(){let s=t.map(a=>l(void 0,null,function*(){let p=yield n.workspace.fs.readFile(a),c=JSON.parse(p.toString());if(c.bin)return e.sendText(`cd ${a.fsPath.split("/").slice(0,-1).join("/")}`),e.sendText("npm link"),Object.keys(c.bin)})),r=(yield Promise.all(s)).filter(a=>!!a).reduce((a,p)=>a.concat(p),[]);return console.log(r),r}),W=()=>l(void 0,null,function*(){n.window.showInformationMessage("Hello World!",{modal:!0});let t=b();if(t.length<1){n.window.showErrorMessage("No workspace found");return}let e=n.window.createTerminal("Tetris",process.env.COMSPEC),s=yield u(t);yield C(s,e),e.show(),n.commands.executeCommand("workbench.action.toggleMaximizedPanel"),e.sendText("tb")}),E=t=>{W()},F=()=>{};0&&(module.exports={activate,deactivate});