import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ['Select', 'Checkout', 'Done'];
const BookStepper = ({active}) => {
    return (
        <Stepper activeStep={active}>
            {steps.map((label, index) => {
                return (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    )
}

export default BookStepper;