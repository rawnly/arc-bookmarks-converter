'use client'

import { action } from "@/lib/action"
import { useActionState, useEffect } from "react"

export default function Form() {
  const [state, dispatch] = useActionState(action, { ok: false })

  useEffect(() => {
    if (!state.ok) return
    const html = state.response
    const file = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(file)

    // download the file 
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = 'index.html'
    a.click()

    // clean up
    URL.revokeObjectURL(url)
  }, [state])

  return (
    <form action={dispatch} className='flex items-center justify-start gap-8'>
      <div className='flex items-start justify-center flex-col'>
        <input autoFocus required className='block w-full rounded px-4 py-2 bg-transparent' name='url' type='url' placeholder='Paste your share url here' />
        <small className='text-xs mt-2 opacity-30'>
          100% privacy friendly. We don't store any data.
        </small>
      </div>
      <button type='submit' className='px-4 py-2 rounded-md bg-black text-white font-medium hover:opacity-80 text-center dark:bg-white dark:text-black shadow-sm'>
        Download Now
      </button>
    </form>

  )
}
