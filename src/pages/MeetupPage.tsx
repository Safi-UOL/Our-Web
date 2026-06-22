import { useEffect, useMemo, useState } from 'react'

type Step = 1 | 2 | 3 | 4 | 5

const FOOD_OPTIONS = [
  { name: 'Sushi', icon: '🍣' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Biryani', icon: '🍛' },
  { name: 'Kebabs', icon: '🍢' },
  { name: 'Tacos', icon: '🌮' },
  { name: 'Ramen', icon: '🍜' },
  { name: 'Dessert', icon: '🍰' },
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function MeetupPage() {
  const [step, setStep] = useState<Step>(1)
  const [answer, setAnswer] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [foods, setFoods] = useState<string[]>([])
  const [monthDate, setMonthDate] = useState(new Date())

  useEffect(() => {
    const audio = new Audio('/audio/meetup.mp3')
    audio.volume = 0.5
    audio.play().catch(() => {})
    return () => audio.pause()
  }, [])

  function resetAll() {
    setStep(1)
    setAnswer('')
    setSelectedDate(null)
    setTime('')
    setFoods([])
  }

  function toggleFood(food: string) {
    setFoods((prev) =>
      prev.includes(food)
        ? prev.filter((x) => x !== food)
        : [...prev, food]
    )
  }

  function downloadICS() {
    const blob = new Blob(['Meetup'], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'meetup.txt'
    a.click()
  }

  const calendarDays = useMemo(() => {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const totalDays = new Date(year, month + 1, 0).getDate()

    const days = []

    for (let i = 0; i < firstDay; i++) days.push(null)

    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }, [monthDate])

  return (
    <main className="meetup-page">
      <div className="meetup-hearts">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="floating-heart"
            style={{
              left: `${(i * 3) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <div className="meetup-card">
        {step === 1 && (
          <>
            <h1>Will You Meet Me? ❤️</h1>
            <p>A question worth asking</p>

            <div className="meetup-actions">
              <button
                className="btn btn--primary"
                onClick={() => {
                  setAnswer('Yes')
                  setStep(2)
                }}
              >
                Yes
              </button>

              <button
                className="btn btn--ghost"
                onClick={() => {
                  setAnswer('No (but I still asked)')
                  setStep(2)
                }}
              >
                No
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1>Select Date</h1>

            <div className="calendar-header">
              <button
                onClick={() =>
                  setMonthDate(
                    new Date(
                      monthDate.getFullYear(),
                      monthDate.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                ←
              </button>

              <h2>
                {monthDate.toLocaleString('default', {
                  month: 'long',
                })}{' '}
                {monthDate.getFullYear()}
              </h2>

              <button
                onClick={() =>
                  setMonthDate(
                    new Date(
                      monthDate.getFullYear(),
                      monthDate.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                →
              </button>
            </div>

            <div className="calendar-grid">
              {WEEKDAYS.map((d) => (
                <div key={d} className="calendar-weekday">
                  {d}
                </div>
              ))}

              {calendarDays.map((d, idx) =>
                d ? (
                  <button
                    key={idx}
                    className={`calendar-date ${
                      selectedDate?.toDateString() === d.toDateString()
                        ? 'calendar-date--selected'
                        : ''
                    }`}
                    onClick={() => setSelectedDate(d)}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <div key={idx}></div>
                )
              )}
            </div>

            <button
              className="btn btn--primary"
              disabled={!selectedDate}
              onClick={() => setStep(3)}
            >
              Continue
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1>What Time?</h1>

            <div className="meetup-time-grid">
              {['5 PM', '8 PM', '10 PM'].map((t) => (
                <button
                  key={t}
                  className="btn btn--ghost"
                  onClick={() => {
                    setTime(t)
                    setStep(4)
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1>Food Time 🍴</h1>
            <p>Select multiple</p>

            <div className="food-grid">
              {FOOD_OPTIONS.map((item) => {
                const active = foods.includes(item.name)

                return (
                  <button
                    key={item.name}
                    className={`food-card ${
                      active ? 'food-card--active' : ''
                    }`}
                    onClick={() => toggleFood(item.name)}
                  >
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </button>
                )
              })}
            </div>

            <button
              className="btn btn--primary"
              disabled={!foods.length}
              onClick={() => setStep(5)}
            >
              Final Step
            </button>
          </>
        )}

        {step === 5 && (
          <>
            <h1>It’s Our Meetup ❤️</h1>

            <div className="meetup-summary">
              <p><strong>Answer:</strong> {answer}</p>
              <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Food:</strong> {foods.join(', ')}</p>
            </div>

            <blockquote>
              Some meetings become memories forever ❤️
            </blockquote>

            <div className="meetup-actions">
              <button className="btn btn--primary" onClick={downloadICS}>
                Add to Calendar
              </button>

              <button className="btn btn--ghost" onClick={resetAll}>
                Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}