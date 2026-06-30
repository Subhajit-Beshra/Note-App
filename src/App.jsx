import React, { useState, useEffect } from 'react'
import{ X } from 'lucide-react'
// import React, { useState, useEffect } from "react";

const App = () => {

  const deleteHandler = (index) => {
    const copyTask = [...task];
    copyTask.splice(index,1);
    setTask(copyTask);
  };
   const [title, setTitle] = useState('')
   const [details, setDetails] = useState('')
   const [task, setTask] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
     e.preventDefault()

     const copyTask = [...task];
     copyTask.push({title, details})

     setTask(copyTask)
     setTitle('')
     setDetails('')
  }

  return (
    <div className="h-screen lg:flex text-white bg-gray-900">
      <form onSubmit={(e) => {submitHandler(e)}} className='w-full lg:w-1/3 flex flex-col items-start gap-4 p-10'>
        <h1 className='text-3xl font-bold'>Your Notes</h1>
        {/* PEHLA INPUT FOR HEADING */}
        <input type='text' placeholder='Enter Notes Heading' className='px-5 w-full py-2 border-2 rounded outline-none'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
         />
        {/* DETAILED WALA INPUT */}
        <textarea type='text' placeholder='Write details' className='px-5 w-full h-20 py-2 border-2 rounded outline-none'
        value={details}
        onChange={(e) => {
          setDetails(e.target.value)
        }} 
        />

        <button className='bg-white text-black active:scale-95 w-full px-5 py-2 rounded cursor-pointer outline-none'>Add Notes</button>
      </form>
      <div className='flex-1 gap-5 flex-wrap border-l-2 p-10'>
        <h1 className='text-3xl font-bold'>Your Notes</h1>
        <div className='flex flex-wrap items-start justify-start gap-5 mt-5 h-full overflow-auto'>
          {task.map(function(elem, idx){

            return <div key={idx} className="relative h-55 w-50 py-8 px-5 bg-cover text-black rounded bg-[url('https://imgs.search.brave.com/b9nc5BMwJ963hopkarex8iyCPZDL5oVweOdhvT2icjI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NTg0LzQ2Mi9zbWFs/bC9ibGFuay1zcGFj/ZS13aGl0ZS1zdGlj/a3ktbm90ZS1wbmcu/cG5n')]">
              <h2 onClick={() => deleteHandler(idx)} className='absolute top-3 right-4 bg-red-500 p-1 rounded-full test-xs'><X size={18} /></h2>
              <h3 className='leading-tight text-xl font-bold'>{elem.title}</h3>
              <p className='mt-2 leading-tight font-medium text-gray-600'>{elem.details}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
