const services = [
  ["💍","Weddings","Beautiful, timeless coverage from preparation and ceremony to reception, capturing the emotion and details of your special day."],
  ["⛪","Church Programs","Professional coverage for church services, conferences, crusades and other religious events with respectful, memorable photography."],
  ["🔥","Chilanga Mulilo","We capture the energy, traditions and culture of Chilanga Mulilo celebrations with vibrant, clear and meaningful images."],
  ["🥁","Matebeto","From the rhythm to the people, we bring your Matebeto moments to life with sharp and colourful photographs."],
  ["🎉","Parties","Birthdays, graduations, corporate or private parties — we capture the fun, energy and unforgettable moments."],
  ["👤","Portraits","Individual, family and professional portraits created with attention to expression, lighting and personal style."],
  ["🎂","Birthday Shoots","Creative birthday photography for children, teenagers and adults, preserving the celebration in beautiful images."]
];

const serviceGrid = document.getElementById("serviceGrid");
services.forEach(([icon,title,text])=>{
  const card=document.createElement("article");
  card.className="service-card reveal";
  card.innerHTML=`<div class="service-icon">${icon}</div><h3>${title}</h3><p>${text}</p>`;
  serviceGrid.appendChild(card);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("mainNav");
menuBtn.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",open);
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const panel=document.getElementById("settingsPanel");
const settingsBtn=document.getElementById("settingsBtn");
const closeSettings=document.getElementById("closeSettings");
function toggleSettings(open){
  panel.classList.toggle("open",open);
  panel.setAttribute("aria-hidden",!open);
}
settingsBtn.addEventListener("click",()=>toggleSettings(true));
closeSettings.addEventListener("click",()=>toggleSettings(false));

const darkMode=document.getElementById("darkMode");
const reduceMotion=document.getElementById("reduceMotion");
const largeText=document.getElementById("largeText");

darkMode.addEventListener("change",()=>{
  document.body.classList.toggle("light-mode",!darkMode.checked);
  localStorage.setItem("mr-dark",darkMode.checked);
});
reduceMotion.addEventListener("change",()=>{
  document.body.classList.toggle("no-motion",reduceMotion.checked);
  localStorage.setItem("mr-motion",reduceMotion.checked);
});
largeText.addEventListener("change",()=>{
  document.body.classList.toggle("large-text",largeText.checked);
  localStorage.setItem("mr-text",largeText.checked);
});

const savedDark=localStorage.getItem("mr-dark");
const savedMotion=localStorage.getItem("mr-motion");
const savedText=localStorage.getItem("mr-text");
if(savedDark!==null){darkMode.checked=savedDark==="true";document.body.classList.toggle("light-mode",!darkMode.checked)}
if(savedMotion!==null){reduceMotion.checked=savedMotion==="true";document.body.classList.toggle("no-motion",reduceMotion.checked)}
if(savedText!==null){largeText.checked=savedText==="true";document.body.classList.toggle("large-text",largeText.checked)}

const modal=document.getElementById("galleryModal");
const modalTitle=document.getElementById("modalTitle");
document.querySelectorAll(".gallery-item").forEach(item=>{
  item.addEventListener("click",()=>{
    modalTitle.textContent=item.dataset.title;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
  });
});
document.getElementById("closeModal").addEventListener("click",()=>{
  modal.classList.remove("show"); modal.setAttribute("aria-hidden","true");
});
modal.addEventListener("click",e=>{if(e.target===modal){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}});

document.getElementById("year").textContent=new Date().getFullYear();

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  const eventDate = document.getElementById("eventDate");
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth()+1).padStart(2,"0");
  const dd = String(today.getDate()).padStart(2,"0");
  eventDate.min = `${yyyy}-${mm}-${dd}`;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const service = document.getElementById("serviceType").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value || "Not specified";
    const location = document.getElementById("eventLocation").value.trim();
    const message = document.getElementById("bookingMessage").value.trim() || "No additional details provided.";

    const formattedDate = date ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
      day:"2-digit", month:"long", year:"numeric"
    }) : "Not specified";

    const text =
`Hello Miracle Reliable Photography (MR),

I would like to make a photography booking.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Service: ${service}
Event date: ${formattedDate}
Event time: ${time}
Location: ${location}

Additional details:
${message}`;

    const whatsappUrl = "https://wa.me/260971540564?text=" + encodeURIComponent(text);
    const status = document.getElementById("formStatus");
    status.textContent = "Opening WhatsApp with your booking details…";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
