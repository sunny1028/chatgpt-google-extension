import { useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { TriggerMode } from '../config'
import { getPromotion } from './api'
import ChatGPTCard from './ChatGPTCard'
import { QueryStatus } from './ChatGPTQuery'
import Promotion from './Promotion'

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
      <div className="chat-gpt-card">
        <ChatGPTCard
          question={props.question}
          triggerMode={props.triggerMode}
          onStatusChange={setQueryStatus}
        />
      </div>
      {query.data && <Promotion data={query.data} />}
    </>
  )
}

export default ChatGPTContainer
