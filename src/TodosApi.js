import React,{useState,useEffect} from 'react'
import { OverlayTrigger,Tooltip } from 'react-bootstrap';

function TodosApi() {
    const [data, setData] = useState([]);
    const [dataId, setDataId] = useState([]);
    const [userdata, setUserData] = useState([]);
    const [search,setSearch] =useState("");
    const [order,setorder] =useState("ASC")

    const sorting=(col) =>{
    if(order==='ASC'){
      const sorted = [...data].sort((a,b) =>
      a[col] > b[col] ? 1 : -1
      );
      setData(sorted)
      setorder("DSC")
    }
    if(order==='DSC'){
      const sorted = [...data].sort((a,b) =>
      a[col] < b[col] ? 1 : -1
      );
      setData(sorted)

      setorder("ASC")
    }
  }

    const getUsers = async (id) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const res = await response.json();
      setUserData(res);
    };
     const getTodosID = async (id) => {
      console.log(id)
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const res = await response.json();
      setDataId(res);
    };
    
    useEffect(() => {
      const getTodos = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const res = await response.json();
        setData(res);
      };
    getTodos()  
    }, []);

    return (
        <>
        <div className="main-div my-4">
        <div className="mx-3 ">
        <div className= "d-flex justify-content-between align-items-center" >
        <h4 className="heading my-2 mx-0">Todos</h4>
        <input  className="search-bar my-2"
        type="text" placeholder="🔍 Search . . ." 
        onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <table className=" users table table-bordered">
        <thead>
          <tr>
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">First Click twice</Tooltip>}>
            <th className="todo-id" onClick={() =>sorting("id")}>ToDo ID</th>
            </OverlayTrigger>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          data.filter((val) => {
              if(search === ""){
                  return val;
              }
              else if(String(val.id).toLowerCase().includes(search.toLowerCase())||
              val.title.toLowerCase().includes(search.toLowerCase()) ||
              String(val.completed===true ?"completed":"incompleted").toLowerCase().includes(search.toLowerCase())||
              String(val.completed).toLowerCase().includes(search.toLowerCase())
              ){
                  return val
              }
              
          }).map((curdata) => (
              <tr key={curdata.id}>
                <td>{curdata.id}</td>
                <td className="table-todo-title">{curdata.title}</td>
                <td>{true===curdata.completed ? <p>Complete</p>:<p>Incomplete</p>}</td>
                <td><button className="view-Btn" onClick={(e)=>{getUsers(curdata.id) ; getTodosID(curdata.id)}} >View User</button></td>
              </tr>
          ))
          
        }
        </tbody>
      </table>
      </div>
      <div className="right-side ">
      <h4 className="heading my-2">User Detail</h4>
      <div className="box sticky-top ">
        {dataId &&(
          <div>
          <h4>ToDo ID <span>{dataId.id}</span></h4>
          <h4>ToDo Title <span className="todo-title">{dataId.title}</span></h4>
          </div>
        )}
        {userdata && (
            <div >
              <h4>User ID <span>{userdata.id}</span></h4>
              <h4>Name    <span>{userdata.name}</span></h4>
              <h4>Email   <span>{userdata.email}</span></h4>
            </div>
          )}
        </div>
        </div>
      </div>
        </>
    )
}

export default TodosApi
