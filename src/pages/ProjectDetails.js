// frontend/src/pages/ProjectDetails.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask } from '../services/api';
import { Container, TextField, Button, List, ListItem, Select, MenuItem, Typography } from '@mui/material';

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks(id).then(res => setTasks(res.data));
  }, [id]);

  const handleCreateTask = () => {
    createTask({ projectId: id, title: taskTitle }).then(() => {
      fetchTasks(id).then(res => setTasks(res.data));
      setTaskTitle('');
    });
  };

  const handleStatusChange = (taskId, status) => {
    updateTask(taskId, { status }).then(() => {
      fetchTasks(id).then(res => setTasks(res.data));
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Project Tasks</Typography>
      <TextField label="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <Button variant="contained" onClick={handleCreateTask}>Add Task</Button>

      <List>
        {tasks.map(task => (
          <ListItem key={task._id}>
            {task.title} - {task.status}
            <Select
              value={task.status}
              onChange={(e) => handleStatusChange(task._id, e.target.value)}
              size="small"
              sx={{ marginLeft: 2 }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
