import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { DateTimePicker, LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
//
import { QuillEditor } from '../../../components/editor';
import { UploadSingleFile } from '../../../components/upload';
import { Block } from '../Block';
import { PATH_CLIENT } from '../../../routes/paths';
// actions
import { getVenues } from '../../../actions/venue';
import { getCategories } from '../../../actions/category';
// util
import { addHours} from '../../../utils/myUtils';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

export default function EventForm({ nextStep }) {
  const dispatch = useDispatch();
  const venues = useSelector(state => state.venue.venues);
  const categories = useSelector(state => state.category.categories);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getVenues());
    dispatch(getCategories());
  }, [dispatch])

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    category: Yup.string().nullable(true).required('Category is required'),
    venue: Yup.string().nullable(true).required('Venue is required'),
    description: Yup.string().min(20).required('Content is required'),
    start: Yup.date().max(Yup.ref('end'), 'Start date cannot be after end date').nullable(true).required('Start date is required'),
    end: Yup.date().min(Yup.ref('start'), 'End date cannot be befre start date').nullable(true).required('End date is required'),
    announceDate: Yup.date().max(Yup.ref('start'), 'Announcement date cannot be after start date').nullable(true).required('Announcement date is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      venue: '',
      description: '',
      image: null,
      start: new Date(),
      end: addHours(new Date(), 1),
      announceDate: addHours(new Date(), -4 * 24)
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // await fakeRequest(500);
        nextStep();
        resetForm();
        handleClosePreview();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('image', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Image</LabelStyle>
                <UploadSingleFile
                  maxSize={3145728}
                  accept="image/*"
                  file={values.image}
                  onDrop={handleDrop}
                  error={Boolean(touched.image && errors.image)}
                />
                {touched.image && errors.image && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.image && errors.image}
                  </FormHelperText>
                )}
              </div>
              <TextField
                fullWidth
                label="Event Title"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <Stack direction='row' spacing={1}>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, value) => setFieldValue('category', value)}
                  options={categories.map(category => `${category.name}`)}
                  renderInput={(params) => <TextField {...params} {...getFieldProps('category')} label="Category" error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category} />}
                  sx={{ width: '30%' }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(e, value) => setFieldValue('venue', value)}
                  options={venues.map(venue => `${venue.name} (${venue.address})`)}
                  renderInput={(params) => <TextField fullWidth {...params} {...getFieldProps('venue')} label="Venue" error={Boolean(touched.venue && errors.venue)}
                    helperText={touched.venue && errors.venue} />}
                  sx={{ width: '70%' }}
                />
              </Stack>
              <div>
                <LabelStyle>Description</LabelStyle>
                <QuillEditor
                  id="post-description"
                  value={values.description}
                  onChange={(val) => setFieldValue('description', val)}
                  error={Boolean(touched.description && errors.description)}
                />
                {touched.description && errors.description && (
                  <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                    {touched.description && errors.description}
                  </FormHelperText>
                )}
              </div>
              <LabelStyle>Event Date</LabelStyle>
              <Stack direction='row' spacing={1}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props}
                    error={Boolean(touched.start && errors.start)}
                    helperText={touched.start && errors.start} fullWidth />}
                  label="Event starts"
                  value={values.start}
                  onChange={(val) => setFieldValue('start', val)}
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props}
                    error={Boolean(touched.end && errors.end)}
                    helperText={touched.end && errors.end} fullWidth />}
                  label="Event ends"
                  value={values.end}
                  onChange={(val) => setFieldValue('end', val)}
                />
              </Stack>
              <LabelStyle>
                Announcement date
                <Typography variant='body2'>
                  When the event will be visible on the Crypticks website
                </Typography>
              </LabelStyle>
              <DateTimePicker
                renderInput={(props) => <TextField {...props}
                  error={Boolean(touched.announceDate && errors.announceDate)}
                  helperText={touched.announceDate && errors.announceDate} sx={{ width: '50%' }} />}
                label="Event starts"
                value={values.announceDate}
                onChange={(val) => setFieldValue('announceDate', val)}
              />
            </Stack>
          </Card>
          <Stack direction='row' justifyContent='space-between'>
            <Button
              color="inherit"
              component={RouterLink}
              to={PATH_CLIENT.events}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Event List
            </Button>
            <Button size="small" type='submit' startIcon={<Icon icon={plusFill} />}>
              Add tickets
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
