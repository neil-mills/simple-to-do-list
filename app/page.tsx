import { Heading } from '@radix-ui/themes'
import AddToDoForm from './components/AddToDoForm'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const toDos = await prisma?.toDo.findMany()
  return (
    <>
      <Heading size="8" mt="5" mb="5">
        to-do list
      </Heading>
      <AddToDoForm toDos={toDos} />
    </>
  )
}
