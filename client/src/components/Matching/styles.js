import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    borderRadius: 15,
    marginTop: theme.spacing(3),
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
    flexDirection: 'row',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
  },
  formField: {
    flex: '1 1 220px',
  },
  button: {
    marginTop: theme.spacing(1),
    alignSelf: 'center',
    whiteSpace: 'nowrap',
  },
  spinner: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
  },
  result: {
    marginTop: theme.spacing(3),
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
  filmGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  filmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.75),
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
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  matchesSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  matchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  matchCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderRadius: 8,
    border: '1px solid #eee',
    backgroundColor: '#fafafa',
  },
  chip: {
    backgroundColor: 'rgb(133,0,255)',
    color: '#fff',
    fontWeight: 600,
  },
}));
