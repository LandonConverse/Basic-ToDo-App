import React, { useState } from 'react';
import './TodoDisplay.css';



export const Display = () => {
    return (
        <div>
            <div className='Submitbox'>
            <div className="Header"> Todos List</div>
            <form>
                <input type="text" className="TodoTitle" placeholder="Todo Title" />
                <textarea className="TodoDescription" placeholder="Todo Description" />
                <button className="SubmitButton">Add</button>
            </form>
            </div>
            <div className='TodoListBox'></div>
        </div>
    );
};