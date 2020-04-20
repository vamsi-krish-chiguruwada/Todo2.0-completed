
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
        var temp = document.getElementById("formInput");
        if(temp.value !=""){
            todos.pending.push(temp.value);
            load(temp.value);
            temp.value="";
        }else{
            alert("cant submit empty strings");

        }
        // console.log(document.getElementById("formInput").value)

    }
})

document.querySelector("#ul").addEventListener("click",(e)=>{


    if(document.getElementById(e.target.id).parentElement.className == "imageSpan"){
      
        if(e.target.className == "img imgPending"){
        
            document.getElementById(e.target.id).style.display = "none";
            document.getElementById(e.target.id).nextElementSibling.style.display = "block";
            changeParaCount("completedCount", true);
            changeParaCount("pendingCount", false);


        } else{
            // console.log("inside else");
            document.getElementById(e.target.id).style.display = "none";
            document.getElementById(e.target.id).previousElementSibling.style.display = "block";
            changeParaCount("completedCount", false);
            changeParaCount("pendingCount", true);
        }

    }else if(e.target.className == "img imgDelete"){
        console.log("inide delete img ");
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
    todos.pending.push(idCounter);
    ++idCounter;

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