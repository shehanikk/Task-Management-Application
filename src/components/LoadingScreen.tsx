import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Popover,
  Divider,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { TickCircle, User, Calendar, Clock, Flag } from 'iconsax-react'; // Added Flag icon
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
import { useDispatch } from 'react-redux';
import { addTask } from '../storage/TaskSlice';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from './DialogBox';

dayjs.extend(utc);
dayjs.extend(timezone);

type Anchor = 'right';

export default function AddTaskCard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks);
  useEffect(() => {
    console.log('Current tasks in Redux store:', tasks);
  }, [tasks]);

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDe, setIsEditingDe] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [userAnchorEl, setUserAnchorEl] = useState<HTMLElement | null>(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLElement | null>(null);
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedUser, setSelectedUser] = useState<{ name: string; avatar: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [dateMessage, setDateMessage] = useState<string>('');

  const [selectedTaskDetails, setSelectedTaskDetails] = useState<{
    taskName: string;
    user: { name: string; avatar: string } | null;
    date: string | null;
    priority: string | null;
    description: string;
  } | null>(null);

  const [state, setState] = useState({
    right: false,
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
    setSelectedTaskDetails({
      taskName,
      user: selectedUser,
      date: selectedDate ? selectedDate.format('MMM DD, YYYY') : null,
      priority: selectedPriority,
      description,
    });
    toggleDrawer('right', true)({} as React.MouseEvent);
  };

  const saveToRedux = () => {
    if (taskName && selectedUser && selectedDate && selectedPriority && dateMessage) {
      const taskData = {
        id: `task-${uuidv4()}`,
        taskName,
        user: selectedUser,
        date: selectedDate.toISOString(),
        priority: selectedPriority,
        dateMessage,
        description,
      };
      dispatch(addTask(taskData));
      console.log('Task saved:', taskData);
    }
  };

  useEffect(() => {
    if (taskName && selectedUser && selectedDate && selectedPriority && dateMessage && description) {
      saveToRedux();
    }
  }, [taskName, selectedUser, selectedDate, selectedPriority, dateMessage, description]);

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
    if (taskName && selectedUser && selectedDate && selectedPriority && dateMessage) {
      const taskData = {
        id: generateUniqueId(),
        taskName,
        user: selectedUser,
        date: selectedDate.toISOString(),
        priority: selectedPriority,
        dateMessage,
      };
      localStorage.setItem(taskData.id, JSON.stringify(taskData));
      console.log('Ted:', taskData);
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

  const handleDescriptionFocus = () => {
    if (description === '') {
      setIsEditingDe(true);
    }
  };

  const handleDescriptionBlur = () => {
    if (description === '') {
      setIsEditingDe(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setTaskName(e.currentTarget.textContent || '');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setDescription(e.currentTarget.textContent || '');
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

  const handleUserSelect = (user: { name: string; avatar: string } | null) => {
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

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setIsVisible(false);
    setOpenDeleteDialog(false);
    console.log('Task deleted.');
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  if (!isVisible) {
    return null;
  }

  const userPopoverOpen = Boolean(userAnchorEl);
  const calendarPopoverOpen = Boolean(calendarAnchorEl);
  const priorityPopoverOpen = Boolean(priorityAnchorEl);

  const getPriorityStyles = (priority: string | null) => {
    switch (priority) {
      case 'Low':
        return {
          textColor: 'black',
          bgColor: '#E6F7FF',
        };
      case 'Medium':
        return {
          textColor: 'white',
          bgColor: '#FA8C16',
        };
      case 'High':
        return {
          textColor: 'white',
          bgColor: '#E32D2D',
        };
      default:
        return {
          textColor: 'black',
          bgColor: '#E6F7FF',
        };
    }
  };

  const priorityStyles = getPriorityStyles(selectedPriority);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        boxShadow: 3,
        padding: '16px',
      }}
    >
      <Typography
        contentEditable={isEditing}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleChange}
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px',
          minHeight: '24px',
        }}
      >
        {taskName || 'Task Name'}
      </Typography>
      <Typography
        contentEditable={isEditingDe}
        onFocus={handleDescriptionFocus}
        onBlur={handleDescriptionBlur}
        onInput={handleDescriptionChange}
        sx={{
          fontSize: '14px',
          marginBottom: '8px',
          minHeight: '40px',
          color: '#6B6B6B',
        }}
      >
        {description || 'Task Description'}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: '8px' }}>
        <Chip
          label={selectedPriority || 'Priority'}
          sx={{
            backgroundColor: priorityStyles.bgColor,
            color: priorityStyles.textColor,
            borderRadius: '4px',
            padding: '4px 8px',
          }}
        />
        <Avatar src={selectedUser?.avatar} alt={selectedUser?.name} />
        <IconButton onClick={handleDeleteClick}>
          <Flag color="gray" size="18" />
        </IconButton>
      </Box>
      <Divider sx={{ margin: '8px 0' }} />
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
}
