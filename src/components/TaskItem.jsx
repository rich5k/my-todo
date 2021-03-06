import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import {db} from "../firebase";
import { doc, setDoc, deleteDoc} from "firebase/firestore";
const TaskItem = (props) => {
    const [isExpanded, setExpanded] = useState("false");
    const [isHidden, setIsHidden] = useState("false");
    const [message, setMessage] = useState("");
    //toggles the visibility of the extra info(desc and co.) of the item
    const ToggleExpansion = () => {
        setExpanded(!isExpanded);
    };
    //toggles the visibility of the add comment form
    const addComment = () => {
        setIsHidden(!isHidden);
    };

    //handles the creation of a new comment
    const handleSubmit = (e) => {
        e.preventDefault();
        var title = props.title;
        var description = props.desc;
        var status = props.status;
        var taskCategoryId = props.taskCategoryId;
        var comments = props.comments;
        var dateStarted = props.dateStarted;
        var dateEnded = props.dateEnded;
        var createdOn = new Date().toISOString();
        var updatedOn = new Date().toISOString();
        comments.push({ message, createdOn, updatedOn });

        const docRef = doc(db, "task", props.id);
        const payload= {title:title, description:description, status:status, taskCategoryId: taskCategoryId, comments:comments, dateStarted:dateStarted, dateEnded:dateEnded}
        setDoc(docRef,payload);
        addComment();
        setMessage('');
    }
    

    //deletes item
    const deleteTask = () => {
        console.log(props.id);
        const docRef = doc(db, "task", props.id);
        deleteDoc(docRef);
        
    }

    const [isChecked, setIsChecked] = useState(props.status === "pending"?false:true);

    //handles updating the status of the item when checked
    const handleCheck = (e) => {
        var checked=!isChecked;
        setIsChecked(checked);
        e.preventDefault();
        var title = props.title;
        var description = props.desc;
        var status = props.status;
        if(checked){
            status="done";
        }else{
            status="pending";
        }
        var taskCategoryId = props.taskCategoryId;
        var comments = props.comments;
        var dateStarted = props.dateStarted;
        var dateEnded = new Date().toISOString();
        
        
        const docRef = doc(db, "task", props.id);
        const payload= {title:title, description:description, status:status, taskCategoryId: taskCategoryId, comments:comments, dateStarted:dateStarted, dateEnded:dateEnded}
        setDoc(docRef,payload);
    }
    return (
        <div className="TaskItem bg-white text-blue-600 font-bold my-6 mx-8 rounded-lg pb-4">
            <div className="grid grid-cols-4 p-4">
                {/* item title */}
                <div className={isChecked?"item-title col-span-3 line-through":"item-title col-span-3"}>
                    {props.title}
                </div>
                <div className="item-checkbox text-center">
                    <input type="checkbox" class="default:ring-2 rounded h-4 w-4 " onChange={handleCheck} defaultChecked={isChecked} />
                </div>
            </div>
            {/* dropdown arrow */}
            <div className="grid grid-cols-4">
                {isChecked?<div></div>:
                    <div onClick={ToggleExpansion} className="expand-item col-span-3 text-gray-600 pl-4">
                        {isExpanded ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        }
                    </div>
                }
                {/* trash icon */}
                <div className="delete-task pr-4 text-center text-red-600">
                    <button onClick={deleteTask}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>

                </div>
            </div>
            {/* extra information for item */}
            {isChecked?'':
                <div className={isExpanded ? "extra-info font-thin pl-4" : "extra-info font-thin pl-4 hidden"}>
                    <div className="desc text-gray-500">
                        <span className="font-bold">Desc:</span> {props.desc}
                    </div>
                    <div className="comments">
                        <span className="font-bold">Comments:</span>
                        <button onClick={addComment} class="mt-4 ml-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Comment</button>
                        <form action="" className={isHidden ? "add-comment hidden" : "add-comment"}>
                            <input type="text" value={message} onChange={e => setMessage(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Hmmm...I think I can finish" required></input>
                            <button disabled={!message} type="submit" onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm lg:w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
                        </form>
                        {props.comments && props.comments.length > 0 && props.comments.map((comment, index) => (
                            <Comment id={index} message={comment.message} title={props.title} desc={props.desc} status={props.status}
                                taskCategoryId={props.taskCategoryId} comments={props.comments} dateStarted={props.dateStarted}
                                dateEnded={props.dateEnded} taskId={props.id} createdOn={comment.createdOn} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default TaskItem;