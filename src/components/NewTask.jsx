const NewTask = () => {
    return ( 
        <div className="NewTask text-white grid grid-cols-3">
            <div>
                <button className="go-back">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
            <div>
                <div className="text-3xl text-white font-bold">New Task</div>
            </div>
            <div></div>
        </div>
     );
}
 
export default NewTask;