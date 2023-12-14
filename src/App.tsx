import { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderList from './components/elements/OrderList';
import OrderRegister from './components/elements/OrderRegister';
import ProductsList from './components/elements/Products/ProductsList';
import ProductsForm from './components/elements/Products/ProductsForm';
import { Tasks } from './interfaces/Tasks';
import { v4 } from 'uuid';


function App() {


  // cambiar el icono de editar y hacerlo que sea para poner en completada y no completada la tarea.

  //Detalle de cada funcion
  // la primera es para ver el detalle de la tarea, donde se verá todos los datos correspondientes, agregar más datos que sean importantes
  // botón de completado de tarea, para indicar si se ha completado o no una tarea
  // botón de eliminar tarea

  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: "1",
      title: 'Learn React',
      place: 'House',
      description: 'Learn React with Typescript',
      completed: true
    },
    {
      id: "2",
      title: 'Learn Typescript',
      place: 'House',
      description: 'Learn Typescript and Docs',
      completed: false
    },
    {
      id: "3",
      title: 'Workout',
      place: 'GYM',
      description: 'Lets go to the gym bro',
      completed: false
    }
  ])

  const handleNewTask = (Task: Tasks) => setTasks([...tasks, { ...Task, id: v4() }])

  const handleCompleted = (id: string) => {
    const newTask: Tasks[] = [...tasks]

    const found = newTask.find(x => x.id === id)

    if (found) {
      found.completed = !found.completed;
      setTasks(newTask)
    }
  }

  const deleteTask = (id: string) => setTasks(tasks.filter(x => x.id !== id))

  return (
    <Fragment>
      <div className="flex flex-wrap justify-center p-4 text-center">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<OrderList />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/products/create' element={<ProductsForm />} />
            <Route path='/products/create/:id' element={<ProductsForm />} />
            <Route path='/order/register' element={<OrderRegister />} />
            <Route path='/order/register/:id' element={<OrderRegister />} />
          </Routes>
        </BrowserRouter>
      </div >
    </Fragment>


  );
}

export default App;
