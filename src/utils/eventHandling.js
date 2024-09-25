/* eslint-disable import/prefer-default-export */

export const handleEnterPress = (event, keyPresshandler) => {
  if (event.key === 'Enter') {
    keyPresshandler();
  }
};


export const windowScroll = () => {
  const scrolled = document.documentElement.scrollTop;
  if (scrolled > 150) {
      return true
  }
  else {
      return false;
  }
};

