import React, { useState, useEffect } from 'react';
import './TodoCreate.css';
import { title } from 'process';
import axios from 'axios';

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

 export const TodoCreate = () => {
    const [items, setItems] = useState<TodoItem[]>([])
    const [form, setForm] = useState<TodoForm>({
        title: '',
        description: ''
    })

    const [editForm, setEditForm] = useState<TodoForm>({ // State for the edited todo item
        title: '',
        description: ''
    });

    const [itemIdToEdit, setItemIdToEdit] = useState<number | null>(null);

    const handleEditID = (itemId: number) => {
        const itemToEdit = items.find(item => item.id === itemId);
        if (itemToEdit) {
            setEditForm(itemToEdit); // Set the editForm state with the item to be edited
            setItemIdToEdit(itemId);
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get<TodoItem[]>('http://localhost:3000/todos');
                setItems(response.data);
                console.log("got todos")
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
    
        fetchTodos();
    }, []);
    

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof TodoForm) => {
        const value = e.target.value;
        if (value.trim() !== '') {
            if (itemIdToEdit !== null) {
                setEditForm({ ...editForm, [key]: value }); // Update editForm state if editing
            } else {
                setForm({ ...form, [key]: value }); // Update form state if adding new todo
            }
        }
    }


    const handleDelete = (itemIdToDelete: number) => {
        const updatedItems = items.filter(item => item.id !==itemIdToDelete);
        setItems(updatedItems);
    }

    const handleEdit = (itemIdToEdit: number, TitleTextEdit: string, DescriptionTextEdit: string) => {
        const updatedItems = items.map(item => {
            if (item.id === itemIdToEdit) {
                return { ...item, title: TitleTextEdit, description: DescriptionTextEdit };
            }
            return item;
        });
        setItems(updatedItems); 
        setEditForm({ title: '', description: '' }); 
        setItemIdToEdit(null); 
    };

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
                        {itemIdToEdit === item.id ? (
                            <>
                                <input type="text" className='EditiTitle' value={editForm.title} onChange={(e) => handleFormChange(e, 'title')} placeholder="Edit Todo Title" />
                                <textarea className='EditiDescription' value={editForm.description} onChange={(e) => handleFormChange(e, 'description')} placeholder="Edit Todo Description" />
                                <MyButtonWithTypeOfButton className='SaveButton' onClick={(e) => handleEdit(item.id, editForm.title, editForm.description)}>Save</MyButtonWithTypeOfButton>
                            </>
                        ) : (
                            <>
                                <p>id: {item.id} -- {item.title} -- {item.description}</p>
                                <MyButtonWithTypeOfButton className='DeleteButton' onClick={() => handleDelete(item.id)}>Delete</MyButtonWithTypeOfButton>
                                <MyButtonWithTypeOfButton className='EditButton' onClick={() => handleEditID(item.id)}>Edit</MyButtonWithTypeOfButton>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};