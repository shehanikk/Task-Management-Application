// RightDrawer.tsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, IconButton } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { Calendar } from 'iconsax-react';

type Anchor = 'right';

interface TaskDetails {
  taskName: string;
  user: { name: string; avatar: string } | null;
  date: string | null;
  priority: string | null;
}

interface RightDrawerProps {
  state: { right: boolean };
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  taskDetails: TaskDetails | null;
  onPriorityChange: (newPriority: string) => void; // Callback to handle priority change
}

const RightDrawer: React.FC<RightDrawerProps> = ({ state, toggleDrawer, taskDetails }) => {
  

  return (
    <Drawer
      anchor="right"
      open={state.right}
      onClose={toggleDrawer('right', false)}
    >
      <Box sx={{ width: 500, padding: '50px 20px 0', paddingTop: '100px', position: 'relative' }}>
        {/* Header with Mark Complete and Delete buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircleOutlineRoundedIcon sx={{ color: 'gray' }} />}
            sx={{
              color: 'gray',
              borderColor: 'gray',
              fontFamily: 'sans-serif',
              fontWeight: 'normal',
              textTransform: 'none',
              '&:hover': {
                borderColor: 'darkgray',
                backgroundColor: 'rgba(128, 128, 128, 0.1)'
              }
            }}
          >
            Mark Complete
          </Button>
          <IconButton
            sx={{
              color: 'red',
              '&:hover': {
                color: 'darkred',
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Divider */}
        <Divider sx={{ marginBottom: 2 }} />

        {/* Task Name Box */}
        {taskDetails && (
          <Box
            sx={{
              border: '1px solid lightgray',
              padding: 2,
              marginBottom: 2,
              borderRadius: 1,
              backgroundColor: 'white'
            }}
          >
            <Typography variant="h6" align="left" fontWeight="bold">
              {taskDetails.taskName}
            </Typography>
          </Box>
        )}

        {/* Task Details */}
        {taskDetails ? (
          <>
            {/* Due Date */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Calendar color="gray" />
              <Typography variant="body1" color="gray" sx={{ paddingLeft: 2 }}>
                Due Date
                <span style={{ paddingLeft: '100px' }}>{taskDetails.date}</span>
              </Typography>
            </Box>

           
          </>
        ) : (
          <Typography>No task selected</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
