import Footer from "./Footer";
import Task from "./Task";
import {useState,useEffect} from 'react';
import PuffLoader from "react-spinners/PuffLoader";
const Tasks = () => {
    const [name,setName]=useState('');
    const [tasks,setTasks]=useState([]);
    const [items,setItems]=useState([]);
    const loading="true";
    const color= "#51E24A";
    //gets taskCategory and task data
    const getData=()=>{
        fetch('http://localhost:8000/taskCategory'
        ,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }
        )
        .then(function(response){
            // console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            //console.log(myJson);
            setTasks(myJson);
        });

        fetch('http://localhost:8000/tasks'
        ,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }
        )
        .then(function(response){
            // console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            //console.log(myJson);
            setItems(myJson);
        });
    }
    useEffect(()=>{
        getData()
    },[])
    const [isHidden, setHidden] = useState("false");
    // toggles visibility of add task category form
    const ToggleClass = () => {
        setHidden(!isHidden);
        setName('');
    };
    // handles addition of task category
    const handleSubmit=(e)=>{
        e.preventDefault();
        var createdOn = new Date().toISOString();
        var updatedOn = new Date().toISOString();
        const task = {name, createdOn,updatedOn};
        
        fetch('http://localhost:8000/taskCategory'
        ,{
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(task)
        }
        )
        .then(()=>{
            console.log("new task category added");
            getData();
            ToggleClass();
        })
    }

    const calcItemNum=(taskId)=>{
        let itemNum=0;
        items.map((item)=>{
            if(item.taskCategoryId===taskId){
                itemNum=itemNum+1;
            }
            
        })
        return itemNum;
    }
    return ( 
        <div className="Tasks text-center mt-8 grid grid-cols-3">
            <div></div>
            <div>
                <div className="text-3xl text-white font-bold">Tasks</div>
                {
                    (tasks && items && tasks.length>0 && items.length>0)?
                    tasks.map((task)=>(
                        
                        <Task key={task.id} id={task.id} name={task.name} date={task.updatedOn} itemNum={calcItemNum(task.id)} getData={getData} />
                        
                    )):
                    // show spinner when getting data
                    <div className="mt-30">
                        <PuffLoader color={color} loading={loading} size={150} />

                    </div>
                }
            </div>
            <div>
                <button onClick={ToggleClass} className="add-task text-green-600 bg-white p-4 text-xl font-bold rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
                {/* section for task category addition form */}
                <form action="" className={isHidden ? "add-form m-12 hidden" : "add-form m-12"}>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Groceries" required></input>
                    <button onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </form>

            </div>

            <Footer />
        </div>
     );
}
 
export default Tasks;