import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Header = ({ changeLanguage }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('appName')}</h1>
        <div>
          <button onClick={() => changeLanguage('en')} className="mr-2">EN</button>
          <button onClick={() => changeLanguage('ja')} className="mr-2">JA</button>
          <button onClick={() => changeLanguage('fr')} className="mr-2">FR</button>
          <button onClick={() => changeLanguage('es')}>ES</button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default Header;