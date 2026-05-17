export interface CoverProps {
  onOpen: () => void;
  guestName: string;
}

export interface CoverContentProps {
  formattedGuest: string;
  handleOpen: () => void;
}

export interface CoverGuestProps {
  guestName: string;
}

export interface CoverButtonProps {
  onOpen: () => void;
}