import { Typography } from '@material-ui/core';

const Title = ({ text }: { text: string }): JSX.Element => {
  return (
    <Typography variant="h5" gutterBottom className="title">
      {text}
    </Typography>
  );
};

export default Title;
