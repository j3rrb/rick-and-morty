import {
  Backdrop,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../redux/reducers';
import { InfoCardType } from '../types';

const ModalDetails: React.FC<{
  title: string;
  open: boolean;
  setOpen: Function;
}> = ({ title, open, setOpen, children }) => {
  return (
    <Backdrop
      open={open}
      onClick={() => setOpen(false)}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, px: 2 }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          color: 'black',
          minWidth: 300,
          borderRadius: 5,
        }}
      >
        <Box display='flex' justifyContent='center'>
          <Typography variant='h4' sx={{ paddingTop: 5 }}>
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: 2,
          }}
        >
          <List
            sx={{
              width: '100%',
              overflow: 'auto',
              maxHeight: 300,
              mb: 2,
            }}
          >
            {children}
          </List>
        </Box>
      </Box>
    </Backdrop>
  );
};

const InfoCard: React.FC<InfoCardType> = ({
  name,
  image,
  description,
  details,
}) => {
  const [open, setOpen] = useState(false);
  const { tab } = useSelector((state: IState) => state);

  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      {image && (
        <img
          style={{
            cursor: 'pointer',
            borderRadius: 20,
            margin: 20,
            width: '100%',
            minWidth: 200,
            marginLeft: 5,
          }}
          onClick={() => {
            if (details) setOpen(!open);
          }}
          src={image}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
          cursor: 'pointer',
          mx: 2,
        }}
        onClick={() => {
          if (details && !image) setOpen(!open);
        }}
      >
        <Box
          sx={{
            pl: 1,
          }}
        >
          <Typography variant='h5'>{name}</Typography>
          {description.map((el) => {
            if (tab === 1)
              el.value = new Date(Date.parse(el.value)).toLocaleDateString();

            return (
              <Typography>
                {el.label}: {el.value}
              </Typography>
            );
          })}
        </Box>
      </Box>
      {open && (
        <ModalDetails
          setOpen={setOpen}
          open={open}
          title={tab === 0 ? 'Episódios' : 'Personagens'}
        >
          {details.map((detail) => (
            <>
              {detail.value.map((el: any) => (
                <>
                  <ListItem>
                    {tab === 0 && (
                      <ListItemText>
                        <b>{el.episode}</b> {el.name}
                      </ListItemText>
                    )}
                    {tab === 1 && <ListItemText>{el.name}</ListItemText>}
                  </ListItem>
                </>
              ))}
            </>
          ))}
        </ModalDetails>
      )}
    </Grid>
  );
};

export default InfoCard;
