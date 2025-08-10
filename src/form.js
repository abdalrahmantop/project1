// form.js


const skills = [];
let itemsArray = [];
 let maxSkill = 16;
 import {Item} from "./app"
let fname;

function selectimage() {
    const fileInput = document.getElementById("fileInputid");
    const previewImg = document.getElementById("imgid1"); // الصورة الحالية

    if (fileInput && previewImg) {
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            fname = file.name;
            if (file) {
                const url = URL.createObjectURL(file);
                previewImg.src = url;
                previewImg.style.width = "100px";
                previewImg.style.height = "100px";


            }
        });
    } else {
        console.error(" error");
    }
}

function addItem() {
    const btnaddItem = document.getElementById("AddItembtnid");
    const btncancelItem = document.getElementById("CancelItembtnid");

    btnaddItem.addEventListener("click", () => {
        const img = document.getElementById("imgid1").src;
        const fieldNameCompany = document.getElementById("fieldNameCompanyid").value;
        const fieldJobTitle = document.getElementById("fieldJobTitleid").value;
        const filedTimeWork = document.getElementById("fieldTimeid").value;
        const selectTypeWork = document.getElementById("selectWorkTypeid").value;
        const fieldWorkMode = document.getElementById("fieldWorkModeid").value;

        const item = new Item(
            fieldNameCompany,
            fieldJobTitle,
            filedTimeWork,
            selectTypeWork,
            fieldWorkMode,
            fname,
            skills,
            "NEW!",
            "FEATURED"
        );

        itemsArray.push(item);
        localStorage.setItem("items", JSON.stringify(itemsArray)); // saved Data 
        console.log(itemsArray);
        alert("done ")
    });

    btncancelItem.addEventListener("click", () => {
        document.getElementById("fieldNameCompanyid").value = "";
        document.getElementById("fieldJobTitleid").value = "";
        document.getElementById("fieldTimeid").value = "";
        document.getElementById("selectWorkTypeid").selectedIndex = 0;
        document.getElementById("fieldWorkModeid").value = "";
        skills.length = 0;
        const img = document.getElementById("imgid1");
        img.src = "add-image.png";
        img.style.width = "60px";
        img.style.height = "60px";
        getSkillsHtml();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadData();
    selectimage();
    addSkillstr();
    SelectAll();
    DeleteSkill();
    addItem();
});

function loadData (){
  itemsArray = JSON.parse(localStorage.getItem("items")) || [];

    

 }


function addSkillstr() {
    const skillInput = document.getElementById("fieldSkillid");
    const btn_add = document.getElementById("btnAddSkillid");
    const btn_cancel = document.getElementById("btnCancelSkillid");

    btn_add.addEventListener("click", () => {
        if (skillInput.value) {
            if (skills.length < maxSkill) {
                if (!skills.includes(skillInput.value)) {
                    skills.push(skillInput.value);

                    getSkillsHtml();
                    skillInput.value = "";
                }
                else {
                    alert("موجود بالفعل ");
                }
            } else {
                alert("you can add only " + maxSkill + " skills");
            }

        } else {
            alert("please enter a skill");
        }
    });

    btn_cancel.addEventListener("click", () => {
        skillInput.value = "";
    });
}

function getSkillsHtml() {

    const container = document.getElementById("skillsContainer");
    container.innerHTML = "";
    skills.forEach(skill => {
        const skillelement = document.createElement("div");
        skillelement.className = "FlexRowItemSkill";
        skillelement.innerHTML = `
        <input type="checkbox" id="${skill}"> 
        <label for="${skill}" class="ItemSkill" style="font-size: 12px;">${skill}</label><br>
    `;

        container.appendChild(skillelement);
    });

}

function SelectAll() {
    const chboxSelectAll = document.getElementById("chboxSelectAllid");

    chboxSelectAll.addEventListener("change", () => {
        skills.forEach(skillId => {
            const chboxelement = document.getElementById(skillId);
            if (chboxelement) {
                chboxelement.checked = chboxSelectAll.checked;
            }
        });
    });
}


function DeleteSkill() {
    const btn_deleteSkill = document.getElementById("deleteskillid");
    const chboxSelectAll = document.getElementById("chboxSelectAllid");

    btn_deleteSkill.addEventListener("click", () => {
        if (chboxSelectAll.checked) {
            skills.length = 0;
            chboxSelectAll.checked = false;
            getSkillsHtml();
        } else {
            skills.forEach(skillId => {
                const chbox = document.getElementById(skillId);
                const index = skills.indexOf(skillId);
                if (chbox.checked) {
                    skills.splice(index, 1)
                }
            });
            getSkillsHtml();
        }
    });
}