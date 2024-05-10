'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteToDo = async (id: string) => {
  try {
    await prisma.toDo.delete({
      where: {
        id: id,
      },
    })
  } catch (e) {
    const error = e as Error
    return {
      error: 'Delete error',
    }
  }
  revalidatePath('/')
  return {
    success: true,
  }
}
