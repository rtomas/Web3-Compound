import { Card, CardContent, Typography, CardActions } from '@mui/material';
import { cropAddress } from '../utils/etherHelper';

interface AddressProps {
  account: string;
}

function Address(props: AddressProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="text.secondary">
          Address: {cropAddress(props.account)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Address;
