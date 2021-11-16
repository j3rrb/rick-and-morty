import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
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

interface ICollapse {
  title: string;
  open: boolean;
}

const CollapseDetails: React.FC<ICollapse> = ({ title, children, open }) => {
  return (
    <Collapse in={open}>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4'>{title}</Typography>
      </Box>
      <List
        sx={{
          width: '100%',
          overflow: 'auto',
          maxHeight: 300,
          maxWidth: '98%',
          mb: 2,
        }}
      >
        {children}
      </List>
    </Collapse>
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
    <>
      <Card
        onClick={() => {
          if (details) setOpen(!open);
        }}
        sx={{
          mb: 2,
          mr: 2,
          display: 'flex',
          cursor: 'pointer',
        }}
      >
        {image && <img src={image} />}
        <Box>
          <CardHeader title={name} />
          <CardContent>
            {description.map((el) => {
              if (tab === 1)
                el.value = new Date(Date.parse(el.value)).toLocaleDateString();

              return (
                <Typography>
                  {el.label}: {el.value}
                </Typography>
              );
            })}
          </CardContent>
        </Box>
      </Card>
      <CollapseDetails
        open={open}
        title={tab === 0 ? 'Episódios' : 'Personagens'}
      >
        {details.map((detail) => (
          <>
            <Typography>{detail.title}</Typography>
            {detail.value.map((el: any) => (
              <ListItem>
                {tab === 0 && (
                  <ListItemText>
                    <b>{el.episode}</b> {el.name}
                  </ListItemText>
                )}
                {tab === 1 && <ListItemText>{el.name}</ListItemText>}
              </ListItem>
            ))}
          </>
        ))}
      </CollapseDetails>
    </>
  );
};

export default InfoCard;
