
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