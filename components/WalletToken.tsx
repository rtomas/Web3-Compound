import { Button, Card, CardContent, Typography, CardActions } from '@mui/material';
import { formatResultCripto, cropAddress } from '../utils/etherHelper';

interface WalletTokenProps {
  Token: string;
  value: string;
}

function WalletToken(props: WalletTokenProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" component="div">
          {formatResultCripto(props.value)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.Token}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WalletToken;
