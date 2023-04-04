import React, { useState } from 'react'


const Todo = () => {
    const[inputData,setInputData]=useState("");
    const[OnList,SetOnList]=useState([])

    const ShowList=(eve)=>{
        setInputData(eve.target.value)
    }
    const ShowOnLists=()=>{
        if(!inputData){
            alert("Plzzz Enter Some Data")
        }
        else{
            const mynewInputdata={
                id: new Date().getTime().toString(),
                name: inputData
            }
            SetOnList([...OnList,mynewInputdata])
            setInputData("")
        }
    }

    const DeleteItems=(index)=>{
        const updateData=OnList.filter((curEle)=>{
            return curEle.id !== index;
        });
        SetOnList(updateData);
    }

    const Allremove=()=>{
        SetOnList([])
    }

    return (
        <>
            <div className='main-div'>
                <div className="child-div">
                <figure>
                    <img src="/todo.svg" alt="todologo" />
                    <figcaption>Add Your List Here 🤞</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder=' ✍️ Add Item' className='form-control'
                        onChange={ShowList}
                        value={inputData}
                    />
                    <i onClick={ShowOnLists} className="fa fa-plus add-btn"></i>
                </div>
                <div className="showItems">
                {OnList.map((curEle)=>{
                   return( <div className="eachItem" key={curEle.id}>
                        <h3>{curEle.name}</h3>
                        <div className="todo-btn">
                        <i className="far fa-edit add-btn"></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=>DeleteItems(curEle.id)}></i>
                        </div>
                    </div>
                   );
                })}
                </div>
                <div className="showItems"><button className='btn effect04' data-sm-link-text="Remove All"
                onClick={Allremove}><span>Check List</span></button></div>
                </div>
            </div>
        </>
    )
}

export default Todo;
