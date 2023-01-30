import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { TriggerMode } from '../config'
import { getPromotion } from './api'
import { QueryStatus } from './ChatGPTQuery'

interface Props {
  question: string
  triggerMode: TriggerMode
}

function ChatGPTContainer(props: Props) {
  const [queryStatus, setQueryStatus] = useState<QueryStatus>()
  const query = useSWRImmutable(queryStatus === 'success' ? 'promotion' : undefined, getPromotion, {
    shouldRetryOnError: false,
  })
  return (
    <>
      <div className="chat-gpt-tabs"></div>
    </>
  )
}

export default ChatGPTContainer
