
let todos = {pending : [], completed : []};
let todoTexts = {}
let Count, idCounter = 0, liHtml, myObj_str;


document.querySelector("form").addEventListener("click",function(e){
    if(e.target.id == "formSubmit"){
        var formTemp = document.getElementById("formInput");
        if(formTemp.value !=""){
            load(formTemp.value,idCounter);
            todoTexts[idCounter] = formTemp.value;
            formTemp.value="";
            changeParaCount("pendingCount",true);
            changeParaCount("allCount",true);
         
            todos.pending.push(idCounter);
        
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
            // document.getElementById(e.target.id).parentElement.parentElement.classList.toggle("strike");
            temp4 = getIdCounterById(e.target.id,10);
            index = todos.pending.indexOf(temp4)
            todos.pending.splice(index ,1);
            todos.completed.push(temp4);
            
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
            // document.getElementById(e.target.id).parentElement.parentElement.classList.toggle("strike");

            updateLocalStorage(todos,idCounter);

        }

    }else if(e.target.className == "img imgDelete"){
        temp5 = parseInt(getIdCounterById(e.target.id,9));
       
        if(todos.completed.indexOf(temp5) > -1){
           

            delIndex = todos.completed.indexOf(temp5)

                todos.completed.splice(delIndex, 1);
           
            changeParaCount("completedCount",false);
            changeParaCount("allCount",false);

            updateLocalStorage(todos,idCounter);


        }else {
           
            delIndex = todos.pending.indexOf(temp5);
                todos.pending.splice(delIndex, 1);
              
            changeParaCount("pendingCount",false);
            changeParaCount("allCount",false);

            updateLocalStorage(todos,idCounter);


        }
        document.getElementById(e.target.id).parentNode.style.display = "none";

    }
    
})


document.querySelector(".filterButtons").addEventListener("click",(e)=>{


    if(e.target.className == "btn btnPending"){
        
        addOrRemoveDisplay(comp = "none",pend = "block");
        
    }else if(e.target.className == "btn btnComplete"){
        
        addOrRemoveDisplay(comp="block", pend = "none");
    } else if(e.target.className == "btn btnAll"){
        addOrRemoveDisplay("block","block");
    }
})


document.querySelector(".imgReset").addEventListener("click",(e)=>{

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



function addOrRemoveDisplay(comp,pend){
    todos.pending.forEach((ele)=>{
        document.getElementById("li"+ele).style.display = pend;
    })
    todos.completed.forEach((ele)=>{
        document.getElementById("li"+ele).style.display = comp;
    })

}



function updateLocalStorage(todosLocal,idCounterLocal){
    myObj_str = JSON.stringify(todos);
    myTask_str = JSON.stringify(todoTexts);
    localStorage.setItem("todosLocal",myObj_str);
    localStorage.setItem("todoTasksLocal",myTask_str);

    localStorage.setItem("idCounterLocal",idCounter);
}

function loadLocalStorage(loadTodos,loadIdCounter){

    todos = JSON.parse(loadTodos);
    idCounter = parseInt(loadIdCounter);
    todoTexts = JSON.parse(localStorage.getItem("todoTasksLocal"));

    todos.completed.forEach((ele) =>{

       
        load(todoTexts[ele],ele);
        
    })
    todos.pending.forEach((ele) =>{
   

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




