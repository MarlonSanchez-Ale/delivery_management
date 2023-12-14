import { Tasks } from '../../interfaces/Tasks'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

interface Props {
  tasks: Tasks[];
  deleteTask: (id: string) => void;
  handleCompleted: (id: string) => void
}

export default function TaskList({ tasks, deleteTask, handleCompleted }: Props) {

  const navigate = useNavigate()

  return (
    <div className='grid place-items-center p-6 gap-20'>
      <div className='flex flex-col gap-3 bg-rose-50 justify-center p-6 rounded-md shadow-md border border-rose-300 ring-2 ring-orange-200 hover:ring-rose-100'>
        <h1 className="text-3xl font-bold underline text-center">
          Order Management
        </h1>
        <p className=' text-lg font-light'>This application manages your orders</p>
      </div>

      <div className='grid'>
        <button
          className='bg-sky-300 text-center underline underline-offset-4 text-black text-md font-medium p-3 rounded-md shadow-lg border ring-2 ring-blue-900 hover:bg-sky-400'
          onClick={() => navigate('/create-task')}
        >
          New Task
        </button>
      </div>

      <div className='grid grid-flow gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {tasks && tasks.map((t: Tasks, index: number) => (
          <div
            key={index}
            className={`flex flex-col justify-center gap-6 bg-rose-50 p-5 rounded-md shadow-md border ring-2 ${t.completed ? "border-green-600 ring-green-200" : "border-yellow-600 ring-yellow-200"} hover:translate-y-2 hover:bg-rose-100 cursor-pointer`}
            onClick={() => t.id && handleCompleted(t.id)}
          >
            <div className='flex flex-col justify-start gap-1'>
              <p className=' text-start text-sm font-ligth'>
                {t.place} - {t.completed ? 'DONE' : "MISSING"}
              </p>
              <p className=' text-start text-lg font-semibold'>
                {t.title}
              </p>
              <p className=' text-start text-lg font-light'>
                {t.description}
              </p>
            </div>
            <div className='flex flex-row gap-3 justify-end'>
              <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-600  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
                onClick={() => navigate(`/create-task/${t.id}`)}
                >
                <PencilSquareIcon height={25} width={25} />
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                onClick={() => t.id && deleteTask(t.id)}
              >
                <TrashIcon height={25} width={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
