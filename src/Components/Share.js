import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

function Share() {
  const [message, setMessage] = useState(false);

  function copyLink() {
    const copyTest = window.location.href;
    const numberLimit = copyTest.indexOf('in-progress') - 1;
    clipboardCopy(copyTest.substring(0, numberLimit));
    setMessage(true);
  }

  return (
    <div>
      <button onClick={ copyLink } type="button" data-testid="share-btn">Share</button>
      <p>{message ? 'Link copiado!' : ''}</p>
    </div>
  );
}

export default Share;
