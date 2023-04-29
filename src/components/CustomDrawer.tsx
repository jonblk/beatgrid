import Drawer from '@mui/material/Drawer';
import { Divider, IconButton, makeStyles, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { CloseOutlined } from '@mui/icons-material';

type Anchor = 'left' | 'right'

type CustomDrawerProps =  {
  state: {left: boolean, right: boolean}
  name: string,
  anchor: Anchor,
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
  children: JSX.Element
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  paperProps: {backgroundColor: "#000000"},
}));

export default function CustomDrawer({name, anchor, state, toggleDrawer, children} : CustomDrawerProps ) {
  const theme = useTheme()

  return (
    <div key={anchor}>
      <StyledDrawer
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Stack gap={2} width={310}>
          <Stack pl={3} pt={2} pr={3} alignItems="center" direction="row">
            <Typography variant={"h1"} sx={{ flexGrow: 1, fontSize: "1rem" }}>
              {name}
            </Typography>
            <IconButton size="small" onClick={toggleDrawer(anchor, false)}>
              <CloseOutlined fontSize="small" color="secondary">
              </CloseOutlined>
            </IconButton>
          </Stack>

          <Divider />

          {children}

        </Stack>
      </StyledDrawer>
    </div>
  );
}