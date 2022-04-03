import {useState} from 'react';
import Comment from './Comment';
const TaskItem = (props) => {
    const [isExpanded,setExpanded]=useState("false");
    const [isHidden, setIsHidden]= useState("false");
    const [message, setMessage]= useState("");
    const ToggleExpansion = () => {
        setExpanded(!isExpanded); 
    };
    const addComment = () => {
        setIsHidden(!isHidden); 
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        var createdOn = new Date().toISOString();
        var updatedOn = new Date().toISOString();
        const comment = {message, createdOn, updatedOn};
        
        fetch('http://localhost:8000/tasks'
        ,{
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(comment)
        }
        )
        .then(()=>{
            console.log("new task added");
            // getData();
            addComment();
        })
    }
    return ( 
        <div className="TaskItem bg-white text-blue-600 font-bold my-6 mx-8 rounded-lg pb-4">
            <div className="grid grid-cols-4 p-4">
                <div className="item-title col-span-3">
                    {props.title}
                </div>
                <div className="item-checkbox text-center">
                    <input type="checkbox" class="default:ring-2 rounded h-4 w-4 " />
                </div>
            </div>
            <div onClick={ToggleExpansion} className="expand-item text-gray-600 pl-4">
                {isExpanded? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                }
            </div>
            <div className={isExpanded? "extra-info font-thin pl-4":"extra-info font-thin pl-4 hidden"}>
                <div className="desc text-gray-500">
                    <span className="font-bold">Desc:</span> {props.desc}
                </div>
                <div className="comments">
                    <span className="font-bold">Comments:</span> 
                    <button onClick={addComment} class="mt-4 ml-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Comment</button>
                    <form action="" className={isHidden ? "add-comment hidden" : "add-comment"}>
                        <input type="text" value={message} onChange={e=>setMessage(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Hmmm...I think I can finish" required></input>
                        <button onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                    </form>
                    {props.comments && props.comments.length>0 && props.comments.map((comment)=>(
                        <Comment message={comment.message} />
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default TaskItem;