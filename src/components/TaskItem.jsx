import {useState} from 'react';
const TaskItem = () => {
    const [isExpanded,setExpanded]=useState("false");
    const ToggleExpansion = () => {
        setExpanded(!isExpanded); 
    };
    return ( 
        <div className="TaskItem bg-white text-blue-600 font-bold my-6 mx-8 rounded-lg p-4">
            <div className="grid grid-cols-2">
                <div className="item-title">
                    Learn About React
                </div>
                <div className="item-checkbox">
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
        </div>
     );
}
 
export default TaskItem;