import { Typography } from '@material-ui/core';

const Title = ({
  text,
  variant,
  align,
}: {
  text: string;
  variant: 'h3' | 'h5';
  align: 'center' | 'left';
}): JSX.Element => {
  return (
    <Typography variant={variant} gutterBottom align={align} className="title">
      {text}
    </Typography>
  );
};

export default Title;
