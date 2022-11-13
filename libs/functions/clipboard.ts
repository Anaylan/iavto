export function RefCodeToClipboard(ref_code: number) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    alert('Ссылка скопирована');
    return navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/invite?ref_code=${ref_code}`,
    );
  } else {
    // text area method
    let textArea = document.createElement('textarea');
    textArea.value = `${window.location.protocol}//${window.location.host}/invite?ref_code=${ref_code}`;
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    alert('Ссылка скопирована');
    return new Promise<void>((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}
