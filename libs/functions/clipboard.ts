export function RefCodeToClipboard(ref_code: number) {
  // text area method
  let textArea = document.createElement('textarea');
  textArea.value = `https://яавто.рф/invite?ref_code=${ref_code}`;
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
