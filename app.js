const input=document.getElementById("video");
const preview=document.getElementById("preview");
const analyze=document.getElementById("analyze");
const result=document.getElementById("result");
let url=null;

input.addEventListener("change",()=>{
  const file=input.files[0];
  if(!file)return;
  if(url)URL.revokeObjectURL(url);
  url=URL.createObjectURL(file);
  preview.src=url;
  preview.hidden=false;
  analyze.disabled=false;
  result.hidden=true;
});

analyze.addEventListener("click",()=>{
  analyze.textContent="分析中…";
  analyze.disabled=true;
  setTimeout(()=>{
    result.hidden=false;
    analyze.textContent="もう一度分析";
    analyze.disabled=false;
    result.scrollIntoView({behavior:"smooth"});
  },900);
});