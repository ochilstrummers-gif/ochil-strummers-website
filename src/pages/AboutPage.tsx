import React from 'react';
import { AboutUsPage } from '../components/AboutUsPage';

export interface AboutPageProps {
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
  onOpenFreeTasterModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenContact,
  onNavigateHome,
  onOpenFreeTasterModal,
}) => {
  return (
    <AboutUsPage
      onOpenContact={onOpenContact}
      onNavigateHome={onNavigateHome}
      onOpenFreeTasterModal={onOpenFreeTasterModal}
    />
  );
};

export default AboutPage;
