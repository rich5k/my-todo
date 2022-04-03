import {useState} from 'react';
const Comment = (props) => {
    const [isHidden, setIsHidden]= useState("false");
    // toggles visibility of update comment form
    const editComment= ()=>{
        setIsHidden(!isHidden);
    }
    const [message, setMessage]=useState(props.message);

    //handles updating of comment
    const handleSubmit=(e)=>{
        e.preventDefault();
        var title=props.title;
        var description = props.desc;
        var status = props.status;
        var taskCategoryId = parseInt(props.taskCategoryId);
        var comments= props.comments;
        var dateStarted = props.dateStarted;
        var dateEnded = props.dateEnded;
        // var createdOn = props.createdOn;
        var updatedOn = new Date().toISOString();
        comments.map((comment,index)=>{
            if(parseInt(index)===parseInt(props.id)){
                comment.message=message;
                comment.updatedOn=updatedOn;
            }
        })
        // comments.push({message, createdOn, updatedOn});
        const updatedComment= {title, description,status,taskCategoryId, comments,dateStarted, dateEnded};
        
        fetch('http://localhost:8000/tasks/'+props.taskCategoryId
        ,{
            method: "PUT",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedComment)
        }
        )
        .then(()=>{
            console.log("comment updated");
            // getData();
            editComment();
            props.getData();
        })
    }
    return ( 
        <div className="Comment">
            {isHidden?
            <span className="grid grid-cols-4">
                <div className="comment-text col-span-3">
                    {props.message}
                </div>
                <div className="edit-comment">
                    <button onClick={editComment}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </span>
            :
            <form action="" className={isHidden ? "add-comment grid grid-cols-4 hidden" : "add-comment grid grid-cols-2"}>
                <div className='col-span-3'>
                    <input type="text" value={message} onChange={e=>setMessage(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-60 p-2.5  " placeholder="Hmmm...I think I can finish" required></input>
                </div>
                <div>
                    <button onClick={handleSubmit} class=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">update</button>
                </div>
            </form>}
            
        </div>
     );
}
 
export default Comment;