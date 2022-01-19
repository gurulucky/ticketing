import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
// redux
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import EventForm from './EventForm';

// ----------------------------------------------------------------------

const STEPS = ['Event Detail', 'Ticket Detail', 'Created'];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box component={Icon} icon={checkmarkFill} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const [activeStep, setActiveStep] = useState(0);
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      // dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef]);

  useEffect(() => {
    if (activeStep === 1) {
      // dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  }

  return (
    <Page title="Ecommerce: Checkout | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {activeStep === 0 && <EventForm nextStep={nextStep} />}
        {/* {activeStep === 1 && <CheckoutBillingAddress />}
            {activeStep === 2 && billing && <CheckoutPayment />} */}
      </Container>
    </Page>
  );
}
