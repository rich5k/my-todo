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
                        if(task.id==id){
                            return task.name;
                        }
                    })
                }</div>
                {
                    items && items.length>0 && items.map((item)=>{
                        if(item.taskCategoryId==id)
                            return <TaskItem title={item.title} desc={item.description} comments={item.comments} />
                        
                    })
                }
                
                <div className="completed-tasks">
                    <span className="font-bold text-lg text-left">Completed:</span>
                </div>
            </div>
            <div></div>

            <Footer />
        </div>
     );
}
 
export default TaskItems;