import { useNavigate, useParams} from "react-router-dom";
import React, {useState,useEffect} from 'react';
import Footer from "./Footer";
import TaskItem from "./TaskItem";
import PuffLoader from "react-spinners/PuffLoader";
import {db} from "../firebase";
import { collection, onSnapshot,addDoc, getDoc, doc,query,where} from "firebase/firestore";
const TaskItems = () => {
    const {id}= useParams();
    const navigate = useNavigate();
    const goHome= ()=>{
        navigate("/");
    }
    const loading="true";
    const color= "#51E24A";
    const [categoryName, setCategoryName]=useState('');
    const [tasks,setTasks]=useState([]);
    const [items,setItems]=useState([]);
    const [title,setTitle]=useState('');
    const [description, setDesc]=useState('');
    // gets taskCategory and tasks data
    const getData=()=>{
        
        const docRef= doc(db,"taskCategory",id);
        getDoc(docRef)
        .then(doc=>{
            setCategoryName(doc.data().name);
            
        })
        

        onSnapshot(query(collection(db,"task"),where("taskCategoryId","==",id)),snapshot=>{
            let taskItems=[];
            // console.log(snapshot.docs.map(doc=>(doc.data(),doc.id)));
            snapshot.docs.map(doc=>{
                taskItems.push({...doc.data(),id: doc.id})

            });
            console.log(taskItems);
            setItems(taskItems);
        });

    }
    useEffect(()=>{
        getData()
    },[])
    const [isHidden, setHidden] = useState("false");
    // toggles the visibilty of add item form
    const ToggleClass = () => {
        setHidden(!isHidden);
        setTitle('');
        setDesc('');
    };

    //handles the addition of task's item
    const handleSubmit=(e)=>{
        e.preventDefault();
        var status = "pending";
        var taskCategoryId = id;
        var comments= [];
        var dateStarted = new Date().toISOString();
        var dateEnded = null;
        // const task = {title, description,status,taskCategoryId, comments,dateStarted, dateEnded};
        
        const collectionRef = collection(db, "task");
        const payload= {title:title, description:description, status:status, taskCategoryId: taskCategoryId, comments:comments, dateStarted:dateStarted, dateEnded:dateEnded}
        addDoc(collectionRef,payload);
        ToggleClass();
        // getData();
    }
    return ( 
        <div className="TaskItems text-white grid lg:grid-cols-3 mt-8">
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
                    (categoryName)?categoryName :
                    <div className="mt-30">
                        <PuffLoader color={color} loading={loading} size={150} />

                    </div>
                }</div>
                <div>
                {
                    items && items.length>0 && items.map((item,index)=>(
                        (item.status === "pending")?
                            <TaskItem key={index} id={item.id} title={item.title} desc={item.description} comments={item.comments} 
                            status= {item.status} taskCategoryId={item.taskCategoryId} dateStarted={item.dateStarted} 
                            dateEnded={item.dateEnded} />: ''
                        
                    ))
                }
                </div>
                {/* section for completed tasks */}
                <div className="completed-tasks mt-4">
                    <span className="font-bold text-lg text-left">Completed:</span>
                    {
                    items && items.length>0 && items.map((item,index)=>(
                        (item.status === "done")?
                            <TaskItem key={index} id={item.id} title={item.title} desc={item.description} comments={item.comments} 
                            status= {item.status} taskCategoryId={item.taskCategoryId} dateStarted={item.dateStarted} 
                            dateEnded={item.dateEnded} />: ''
                        
                    ))
                }
                </div>
            </div>
            <div className="text-center">
                <button onClick={ToggleClass} className="add-task text-green-600 bg-white p-4 text-xl font-bold rounded-full mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {/* add task item form */}
                <form action="" className={isHidden ? "add-form m-12 hidden" : "add-form m-12 flex flex-col justify-center items-center"}>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5 mb-4 " placeholder="Groceries" required></input>
                    <input type="text" value={description} onChange={e=>setDesc(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="To help me stock up..." required></input>
                    <button disabled={!title&&!description} type="submit" onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </form>
            </div>

            <Footer />
        </div>
     );
}
 
export default TaskItems;