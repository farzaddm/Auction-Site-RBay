import { useId } from 'react';
import { Avatar } from '../ui/avatar';
import { Tooltip } from '../ui/tooltip';

function AvatarWithTooltip({ name, image }) {
  const id = useId();
  return (
    <Tooltip ids={{ trigger: id }} content={name} showArrow>
      <Avatar ids={{ root: id }} name={name} src={image} />
    </Tooltip>
  );
}

export default AvatarWithTooltip;
