import Trash from '../icons/Trash';
import { useEffect, useRef, useState } from 'react';
import { setNewOffset, autoGrow, setZIndex } from '../utils';

const NoteCard = ({ note }) => {
	const [position, setPosition] = useState(JSON.parse(note.position));
	const colors = JSON.parse(note.colors);
	const body = JSON.parse(note.body);

	const textAreaRef = useRef(null);

	let mouseStartPos = { x: 0, y: 0 };

	const cardRef = useRef(null);

	useEffect(() => {
		autoGrow(textAreaRef);
	}, []);

	const mouseDown = (e) => {
		setZIndex(cardRef.current);
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
	};

	const mouseUp = () => {
		document.removeEventListener('mousemove', mouseMove);
		document.removeEventListener('mouseup', mouseUp);
	};

	const mouseMove = (e) => {
		//1 - Calculate move direction
		let mouseMoveDir = {
			x: mouseStartPos.x - e.clientX,
			y: mouseStartPos.y - e.clientY,
		};

		//2 - Update start position for next move.
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		//3 - Update card top and left position.

		const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

		setPosition(newPosition);
	};

	// update card top and left position
	return (
		<div
			className="card"
			ref={cardRef}
			style={{
				backgroundColor: colors.colorBody,
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}>
			<div
				className="card-header"
				onMouseDown={mouseDown}
				style={{ backgroundColor: colors.colorHeader }}>
				<Trash />
			</div>
			<div className="card-body">
				<textarea
					ref={textAreaRef}
					onFocus={() => setZIndex(cardRef.current)}
					onInput={() => {
						autoGrow(textAreaRef);
					}}
					style={{ color: colors.colorText }}
					defaultValue={body}></textarea>
			</div>
		</div>
	);
};

export default NoteCard;
