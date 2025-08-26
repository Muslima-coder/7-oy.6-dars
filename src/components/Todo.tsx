import { useReducer } from "react"
import type { TodoType } from "../@types/TodoType"

function reduceFn(state: TodoType[], action:{type: "Add" | "Edit" | "Delete", payload:any}){
    switch (action.type) {
        case "Add": {
            return [...state, action.payload]
        }
        case "Delete": {
            state.splice(action.payload, 1)
            return [...state]
        }
        case "Edit": {
            let newValue = prompt(action.payload.value)
            const findData = state.find(item => item.id == action.payload.id)
            if(findData) findData.value = newValue
            return [...state]
        }
        default : {
            return state
        }
    }
}

const Todo = () => {
    const [todos, dispatch] = useReducer(reduceFn, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const data = {
            id: todos.length + 1,
            value: (e.target as HTMLFormElement).todo.value
        }
        dispatch({type: "Add", payload:data});
        (e.target as HTMLFormElement).reset()
    }


  return (
    <div>
        <form onSubmit={handleSubmit} autoComplete="off" className=" w-[500px] flex items-center gap-2 justify-between p-2 rounded-2xl bg-slate-400 mx-auto mt-5 ">
            <input className="p-2 rounded-2xl w-[80%] bg-white outline-none " name="todo" type="text" placeholder=" Enter Todo"/>
            <button className=" bg-green-500 text-white font-semibold w-[20%] p-2 rounded-2xl  " type="submit">Create</button>
        </form>
        <ul className=" w-[500px] flex flex-col items-center gap-2 justify-between p-2 rounded-2xl bg-slate-400 mx-auto mt-5 ">
            {todos.map((item: TodoType, index: number) => (
                <li key={item.id} className="p-2 rounded-2xl w-full bg-white flex items-center justify-between ">
                    <p className="w-[80%] ">{item.value}</p>
                    <div className="flex gap-2 items-center">
                        <button className="bg-violet-600 p-2 text-white cursor-pointer rounded-2xl" onClick={() => dispatch({type:"Edit", payload:item})}>E</button>
                        <button className="bg-red-600 p-2 text-white cursor-pointer rounded-2xl" onClick={() => dispatch({type:"Delete", payload:index})}>D</button>
                    </div>
                </li>
            ) )}
        </ul>
      
    </div>
  )
}

export default Todo
