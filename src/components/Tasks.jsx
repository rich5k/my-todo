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
            <div></div>
        </div>
     );
}
 
export default Tasks;