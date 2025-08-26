import { useReducer } from "react"

function reduceFn(state:number, action:{type:string, payload?:any}){
  switch(action.type){
    case "DEC":
      return state -= 1
    case "INC":
      return state += 1
    case "Two":
      return state += 2

    default :{
      return state
    }
  }
}

const Actions = () => {
  const [state, dispatch] = useReducer(reduceFn, 0)

  return (
    <div className="flex gap-5 justify-center mt-8">
        <button className="p-2 bg-amber-900 border-none text-white rounded-md" onClick={() => dispatch({type:"DEC"})}>Dec</button>
        <button className="px-3 py-2 bg-green-900 border-none text-white rounded-md">{state}</button>
        <button className="p-2 bg-amber-900 border-none text-white rounded-md" onClick={() => dispatch({type:"INC"})}>Inc</button>
        <button className="p-2 bg-amber-900 border-none text-white rounded-md" onClick={() => dispatch({type:"Two"})}>Add 2 step</button>
    </div>
  )
}

export default Actions
