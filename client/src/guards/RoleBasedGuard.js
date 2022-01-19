import { useSelector } from 'react-redux';
import { Container, Alert, AlertTitle } from '@mui/material';

// ----------------------------------------------------------------------

// RoleBasedGuard.propTypes = {
//   accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
//   children: PropTypes.node
// };

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'admin';
  return role;
};

export default function RoleBasedGuard({ accessRole, children }) {
  const role = useSelector(state => state.auth.user?.role);
  console.log(role, accessRole);
  if (accessRole !== role) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
