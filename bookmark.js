javascript:(function(){const a=Object.values(ABLincoln.running_tests).map(a=>a.namespace),b=a.reduce((a,b)=>{const{name:c,experiments:d}=b,e=d.map(a=>a.parameters),f=[].concat(...e);return a[c]=f.reduce((a,b)=>{const{name:c,choice:d}=b;return a[c]=a[c]||[],a[c].includes(d)||a[c].push(d),a},{}),a},{}),c=a=>{const b=document.createElement("select");return Object.keys(a).forEach(c=>{const d=a[c],e=document.createElement("optgroup");e.setAttribute("label",c),Object.keys(d).forEach(a=>{d[a].forEach(b=>{const c=document.createElement("option");c.value=`?ab_${a}=${b}`,c.innerHTML=`${a}: ${b}`,e.appendChild(c)})}),b.appendChild(e),b.addEventListener("change",()=>{document.location.search=b.value})}),b};(()=>{const a=c(b);document.body.firstElementChild.style.opacity=.3,a.style.cssText="position: fixed; top: 10%; left: 50%;",document.body.appendChild(a)})()})();
