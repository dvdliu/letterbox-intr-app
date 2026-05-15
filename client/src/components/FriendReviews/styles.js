import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: 15,
    backgroundColor: '#fafafa',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  reviewCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    borderRadius: 10,
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  meta: {
    color: '#666',
    fontSize: 12,
  },
  rating: {
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
}));
