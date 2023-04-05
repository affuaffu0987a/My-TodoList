import React, { useEffect, useState } from 'react'

const getLocalData = () => {
    let list = localStorage.getItem('WorkList')
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [OnList, SetOnList] = useState(getLocalData())
    const [isEdit, setEditItem] = useState();
    const [Toggle, settogButton] = useState(false)

    useEffect(() => {
        localStorage.setItem('WorkList', JSON.stringify(OnList));
    }, [OnList])

    const ShowList = (eve) => {
        setInputData(eve.target.value)
    }
    const ShowOnLists = () => {
        if (!inputData) {
            alert("Plzzz Enter Some Data")
        }
        else if (inputData && Toggle) {
            SetOnList(
                OnList.map((curEle) => {
                    if (curEle.id === isEdit) {
                        return { ...OnList, name: inputData }
                    }
                    return curEle;
                })
            )
            setInputData("")
            setEditItem("")
            settogButton(false)
        }
        else {
            const mynewInputdata = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            SetOnList([...OnList, mynewInputdata])
            setInputData("")
        }
    }

    const EditItems = (index) => {
        const edit_List = OnList.find((curEle) => {
            return curEle.id === index;
        })
        setInputData(edit_List.name)
        setEditItem(index)
        settogButton(true)
    }

    const DeleteItems = (index) => {
        const updateData = OnList.filter((curEle) => {
            return curEle.id !== index;
        });
        SetOnList(updateData);
    }

    const Allremove = () => {
        SetOnList([])
    }

    return (
        <>
            <div className='main-div'>
                <div className="child-div">
                    <figure>
                        <img src="todo2.png" alt="todologo" />
                        <figcaption>Add Your List Here 🤞</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder=' ✍️ Add Item' className='form-control'
                            onChange={ShowList}
                            value={inputData}
                        />
                        {Toggle ? (
                            <i onClick={ShowOnLists} className="far fa-edit add-btn"></i>
                        ) : (
                            <i onClick={ShowOnLists} className="fa fa-plus add-btn"></i>
                        )
                        }
                    </div>
                    <div className="showItems">
                        {OnList.map((curEle) => {
                            return (<div className="eachItem" key={curEle.id}>
                                <h3>{curEle.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={() => EditItems(curEle.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={() => DeleteItems(curEle.id)}></i>
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
