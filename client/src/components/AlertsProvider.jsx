import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

const AlertsContext = createContext(null);

const AUTO_HIDE_DURATION = {
  success: 5000,
  info: 6000,
  warning: 7000,
  error: 8000,
};

export function AlertsProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback(({ severity = 'info', title, message }) => {
    setAlert({ severity, title, message, id: Date.now() });
  }, []);

  const hideAlert = useCallback(() => setAlert(null), []);

  const handleClose = useCallback(
    (_event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      hideAlert();
    },
    [hideAlert]
  );

  const value = useMemo(
    () => ({ showAlert, hideAlert }),
    [hideAlert, showAlert]
  );

  return (
    <AlertsContext.Provider value={value}>
      {children}
      <Snackbar
        key={alert?.id ?? 'closed'}
        open={Boolean(alert)}
        autoHideDuration={
          alert ? (AUTO_HIDE_DURATION[alert.severity] ?? 6000) : undefined
        }
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ m: 2 }}
      >
        <Alert
          onClose={handleClose}
          severity={alert?.severity ?? 'info'}
          variant="filled"
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 480,
            borderRadius: 2,
            '& a': {
              color: 'inherit',
              fontWeight: 700,
            },
          }}
        >
          {alert?.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert?.message}
        </Alert>
      </Snackbar>
    </AlertsContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertsContext);

  if (!context) {
    throw new Error('useAlerts debe usarse dentro de AlertsProvider.');
  }

  return context;
}
