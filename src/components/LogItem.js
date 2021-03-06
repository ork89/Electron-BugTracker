import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Moment from 'react-moment';

const LogItem = ({ deleteLogItem, log: { _id, priority, text, user, created } }) => {
	const setVariant = () => {
		switch (priority) {
			case 'high':
				return 'danger';
			case 'moderate':
				return 'warning';

			default:
				return 'success';
		}
	};

	return (
		<tr>
			<td>
				<Badge variant={setVariant()} className='p-2'>
					{priority.charAt(0).toUpperCase() + priority.slice(1, priority.length)}
				</Badge>
			</td>
			<td>{text}</td>
			<td>{user}</td>
			<td>
				<Moment format='MMMM Do YYYY, h:mm:ss a'>{new Date(created)}</Moment>
			</td>
			<td>
				<Button variant='danger' size='sm' onClick={() => deleteLogItem(_id)}>
					X
				</Button>
			</td>
		</tr>
	);
};

export default LogItem;
