import React from "react";
import { GET_ALL_CHARACTERS } from "@/services/api/queries";
import { Character } from "@/types";
import { useLazyQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";

export default function MainPage() {
  const scrollRef = React.useRef();
  const [currPage, setCurrPage] = React.useState(1);
  const [prevPage, setPrevPage] = React.useState(0);
  const [charactersList, setCharactersList] = React.useState<Character[]>([]);
  const [wasLastList, setWasLastList] = React.useState(false);

  const [getAllCharacters, { data, loading, error }] = useLazyQuery(
    GET_ALL_CHARACTERS(currPage)
  );

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  };

  React.useEffect(() => {
    getAllCharacters();
  }, []);

  React.useEffect(() => {
    const fetchData = () => {
      const chars = data.characters.results;

      if (!loading && !chars.length) {
        setWasLastList(true);

        return;
      }

      setPrevPage(currPage);
      setCharactersList([...charactersList, ...chars]);
    };

    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, charactersList]);

  return (
    <Box>
      <Box padding={2}>
        <TextField fullWidth placeholder="Search character here..." />
      </Box>
      <Box>
        {loading || !data ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            spacing={2}
            padding={2}
            component="div"
            onScroll={onScroll}
          >
            {(data.characters.results as Character[]).map((character, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4}>
                <Card elevation={5}>
                  <CardMedia>
                    <Image
                      width={1000}
                      height={1000}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      src={character.image}
                      alt="Character image"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" textOverflow="ellipsis" noWrap>
                      {character.name}
                    </Typography>
                    <Typography
                      mt={1}
                      variant="body2"
                      textOverflow="ellipsis"
                      noWrap
                      title={character.species}
                    >
                      <strong>Species:</strong> {character.species}
                    </Typography>
                    <Typography
                      variant="body2"
                      textOverflow="ellipsis"
                      noWrap
                      title={character.gender}
                    >
                      <strong>Gender:</strong> {character.gender}
                    </Typography>
                    <Typography
                      variant="body2"
                      textOverflow="ellipsis"
                      noWrap
                      title={character.location.name}
                    >
                      <strong>Location: </strong> {character.location.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      textOverflow="ellipsis"
                      noWrap
                      title={character.origin.name}
                    >
                      <strong>Origin:</strong> {character.origin.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
