import { useState } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER } from 'gestalt-design-tokens';
import avatarStyles from './AvatarFoundation.css';
import DefaultAvatar from './DefaultAvatar';
import Box from '../Box';
import IconCompact from '../IconCompact';
import Image from '../Image';
import Mask from '../Mask';
import useInExperiment from '../useInExperiment';

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
} as const;

type Props = {
  accessibilityLabel?: string;
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isHovered?: boolean;
  isPressed?: boolean;
  name: string;
  outline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  src?: string;
  verified?: boolean;
};

function InternalAvatar(props: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });
  const {
    accessibilityLabel,
    color,
    isHovered,
    isPressed,
    name,
    outline,
    size = 'fit',
    src,
    verified,
  } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const handleImageError = () => setIsImageLoaded(false);
  const width = size === 'fit' ? '100%' : sizes[size];
  const height = size === 'fit' ? '' : sizes[size];

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: outline
          ? {
              outline: isInVRExperiment
                ? '2px solid var(--sema-color-border-inverse)'
                : '1px solid rgb(255 255 255)',
            }
          : {},
      }}
      data-test-id="gestalt-avatar-svg"
      height={height}
      position="relative"
      rounding="circle"
      width={width}
    >
      {src && isImageLoaded ? (
        <Mask rounding="circle" wash>
          <div
            className={classnames({
              [avatarStyles.imageHovered]: isInVRExperiment && isHovered,
              [avatarStyles.imagePressed]: isInVRExperiment && isPressed,
            })}
          >
            <Image
              alt={accessibilityLabel ?? name}
              color={TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER}
              naturalHeight={1}
              naturalWidth={1}
              onError={handleImageError}
              src={src}
            />
          </div>
        </Mask>
      ) : (
        <DefaultAvatar
          accessibilityLabel={accessibilityLabel}
          color={color}
          isHovered={isHovered}
          isPressed={isPressed}
          name={name}
        />
      )}

      {verified && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              bottom: '4%',
              right: '4%',
            },
          }}
          height="25%"
          minHeight={12}
          minWidth={12}
          position="absolute"
          width="25%"
        >
          <Box color="default" height="100%" rounding="circle" width="100%">
            <IconCompact
              accessibilityLabel=""
              color="brandPrimary"
              icon="compact-check-circle-fill"
              size="100%"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default InternalAvatar;
