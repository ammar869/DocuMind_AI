import { useEffect, useState } from 'react'
import { initialMessages } from '../lib/mockData'
import { sendChatMessage } from '../services/api'
import type { ChatMessage } from '../types/chat'
import type { FormEvent } from 'react'

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [question, setQuestion] = useState('')

  useEffect(() => {
    document.title = `DocuMind AI - Chat (${messages.length})`

    return () => {
      document.title = 'DocuMind AI'
    }
  }, [messages.length])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!question.trim()) {
      return
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setQuestion('')

    const assistantMessage = await sendChatMessage(question)
    setMessages((currentMessages) => [...currentMessages, assistantMessage])
  }

  return (
    <div className="chat-page">
      <section className="section-heading">
        <div>
          <h1>AI Chat</h1>
          <p>Ask questions about uploaded documents. Responses are placeholders for now.</p>
        </div>
      </section>

      <section className="chat-panel" aria-label="Chat messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message chat-${message.role}`}>
            <strong>{message.role === 'assistant' ? 'DocuMind' : 'You'}</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </section>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="chat-question">
          Ask a question
        </label>
        <input
          id="chat-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about risks, clauses, dates, or summaries"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatPage
