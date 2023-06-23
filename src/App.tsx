import { ReactComponent as ArrowIcon } from '@/assets/svg/icon-arrow.svg'
import { useState } from 'react'

type InputDate = {
	day: number
	month: number
	year: number
}

function App() {
	const [date, setDate] = useState<InputDate>()

	function handleInput(event: { target: { value: string; name: string } }) {
		const value = event.target.value
		const name = event.target.name
		setDate({ ...date, [name]: parseInt(value) } as InputDate)
	}

	function calculate(event: { preventDefault: () => void }) {
		event.preventDefault()
	}

	return (
		<>
			<main id="calculator" className="card">
				<form id="inputs" onSubmit={calculate}>
					<label className="label">
						Day{' '}
						<input
							className="input"
							type="number"
							name="day"
							id="day"
							onChange={handleInput}
						/>
					</label>
					<label className="label">
						Month{' '}
						<input
							type="number"
							name="month"
							id="month"
							onChange={handleInput}
						/>
					</label>
					<label className="label">
						Year{' '}
						<input type="number" name="year" id="year" onChange={handleInput} />
					</label>
					<button type="submit" className="button">
						<ArrowIcon />
					</button>
				</form>
				<div className="divider"></div>
				<article id="results"></article>
			</main>
		</>
	)
}

export default App
