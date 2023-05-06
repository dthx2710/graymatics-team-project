import {
  Box,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled
} from '@mui/material';
import Link from 'src/components/Link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        justify-content: center;
        text-decoration: none;
        width: 100px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 100px;
        height: 60px;
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const { data: session, status } = useSession({ required: true });
  interface User {
    username: string | undefined;
    coverImg: string;
    logo: string;
    profilepic: string;
    description: string | null | undefined;
    jobtitle: string | null | undefined;
    location: string | null | undefined;
  }
  const user: User = {
    username: '',
    coverImg: '',
    profilepic: '',
    logo: '',
    description: '',
    jobtitle: '',
    location: ''
  };
  if (session && status === 'authenticated') {
    user.username = session?.user?.username!; //non null asserting
    user.coverImg = '/static/images/placeholders/covers/5.jpg';
    user.profilepic = session?.user?.profilepic;
    user.description = session?.user?.description;
    user.jobtitle = session?.user?.role;
    user.location = session?.user?.country;
    user.logo = session?.user?.logo;
  }
  const myLoader = () => {
    return user.logo;
  };
  return (
    <TooltipWrapper title="Dashboard" arrow>
      <LogoWrapper href="/general/dashboard">
        <LogoSignWrapper>
          {/* <Image
          src="/graymatics-cropped.webp"
          layout="fixed"
          width="200"
          height="50"
            /> */}
          <Image loader={myLoader} src={user.logo} width={200} height={150} />
        </LogoSignWrapper>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
