import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';
import { ipcRenderer } from 'electron';

const App = () => {
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success',
	});
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		ipcRenderer.send('logs:load');

		ipcRenderer.on('logs:get', (event, logs) => {
			setLogs(JSON.parse(logs));
		});

		ipcRenderer.on('logs:clear', () => {
			setLogs([]);
			showAlert('Logs Cleared');
		});
	}, []);

	const addLog = item => {
		if (item.text === '' || item.user === '' || item.priority === '') {
			showAlert('Please fill all fields', 'danger');
			return false;
		}

		ipcRenderer.send('logs:add', item);
		showAlert('Log Added');
	};

	const deleteLogItem = _id => {
		// setLogs(logs.filter(log => log._id !== _id));

		ipcRenderer.send('logs:remove', _id);
		showAlert('Log Removed');
	};

	const showAlert = (message, variant = 'success', seconds = 3000) => {
		setAlert({
			show: true,
			message,
			variant,
		});

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success',
			});
		}, seconds);
	};

	return (
		<>
			<Container>
				<AddLogItem addLog={addLog} />
				{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
				<Table>
					<thead>
						<tr>
							<th>Priority</th>
							<th>Log Text</th>
							<th>User</th>
							<th>Created</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{logs.map(log => (
							<LogItem key={log._id} log={log} deleteLogItem={deleteLogItem} />
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default App;
