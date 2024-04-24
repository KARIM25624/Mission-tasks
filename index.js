//CRUD => create, read, update and delete
document.body.style.backgroundColor = '#1c1c1c';


let tasks = [
    
];
function getTaskFromStorage(){
    let returnTasks = JSON.parse(localStorage.getItem("Tasks"));
    if(returnTasks == null){
        tasks =[];

    }else{
        tasks = returnTasks
    }
}
getTaskFromStorage();
 

    function create(){
        document.getElementById("content").innerHTML ="";
        let index = 0;
        for(i of tasks){
            
        let content = 
        `
            <div class="content  mx-auto my-4 " id="content">
            <div class="task ${i.isDone? 'done':''} d-flex p-1 my-2 rounded" >
                <div class="info">
                            <h2>${i.title}</h2>
                            <i class="fa-solid fa-calendar-days"></i>    <span>${i.date}</span>
                </div>

                <div class="action ms-2">
                    <button class="btn btn-danger"><i class="fa-solid fa-trash-can" onclick="deleteItem(${index})"></i></button>

                ${i.isDone? 
                    `<button class="btn btn-danger"><i class="fa-solid fa-xmark"  onclick="missionNotDone(${index})"></i></button>`
                :
                    `
                    <button class="btn btn-success"><i class="fa-solid fa-check"  onclick="missionDone(${index})"></i></button>
                    `
                }
                    
                    <button class="btn btn-info"><i class="fa-solid fa-pen" onclick="updateTask(${index})"></i></button>
                </div>
            </div>
            </div>
        `
        document.getElementById("content").innerHTML += content;
        index++
        
        };
    }
    create();

        //to get the date
        let date = new Date();
        let todayDate = date.toLocaleDateString();

    //to create mession
    document.getElementById("create").addEventListener("click", function(){
        
        let taskName  = window.prompt("الرجاء ادخال المهمة");
        let taskOjc = {
        "title":taskName,
        "date":todayDate,
        "isDone":false,

        }
        tasks.push(taskOjc);
        storage();
        create();
    });

    //to delete mession
    function deleteItem(index){
         Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                })
                
            }
            tasks.splice(index, 1);
            storage();
            create();
        });
        
        
    }
    // end 

    //update task 
    function updateTask(index){
        let task = tasks[index];
        let updateTaskName = window.prompt ("يمكنك تعديل المهمه",task.title);
        if(updateTaskName){
            task.title = updateTaskName;
            storage();
            create();
            //sweet alert
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    //mession is done 
    function missionDone(index){
        let task = tasks[index];
        task.isDone = true;
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "mission has been Done",
            showConfirmButton: false,
            timer: 1500
        });
        storage();
        create();
    };
    function missionNotDone(index){
        let task=tasks[index];
        task.isDone = false;
        storage();
        create();
    };
    // ================ storage function =============
    function storage(){
        //saved in local storage
        let tasksString = JSON.stringify(tasks);
        //to transform array to string
        localStorage.setItem("Tasks", tasksString);
        // to put arrary in local storage
    }
    
    

