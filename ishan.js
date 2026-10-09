"use strict";

const DATA = {
  Bengaluru: {
    categories:[["❄️","AC Service"],["🧹","Cleaning"],["🪠","Plumbing"],["⚡","Electrical"],["🎨","Painting"],["🛠️","Carpentry"]],
    pros:[
      ["Arjun Home Care","AC Service",4.9,128,499,"AH",210,6],["FreshNest Cleaning","Cleaning",4.8,96,699,"FC",175,5],
      ["PipeRight Services","Plumbing",4.9,154,399,"PR",280,7],["BrightSpark Electricals","Electrical",4.8,117,449,"BE",195,5],
      ["ColorCraft Painters","Painting",4.7,82,799,"CC",135,4],["WoodWorks Studio","Carpentry",4.8,74,549,"WW",120,5]
    ],
    reviews:[["Kavya Rao","Home cleaning","The options were clear, and it was easy to compare professionals."],["Vikram S.","AC service","I found a service quickly and the booking steps were straightforward."],["Ananya P.","Plumbing","Seeing ratings and starting prices in one place was useful."]]
  },
  Mumbai:{
    categories:[["❄️","AC Service"],["🧹","Cleaning"],["🪠","Plumbing"],["⚡","Electrical"],["🎨","Painting"],["🚚","Moving"]],
    pros:[["CoolAir Mumbai","AC Service",4.8,117,649,"CA",200,6],["NeatSpace Crew","Cleaning",4.9,247,749,"NC",370,8],["A1 Plumbing Works","Plumbing",4.8,162,449,"A1",260,7],["Mumbai WireCare","Electrical",4.7,104,499,"MW",180,5],["ColorCraft Painters","Painting",4.7,83,899,"CC",140,5],["EasyShift Movers","Moving",4.8,129,1099,"EM",220,7]],
    reviews:[["Rhea Shah","Cleaning","It was simple to browse services and understand starting prices."],["Aditya Nair","Electrical","The ratings made comparing options easier."],["Mihir Patel","Moving","The demo booking flow was quick and easy to follow."]]
  },
  Delhi:{
    categories:[["❄️","AC Service"],["🧹","Cleaning"],["🪠","Plumbing"],["⚡","Electrical"],["🎨","Painting"],["🛠️","Carpentry"]],
    pros:[["AirEase Repairs","AC Service",4.7,94,599,"AE",160,5],["CleanSlate Homes","Cleaning",4.8,199,649,"CH",300,7],["Delhi Pipe Masters","Plumbing",4.8,153,399,"DP",245,7],["VoltPro Delhi","Electrical",4.9,137,449,"VD",225,6],["Brush & Roll","Painting",4.8,81,799,"BR",135,5],["WoodWorks Delhi","Carpentry",4.7,67,499,"WD",112,4]],
    reviews:[["Ishita Verma","Electrical","I liked seeing ratings and starting prices before choosing."],["Rahul B.","Carpentry","Finding a service by category was convenient."],["Sana Ali","Cleaning","The interface was simple and easy to use."]]
  },
  Chandigarh:{
    categories:[["❄️","AC Service"],["🧹","Cleaning"],["🪠","Plumbing"],["⚡","Electrical"],["🎨","Painting"],["🚚","Moving"]],
    pros:[["CoolFix Services","AC Service",4.7,84,599,"CF",140,4],["Sparkle Home Care","Cleaning",4.9,204,699,"SH",320,7],["Aman Sharma","Plumbing",4.9,128,399,"AS",210,6],["Priya Electricals","Electrical",4.8,96,499,"PE",175,5],["Rohit Verma","Painting",4.8,73,799,"RV",120,5],["CityShift Movers","Moving",4.8,112,999,"CM",190,6]],
    reviews:[["Neha Kapoor","Cleaning","The booking process was simple and the service details were clear."],["Arjun Mehta","Plumbing","A convenient way to compare local service options."],["Simran Kaur","Electrical","The starting prices helped me compare professionals."]]
  },
  Chennai:{
    categories:[["❄️","AC Service"],["🧹","Cleaning"],["🪠","Plumbing"],["⚡","Electrical"],["💻","Appliance Repair"],["🛠️","Carpentry"]],
    pros:[["ChillFix Chennai","AC Service",4.7,73,549,"CC",130,4],["TidyHome Crew","Cleaning",4.9,183,599,"TH",280,7],["Chennai PipeCare","Plumbing",4.8,124,349,"CP",205,6],["SafeSpark Chennai","Electrical",4.8,101,449,"SC",175,5],["ApplianceAid","Appliance Repair",4.8,69,499,"AA",115,4],["WoodMate Services","Carpentry",4.7,58,449,"WM",95,4]],
    reviews:[["Divya S.","Cleaning","The available services were easy to understand."],["Karthik R.","Plumbing","Useful for comparing local service professionals."],["Priya M.","Appliance repair","Simple layout and clear booking steps."]]
  }
};

