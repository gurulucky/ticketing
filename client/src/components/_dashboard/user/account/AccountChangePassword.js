import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import fakeRequest from '../../../../utils/fakeRequest';
import { resetPassword } from '../../../../actions/auth';
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const ChangePassWordSchema = Yup.object().shape({
    curPassword: Yup.string().required('Current Password is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      curPassword: '',
      password: '',
      password2: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      dispatch(resetPassword({ ...values }, enqueueSnackbar));
      setSubmitting(false);
      // alert(JSON.stringify(values, null, 2));
      // enqueueSnackbar('Save success', { variant: 'success' });
      if (isMountedRef.current) {
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('curPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Current Password"
              error={Boolean(touched.curPassword && errors.curPassword)}
              helperText={touched.curPassword && errors.curPassword}
            />

            <TextField
              {...getFieldProps('password')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.password && errors.password)}
              helperText={(touched.password && errors.password) || 'Password must be minimum 6+'}
            />

            <TextField
              {...getFieldProps('password2')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.password2 && errors.password2)}
              helperText={touched.password2 && errors.password2}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
