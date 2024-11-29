import { Box, Typography } from '@mui/material';
import { Record, Add } from 'iconsax-react';
import { useState } from 'react';
import AddTaskCard from './AddTaskCard'; // Import the AddTaskCard component

const TasksTable = () => {
  const [taskInputVisible, setTaskInputVisible] = useState({
    Todo: false,
    'In Progress': false,
    Completed: false,
  });

  const labels = [
    { text: 'Todo', color: '#FFC107' }, // Custom color for 'Todo'
    { text: 'In Progress', color: '#0247B3' }, // Custom color for 'In Progress'
    { text: 'Completed', color: '#4CAF50' }, // Custom color for 'Completed'
  ]; // Labels with corresponding colors

  const handleAddTaskClick = (labelText: string) => {
    setTaskInputVisible((prevState) => ({
      ...prevState,
      [labelText]: true,
    }));
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5, // Increase the space between the boxes
        p: 2,
        width: '1350px', // Ensure the container is full width to fit all boxes
        overflowX: 'auto', // Allows scrolling if the boxes don't fit in the viewport
      }}
    >
      {labels.map((label, index) => (
        <Box
          key={index}
          sx={{
            border: '1px dashed rgba(0, 0, 0, 0.2)', // Transparent thin dashed border
            borderWidth: '2px', // Reduced width for a thinner border
            borderRadius: '9px', // Optional: Add rounded corners for a cleaner look
            width: 400, // Adjust width if needed to fit 3 boxes in a row
            height: 570,
            p: 2,
            boxSizing: 'border-box',
            position: 'relative', // Required for positioning the label and the icon
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', // Align contents to the left
          }}
        >
          {/* Label box with icon and text */}
          <Box
            sx={{
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '4px',
              padding: '10px 16px', // Padding for better visibility
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center', // Align icon and text vertically
              position: 'absolute',
              top: '10px', // Distance from the top of the dashed box
              left: '50%', // Center horizontally
              transform: 'translateX(-50%)', // Adjust horizontal centering
              width: '95%', // Full width with some space for padding
              height: '8%',
            }}
          >
            <Record size="20" color={label.color} style={{ marginRight: '8px' }} />
            <span>{label.text}</span>
          </Box>

          {/* Conditional rendering of "Add Task" button or input field */}
          {taskInputVisible[label.text as keyof typeof taskInputVisible] ? (
            <Box sx={{ paddingTop: '15%' }}> {/* Add padding to the AddTaskCard */}
              <AddTaskCard />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 6, // Space below the label box
                cursor: 'pointer',
                width: '100%', // Ensure the container takes full width for centering
              }}
              onClick={() => handleAddTaskClick(label.text)} // Show input when clicked
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center', // Center icon and text vertically
                  justifyContent: 'center', // Center icon and text horizontally
                  paddingTop: '10px',
                }}
              >
                <Add size="16" color="#1c1c1c" style={{ marginRight: '8px' }} />
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#1c1c1c', // Adjust color as needed
                  }}
                >
                  Add Task
                </Typography>
              </Box>
            </Box>
          )}

          {/* Add icon at the top right corner */}
          <Box
            sx={{
              position: 'absolute',
              top: '20px', // Adjust as needed for spacing
              right: '20px', // Position at the top right corner
            }}
          >
            <Add size="24" color="#1c1c1c" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TasksTable;
