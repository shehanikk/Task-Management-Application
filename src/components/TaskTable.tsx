// TasksTable.tsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';

const tasksData = [
  { id: 1, taskName: 'Task 1', assignedTo: 'User A', dueDate: '2024-12-05', status: 'Pending' },
  { id: 2, taskName: 'Task 2', assignedTo: 'User B', dueDate: '2024-12-10', status: 'In Progress' },
  { id: 3, taskName: 'Task 3', assignedTo: 'User C', dueDate: '2024-12-15', status: 'Completed' },
  // Add more rows as needed
];

const TasksTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table aria-label="tasks table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>
              <TableSortLabel>Due Date</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Status</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasksData.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.taskName}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
