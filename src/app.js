// تصدير الكلاس Item
export class Item {
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

// export const itemsArray = [
//   new Item("MyHome", "Senior Frontend Developer", "1d ago", "Full Time", "USA Only", "pic1.png", ["HTML", "JavaScript", "Frontend", "Senior", "CSS"], "NEW!", "FEATURED"),
//   new Item("Manage", "Full Stack Developer", "1d ago", "Part Time", "Remote", "img3.jpg", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
//   new Item("LOOP Studio", "Junior Frontend Developer", "1d ago", "Part Time", "Remote", "img4.jpeg", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
//   new Item("Shopify", "Junior Backend Developer", "1d ago", "Part Time", "Remote", "img5.webp", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
//   new Item("ASAl", "Junior Backend Developer", "1d ago", "Part Time", "Remote", "img6.png", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED"),
//   new Item("ITG", "Junior Developer", "1d ago", "Part Time", "Remote", "img7.png", ["Fullstack", "Midweight", "Python", "React"], "NEW!", "FEATURED")
// ];

let savedItems  = [];
function loadData (){
const savedItemsData = JSON.parse(localStorage.getItem("items")) || [];

   savedItems = savedItemsData.map(itemData => new Item(
    itemData.nameCompany,
    itemData.nameJob,
    itemData.timeJob,
    itemData.workType,
    itemData.workMode,
    itemData.imageUrl,
    itemData.itemSkills,
    itemData.noteNew,
    itemData.secondNote
  ));   

console.log(savedItems);
}

export function getItems(array) {
  const list = document.getElementById("listcard");
  if (!list) return;

  list.innerHTML = "";

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
          <button class="buttonDeleteItem" >
          DELETE
          </button>

        `;

    list.appendChild(li);

    const deleteBtn = li.querySelector(".buttonDeleteItem");
    deleteBtn.addEventListener("click", () => {
     
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1); 
      localStorage.setItem("items", JSON.stringify(savedItems)); // saved Data 
  
        getItems(array);           
      }
    });

  });
}

export function filterArray() {
  const searchText = document.getElementById("searchid").value.toLowerCase();

  const filteredItems = savedItems.filter(item =>
    item.getNameJob().toLowerCase().includes(searchText)
  );

  getItems(filteredItems);
}

export function Clear() {
  const search = document.getElementById("searchid");
  search.value = "";
  getItems(savedItems);
}

export function addImage() {
  const fileInput = document.getElementById("fileInputid");
  const file = fileInput.files[0];
  const img = document.getElementById("imgid1");
  if (!file || !img) return;

  const url = URL.createObjectURL(file);
  img.src = url;
  console.log("Image URL:", url);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData ();
  getItems(savedItems);

  const searchInput = document.getElementById("searchid");
  if (searchInput) searchInput.addEventListener("input", filterArray);

  const clearButton = document.getElementById("clearid");
  if (clearButton) clearButton.addEventListener("click", Clear);




});
