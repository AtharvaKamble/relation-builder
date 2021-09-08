import { React, useState } from 'react';
import MainArea from './MainArea.js'
import Dialogue from './Dialogue.js'    // Implement later
import '../App.css';
import '../Animation.css'

const LEAVE_TEMP = 'leave'

// After closing tab, empty database
// PROXY http://localhost:8080
window.addEventListener("unload", (e) => {
    e.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'clear data' })
    }
    fetch('/clear', requestOptions)
    .then(res => res.json())
    .then(data => data)
});

function SideBar() {
    const [ classToMain, setClassToMain ] = useState('to-main shadow-pop-bl')
    const [ classToRelation, setClassToRelation ] = useState('to-relation')
    const [ classLeaveDiv, setClassLeaveDiv ] = useState('leave')

    const addClassToMain = () => {
        const temp = classToMain
        setClassToMain(temp + ' ' + 'shadow-pop-bl')
        setClassToRelation('to-relation')
        setIsAddPeopleDiv(false)
        setIsCheckRelationDiv(true)
        setClassLeaveDiv(LEAVE_TEMP)
    }

    const addClassToRelation = () => {
        const temp = classToRelation
        setClassToMain('to-main')
        setClassToRelation(temp + ' ' + 'shadow-pop-bl')
        setIsAddPeopleDiv(true)
        setIsCheckRelationDiv(false)
        setClassLeaveDiv(LEAVE_TEMP)
    }

    const leave = () => {
        const temp = classLeaveDiv
        setClassLeaveDiv(temp + ' ' + 'wobble-hor-bottom')


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'clear data' })
        }
        fetch('http://localhost:8080/clear', requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                window.location.reload()
            }
            // console.log(data)   // DEBUG
        })
    }

    const [ isAddPeopleDiv, setIsAddPeopleDiv ] = useState(false)
    const [ isCheckRelationDiv, setIsCheckRelationDiv ] = useState(true)

    // console.log(isCheckRelationDiv)  // DEBUG
  return (
      <div className="flex w-full h-screen">
        <div className="sidebar">
            <label>RELATIONS BUILDER</label>
            <div className={classToMain} onClick={addClassToMain}>Add People</div>
            <div className={classToRelation} onClick={addClassToRelation}>Check Relation</div>
            <div className={classLeaveDiv} onClick={leave}>Clear DATA</div>
        </div>
        <MainArea isAdd={isAddPeopleDiv} isCheck={isCheckRelationDiv}/>
    </div>
  );
}

export default SideBar;
