import { useState } from 'react';
import {
  Box,
  Card,
  Popover,
  List,
  ListItem,
  Divider,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import { TickCircle, User, Calendar } from 'iconsax-react'; // Replace with appropriate icon imports
import pp2 from '../assets/userImages/pp2.jpg';
import pp3 from '../assets/userImages/pp3.jpg';
import pp4 from '../assets/userImages/pp4.jpg';
import pp5 from '../assets/userImages/pp5.jpg';
import pp7 from '../assets/userImages/pp7.jpg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';

export default function AddTaskCard() {
  const [taskName, setTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedUser, setSelectedUser] = useState<{ name: string; avatar: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  // Example user list with profile pictures
  const users = [
    { name: 'John Taylor', avatar: pp2 },
    { name: 'Taylor James', avatar: pp3 },
    { name: 'Harry John', avatar: pp4 },
    { name: 'Taylor James', avatar: pp5 },
    { name: 'Harry John', avatar: pp7 },
  ];

  // Priority options
  const priorityOptions = ['Low', 'Medium', 'High'];

  const handleFocus = () => {
    if (taskName === '') {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    if (taskName === '') {
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setTaskName(e.currentTarget.textContent || '');
  };

  const openUserPopover = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const closeUserPopover = () => {
    setUserAnchorEl(null);
  };

  const openCalendarPopover = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchorEl(event.currentTarget);
  };

  const closeCalendarPopover = () => {
    setCalendarAnchorEl(null);
  };

  const openPriorityPopover = (event: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  const closePriorityPopover = () => {
    setPriorityAnchorEl(null);
  };

  const handleUserSelect = (user: { name: string; avatar: string }) => {
    setSelectedUser(user);
    closeUserPopover();
  };

  const handleDateSelect = (date: Dayjs | null) => {
    setSelectedDate(date);
    closeCalendarPopover(); // Close the calendar popover after selection
  };

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriority(priority);
    closePriorityPopover();
  };

  const userPopoverOpen = Boolean(userAnchorEl);
  const calendarPopoverOpen = Boolean(calendarAnchorEl);
  const priorityPopoverOpen = Boolean(priorityAnchorEl);

  // Function to get styles based on the selected priority
 // Function to get styles based on the selected priority
 const getPriorityStyles = (priority: string | null) => {
    switch (priority) {
      case 'Low':
        return {
          textColor: '#0247B3',
          backgroundColor: '#C2D7F7',
          border: 'none', // Remove dashed border for selected priority
        };
      case 'Medium':
        return {
          textColor: '#FFAD0D',
          backgroundColor: '#FFFAF2',
          border: 'none', // Remove dashed border for selected priority
        };
      case 'High':
        return {
          textColor: '#CB2E27',
          backgroundColor: '#FCF4F4',
          border: 'none', // Remove dashed border for selected priority
        };
      default:
        return {
          textColor: 'gray',
          backgroundColor: 'white',
          border: '1px dashed gray', // Show dashed border when no priority is set
        };
    }
  };
  
  

  const { textColor, backgroundColor } = getPriorityStyles(selectedPriority);

  return (
    <Card sx={{ width: '365px', position: 'relative' }}>
      <Box sx={{ p: 2, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            left: 10,
            paddingTop: '2px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TickCircle size="20" color="#1c1c1c" />
        </Box>

        <div
          style={{
            paddingLeft: '30px',
            color: taskName || isEditing ? 'black' : 'gray',
            fontSize: '16px',
            textAlign: 'start',
            minHeight: '24px',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            outline: 'none',
            border: 'none',
          }}
          contentEditable
          suppressContentEditableWarning={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleChange}
        >
          {taskName === '' && !isEditing ? 'Write a task name' : ''}
        </div>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, gap: 2 }}>
        <Box
          onClick={openUserPopover}
          sx={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: selectedUser ? 'none' : '2px dashed #9d9d9d',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          {selectedUser ? (
            <Avatar src={selectedUser.avatar} sx={{ width: 32, height: 32 }} />
          ) : (
            <User size="23" color="#9d9d9d" />
          )}
        </Box>

        {/* Render the date chip if a date is selected; otherwise, show the calendar icon */}
        {selectedDate ? (
          <Chip
            label={selectedDate.format('MMM DD')} // Format date as "Nov 18"
            sx={{
              backgroundColor: '#C2D7F7',
              color: '#0247B3',
              fontWeight: 'bold', // Make the text bold
              borderRadius: '16px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer', // Make chip clickable
              '&:hover': {
                backgroundColor: '#C2D7F7', // Hover color should match the background color
              },
            }}
            onClick={openCalendarPopover} // Open calendar when the chip is clicked
          />
        ) : (
          <Box
            onClick={openCalendarPopover}
            sx={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #9d9d9d',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            <Calendar size="23" color="#9d9d9d" />
          </Box>
        )}
      </Box>

      {/* Priority Button */}
      <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
      <Chip
  label={selectedPriority ? selectedPriority : 'Set Priority'}
  sx={{
    border: selectedPriority ? 'none' : '1px dashed gray', // Remove border when a priority is selected
    backgroundColor: backgroundColor,
    color: textColor,
    fontWeight: 'bold',
    borderRadius: '16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EFEFEF', // Hover color
    },
  }}
  onClick={openPriorityPopover}
/>

      </Box>

      {/* Priority Popover */}
      <Popover
        open={priorityPopoverOpen}
        anchorEl={priorityAnchorEl}
        onClose={closePriorityPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ width: '150px' }}>
          {priorityOptions.map((option) => (
            <ListItem
              button
              key={option}
              onClick={() => handlePrioritySelect(option)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
              }}
            >
              <Typography>{option}</Typography>
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* User Popover */}
      <Popover
        open={userPopoverOpen}
        anchorEl={userAnchorEl}
        onClose={closeUserPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ width: '240px' }}>
          {users.map((user) => (
            <ListItem
              button
              disablePadding
              key={user.name}
              onClick={() => handleUserSelect(user)}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}
            >
              <Avatar src={user.avatar} sx={{ width: 35, height: 35 }} />
              <Typography>{user.name}</Typography>
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* Calendar Popover */}
      <Popover
        open={calendarPopoverOpen}
        anchorEl={calendarAnchorEl}
        onClose={closeCalendarPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={handleDateSelect} />
          </LocalizationProvider>
        </Box>
      </Popover>
    </Card>
  );
}
