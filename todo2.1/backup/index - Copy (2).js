
let todos = {pending : [], completed : []};
let Count, idCounter = 1, liHtml;

// let liHtml = `<li class = "li">
// <span class = "imageSpan">

//     <img src="logos/tick1.png"  id = "pendingImg${idCounter}" class = "img imgPending" alt="@">
//     <img src="logos/tick2.png" id = "completedImg${idCounter}" class = "img imgComplete" alt="#">

// </span>
// complete todo application 
// <img src="logos/del.png" class = "img imgDelete" id = "deleteImg${idCounter}" alt="X">
// </li>`;



document.querySelector("form").addEventListener("click",function(e){
    console.log(e.target.id);
    if(e.target.id == "formSubmit"){
        var formTemp = document.getElementById("formInput");
        if(formTemp.value !=""){
            // todos.pending.push(temp.value);
            load(formTemp.value);
            formTemp.value="";
        }else{
            alert("cant submit empty strings");

        }
        // console.log(document.getElementById("formInput").value)

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

            // ============
            temp4 = getIdCounterById(e.target.id,10);
            index = todos.pending.indexOf(temp4)
            todos.pending.splice(index ,1);
            todos.completed.push(temp4);
            console.log(todos);
            console.log(typeof temp4);
            // temp2 = e.target.id
            //     temp3 = temp2.length;
            //     console.log(temp2.slice(10,temp3));

            
            // ============
        } else{
            // console.log("inside else");
            document.getElementById(e.target.id).style.display = "none";
            document.getElementById(e.target.id).previousElementSibling.style.display = "block";
            changeParaCount("completedCount", false);
            changeParaCount("pendingCount", true);
            temp4 = getIdCounterById(e.target.id,12);
            todos.completed.splice(todos.completed.indexOf(temp4),1);
            todos.pending.push(temp4);
            console.log(todos);
        }

    }else if(e.target.className == "img imgDelete"){
        console.log("inide delete img ");
        changeParaCount("allCount",false);
        temp5 = parseInt(getIdCounterById(e.target.id,9));
        console.log("inside del");
        console.log(todos);
        console.log(typeof temp5);
        if(temp5 in  todos.completed){
            console.log("inside completed");

            todos.completed.splice(todos.completed.indexOf(temp5),1);
            console.log(todos);

            changeParaCount("completedCount",false);
            changeParaCount("allCount",false);

        }else {
            console.log("inside pending");
            console.log(todos.pending.indexOf(temp5));

            delIndex = todos.pending.indexOf(temp5);
            todos.pending.splice(delIndex,1);
            console.log(todos);

            changeParaCount("pendingCount",false)
            changeParaCount("allCount",false)

        }
        document.getElementById(e.target.id).parentNode.style.display = "none";

    }
    // if(document.getElementById(e.target.id).parentElement.tagName == "span"){
    //     console.log("span clicked");
    // }

    // if(e.target.className == "img imgPending"){
    //     document.getElementById(e.target.id).style.display = "none";
    //     document.getElementById(e.target.id).nextElementSibling.style.display = "block";

    //     // tempid = e.target.id;
    //     // len = 
    //     // console.log("image clicked");
    //     // console.log(e.target.id.nextSibling);
    //     // toggleCount = e.target.id;
    //     // document.getElementById(e.target.id).style.display = "none";
    //     // document.getElementById("completedImg"+e.target.id[]).style.display = "none";

    // } else{}
    // // console.log(e.target.className);
})


function getIdCounterById(id,leng){
    temp2 = id;
    temp3 = temp2.length;
    return(parseInt(temp2.slice(leng,temp3)));
 }



function load(value){
    // liHtml = `<li class = "li">
    //     <span class = "imageSpan">

    //         <img src="logos/tick1.png" class = "img imgPending" alt="@">
    //         <img src="logos/tick2.png" class = "img imgComplete" alt="#">

    //     </span>
    //     ${value} 
    //     <img src="logos/del.png" class = "img imgDelete" alt="X">
    // </li>`

    liHtml = `<li class = "li">
    <span class = "imageSpan">
    
        <img src="logos/tick1.png"  id = "pendingImg${idCounter}" class = "img imgPending" alt="@">
        <img src="logos/tick2.png" id = "completedImg${idCounter}" class = "img imgComplete" alt="#">
    
    </span>
    ${value} 
    <img src="logos/del.png" class = "img imgDelete" id = "deleteImg${idCounter}" alt="X">
    </li>`;
    document.querySelector("#ul").innerHTML+=liHtml;
    changeParaCount("pendingCount",true);
    changeParaCount("allCount",true);
    // console.log(todos);
    // console.log(idCounter);
    todos.pending.push(idCounter);
    console.log(todos);

    idCounter++;

    // increment pending number by 1
    // pendingCount = parseInt(document.querySelector(".filterButtons .pendingCount").textContent);
    // document.querySelector(".filterButtons .pendingCount").textContent = ++pendingCount;

}

function changeParaCount(className, incriment){
    Count = parseInt(document.querySelector(".filterButtons ."+className).textContent);

    if(incriment){
        // pendingCount = parseInt(document.querySelector(".filterButtons ."+className).textContent);
        document.querySelector(".filterButtons ."+className).textContent = ++Count;
    }else{
        // pendingCount = parseInt(document.querySelector(".filterButtons ."+className).textContent);
        document.querySelector(".filterButtons ."+className).textContent = --Count;
    }

}