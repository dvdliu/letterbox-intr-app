import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    borderRadius: 15,
  },
  heading: {
    marginBottom: theme.spacing(0.5),
  },
  subheading: {
    color: '#666',
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 480,
  },
  button: {
    marginTop: theme.spacing(1),
  },
  spinner: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
  },
  result: {
    marginTop: theme.spacing(3),
    maxWidth: 480,
  },
  score: {
    color: 'rgb(133,0,255)',
    fontWeight: 700,
  },
  bar: {
    height: 10,
    borderRadius: 5,
    margin: theme.spacing(1, 0),
  },
  meta: {
    color: '#666',
    fontSize: 13,
    marginBottom: theme.spacing(1),
  },
  filmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.75, 0),
    borderBottom: '1px solid #eee',
  },
  filmRatings: {
    color: '#ff8000',
    fontWeight: 600,
  },
  pendingBanner: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    borderRadius: 8,
    backgroundColor: '#fff4d6',
    color: '#7a5c00',
    fontSize: 13,
    maxWidth: 480,
  },
  divider: {
    margin: theme.spacing(3, 0),
    maxWidth: 480,
  },
  matchesSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 480,
  },
  matchCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    borderBottom: '1px solid #eee',
  },
  chip: {
    backgroundColor: 'rgb(133,0,255)',
    color: '#fff',
    fontWeight: 600,
  },
}));
