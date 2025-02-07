function toggleMenu(id) {
    var submenu = document.getElementById(id);
    var arrow = submenu.previousElementSibling.querySelector("span");
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
        arrow.textContent = "▶";
    } else {
        submenu.style.display = "block";
        arrow.textContent = "▼";
        if (id ==="projects"&& !submenu.dataset.loaded){
            fetch("https://localhost:7028/Project")
                .then(res => res.json())
                .then(projects => {
                    let target=document.getElementById("projects");
                    target.innerHTML="";
                    projects.forEach(project =>{
                        elementCreator("p",project.name,target);
                    });
                    submenu.dataset.loaded= "true";
                })
                .catch(error=> console.error("faild to fetech perojects",error));
        }
        if (id=== "tags" && !submenu.dataset.loaded){
            fetch("https://localhost:7028/Tag")
                .then(res=> res.json())
                .then(tags=> {
                    let target = document.getElementById("tags");
                    //let btnTarget= document.getElementById("menu-tags")
                    target.innerHTML="";
                    //let addButton = elementCreator("button","+",arrow);
                    //addButton.classList.add("add-button");
                    tags.forEach(tag =>{
                        let tagElement= elementCreator("p",tag.name, target);
                        let editButton= elementCreator("button","✏️",tagElement);
                        let deletButton= elementCreator("button","❌",tagElement);
                        editButton.onclick= ()=> editTag(tag.tagId);
                        deletButton.onclick = ()=> deleteTag(tag.tagId);
                    });
                    submenu.dataset.loaded= "true";
                })
                .catch(error=> console.error("faild to fetch tags",error));
        }
       
    }
}
function editTag(id){
    alert("update tag th Id: "+id);
    let newName= prompt("Enter new tag name:");
    console.log(newName);
    if(newName){
        const updateTag={name:newName};
        fetch(`https://localhost:7028/Tag/${id}`,{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify(updateTag),
        })
        .then (()=> console.log("update tag successfully"))
        .then(()=> location.reload())
        .catch(error=> console.error("error is:",error ));
    }
}
function deleteTag(id){
    alert("Delete tag with Id: "+id);
}
function showTab(tabId) {
    var contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.classList.remove("active-tab"));
    document.getElementById(tabId).classList.add("active-tab");
}
function printProjectsToDropdown(){
    fetch("https://localhost:7028/Project")
    .then(res => res.json())
    .then(project => project.forEach(element =>{
        let target=document.getElementById("projects");
        elementCreator("p",element.name,target);
    }));
}
function printProjectsToTable(){
    let projectTable = createTable2("ProjectId","ProjectName","status","projectTags","ProjectTable");
    fetch("https://localhost:7028/Project")
    .then(res=> res.json())
    .then(project=> project.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.projectId,row);
        elementCreator("td",element.name,row);
        let status =element.isActive===true?"Active":"Not Active";
        elementCreator("td",status,row);
        let projectTags=[];
        element.tags.forEach(t=>projectTags.push(t.name));
        elementCreator("td",projectTags,row);
        projectTable.appendChild(row);
    }));
}
function printTasksToTable(){
    let taskTable = createTable2("TaskId","TaskName","Deadline","projectId","TaskTable");
    fetch("https://localhost:7028/Task")
    .then(res=> res.json())
    .then(task=> task.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.taskId,row);
        elementCreator("td",element.name,row);
        elementCreator("td",element.deadline,row);
        elementCreator("td",element.projectId,row);
        taskTable.appendChild(row);
    }));
}
function printTagsToTable(){
    let tagTable = createTable("TagId","TagName","TagTable");
    fetch("https://localhost:7028/Tag")
    .then(res=> res.json())
    .then(tag=> tag.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.tagId,row);
        elementCreator("td",element.name,row);
        tagTable.appendChild(row);
    }));
}
function elementCreator(elementType, nodecontent, target){
    
    let newElement = document.createElement(elementType);
    let newNode = document.createTextNode(nodecontent);
    newElement.appendChild(newNode);
    target.appendChild(newElement);
    return newElement;
}

 function createTable(th1,th2,divId){
    let target = document.getElementById(divId);
    let elementTable = document.createElement("table");
    target.appendChild(elementTable);
    let tableRowHead = document.createElement("tr");
    elementCreator("th",th1,tableRowHead);
    elementCreator("th",th2,tableRowHead);
    elementTable.appendChild(tableRowHead);
    return elementTable;

 }
 function createTable2(th1,th2,th3,th4,divId){
    let target = document.getElementById(divId);
    let elementTable = document.createElement("table");
    target.appendChild(elementTable);
    let tableRowHead = document.createElement("tr");
    elementCreator("th",th1,tableRowHead);
    elementCreator("th",th2,tableRowHead);
    elementCreator("th",th3,tableRowHead);
    elementCreator("th",th4,tableRowHead);
    elementTable.appendChild(tableRowHead);
    return elementTable;

 }

//callTheBackend2();
//projectToTable();