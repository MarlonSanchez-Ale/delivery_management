import React, { ChangeEvent } from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { Tasks } from '../../interfaces/Tasks';
import { useState } from 'react';

interface Props {
  handleNewTask: (Task: Tasks) => void;
}

type FormEvent = React.FormEvent<HTMLFormElement>
type HandleInputChange = ChangeEvent<HTMLInputElement>;

export default function TaskForm({ handleNewTask }: Props) {

  const initialState = {
    title: '',
    place: '',
    description: '',
    completed: false
  }

  const navigate = useNavigate();
  const params = useParams()

  const [task, setTask] = useState(initialState)

  const [error, setError] = useState<string>()

  const handleInputChange = ({ target: { name, value }, }: HandleInputChange) => {
    setTask({ ...task, [name]: value })
  }


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (task.title && task.place && task.description) {
      setError('')
      handleNewTask(task)
      navigate('/')
    } else {
      setError('Hay un error')
    }
  }



  return (
    <div className='grid place-items-center p-10'>
      <div className='flex flex-col gap-5 p-10 bg-rose-50 border border-rose-500 ring-1 ring-yellow-100 rounded-md shadow-md'>
        <div className='text-center'>
          <div className='grid place-items-start'>
            <button
              type="button"
              className="text-white bg-green-500 shadow-md hover:bg-green-400 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center sm:mb-5 md:m-0"
              onClick={() => navigate('/')}
            >
              <ArrowLongLeftIcon height={20} width={20} />
            </button>
          </div>
          <p className=' text-2xl text-slate-800 font-bold'>Create Task</p>
          <p className='text-xl text-slate-600 font-light'>Enter the task data</p>
        </div>
        <form className='flex flex-col justify-center gap-5' onSubmit={handleSubmit}>
          <div className='flex sm:flex-col md:flex-row gap-3'>
            <input
              className=' p-2 rounded-sm shadow-md text-slate-800'
              placeholder='Title'
              type='text'
              name='title'
              value={task.title}
              onChange={handleInputChange}
            />
            <input
              className=' p-2 rounded-sm shadow-md text-slate-800'
              placeholder='Place'
              type='text'
              name='place'
              value={task.place}
              onChange={handleInputChange}
            />
          </div>
          <input
            className=' p-2 rounded-sm shadow-md text-slate-800'
            placeholder='Description'
            name='description'
            type='text'
            value={task.description}
            onChange={handleInputChange}
          />
          <div className='flex flex-row justify-end gap-3'>
            <button
              className='bg-sky-700 text-slate-50 font-bold p-2 rounded-sm shadow-md hover:bg-sky-600'
              type='submit'
            >
              CREATE
            </button>
            <button
              className="bg-red-700 text-slate-50 font-bold p-2 rounded-sm shadow-md hover:bg-red-600 "
              onClick={() => setTask(initialState)}
              type='button'
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>

      {error ? (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-5 " role="alert">
          <div className="flex">
            <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      ) : (<></>)}
    </div>
  )
}
