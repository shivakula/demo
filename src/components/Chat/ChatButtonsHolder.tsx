import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ChatButton from './ChatButtons';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ChatButtons() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    alert();
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
         
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{flexDirection:"column", display:"flex"}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >  
         <ChatButton />
         
      </Menu>
    </div>
  );
}