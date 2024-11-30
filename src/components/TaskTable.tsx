import { Box, Typography } from '@mui/material';
import { Record, Add } from 'iconsax-react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import DragDropContext, Droppable, and Draggable
import AddTaskCard from './AddTaskCard'; // Import the AddTaskCard component

const TasksTable = () => {
  const [tasks, setTasks] = useState({
    Todo: [] as number[], // Each array holds task IDs for this label
    'In Progress': [] as number[],
    Completed: [] as number[],
  });

  const labels = [
    { text: 'Todooo', color: '#FFC107' }, // Custom color for 'Todo'
    { text: 'In Progress', color: '#0247B3' }, // Custom color for 'In Progress'
    { text: 'Completed', color: '#4CAF50' }, // Custom color for 'Completed'
  ];

  const handleAddTaskClick = (labelText: keyof typeof tasks) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [labelText]: [...prevTasks[labelText], prevTasks[labelText].length + 1], // Add a new task with a unique ID
    }));
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If dropped outside the list (no destination), do nothing
    if (!destination) return;

    const sourceLabel = source.droppableId as keyof typeof tasks;
    const destinationLabel = destination.droppableId as keyof typeof tasks;

    // If the item is dropped in the same position, no need to update the state
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };
    const [removedTask] = newTasks[sourceLabel].splice(source.index, 1); // Remove the task from the source
    newTasks[destinationLabel].splice(destination.index, 0, removedTask); // Add it to the destination

    setTasks(newTasks); // Update the state with new task lists
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}> {/* Wrap with DragDropContext */}
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 5,
          p: 2,
          width: '1350px',
          overflowX: 'auto',
        }}
      >
        {labels.map((label, index) => (
          <Droppable key={index} droppableId={label.text}> 
          {(provided) => (  // The child here should be a function
            <Box
              sx={{
                border: '1px dashed rgba(0, 0, 0, 0.2)',
                borderWidth: '2px',
                borderRadius: '9px',
                width: 400,
                height: 570, // Fixed height for the dashed box
                p: 2,
                boxSizing: 'border-box',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              ref={provided.innerRef} // Attach provided ref
              {...provided.droppableProps} // Attach droppable props
            >
              {/* Render label box with icon and text */}
              <Box
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '4px',
                  padding: '10px 16px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '95%',
                  height: '8%',
                }}
              >
                <Record size="20" color={label.color} style={{ marginRight: '8px' }} />
                <span>{label.text}</span>
              </Box>
        
              {/* Scrollable container for tasks and "Add Task" button */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%', // Ensures the scrollable container fills the box
                  marginTop: '60px', // Space below the label box
                  overflowY: 'auto', // Enables scrolling if content overflows
                  paddingBottom: '16px', // Adds space at the bottom for better scrolling UX
                  scrollbarWidth: 'thin', // Firefox scrollbar size
                  scrollbarColor: '#B0B0B0 #F0F0F0', // Firefox scrollbar color
                  '&::-webkit-scrollbar': {
                    width: '6px', // Thin width
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#B0B0B0', // Thumb color
                    borderRadius: '10px', // Rounded corners
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#909090', // Darker on hover
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#F0F0F0', // Track color
                    borderRadius: '10px', // Rounded corners for the track
                  },
                }}
              >
                {tasks[label.text as keyof typeof tasks].map((taskId, index) => (
                  <Draggable key={taskId} draggableId={taskId.toString()} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef} // Attach provided ref
                        {...provided.draggableProps} // Attach draggable props
                        {...provided.dragHandleProps} // Attach drag handle props
                        sx={{ width: '100%', marginBottom: 2 }}
                      >
                        <AddTaskCard />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {/* Add Task button */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleAddTaskClick(label.text as keyof typeof tasks)}
                >
                  <Add size="16" color="#1c1c1c" style={{ marginRight: '8px' }} />
                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#1c1c1c',
                    }}
                  >
                    Add Task
                  </Typography>
                </Box>
              </Box>
        
              {/* Add icon at the top right corner */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                }}
              >
                <Add size="24" color="#1c1c1c" />
              </Box>
        
              {provided.placeholder} {/* Render placeholder space when dragging */}
            </Box>
          )}
        </Droppable>
        
        ))}
      </Box>
    </DragDropContext>
  );
};

export default TasksTable;
