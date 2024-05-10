import { Button, Spinner } from '@radix-ui/themes'
import { useFormStatus } from 'react-dom'

const FormButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button disabled={pending} variant="outline" size="3">
      <>
        {pending && <Spinner loading></Spinner>}
        {pending ? ' Loading' : 'Submit'}
      </>
    </Button>
  )
}

export default FormButton
