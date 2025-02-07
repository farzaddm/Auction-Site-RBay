import { useId } from 'react';
import { Avatar } from '../ui/avatar';
import { Tooltip } from '../ui/tooltip';

function AvatarWithTooltip({ name, image, mini=false }) {
  const id = useId();
  return (
    <Tooltip ids={{ trigger: id }} content={name} showArrow>
      <Avatar
        shadow="sm"
        colorPalette="teal"
        ids={{ root: id }}
        name={name}
        size={mini ? 'xs' : 'lg'}
        src={image}
      />
    </Tooltip>
  );
}

export default AvatarWithTooltip;
