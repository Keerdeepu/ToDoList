import React, {useEffect, useState} from 'react';
import '../App.css';
import {Form,Button} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToDoList = () => {
    const[newItem,setNewItem]=useState('')
    const[displayItem,setDisplayItem] = useState([])
    const[isEditing,setIsEditing] = useState(false)
    const[currentIndex,setCurrentIndex] = useState('')

    useEffect(()=>{
        let todoFromLocalStorage = JSON.parse(localStorage.getItem('todos'))
        if(todoFromLocalStorage){
            setDisplayItem(todoFromLocalStorage)
        }else{
            setDisplayItem([])
        }
    },[])
    const submitHandler = (e) => {
        e.preventDefault()
        if(newItem === ''){
            toast.error('Please Enter the Values')
        }else if(displayItem.includes(newItem)){
            toast.error("Item already existed")
            setNewItem('')
        }else{
            setNewItem('')
            setDisplayItem((prevState)=>{
                let updatedTodos = [...prevState, newItem]
                    localStorage.setItem('todos',JSON.stringify(updatedTodos))
                return updatedTodos
            })
            toast.success("Item added Successfully")
        }
    }
    const deleteHandler = (id)=>{
        alert('do you want to delete item?')
        let temp = displayItem.filter((data,index)=>id !== index)
        localStorage.setItem('todos',JSON.stringify(temp))
        setDisplayItem(temp)
    }
    const editHandler = (items,id) => {
        setIsEditing(true)
        console.log(items,id)
        setNewItem(items)
        setCurrentIndex(id)
    }
    const saveHandler = (e) =>{
        e.preventDefault()
        let updatedTodos = displayItem.map((d,i)=>{
            if(i === currentIndex){
                d = newItem
            }
            return d
        })
        setDisplayItem(updatedTodos)
        localStorage.setItem('todos',JSON.stringify(updatedTodos))
        toast.success('Item Updated Successfully')
        setNewItem('')
        setIsEditing(false)
    }
    return(
        <>
           <div>
                <h1>TODO LIST</h1>
           </div>
           <ToastContainer/>
           <div className='parent1'>
                <div className='child1'>
                    <div className='div-style'>
                        {
                            !isEditing ? (<Form className='form-style' onSubmit={submitHandler}>
                            <Form.Control type='text'
                            placeholder='enter the item' value={newItem}
                            onChange={(e)=>setNewItem(e.target.value)}/>
                            <button className='btn-style'>Add</button>
                            </Form>) :
                                (<Form className='form-style' onSubmit={submitHandler}>
                                 <Form.Control type='text'
                                 placeholder='enter the item' value={newItem}
                                 onChange={(e)=>setNewItem(e.target.value)}/>
                                 <button className='btn-style'>Add</button>
                                 </Form>)
                        }
                                </div><br/>
                            <ul>
                    {
                        displayItem.map((data,index)=>(
                        <li className='li-style'
                        key={index}>{data}
                        <FaTrash className='del-style'
                        onClick={()=>deleteHandler(index)}/>
                        <FaEdit style={{marginTop:"5px"}}
                        onClick={() => editHandler(data,index)}/>
                    </li>
        ))
    }
                </ul>
            </div>
        </div>
        </>
    )
}
export default ToDoList;    