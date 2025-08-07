class Item {
  constructor(nameCompany, nameJob, timeJob, workType, workMode, imageUrl, itemSkills, noteNew = "", secondNote = "") {
    this.nameCompany = nameCompany;
    this.nameJob = nameJob;
    this.timeJob = timeJob;
    this.workType = workType;
    this.workMode = workMode;
    this.imageUrl = imageUrl;
    this.itemSkills = itemSkills;
    this.noteNew = noteNew;
    this.secondNote = secondNote;
  }

  getNameCompany() { return this.nameCompany; }
  getNameJob() { return this.nameJob; }
  getTimeJob() { return this.timeJob; }
  getWorkType() { return this.workType; }
  getWorkMode() { return this.workMode; }
  getImageUrl() { return this.imageUrl; }
  getItemSkills() { return this.itemSkills; }
  getNoteNew() { return this.noteNew; }
  getSecondNote() { return this.secondNote; }
}

// بيانات الوظائف
const itemsArray = [
  new Item("MyHome", "Senior Frontend Developer", "1d ago", "Full Time", "USA Only", "pic1.png", ["HTML", "JavaScript", "Frontend", "Senior", "CSS"], "NEW!", "FEATURED"),
  new Item("Manage", "Full Stack Developer", "1d ago", "Part Time", "Remote", "img3.jpg", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
  new Item("LOOP Studio", "Junior Frontend Developer", "1d ago", "Part Time", "Remote", "img4.jpeg", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
  new Item("Shopify", "Junior Backend Developer", "1d ago", "Part Time", "Remote", "img5.webp", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
  new Item("ASAl", "Junior Backend Developer", "1d ago", "Part Time", "Remote", "img6.png", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
  new Item("ITG", "Junior Developer", "1d ago", "Part Time", "Remote", "img7.png", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED")
];

// عرض العناصر في الصفحة
function getItems(array) {
  const list = document.getElementById("listcard");
  list.innerHTML = ""; // تنظيف العناصر القديمة

  array.forEach(item => {
    const li = document.createElement("li");
    li.className = "card";

    li.innerHTML = `
      <img src="${item.getImageUrl()}" alt="Company Logo" class="logo">
      <div class="AllInfo"> 
        <div class="Title"> 
          <p class="NameCompany">${item.getNameCompany()}</p>
          <p class="NoteNew">${item.getNoteNew()}</p>
          <p class="SecondNote">${item.getSecondNote()}</p>
        </div>
        <p class="NameJob">${item.getNameJob()}</p>
        <div class="InfoWork">
          <p class="TimeJob">${item.getTimeJob()}</p>
          <p class="WorkType">${item.getWorkType()}</p>
          <p class="WorkMode">${item.getWorkMode()}</p>
        </div>
      </div>
      <div class="Skills">
        ${item.getItemSkills().map(skill => `<p class="ItemSkill">${skill}</p>`).join("")}
      </div>
    `;

    list.appendChild(li);
  });
}

// فلترة العناصر بناء على النص المكتوب
function filterArray() {
  const searchText = document.getElementById("searchid").value.toLowerCase();

  const filteredItems = itemsArray.filter(item =>
    // item.getNameCompany().toLowerCase().includes(searchText) ||
    item.getNameJob().toLowerCase().includes(searchText)  
    // item.getTimeJob().toLowerCase().includes(searchText) ||
    // item.getWorkType().toLowerCase().includes(searchText) ||
    // item.getWorkMode().toLowerCase().includes(searchText) ||
    // item.getNoteNew().toLowerCase().includes(searchText) ||
    // item.getSecondNote().toLowerCase().includes(searchText) ||
    // item.getItemSkills().some(skill => skill.toLowerCase().includes(searchText))
  );

  getItems(filteredItems);
}

// تفريغ مربع البحث وإعادة جميع العناصر
function Clear() {
  const search = document.getElementById("searchid");
  search.value = "";
  getItems(itemsArray);
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  getItems(itemsArray);

  const searchInput = document.getElementById("searchid");
  searchInput.addEventListener("input", filterArray);

  const clearButton = document.getElementById("clearid");
  clearButton.addEventListener("click", Clear);
});
