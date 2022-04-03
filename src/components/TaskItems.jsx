import { useNavigate, useParams} from "react-router-dom";
import {useState,useEffect} from 'react';
import Footer from "./Footer";
import TaskItem from "./TaskItem";
const TaskItems = () => {
    const {id}= useParams();
    const navigate = useNavigate();
    const goHome= ()=>{
        navigate("/");
    }
    const [tasks,setTasks]=useState([]);
    const [items,setItems]=useState([]);
    const [title,setTitle]=useState('');
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
            console.log(myJson);
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
            console.log(myJson);
            setItems(myJson);
        });
    }
    useEffect(()=>{
        getData()
    },[])
    const [isHidden, setHidden] = useState("false");
    const ToggleClass = () => {
        setHidden(!isHidden);
        setTitle('');
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        var createdOn = new Date().toISOString();
        var updatedOn = new Date().toISOString();
        const task = {title, createdOn,updatedOn};
        
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
            console.log("new task added");
            getData();
            ToggleClass();
        })
    }
    return ( 
        <div className="TaskItems text-white grid grid-cols-3 mt-8">
            <div>
                <button onClick={goHome} className="go-back ml-10 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
            <div>
                <div className="text-3xl text-white font-bold text-center">
                    {
                    tasks && tasks.length>0 && tasks.map((task)=>{
                        // console.log(tasks)
                        if(parseInt(task.id)===parseInt(id)){
                            return task.name;
                        }
                    })
                }</div>
                {
                    items && items.length>0 && items.map((item)=>{
                        if(parseInt(item.taskCategoryId)===parseInt(id))
                            return <TaskItem title={item.title} desc={item.description} comments={item.comments} />
                        
                    })
                }
                
                <div className="completed-tasks">
                    <span className="font-bold text-lg text-left">Completed:</span>
                </div>
            </div>
            <div>
                <button onClick={ToggleClass} className="add-task text-green-600 bg-white p-4 text-xl font-bold rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                <form action="" className={isHidden ? "add-form m-12 hidden" : "add-form m-12"}>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Groceries" required></input>
                    <button onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </form>
            </div>

            <Footer />
        </div>
     );
}
 
export default TaskItems;