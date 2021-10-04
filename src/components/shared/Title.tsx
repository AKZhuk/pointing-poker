import { Typography } from '@material-ui/core';

const Title = ({
  text,
  variant,
  align,
}: {
  text: string | undefined;
  variant: 'h3' | 'h4' | 'h5' | 'caption';
  align: 'center' | 'left';
}): JSX.Element => {
  return (
    <Typography variant={variant} gutterBottom align={align} className="title" data-testid="Title-test">
      {text}
    </Typography>
  );
};

export default Title;
