import { Box, Typography } from '@mui/material';
import { Record, Add } from 'iconsax-react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import AddTaskCard from './AddTaskCard';

const TasksTable = () => {
  const [tasks, setTasks] = useState({
    Todo: [] as string[],
    'In Progress': [] as string[],
    Completed: [] as string[],
  });

  const labels = [
    { text: 'Todo', color: '#FFC107' },
    { text: 'In Progress', color: '#0247B3' },
    { text: 'Completed', color: '#4CAF50' },
  ];

  const handleAddTaskClick = (labelText: keyof typeof tasks) => {
    const newTaskId = `${labelText}-${Date.now()}`;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [labelText]: [...prevTasks[labelText], newTaskId],
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceLabel = source.droppableId as keyof typeof tasks;
    const destinationLabel = destination.droppableId as keyof typeof tasks;

    if (sourceLabel === destinationLabel && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };
    const [removedTask] = newTasks[sourceLabel].splice(source.index, 1);
    newTasks[destinationLabel].splice(destination.index, 0, removedTask);

    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
        {labels.map((label) => (
          <Droppable key={label.text} droppableId={label.text as keyof typeof tasks}>
            {(provided) => (
              <Box
                sx={{
                  border: '1px dashed rgba(0, 0, 0, 0.2)',
                  borderWidth: '2px',
                  borderRadius: '9px',
                  width: 400,
                  height: 570,
                  p: 2,
                  boxSizing: 'border-box',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    marginTop: '60px',
                    overflowY: 'auto',
                    paddingBottom: '16px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#B0B0B0 #F0F0F0',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#B0B0B0',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#909090',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#F0F0F0',
                      borderRadius: '10px',
                    },
                  }}
                >
                  {tasks[label.text as keyof typeof tasks]?.map((taskId, index) => (
                    <Draggable key={taskId} draggableId={taskId} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ width: '100%', marginBottom: 2 }}
                        >
                          <AddTaskCard />
                        </Box>
                      )}
                    </Draggable>
                  ))}
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
                    <Typography sx={{ fontSize: '14px', color: '#1c1c1c' }}>Add Task</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                  }}
                >
                  <Add size="24" color="#1c1c1c" />
                </Box>

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default TasksTable;
