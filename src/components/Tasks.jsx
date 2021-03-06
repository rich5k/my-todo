import Footer from "./Footer";
import Task from "./Task";
import React,{useState,useEffect} from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import {db} from "../firebase";
import { collection, onSnapshot,addDoc} from "firebase/firestore";
const Tasks = () => {
    
    const [name,setName]=useState('');
    const [tasks,setTasks]=useState([]);
    // const [itemNum,setItemNum]=useState(0);
    const loading="true";
    const color= "#51E24A";
    //gets taskCategory and task data
    const getData=()=>{
        
        onSnapshot(collection(db,"taskCategory"),snapshot=>{
            let categories=[];
            console.log(snapshot.docs.map(doc=>(doc.data(),doc.id)));
            snapshot.docs.map(doc=>{
                categories.push({...doc.data(),id: doc.id})
                

            });
            setTasks(categories);
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
        
        const collectionRef = collection(db, "taskCategory");
        const payload= {name:name, createdOn:createdOn, updatedOn:updatedOn}
        addDoc(collectionRef,payload);
        ToggleClass();
    }

   
    return ( 
        <div className="Tasks text-center mt-8 grid lg:grid-cols-3">
            <div></div>
            <div>
                <div className="text-3xl text-white font-bold">Tasks</div>
                {console.log(tasks)}
                {   
                    (tasks && tasks.length>0 )?
                    tasks.map((task,index)=>(
                        
                        <Task key={index} id={task.id} name={task.name} date={task.updatedOn} getData={getData} />
                        
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
                <form action="" className={isHidden ? "add-form m-12 hidden" : "add-form m-12 flex flex-col justify-center items-center"}>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Groceries" required></input>
                    <button disabled={!name} type="submit" onClick={handleSubmit} class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </form>

            </div>

            <Footer />
        </div>
     );
}
 
export default Tasks;