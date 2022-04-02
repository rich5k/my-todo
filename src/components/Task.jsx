const Task = () => {
    return ( 
        <div className="Task bg-white my-6 mx-8 text-center rounded-lg p-4">
            <div className="name font-bold">Groceries</div>
            <div className="grid grid-cols-3">
                <div className="item-num">4 items</div>
                <div></div>
                <div className="updated-date">2022-09-03</div>
            </div>
        </div>
     );
}
 
export default Task;