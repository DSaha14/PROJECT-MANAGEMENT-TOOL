// frontend/src/pages/Home.js
import { useEffect, useState } from 'react';
import { fetchProjects, createProject } from '../services/api';
import { Container, TextField, Button, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects().then(res => setProjects(res.data));
  }, []);

  const handleCreateProject = () => {
    createProject({ name: projectName }).then(() => {
      fetchProjects().then(res => setProjects(res.data));
      setProjectName('');
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Project</Typography>
      <TextField label="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <Button variant="contained" onClick={handleCreateProject}>Create</Button>

      <Typography variant="h5" mt={4}>Projects</Typography>
      <List>
        {projects.map(project => (
          <ListItem button key={project._id} onClick={() => navigate(`/projects/${project._id}`)}>
            {project.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