const $ = id => document.getElementById(id);
let city = "Bengaluru", query = "", category = "", chosenPro = null, bookingId = "", toastTimer;

function escapeHTML(s){return String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function activeData(){return DATA[city] || DATA.Bengaluru;}
function toast(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
}
function openModal(id){const el=$(id);if(!el)return;el.classList.add("active");document.body.style.overflow="hidden";}
function closeModal(id){const el=$(id);if(el)el.classList.remove("active");if(!document.querySelector(".modal.active"))document.body.style.overflow="";}
function info(title,message){$("infoTitle").textContent=title;$("infoText").textContent=message;openModal("infoModal");}
function renderCategories(){
  $("categoryGrid").innerHTML=activeData().categories.map(([icon,name])=>`<button type="button" class="category-card ${category===name?"selected":""}" data-category="${escapeHTML(name)}"><span class="category-icon">${icon}</span><strong>${escapeHTML(name)}</strong></button>`).join("");
}
function matches(pro){
  const q=query.toLowerCase().trim();
  const categoryOK=!category||pro[1]===category;
  const queryOK=!q||[pro[0],pro[1]].some(v=>v.toLowerCase().includes(q))||
    (q.includes("home")&&pro[1]==="Cleaning")||(q.includes("ac")&&pro[1]==="AC Service")||
    (q.includes("electric")&&pro[1]==="Electrical")||(q.includes("plumb")&&pro[1]==="Plumbing");
  return categoryOK&&queryOK;
}
function renderPros(){
  const pros=activeData().pros.filter(matches);
  $("resultCount").textContent=`${pros.length} professional${pros.length===1?"":"s"} found`;
  $("prosCity").textContent=city;
  $("prosGrid").innerHTML=pros.map(pro=>{
    const index=activeData().pros.indexOf(pro);
    return `<article class="pro-card"><div class="pro-top"><div class="pro-avatar">${escapeHTML(pro[5])}</div><div class="pro-details"><h3>${escapeHTML(pro[0])} <span class="verified">✓ Verified</span></h3><p>${escapeHTML(pro[1])}</p></div></div><div class="pro-rating"><span>★ ${pro[2]}</span> <small>(${pro[3]} reviews)</small></div><div class="pro-stats"><span>${pro[6]} jobs completed</span><span>${pro[7]} years experience</span></div><div class="pro-card-bottom"><div><small>Starting from</small><strong>₹${pro[4]}</strong></div><button class="primary-btn book-btn" type="button" data-book="${index}">Book now →</button></div></article>`;
  }).join("");
  $("emptyState").classList.toggle("hidden",pros.length>0);
  $("prosGrid").classList.toggle("hidden",pros.length===0);
}
function renderReviews(){
  $("reviewsGrid").innerHTML=activeData().reviews.map(r=>`<article class="review-card"><div class="review-stars">★★★★★</div><p>“${escapeHTML(r[2])}”</p><div class="review-author"><strong>${escapeHTML(r[0])}</strong><small>${escapeHTML(r[1])}</small></div></article>`).join("");
}
function render(){
  $("currentCity").textContent=city;$("citySelect").value=city;
  renderCategories();renderPros();renderReviews();
}
function setCity(next){
  if(!DATA[next])return;city=next;
  try{localStorage.setItem("taskmate-city",city);}catch(e){}
  $("locationMenu").classList.remove("active");render();toast("City changed to "+city);
}
function applySearch(){
  query=$("searchInput").value.trim();category="";renderCategories();renderPros();
  $("pros").scrollIntoView({behavior:"smooth",block:"start"});
}
function book(pro){
  chosenPro=pro;$("bookingName").textContent=pro[0];$("bookingRole").textContent=pro[1]+" · "+city;
  $("bookingPrice").textContent="₹"+pro[4];$("bookingContent").classList.remove("hidden");
  $("bookingSuccess").classList.add("hidden");openModal("bookingModal");
}
function confirmBooking(){
  if(!chosenPro){toast("Please choose a professional first.");return;}
  bookingId="TM"+Math.random().toString(36).slice(2,8).toUpperCase();
  const saved={id:bookingId,city,professional:chosenPro[0],service:chosenPro[1],price:chosenPro[4],createdAt:new Date().toISOString()};
  try{const all=JSON.parse(localStorage.getItem("taskmate-bookings")||"[]");all.push(saved);localStorage.setItem("taskmate-bookings",JSON.stringify(all));}catch(e){}
  $("successName").textContent=chosenPro[0];$("bookingId").textContent=bookingId;
  $("bookingContent").classList.add("hidden");$("bookingSuccess").classList.remove("hidden");toast("Demo booking saved!");
}
function submitDispute(){
  const report={bookingId:bookingId||"No booking ID",reason:$("disputeReason").value,note:$("disputeNote").value.trim(),createdAt:new Date().toISOString()};
  try{const all=JSON.parse(localStorage.getItem("taskmate-reports")||"[]");all.push(report);localStorage.setItem("taskmate-reports",JSON.stringify(all));}catch(e){}
  $("disputeNote").value="";closeModal("disputeModal");toast("Demo report saved in this browser.");
}

/* One delegated click handler keeps dynamically-rendered buttons working. */
document.addEventListener("click",event=>{
  const target=event.target;
  const cityBtn=target.closest("[data-city]");
  if(cityBtn){setCity(cityBtn.dataset.city);return;}
  const catBtn=target.closest("[data-category]");
  if(catBtn){category=category===catBtn.dataset.category?"":catBtn.dataset.category;query="";$("searchInput").value="";renderCategories();renderPros();$("pros").scrollIntoView({behavior:"smooth"});return;}
  const popular=target.closest("[data-search]");
  if(popular){$("searchInput").value=popular.dataset.search;applySearch();return;}
  const bookBtn=target.closest("[data-book]");
  if(bookBtn){const pro=activeData().pros[Number(bookBtn.dataset.book)];if(pro)book(pro);return;}
  const closeBtn=target.closest("[data-close]");
  if(closeBtn){closeModal(closeBtn.dataset.close);return;}
  if(target.classList.contains("modal")){closeModal(target.id);}
});

$("locationBtn").addEventListener("click",()=> $("locationMenu").classList.toggle("active"));
$("menuBtn").addEventListener("click",()=> $("mobileNav").classList.toggle("active"));
$("searchForm").addEventListener("submit",event=>{event.preventDefault();applySearch();});
$("findBtn").addEventListener("click",event=>{event.preventDefault();applySearch();});
$("citySelect").addEventListener("change",event=>setCity(event.target.value));
$("showAllBtn").addEventListener("click",()=>{query="";category="";$("searchInput").value="";renderCategories();renderPros();$("services").scrollIntoView({behavior:"smooth"});});
$("clearSearch").addEventListener("click",()=>{query="";category="";$("searchInput").value="";renderCategories();renderPros();});
$("confirmBooking").addEventListener("click",confirmBooking);
$("openDispute").addEventListener("click",()=>{closeModal("bookingModal");openModal("disputeModal");});
$("submitDispute").addEventListener("click",submitDispute);
$("loginBtn").addEventListener("click",()=>info("Log in","Login is a demo feature. No real account system is connected yet."));
$("signupBtn").addEventListener("click",()=>info("Create an account","Sign-up is a demo feature. Account creation is not connected yet."));
$("mobileLogin").addEventListener("click",()=>{ $("mobileNav").classList.remove("active");info("Log in","Login is a demo feature. No real account system is connected yet.");});
$("mobileSignup").addEventListener("click",()=>{ $("mobileNav").classList.remove("active");info("Create an account","Sign-up is a demo feature. Account creation is not connected yet.");});
$("proSignup").addEventListener("click",()=>info("Join TaskMate","Professional registration is not connected in this demo yet."));
$("footerPro").addEventListener("click",event=>{event.preventDefault();info("Join TaskMate","Professional registration is not connected in this demo yet.");});
$("helpLink").addEventListener("click",event=>{event.preventDefault();info("Help center","This is a front-end demo. Bookings and reports are saved only in this browser.");});
$("safetyLink").addEventListener("click",event=>{event.preventDefault();info("Trust & Safety","This prototype does not process real payments or verify real service providers.");});
$("mobileNav").addEventListener("click",event=>{if(event.target.closest("a"))$("mobileNav").classList.remove("active");});
document.addEventListener("keydown",event=>{if(event.key==="Escape")document.querySelectorAll(".modal.active").forEach(m=>closeModal(m.id));});

try{const saved=localStorage.getItem("taskmate-city");if(saved&&DATA[saved])city=saved;}catch(e){}
render();
console.log("TaskMate ready — buttons and demo interactions initialized.");