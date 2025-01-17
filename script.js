
function printProjectsToTable(){
    let projectTable = createTable("ProjectId","ProjectName","ProjectTable");
    fetch("https://localhost:7028/Project")
    .then(res=> res.json())
    .then(project=> project.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.id,row);
        elementCreator("td",element.name,row);
        projectTable.appendChild(row);
    }));
}
function printTasksToTable(){
    let taskTable = createTable("TaskId","TaskName","TaskTable");
    fetch("https://localhost:7028/Task")
    .then(res=> res.json())
    .then(task=> task.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.id,row);
        elementCreator("td",element.name,row);
        taskTable.appendChild(row);
    }));
}
function printTagsToTable(){
    let tagTable = createTable("TagId","TagName","TagTable");
    fetch("https://localhost:7028/Tag")
    .then(res=> res.json())
    .then(tag=> tag.forEach(element => {
        let row = document.createElement("tr");
        elementCreator("td",element.id,row);
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
    let tableRow = document.createElement("tr");
    elementCreator("th",th1,tableRow);
    elementCreator("th",th2,tableRow);
    elementTable.appendChild(tableRow);
    return elementTable;

 }

//callTheBackend2();
//projectToTable();