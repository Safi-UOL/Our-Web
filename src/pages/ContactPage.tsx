import { site } from '../siteContent'
import { useState } from 'react'
import * as emailjs from '@emailjs/browser'

export function ContactPage() {
  const p = site.contactPage
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function sendMessage() {
    if (!message.trim()) {
      alert('Please write something first.')
      return
    }

    try {
      setSending(true)

      await emailjs.send(
        'service_jiibj2q',
        'template_rk71fw8',
        {
          message: message,
          to_email: 'Safiullah35468838@gmail.com',
        },
        'vscS4Kzx2l7pYDKWT'
      )

      alert('Message sent successfully ❤️')
      setMessage('')
    } catch (err) {
      console.error(err)
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="page-main contact-page">
      <header className="page-hero">
        <h1 className="page-hero__title">{p.title}</h1>
        <p className="page-hero__lead">
          Reach out through any platform below.
        </p>
      </header>

      <section className="contact-pill-wrap">
        <a
          href="https://wa.me/923004426562"
          target="_blank"
          rel="noreferrer"
          className="contact-pill"
        >
          <span className="contact-pill__label">WhatsApp</span>
          <span className="contact-pill__meta">0300 4426562</span>
        </a>

        <a
          href="https://instagram.com/i.safiii"
          target="_blank"
          rel="noreferrer"
          className="contact-pill"
        >
          <span className="contact-pill__label">Instagram</span>
          <span className="contact-pill__meta">@i.safiii</span>
        </a>

        <a
          href="https://www.snapchat.com/add/i.safi01"
          target="_blank"
          rel="noreferrer"
          className="contact-pill"
        >
          <span className="contact-pill__label">Snapchat</span>
          <span className="contact-pill__meta">@i.safi01</span>
        </a>

        <a
          href="https://www.linkedin.com/in/muhammad-safiullah-39b567401/"
          target="_blank"
          rel="noreferrer"
          className="contact-pill"
        >
          <span className="contact-pill__label">LinkedIn</span>
          <span className="contact-pill__meta">Profile</span>
        </a>

        <div className="contact-message-box">
          <h3>Send a Message</h3>
          <p>Share your thoughts</p>

          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write anything..."
          />

          <button onClick={sendMessage} disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </section>
    </main>
  )
}