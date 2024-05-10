'use client'
import { Box, Card, Flex, IconButton, TextField, Text } from '@radix-ui/themes'
import { addToDo } from '@/actions/add-todo-action'
import FormButton from './FormButton'
import { useOptimistic, useRef } from 'react'
import type { ToDo } from '@prisma/client'
import ToDoCard from './ToDoCard'
import { deleteToDo } from '@/actions/delete-todo-action'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

const AddToDoForm = ({ toDos }: { toDos: ToDo[] }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [optimisticToDos, setOptimisticToDos] = useOptimistic(
    toDos,
    (state, { action, todo }: { action: string; todo: ToDo }) => {
      switch (action) {
        case 'delete':
          return state.filter(({ id }) => id !== todo.id)
        case 'complete':
          return [...state, { ...todo, completed: true }]
        default:
          return [...state, todo]
      }
    }
  )

  return (
    <>
      <form
        action={async (formData) => {
          setOptimisticToDos({
            action: 'create',
            todo: {
              id: Math.random().toString(),
              task: formData.get('task') as string,
              completed: false,
              deleted: false,
              createdAt: new Date(),
              published: true,
            },
          })
          const { error } = await addToDo(formData)
          if (error) {
            console.error(error)
          }
          formRef.current?.reset()
        }}
        ref={formRef}
      >
        <Flex gap="3" justify="between" mb="5">
          <Box as="div" width="100%">
            <TextField.Root
              placeholder="Enter a task..."
              size="3"
              name="task"
            ></TextField.Root>
          </Box>
          <FormButton />
        </Flex>
      </form>

      <div>
        {optimisticToDos.map((todo) => (
          <Card key={todo.id} mb="2">
            <Flex justify="between" align="center">
              <Text size="3" weight="bold">
                {todo.task}
              </Text>
              <Flex gap="2">
                <IconButton
                  size="2"
                  variant="soft"
                  onClick={async () => {
                    setOptimisticToDos({
                      action: 'update',
                    })
                  }}
                >
                  <CheckIcon width="18" height="18" />
                </IconButton>
                <IconButton
                  size="2"
                  variant="outline"
                  onClick={async () => {
                    setOptimisticToDos({
                      action: 'delete',
                      todo: {
                        ...todo,
                      },
                    })
                    const { error } = await deleteToDo(todo.id)
                    if (error) {
                      console.error(error)
                    }
                  }}
                >
                  <Cross2Icon width="18" height="18" />
                </IconButton>
              </Flex>
            </Flex>
          </Card>
        ))}
      </div>
    </>
  )
}

export default AddToDoForm
