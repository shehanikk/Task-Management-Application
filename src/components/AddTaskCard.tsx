import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Popover,
  Divider,
  Typography,
  Avatar,
  Chip,
  IconButton
} from '@mui/material';
import { TickCircle, User, Calendar, Clock } from 'iconsax-react';
import pp2 from '../assets/userImages/pp2.jpg';
import pp3 from '../assets/userImages/pp3.jpg';
import pp4 from '../assets/userImages/pp4.jpg';
import pp5 from '../assets/userImages/pp5.jpg';
import pp7 from '../assets/userImages/pp7.jpg';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { v4 as uuidv4 } from 'uuid';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import RightDrawer from './RightDrawer';

dayjs.extend(utc);
dayjs.extend(timezone);

type Anchor = 'right';


export default function AddTaskCard() {

  const [taskName, setTaskName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedUser, setSelectedUser] = useState<{ name: string; avatar: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [dateMessage, setDateMessage] = useState<string>('');

//   const [state, setState] = React.useState({
//     right: false,
//   });


  const [selectedTaskDetails, setSelectedTaskDetails] = useState<{
    taskName: string;
    user: { name: string; avatar: string } | null;
    date: string | null;
    priority: string | null;
  } | null>(null);

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const handleIconClick = () => {
        // Set task details for the drawer before opening
        setSelectedTaskDetails({
          taskName,
          user: selectedUser,
          date: selectedDate ? selectedDate.format('MMM DD, YYYY') : null,
          priority: selectedPriority,
        });
        toggleDrawer('right', true)(new MouseEvent('click')); // Trigger the drawer opening
      };

  const users = [
    { name: 'John Taylor', avatar: pp2 },
    { name: 'Taylor James', avatar: pp3 },
    { name: 'Harry John', avatar: pp4 },
    { name: 'Taylor James', avatar: pp5 },
    { name: 'Harry John', avatar: pp7 },
  ];

  const priorityOptions = ['Low', 'Medium', 'High'];

  useEffect(() => {
    if (selectedDate) {
      const currentDate = dayjs().tz('Asia/Colombo'); 
      const daysDifference = selectedDate.diff(currentDate, 'day');

      if (daysDifference === 0) {
        setDateMessage('Should be completed by today.');
      } else if (daysDifference > 0) {
        setDateMessage(`Should be completed within ${daysDifference} days.`);
      } else {
        setDateMessage('Past due date.');
      }
    }
  }, [selectedDate]);

  const generateUniqueId = () => {
    return `task-${uuidv4()}`;
  };

  
  const saveToLocalStorage = () => {
    if (taskName && selectedUser && selectedDate && selectedPriority && dateMessage ) {
      const taskData = {
        id: generateUniqueId(),
        taskName,
        user: selectedUser,
        date: selectedDate.toISOString(),
        priority: selectedPriority,
        dateMessage,
      };
      localStorage.setItem(taskData.id, JSON.stringify(taskData));
      console.log('Task saved:', taskData);
    }
  };

  useEffect(() => {
    if (taskName && selectedUser && selectedDate && selectedPriority && dateMessage) {
      saveToLocalStorage();
    }
  }, [taskName, selectedUser, selectedDate, selectedPriority, dateMessage]);

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
    closeCalendarPopover();
  };

  const handlePrioritySelect = (priority: string) => {
    setSelectedPriority(priority);
    closePriorityPopover();
  };

  const userPopoverOpen = Boolean(userAnchorEl);
  const calendarPopoverOpen = Boolean(calendarAnchorEl);
  const priorityPopoverOpen = Boolean(priorityAnchorEl);

  const getPriorityStyles = (priority: string | null) => {
    switch (priority) {
      case 'Low':
        return {
          textColor: '#0247B3',
          backgroundColor: '#C2D7F7',
          border: 'none',
        };
      case 'Medium':
        return {
          textColor: '#FFAD0D',
          backgroundColor: '#FFFAF2',
          border: 'none',
        };
      case 'High':
        return {
          textColor: '#CB2E27',
          backgroundColor: '#FCF4F4',
          border: 'none',
        };
      default:
        return {
          textColor: 'gray',
          backgroundColor: 'white',
          border: '1px dashed gray',
        };
    }
  };

  const { textColor, backgroundColor } = getPriorityStyles(selectedPriority);

  return (
    <Card sx={{ position: 'relative', alignItems: 'center' }}>
       
       <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <IconButton
          onClick={handleIconClick}
          sx={{
            color: 'lightgray',
            fontSize: 20,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <InfoIcon sx={{ fontSize: 'inherit' }} />
        </IconButton>
      </Box>
      <RightDrawer state={state} toggleDrawer={toggleDrawer} taskDetails={selectedTaskDetails} />
      <Box sx={{ p: 0.5, position: 'relative' }}>
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
  
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
  
          {selectedDate ? (
            <Chip
              label={selectedDate.format('MMM DD')}
              sx={{
                backgroundColor: '#C2D7F7',
                color: '#0247B3',
                fontWeight: 'bold',
                borderRadius: '16px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#C2D7F7',
                },
              }}
              onClick={openCalendarPopover}
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
  
        <Box>
          <Chip
            label={selectedPriority ? selectedPriority : 'Set Priority'}
            sx={{
              border: selectedPriority ? 'none' : '1px dashed gray',
              backgroundColor: backgroundColor,
              color: textColor,
              fontWeight: 'bold',
              borderRadius: '16px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#EFEFEF',
              },
            }}
            onClick={openPriorityPopover}
          />
        </Box>
      </Box>
  
      {selectedDate && (
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Clock size="16" color="#1c1c1c" /> 
          <Typography variant="body2" color="textSecondary">
            {dateMessage}
          </Typography>
        </Box>
      )}
  
      <Popover
        open={priorityPopoverOpen}
        anchorEl={priorityAnchorEl}
        onClose={closePriorityPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '150px' }}>
          {priorityOptions.map((option: string) => (
            <Box
              key={option}
              onClick={() => handlePrioritySelect(option)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <Typography>{option}</Typography>
              {selectedPriority === option && <TickCircle size="14" color="#1c1c1c" />}
            </Box>
          ))}
        </Box>
      </Popover>
  
      <Popover
        open={userPopoverOpen}
        anchorEl={userAnchorEl}
        onClose={closeUserPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '240px' }}>
          {users.map((user) => (
            <Box
              key={user.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={() => handleUserSelect(user)}
            >
              <Avatar src={user.avatar} sx={{ width: 35, height: 35 }} />
              <Typography>{user.name}</Typography>
            </Box>
          ))}
        </Box>
      </Popover>
  
      <Popover
        open={calendarPopoverOpen}
        anchorEl={calendarAnchorEl}
        onClose={closeCalendarPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateSelect}
            sx={{
              minWidth: '300px',
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: '#0247B3',
                color: 'white',
              },
              '& .MuiPickersDay-root:hover': {
                backgroundColor: '#E3F2FD',
              },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Card>
  );
}
