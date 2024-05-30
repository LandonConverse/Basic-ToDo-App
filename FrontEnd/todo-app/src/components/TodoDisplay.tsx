import React, { useState } from 'react';
import './TodoDisplay.css';

type TodoItem = {
    title: string;
    description: string;
    id: number;
}

type TodoForm = {
    title: string;
    description: string;
}

const MyButtonWithTypeOfButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => (
    <button {...props} type="button">{props.children}</button>
)
export const Display = () => {
    const [items, setItems] = useState<TodoItem[]>([])
    const [form, setForm] = useState<TodoForm>({
        title: '',
        description: ''
    })

    const handleFormChange = (e: React.ChangeEvent, key: keyof TodoForm) => {
        if ('value' in e.target) {
            setForm({...form, [key]: e.target.value})
        }
    }
    const handleDelete = (itemIdToDelete: number) => {
        const updatedItems = items.filter(item => item.id !==itemIdToDelete);
        setItems(updatedItems);
    }
    return (
        <div>
            <div className='Submitbox'>
            <div className="Header"> Todos List</div>
            <form>
                <input type="text" className="TodoTitle" value={form.title} onChange={(e) => handleFormChange(e, 'title')} placeholder="Todo Title" />
                <textarea className="TodoDescription" value={form.description} onChange={(e) => handleFormChange(e, 'description')} placeholder="Todo Description" />
                <MyButtonWithTypeOfButton className='SubmitButton' onClick={(e) => {
                    const newItem = {
                        id: items.length + 1,
                        ...form
                    }
                    setItems([newItem, ...items])}}>Add</MyButtonWithTypeOfButton>
            </form>
            </div>
            <div className='TodoListBox'>
                {items.map((item) => (
                    <div className='TodoItem' key={item.id}>
                        <p>id: {item.id} -- {item.title} -- {item.description}</p>
                        <MyButtonWithTypeOfButton className='DeleteButton' onClick={() => handleDelete(item.id)}>Delete</MyButtonWithTypeOfButton>
                    </div>
                ))}
            </div>
        </div>
    );
};