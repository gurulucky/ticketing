import { Stepper, Step, StepLabel, Typography } from "@mui/material";

const steps = ['Select', 'Checkout', 'Done'];
const BookStepper = ({ active }) => {
    return (
        <Stepper activeStep={active} sx={{py:"10px"}}>
            {steps.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel sx={{
                            '.css-1vghyz3-MuiSvgIcon-root-MuiStepIcon-root': {
                                fontSize:'2.5em'
                            }
                        }}><Typography variant='h6' color='primary'>{label}</Typography></StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    )
}

export default BookStepper;