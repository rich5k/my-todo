import React from "react";
import { useNavigate} from "react-router-dom";
const Task = (props) => {
    // handles deletion of task category
    const deleteTask =()=>{
        fetch('http://localhost:8000/taskCategory/'+ props.id
        ,{
            method: "DELETE",
        }
        )
        .then(()=>{
            console.log("task deleted");
            props.getData();
        })
    }
    const navigate = useNavigate();
    // handles redirection to task's item page
    const routeChange = (task,id)=>{
        // id.preventDefault();
      let path = '/task';
      let param= task;
      navigate(`${path}/${param}`);
      console.log('ID: '+task);
    }
    return ( 
        <div className="Task bg-white my-6 mx-8 text-center rounded-lg p-4 grid grid-cols-4">
            <div onClick={routeChange.bind(null,props.id)} className="col-span-3">
                <div className="name font-bold">{props.name}</div>
                <div className="grid grid-cols-3">
                    <div className="item-num">{props.itemNum} item(s)</div>
                    <div></div>
                    <div className="updated-date">{props.date.substring(0, 10)}</div>
                </div>
                
            </div>
            <div className="delete-task p-4 text-center text-red-600">
                <button onClick={deleteTask}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

            </div>
        </div>
     );
}
 
export default Task;