import Footer from "./Footer";
import Task from "./Task";
import {useState} from 'react';
const Tasks = () => {
    const [isHidden, setHidden] = useState("false");
    const ToggleClass = () => {
        setHidden(!isHidden); 
    };
    return ( 
        <div className="Tasks text-center mt-8 grid grid-cols-3">
            <div></div>
            <div>
                <div className="text-3xl text-white font-bold">Tasks</div>
                <Task />
                <Task />
            </div>
            <div>
                <button onClick={ToggleClass} className="add-task text-green-600 bg-white p-4 text-xl font-bold rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                <form action="" className={isHidden ? "add-form m-12 hidden" : "add-form m-12"}>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Groceries" required></input>
                    <button type="submit" class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
                </form>

            </div>

            <Footer />
        </div>
     );
}
 
export default Tasks;