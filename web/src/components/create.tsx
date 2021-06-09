import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import '../index.css';

function Create() {
	const [content, setContent] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const [errored, setErrored] = useState(false);
	const history = useHistory();

	function handleSubmit(evt: FormEvent) {
		evt.preventDefault();
		if (content === '') return;
		postPaste();
	}

	const postPaste = () => {
		setLoading(true);
		setErrored(false);
		const data = {
			content: content,
		};
		const request = new Request(`http://localhost:2000/api/pastes`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		fetch(request)
			.then(x => x.json())
			.then(c => {
				setLoading(false);
				history.push(`/${c.id}`);
			})
			.catch(err => {
				console.log(content);
				console.log(err);
				setLoading(false);
				setErrored(true);
			});
	};

	return (
		<div className="Create min-h-screen bg-green-900 font-mono">
			<form onSubmit={handleSubmit}>
				<textarea
					placeholder="Paste"
					value={content}
					onChange={e => setContent(e.target.value)}
					className="w-11/12 resize-none m-auto flex h-96	 px-4 py-4 placeholder-green-200 text-green-100 relative bg-green-500 bg-green-500 text-lg rounded-lg shadow-xl text-base border border-green-800 outline-none focus:outline-none focus:ring"
				/>
				<button
					type="submit"
					className={`${
						loading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600'
					} w-1/4 py-5 my-4 m-auto flex justify-center placeholder-green-200 text-green-100 text-2xl font-medium bg-green-700 shadow-xl rounded-lg border border-green-800 outline-none focus:outline-none focus:ring`}
				>
					{`${loading ? 'Loading' : errored ? 'Error' : 'Paste'}`}
				</button>
			</form>
		</div>
	);
}

export default Create;
