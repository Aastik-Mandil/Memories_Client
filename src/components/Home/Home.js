import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginations from '../Paginations/Paginations';
import { getPostsBySearch } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            console.log(search.trim(), tags);
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            history.push("/");
        }
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch, currentId]);

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    className={classes.gridContainer}
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}>

                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit">
                            <TextField
                                name="Search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />

                            <ChipInput
                                style={{ margin: '10px 0' }}
                                label="Search tags"
                                variant="outlined"
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                            />

                            <Button
                                className={classes.searchButton}
                                variant="contained"
                                color="primary"
                                onClick={searchPost}>
                                Search
                            </Button>
                        </AppBar>

                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />

                        {(!searchQuery && !tags.length) && (
                            <Paper
                                className={classes.pagination}
                                elevation={6}>
                                <Paginations page={page} />
                            </Paper>
                        )}
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
