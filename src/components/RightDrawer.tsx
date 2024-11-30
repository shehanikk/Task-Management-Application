import React, { useState } from 'react';
import {
  Drawer, Box, Typography, TextField, Button, Divider, IconButton, Popover
} from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Calendar, User, UserCirlceAdd, Flag,DocumentText1 } from 'iconsax-react'; 
import pp2 from '../assets/userImages/pp2.jpg';
import pp3 from '../assets/userImages/pp3.jpg';
import pp4 from '../assets/userImages/pp4.jpg';
import pp5 from '../assets/userImages/pp5.jpg';
import pp7 from '../assets/userImages/pp7.jpg';

const users = [
  { name: 'John Taylor', avatar: pp2 },
  { name: 'Taylor James', avatar: pp3 },
  { name: 'Harry John', avatar: pp4 },
  { name: 'Taylor James', avatar: pp5 },
  { name: 'Harry John', avatar: pp7 },
];

interface TaskDetails {
  taskName: string;
  user: { name: string; avatar: string } | null;
  date: string | null;
  priority: string | null;
  description: string;
}


interface RightDrawerProps {
  state: { right: boolean };
  toggleDrawer: (anchor: 'right', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  taskDetails: {
    taskName: string;
    user: { name: string; avatar: string } | null;
    date: string | null;
    priority: string | null;
    description: string;
  } | null;
  onPriorityChange: (priority: string) => void;
  onUserChange: (user: { name: string; avatar: string } | null) => void;
  onDescription: (e: React.ChangeEvent<HTMLDivElement>) => void; // Add this line
};

export default function RightDrawer({
  state, toggleDrawer, taskDetails, onPriorityChange, onUserChange, 
}: RightDrawerProps) {
  const [editableTaskDetails, setEditableTaskDetails] = React.useState<TaskDetails | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if (taskDetails) {
      setEditableTaskDetails(taskDetails);
    }
  }, [taskDetails]);

  const handleInputChange = (field: keyof TaskDetails, value: string | null) => {
    setEditableTaskDetails((prev) => {
      if (prev) {
        return {
          ...prev,
          [field]: value,
        };
      }
      return null; // Return null if prev is null
    });
  };
  
  

  const handleSelectChange = (field: keyof TaskDetails, value: string | { name: string; avatar: string } | null) => {
    setEditableTaskDetails((prev) => {
      if (prev) {
        return {
          ...prev,
          [field]: value,
        };
      }
      return null; // Return null if prev is null
    });
  };
  

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserSelect = (selectedUser: { name: string; avatar: string }) => {
    handleSelectChange('user', selectedUser);
    onUserChange(selectedUser);
    setAnchorEl(null);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPriorityAnchorEl(null);
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  const handlePriorityChange = (newPriority: string) => {
    handleInputChange('priority', newPriority);
    onPriorityChange(newPriority);
    setPriorityAnchorEl(null);
  };

  return (
    <Drawer
      anchor="right"
      open={state.right}
      onClose={toggleDrawer('right', false)}
    >
      <Box sx={{ width: 450, padding: 2, paddingTop: 10, position: 'relative' }}>
        <Button
          variant="outlined"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          sx={{
            position: 'relative',
            top: 10,
            left: 10,
            backgroundColor: 'white',
            border: '1px solid gray',
            color: 'gray',
            textTransform: 'none',
            padding: '4px 8px',
            fontSize: '0.875rem',
            zIndex: 1,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={() => console.log('Task marked as complete')}
        >
          Mark Complete
        </Button>

        <Divider sx={{ marginY: 3 }} />

        {editableTaskDetails && editableTaskDetails.taskName && (
          <Box
            sx={{
              backgroundColor: 'white',
              border: '1px solid gray',
              padding: 2,
              marginBottom: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              wordBreak: 'break-word',
              overflow: 'hidden',
              maxWidth: '100%',
              width: '100%',
            }}
          >
            {editableTaskDetails.taskName}
          </Box>
        )}

        {editableTaskDetails ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <IconButton sx={{ marginRight: 1 }}>
                <Calendar />
              </IconButton>
              <Typography variant="body1">Due Date</Typography>
              <Typography variant="body1" sx={{ marginLeft: 10, color: 'black' }}>{editableTaskDetails.date}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
  <IconButton sx={{ marginRight: 1 }}>
    <User />
  </IconButton>
  <Typography variant="body1">Assignee</Typography>
  {editableTaskDetails.user ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginLeft: 10,
      }}
      onClick={handleUserClick}
    >
      <img
        src={editableTaskDetails.user?.avatar || '/default-avatar.png'}
        alt={editableTaskDetails.user?.name}
        style={{ borderRadius: '50%', width: 28, height: 29, marginRight: 8 }}
      />
      <Typography variant="body1" sx={{ color: 'black' }}>
        {editableTaskDetails.user?.name}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 10,
        cursor: 'pointer',
        color: 'gray',
      }}
      onClick={handleUserClick}
    >
      <UserCirlceAdd size="20" variant="Broken"/>
      <Typography variant="body1" sx={{ color: 'gray', marginLeft: 1 }}>
        No assignee
      </Typography>
    </Box>
  )}
</Box>



            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                {users.map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                      padding: 1,
                      borderRadius: 1,
                    }}
                    onClick={() => handleUserSelect(user)}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ borderRadius: '50%', width: 24, height: 24, marginRight: 8 }}
                    />
                    <Typography variant="body1">{user.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Popover>


            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <IconButton sx={{ marginRight: 1 }} onClick={handlePriorityClick}>
                <Flag />
              </IconButton>
              <Typography variant="body1">Priority</Typography>
              <Typography
                variant="body1"
                sx={{
                  marginLeft: 12,
                  cursor: 'pointer',
                  color: editableTaskDetails.priority ? 'black' : 'gray',
                }}
                onClick={handlePriorityClick}
              >
                {editableTaskDetails.priority || 'Set Priority'}
              </Typography>
            </Box>

            <Popover
  open={Boolean(priorityAnchorEl)}
  anchorEl={priorityAnchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
    {['Low', 'Medium', 'High'].map((priority) => (
      <Button
        key={priority}
        sx={{
          color:'black',
          marginBottom: 1,
          textAlign: 'left',
          textTransform: 'none', 
          justifyContent: 'flex-start', 
        }}
        onClick={() => handlePriorityChange(priority)}
      >
        {priority}
      </Button>
    ))}
  </Box>
</Popover>

<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
  <IconButton sx={{ marginRight: 1 }}>
    
    <Typography variant="body1" component="span" sx={{ fontSize: '1.25rem' }}>
      <DocumentText1/>
    </Typography>
  </IconButton>
  <Typography variant="body1">Description</Typography>
</Box>

<TextField
  value={editableTaskDetails?.description || ''}
  onChange={(e) => {
    const newDescription = e.target.value;
    handleInputChange('description', newDescription);
  }}
  fullWidth
  multiline
  rows={4}
  variant="outlined"
  placeholder="Enter task description here..."
  sx={{ marginBottom: 2 }}
/>



           
          </>
        ) : (
          <Typography>No task details available</Typography>
        )}
      </Box>
    </Drawer>
  );
}
