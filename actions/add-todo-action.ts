'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const addToDo = async (formData: FormData) => {
  const task = formData.get('task')
  try {
    await prisma.toDo.create({
      data: {
        task: task as string,
      },
    })
  } catch (e) {
    const error = e as Error
    return {
      error: 'New error',
    }
  }
  revalidatePath('/')
  return {
    success: true,
  }
}
