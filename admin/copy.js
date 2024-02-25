function copyToClipboard(e) {
    let message = e.previousElementSibling;
    if (!navigator.clipboard) {
        message.textContent = 'このブラウザは対応していません';
        return;
    }
    // navigator.clipboard.writeText(e.previousElementSibling.textContent)
    navigator.clipboard.writeText(e.parentNode.nextElementSibling.querySelectorAll('code')[0].textContent)
    .then(
        () => {
            message.textContent = 'コピーしました!';
        },
        () => {
            message.textContent = 'コピーに失敗しました';
        }
    );
    setTimeout(function() {
        message.textContent = '';
    }, 2000);
}