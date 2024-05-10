import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Card, Flex, IconButton, Text } from '@radix-ui/themes'
import type { ToDo } from '@prisma/client'
import { deleteToDo } from '@/actions/delete-todo-action'

const ToDoCard = ({ todo }: { todo: ToDo }) => {
  return (
    <Card mb="2">
      <Flex justify="between" align="center">
        <Text size="3" weight="bold">
          {todo.task}
        </Text>
        <Flex gap="2">
          <IconButton size="2" variant="soft">
            <CheckIcon width="18" height="18" />
          </IconButton>
          <IconButton
            size="2"
            variant="outline"
            onClick={() => deleteToDo(todo.id)}
          >
            <Cross2Icon width="18" height="18" />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  )
}

export default ToDoCard
