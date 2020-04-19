
let todos = {pending : [], completed : []};
let todoTexts = {}
let Count, idCounter = 0, liHtml, myObj_str;


document.querySelector("form").addEventListener("click",function(e){
    console.log(e.target.id);
    if(e.target.id == "formSubmit"){
        var formTemp = document.getElementById("formInput");
        if(formTemp.value !=""){
            load(formTemp.value,idCounter);
            todoTexts[idCounter] = formTemp.value;
            console.log(todoTexts);
            formTemp.value="";
            changeParaCount("pendingCount",true);
            changeParaCount("allCount",true);
         
            todos.pending.push(idCounter);
            console.log(todos);
        
            idCounter++;
            updateLocalStorage(todos,idCounter);

        }else{
            alert("cant submit empty strings");

        }

    }
})

document.querySelector("#ul").addEventListener("click",(e)=>{


    if(document.getElementById(e.target.id).parentElement.className == "imageSpan"){
      
        if(e.target.className == "img imgPending"){
            temp = document.getElementById(e.target.id);
            temp.style.display = "none";
            temp.nextElementSibling.style.display = "block";
            changeParaCount("completedCount", true);
            changeParaCount("pendingCount", false);

            temp4 = getIdCounterById(e.target.id,10);
            index = todos.pending.indexOf(temp4)
            todos.pending.splice(index ,1);
            todos.completed.push(temp4);
            console.log(todos);
            console.log(typeof temp4);
            updateLocalStorage(todos,idCounter);

            
        } else{
            temp4 = getIdCounterById(e.target.id,12);
            indexcomp = todos.completed.indexOf(temp4);
            todos.completed.splice(indexcomp,1);
            todos.pending.push(temp4);
            document.getElementById(e.target.id).style.display = "none";
            document.getElementById(e.target.id).previousElementSibling.style.display = "block";
            changeParaCount("completedCount", false);
            changeParaCount("pendingCount", true);
            console.log(todos);
            updateLocalStorage(todos,idCounter);

        }

    }else if(e.target.className == "img imgDelete"){
        console.log("inide delete img ");
        temp5 = parseInt(getIdCounterById(e.target.id,9));
        console.log("e.target.id = ",e.target.id);
        console.log("todos = ",todos);
        console.log("temp5 = " , temp5);   
        if(todos.completed.indexOf(temp5) > -1){
            console.log("inside completed");
            console.log(todos.completed.indexOf(temp5));

            delIndex = todos.completed.indexOf(temp5)

                todos.completed.splice(delIndex, 1);
                console.log(todos);
           
            changeParaCount("completedCount",false);
            changeParaCount("allCount",false);

            updateLocalStorage(todos,idCounter);


        }else {
            console.log("inside pending");
            console.log("todos.pending.indexOf(temp5)", todos.pending.indexOf(temp5));

            delIndex = todos.pending.indexOf(temp5);
                todos.pending.splice(delIndex, 1);
                console.log(todos);
              
            changeParaCount("pendingCount",false);
            changeParaCount("allCount",false);

            updateLocalStorage(todos,idCounter);


        }
        document.getElementById(e.target.id).parentNode.style.display = "none";

    }
    
})


function getIdCounterById(id,leng){
    temp2 = id;
    temp3 = temp2.length;
    return(parseInt(temp2.slice(leng,temp3)));
 }



function load(value,idCounterload){
    

    liHtml = `<li class = "li" id = "li${idCounterload}">
    <span class = "imageSpan">
    
        <img src="logos/tick1.png"  id = "pendingImg${idCounterload}" class = "img imgPending" alt="@">
        <img src="logos/tick2.png" id = "completedImg${idCounterload}" class = "img imgComplete" alt="#">
    
    </span>
    ${value} 
    <img src="logos/del.png" class = "img imgDelete" id = "deleteImg${idCounterload}" alt="X">
    </li>`;
    document.querySelector("#ul").innerHTML+=liHtml;
   

    
}

function changeParaCount(className, incriment){
    Count = parseInt(document.querySelector(".filterButtons ."+className).textContent);

    if(incriment){
        document.querySelector(".filterButtons ."+className).textContent = ++Count;
    }else{
        document.querySelector(".filterButtons ."+className).textContent = --Count;
    }

}

document.querySelector(".filterButtons").addEventListener("click",(e)=>{

    console.log(e.target.className);

    if(e.target.className == "btn btnPending"){
        
        addOrRemoveDisplay(comp = "none",pend = "block");
        
    }else if(e.target.className == "btn btnComplete"){
        
        addOrRemoveDisplay(comp="block", pend = "none");
    } else if(e.target.className == "btn btnAll"){
        addOrRemoveDisplay("block","block");
    }
})

function addOrRemoveDisplay(comp,pend){
    todos.pending.forEach((ele)=>{
        document.getElementById("li"+ele).style.display = pend;
    })
    todos.completed.forEach((ele)=>{
        document.getElementById("li"+ele).style.display = comp;
    })

}

document.querySelector(".imgReset").addEventListener("click",(e)=>{
    console.log("reset clicked");

    let resetList = document.getElementById("ul");
    while (resetList.hasChildNodes()) {
    resetList.removeChild(resetList.firstChild); 
    todos = {pending:[], completed:[]};
    document.querySelector(".filterButtons ."+"pendingCount").textContent = 0;
    document.querySelector(".filterButtons ."+"completedCount").textContent = 0;
    document.querySelector(".filterButtons ."+"allCount").textContent = 0;
    idCounter=0;
    localStorage.clear();
    
  }
})

function updateLocalStorage(todosLocal,idCounterLocal){
    myObj_str = JSON.stringify(todos);
    myTask_str = JSON.stringify(todoTexts);
    localStorage.setItem("todosLocal",myObj_str);
    localStorage.setItem("todoTasksLocal",myTask_str);

    localStorage.setItem("idCounterLocal",idCounter);
}

function loadLocalStorage(loadTodos,loadIdCounter){
    console.log("inside loadLocalStorage");

    todos = JSON.parse(loadTodos);
    idCounter = parseInt(loadIdCounter);
    todoTexts = JSON.parse(localStorage.getItem("todoTasksLocal"));

    console.log(todos,idCounter);
    todos.completed.forEach((ele) =>{

        console.log("inside     todos.completed.forEach");
        console.log("ele = ",ele);

        load(todoTexts[ele],ele);
        
    })
    todos.pending.forEach((ele) =>{
        console.log("inside         todos.pending.forEach");
        console.log("ele = ",ele);

        load(todoTexts[ele],ele);
       

    })

    todos.completed.forEach(ele =>{
        document.querySelector("#pendingImg"+ele).style.display = "none";
        document.querySelector("#completedImg"+ele).style.display = "block";

    });
    document.querySelector(".filterButtons ."+"pendingCount").textContent = todos.pending.length;
    document.querySelector(".filterButtons ."+"completedCount").textContent = todos.completed.length;
    document.querySelector(".filterButtons ."+"allCount").textContent = todos.completed.length + todos.pending.length;
    

}
if(localStorage.length >=1){
    loadLocalStorage(localStorage.getItem("todosLocal"),localStorage.getItem("idCounterLocal"));
}




