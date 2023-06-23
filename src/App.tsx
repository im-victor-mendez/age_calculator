import './App.scss'
import { ReactComponent as ArrowIcon } from '@/assets/svg/icon-arrow.svg'
import { useState } from 'react'

type ObjectDate = {
	day: number
	month: number
	year: number
}

function App() {
	const [date, setDate] = useState<ObjectDate>()
	const [calculatedDate, setCalculatedDate] = useState<ObjectDate>()
	const [error, setError] = useState(false)

	function handleInput(event: { target: { value: string; name: string } }) {
		const value = event.target.value
		const name = event.target.name
		setError(false)
		setDate({ ...date, [name]: parseInt(value) } as ObjectDate)
	}

	function calculate(event: { preventDefault: () => void }) {
		event.preventDefault()

		const valueIsUndefined = (value: number | undefined) => value == undefined
		if (!date) return setError(true)
		if (Object.values(date).some(valueIsUndefined)) return setError(true)

		const inputDate = new Date(date.year, date.month - 1, date.day)
		const currentDate = new Date()
		const difference = currentDate.getTime() - inputDate.getTime()

		const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
		const years = Math.floor(difference / millisecondsPerYear)
		const millisecondsPerMonth = millisecondsPerYear / 12
		const months = Math.floor(
			(difference % millisecondsPerYear) / millisecondsPerMonth
		)
		const millisecondsPerDay = 1000 * 60 * 60 * 24
		const days = Math.floor(
			(difference % millisecondsPerMonth) / millisecondsPerDay
		)

		setCalculatedDate({ day: days, month: months, year: years })
	}

	return (
		<>
			<main id="calculator" className="card">
				<form id="inputs" onSubmit={calculate}>
					<section className="labels">
						<label className="label">
							Day{' '}
							<input
								className="input"
								type="number"
								name="day"
								id="day"
								min={1}
								max={date?.month == 2 ? 28 : 31}
								onChange={handleInput}
							/>
						</label>
						<label className="label">
							Month{' '}
							<input
								type="number"
								name="month"
								id="month"
								min={1}
								max={12}
								onChange={handleInput}
							/>
						</label>
						<label className="label">
							Year{' '}
							<input
								type="number"
								name="year"
								id="year"
								min={100}
								onChange={handleInput}
							/>
						</label>
					</section>
					<button type="submit" className="button">
						<ArrowIcon />
					</button>
				</form>
				<div className="divider"></div>
				<article id="results">
					<p>
						<span className="important">{calculatedDate?.year ?? '--'}</span>{' '}
						years
					</p>
					<p>
						<span className="important">{calculatedDate?.month ?? '--'}</span>{' '}
						months
					</p>
					<p>
						<span className="important">{calculatedDate?.day ?? '--'}</span>{' '}
						days
					</p>
				</article>
			</main>
		</>
	)
}

export default App
