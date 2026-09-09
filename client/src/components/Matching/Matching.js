import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Typography, TextField, Button, LinearProgress, Divider, CircularProgress, Chip,
} from '@material-ui/core';

import { getMatch, getMatches } from '../../actions/letterboxd';
import { updateLetterboxdUsername } from '../../actions/auth';
import useStyles from './styles';

const Matching = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile') || '{}');

  const [usernameInput, setUsernameInput] = useState(user?.result?.letterboxdUsername || '');
  const [otherUsername, setOtherUsername] = useState('');

  const {
    match, matchLoading, matchError,
    matches, matchesLoading, matchesError, matchesPending,
  } = useSelector((state) => state.letterboxd || {});

  const saveUsername = () => {
    const trimmed = usernameInput.trim();

    if (user?.result?._id && trimmed && trimmed !== user.result.letterboxdUsername) {
      dispatch(updateLetterboxdUsername(user.result._id, trimmed));
    }
  };

  const checkMatch = (e) => {
    e.preventDefault();

    if (usernameInput.trim() && otherUsername.trim()) {
      dispatch(getMatch(usernameInput.trim(), otherUsername.trim()));
    }
  };

  const findMatches = () => {
    if (usernameInput.trim()) dispatch(getMatches(usernameInput.trim()));
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" className={classes.heading}>Letterboxd Matching</Typography>
      <Typography variant="body2" className={classes.subheading}>
        Compare your Letterboxd taste with anyone, or find the best matches among Filmterest members.
      </Typography>

      <form onSubmit={checkMatch} className={classes.form}>
        <TextField
          label="Your Letterboxd username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          onBlur={saveUsername}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Compare with (Letterboxd username)"
          value={otherUsername}
          onChange={(e) => setOtherUsername(e.target.value)}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
          Check Compatibility
        </Button>
      </form>

      {matchLoading && <CircularProgress size={24} className={classes.spinner} />}
      {matchError && <Typography color="error">{matchError}</Typography>}

      {match && (
        <div className={classes.result}>
          {match.pending && (
            <div className={classes.pendingBanner}>
              Letterboxd API access pending — showing a taste-match estimate from placeholder data.
            </div>
          )}
          <Typography variant="h4" align="center" className={classes.score}>
            {match.score}% match
          </Typography>
          <LinearProgress variant="determinate" value={match.score} className={classes.bar} />
          <Typography variant="body2" align="center" className={classes.meta}>
            {match.sharedFilms.length} films in common ({match.totalWatchedA} vs {match.totalWatchedB} watched)
          </Typography>
          {match.sharedFilms.slice(0, 8).map((f) => (
            <div key={f.id} className={classes.filmRow}>
              <Typography variant="body2">
                {f.title} {f.year ? `(${f.year})` : ''}
              </Typography>
              <Typography variant="body2" className={classes.filmRatings}>
                {f.ratingA}★ vs {f.ratingB}★
              </Typography>
            </div>
          ))}
        </div>
      )}

      <Divider className={classes.divider} />

      <div className={classes.matchesSection}>
        <Button variant="outlined" color="primary" fullWidth onClick={findMatches}>
          Find My Top Matches
        </Button>

        {matchesLoading && <CircularProgress size={24} className={classes.spinner} />}
        {matchesError && <Typography color="error">{matchesError}</Typography>}
        {matchesPending && matches.length > 0 && (
          <div className={classes.pendingBanner}>
            Letterboxd API access pending — matches are estimated from placeholder data.
          </div>
        )}

        {matches.map((m) => (
          <div key={m.letterboxdUsername} className={classes.matchCard}>
            <Typography variant="subtitle2">{m.name} (@{m.letterboxdUsername})</Typography>
            <Chip label={`${m.score}% match`} className={classes.chip} size="small" />
          </div>
        ))}

        {matches.length === 0 && !matchesLoading && (
          <Typography variant="body2" className={classes.meta}>
            No other members have added a Letterboxd username yet.
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default Matching;
