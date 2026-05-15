import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@material-ui/core';

import { getFriendReviews } from '../../actions/letterboxd';
import useStyles from './styles';

const FriendReviews = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const username = profile?.result?.letterboxdUsername || profile?.result?.name || '';

  const { loading, pending, reviews, error } = useSelector((state) => state.letterboxd || {});

  useEffect(() => {
    dispatch(getFriendReviews(username));
  }, [dispatch, username]);

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.heading}>
        Friends' Letterboxd Reviews
      </Typography>

      {pending && (
        <div className={classes.pendingBanner}>
          Letterboxd API access pending. Showing placeholder data until approval is granted.
        </div>
      )}

      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && reviews.length === 0 && !error && (
        <Typography variant="body2">No reviews yet.</Typography>
      )}

      {reviews.map((r) => (
        <div key={r.id} className={classes.reviewCard}>
          <Typography variant="subtitle2">
            {r.author} on <em>{r.film}</em> {r.year ? `(${r.year})` : ''}
          </Typography>
          <Typography variant="body2" className={classes.rating}>
            {r.rating ? `${r.rating} / 5` : 'Unrated'}
          </Typography>
          <Typography variant="body2">{r.review}</Typography>
          <Typography className={classes.meta}>
            {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
            {r.link ? (
              <>
                {' · '}
                <a href={r.link} target="_blank" rel="noopener noreferrer">
                  View on Letterboxd
                </a>
              </>
            ) : null}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default FriendReviews;
