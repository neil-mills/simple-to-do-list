import { useOptimistic } from 'react'
import ToDoCard from './ToDoCard'
import { prisma } from '@/lib/prisma'
import type { ToDo } from '@prisma/client'

const ToDoList = async () => {
  const todos = await prisma?.toDo.findMany()
  const [optimisticToDos, addOptimisticToDo] = useOptimistic(
    todos,
    (state, newToDo: ToDo) => {
      return [...state, newToDo]
    }
  )
  return (
    <div>
      {optimisticToDos.map((todo) => (
        <ToDoCard key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default ToDoList
