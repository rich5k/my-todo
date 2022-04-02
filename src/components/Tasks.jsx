import Footer from "./Footer";
import Task from "./Task";

const Tasks = () => {
    return ( 
        <div className="Tasks text-center mt-8 grid grid-cols-3">
            <div></div>
            <div>
                <div className="text-3xl text-white font-bold">Tasks</div>
                <Task />
                <Task />
            </div>
            <div>
                <button className="add-task text-green-600 bg-white p-4 text-xl font-bold rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <Footer />
        </div>
     );
}
 
export default Tasks;