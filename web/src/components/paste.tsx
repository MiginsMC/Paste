import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

interface propTypes {
	raw?: true;
}

export default function Paste(props: propTypes) {
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
		<div
			className={`${props.raw ? '' : 'min-h-screen bg-green-900 font-mono'}`}
		>
			<div
				className={`${
					props.raw
						? 'text-sm'
						: 'px-10 py-4 text-green-50 whitespace-pre-wrap flex-wrap w-10/12 m-auto placeholder-green-200 text-sm text-green-100 bg-green-700 shadow-xl rounded-lg border border-green-800'
				}`}
			>
				{loading ? 'Loading...' : ''}
				{''}
				{errored ? 'Paste not found' : ''}
				{''}
				{content?.split('\n').map(e => (
					<p>{e}</p>
				))}
			</div>
		</div>
	);
}
