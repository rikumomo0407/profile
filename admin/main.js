window.addEventListener("load", ()=>{

  function main() {
    // 選択結果取得
    const selectElement = document.getElementById('add-selection');
    const index = selectElement.selectedIndex;
    const name = selectElement.options[index].text;

    // 最初のオプション(キャンセル)が選択された場合は何もしない
    if (index == 0) {
      return;
    }

    //プレビュー取得
    const article = document.querySelector("article");
    
    // [ボックス作成]
    // 生成場所
    const contents = document.getElementById('contents');
    // 何番目のボックスか
    const contentsIndex = contents.querySelectorAll('.contents-box').length + 1;
    // ボックス
    const contentsBox = document.createElement('div');
    contentsBox.classList.add('contents-box');
    // ボックスのヘッダー
    const contentHeader = document.createElement('div');
    contentHeader.classList.add('contents-header');
    const contentTitle = document.createElement('p');
    contentTitle.textContent = contentsIndex + '.' + name;
    // 移動・削除ボタン
    const buttonPair = document.createElement('div');
    const moveButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    moveButton.textContent = '移動';
    deleteButton.textContent = '削除';
    moveButton.id = `button${contentsIndex}`;
    moveButton.classList.add('move-button');
    deleteButton.classList.add('delete-button');
    // ヘッダーに要素を追加
    buttonPair.appendChild(moveButton);
    buttonPair.appendChild(deleteButton);
    contentHeader.appendChild(contentTitle);
    contentHeader.appendChild(buttonPair);
    contentsBox.appendChild(contentHeader);
    // 各ボックス別の要素追加とプレビューの作成
    let preview;
    if (index == 1) {
      contentsBox.insertAdjacentHTML('beforeend', '<textarea></textarea>');
      preview = document.createElement('p');
    } else if (index == 2) {
      contentsBox.insertAdjacentHTML('beforeend', '<input type=\"file\"><div class=\"title-and-some\"><p>画像の説明</p><div class=\"question\"><div class=\"question-mark\">?</div><div class=\"question-box\">説明を記述することで、画像補完や音声読み上げがなどが機能するようになりユーザビリティの向上に役立ちます。<br>またSEO対策になり閲覧数が増える可能性もあるため、なるべく記述するようにしましょう。<br>例:「犬が走っている」、「山頂から見る朝日」など</div></div></div><input type=\"text\">')
      preview = document.createElement('img');
      preview.src = 'images/elements/noimage.png';
    } else if (index == 3) {
      contentsBox.insertAdjacentHTML('beforeend', '<input type=\"text\">');
      preview = document.createElement('h2');
    } else if (index == 4) {
      contentsBox.insertAdjacentHTML('beforeend', '<input type=\"text\"><div class=\"title-and-some\"><p>リンクの詳細</p><button type=\"button\" class=\"reload\">自動設定</button></div><p>ページのタイトル</p><input type=\"text\"><p>ページの説明</p><textarea></textarea><p>サムネイル画像</p><input type="file">');
      preview = document.createElement('a');
      preview.className = 'link';
      preview.rel = 'noopener noreferrer nofollow';
      preview.target = '_blank'
      preview.insertAdjacentHTML('beforeend', '<div><strong>タイトルがありません</strong><em>説明がありません</em><em>ページのURL</em></div><div><img src=\"images/elements/noimage.png\"></div>')
    } else if (index == 6) {
      contentsBox.insertAdjacentHTML('beforeend', '<textarea></textarea><p>言語・ファイル名</p><input type=\"text\">');
      preview = document.createElement('div');
      preview.className = 'code';
      preview.insertAdjacentHTML('beforeend', '<div class=\"code-header\"><span class=\"file-name\">code</span><span class=\"copy-message\"></span><button class=\"copy\" onclick=\"copyToClipboard(this)\"><img src=\"images/png/clipboard_3d.png\"></button></div><pre><code class=\"prettyprint\"></code></pre>');
    }
    // ボックス生成
    contents.appendChild(contentsBox);
    // プレビュー生成
    article.appendChild(preview);

    // [動作]
    // input動作
    contentsBox.addEventListener('input', async (e) => {
      let value = e.target.value;
      let pos = Array.from(contentsBox.querySelectorAll('input, textarea')).indexOf(e.target);
      if (index == 1 || index == 3) {
        preview.textContent = value;
      } else if (index == 2) {
        if (pos == 0) {
          try {
            const imageSrc = await loadImage(e.target.files[0]);
            preview.src = imageSrc;
          } catch (error) {
              console.error('画像の読み込み中にエラーが発生しました:', error);
          }
        } else if (pos == 1) {
          preview.alt = value;
        }
      }
      if (index == 4) {
        if (pos == 0) {
          let url = new URL(value);
          if (url.hostname != '') {
            preview.querySelectorAll('em')[1].textContent = url.hostname;
          } else {
            preview.querySelectorAll('em')[1].textContent = 'ページのURL';
          }
        } else if (pos == 1) {
          preview.querySelectorAll('strong')[0].textContent = value;
        } else if (pos == 2) {
          preview.querySelectorAll('em')[0].textContent = value;
        } else if (pos == 3) {
          try {
            const imageSrc = await loadImage(e.target.files[0]);
            preview.querySelectorAll('img')[0].src = imageSrc;
          } catch (error) {
              console.error('画像の読み込み中にエラーが発生しました:', error);
          }
        }
      } else if (index == 6) {
        if (pos == 0) {
          // let code = value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
          preview.querySelectorAll('code')[0].textContent = value;
          prettyPrint();
        } else if (pos == 1) {
          preview.querySelectorAll('.file-name')[0].textContent = value;
        }
      }
    });

    // click動作
    contentsBox.addEventListener('click', (e) => {
      let type = e.target.className;
      let value = e.target.value;
      if (type == 'reload'){
        // ボタン無効化
        e.target.disabled = true;
        // 状態表示
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.remove();
          e.target.nextElementSibling.remove();
        }
        let state = document.createElement('span');
        state.textContent = '情報を取得しています';
        let loader = document.createElement('div');
        loader.className = 'loader';
        e.target.after(state);
        e.target.after(loader);
        // プロキシサーバーのURL
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        // 入力されたURLに対するリクエストをプロキシサーバーを経由して送信
        fetch(proxyUrl + preview.href)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.text();
          })
          .then(html => {
            // htmlの取得
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            // データの取得
            var title = doc.querySelector('title');
            var description = doc.querySelector('meta[name="description"]');
            var ogImage = doc.querySelector('meta[property="og:image"]');
            var twitterImage = doc.querySelector('meta[name="twitter:image"]');
            // 結果の反映
            if (title) {
              preview.querySelectorAll('strong')[0].textContent = title.innerText;
              contentsBox.querySelectorAll('input')[1].value = title.innerText;
            } else {
              preview.querySelectorAll('strong')[0].textContent = 'タイトルがありません';
            }
            if (description) {
              preview.querySelectorAll('em')[0].textContent = description.getAttribute('content');
              contentsBox.querySelectorAll('textarea')[0].value = description.getAttribute('content');
            } else {
              preview.querySelectorAll('em')[0].textContent = '説明がありません';
            }
            if (ogImage) {
              preview.querySelectorAll('img')[0].src = ogImage.getAttribute('content');
            } else if (twitterImage) {
              preview.querySelectorAll('img')[0].src = twitterImage.getAttribute('content');
            } else {
              preview.querySelectorAll('img')[0].src = 'images/elements/noimage.png';
            }
            //状態非表示
            loader.remove();
            state.remove();
            // ボタン有効化
            e.target.disabled = false;
          })
          .catch(error => {
            console.error('Error:', error);
            // 状態非表示
            state.textContent = '取得に失敗しました';
            loader.className = 'cross';
            // 値の初期化
            preview.querySelectorAll('strong')[0].textContent = 'タイトルがありません';
            preview.querySelectorAll('em')[0].textContent = '説明がありません';
            preview.querySelectorAll('em')[1].textContent = 'ページのURL';
            preview.querySelectorAll('img')[0].src = 'images/elements/noimage.png';
            // ボタン有効化
            e.target.disabled = false;
          });
      }
    });

    // ボックス移動ボタン
    moveButton.addEventListener('click', function(e) {
      console.log('Button clicked:', e.target.id);
    });
    // ボックス削除ボタン
    deleteButton.addEventListener('click', function() {
      contentsBox.remove();
      preview.remove();
      updateIndex();
    });

    // 選択解除
    selectElement.selectedIndex = 0;
  }

  // [関数]
  // 画像をを読み込む関数
  function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            reject(new Error('ファイルがありません'));
        }
    });
  }
  
  // 順番を更新する関数
  function updateIndex() {
    const contentsNum = document.querySelectorAll('.contents-box');
    contentsNum.forEach((pair, index) => {
      const titleNum = pair.querySelector('p');
      if (titleNum) {
        titleNum.textContent = (index + 1) + '.' + titleNum.textContent.split('.')[1];
      }
    });
  };

  // 選択肢入力
  const selectElement = document.getElementById('add-selection');
  selectElement.addEventListener('change', main);

});