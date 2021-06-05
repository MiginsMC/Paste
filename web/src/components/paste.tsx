import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

export default function Paste() {
	const [content, setContent] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [errored, setErrored] = useState(false);

	interface ParamTypes {
		id: string;
	}

	const { id } = useParams<ParamTypes>();

	useEffect(() => {
		setLoading(true);
		fetch(`http://localhost:2000/api/pastes/${id}`)
			.then(x => x.json())
			.then(c => {
				setLoading(false);
				setContent(c);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
				setErrored(true);
			});
	}, [id]);

	return (
		<div className="App min-h-screen bg-green-900 font-mono">
			{/* <input className="h-100 w-100 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-5"></input> */}
			<p className="px-10 py-4 text-green-50 whitespace-pre-wrap flex-wrap w-10/12 m-auto placeholder-green-200 text-sm text-green-100 bg-green-700 shadow-xl rounded-lg border border-green-800">
				{loading === true ? 'Loading...' : ''}{' '}
				{errored === true ? 'Paste not found' : ''}{' '}
				{content
					?.trim()
					.split('\n')
					.map(e => (
						<p>{e}</p>
					))}
			</p>
		</div>
	);
}
