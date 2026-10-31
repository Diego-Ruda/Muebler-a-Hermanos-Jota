import { useEffect, useState } from 'react';

function FlashMessage({ message, variant = 'success', duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(Boolean(message));

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return undefined;
    }

    setIsVisible(true);
    const timeoutId = setTimeout(() => setIsVisible(false), duration);

    return () => clearTimeout(timeoutId);
  }, [message, duration]);

  if (!message || !isVisible) {
    return null;
  }

  return (
    <p
      className={`form-success flash-message flash-message-${variant}`}
      role="status"
    >
      {message}
    </p>
  );
}

export default FlashMessage;
