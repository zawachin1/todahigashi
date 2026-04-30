const envKey = 'lit_original_web_NDkVt3DkhkZQDL0K';
const dataTables = [
  {
    "id": 74717,
    "label": "検索機能",
    "value": [
      {
        "name": "テストの過去問ってどこに載っていますか？",
        "time": "各分野のページに載せています。3年生に関してはトップページに載ることがあります。"
      },
      {
        "name": "過去問はいつまで受け付けていますか？",
        "time": "テスト日の前々日まで受け付けています。"
      },
      {
        "name": "授業を休んでしまった時のプリント提出はどうしたらいいですか？",
        "time": "友達や技術Webサイトに載っているスライドを見て、文章を埋めてから提出してください。"
      },
      {
        "name": "技術の勉強方法を教えてください。",
        "time": "イラストや写真、技術Webサイトに載っている動画を閲覧して復習をしてください。他教科に比べると量が少ないので、授業プリントを再度ノートに書き直すのもおすすめです。"
      },
      {
        "name": "なんで技術の先生になったんですか？",
        "time": "他の質問をしてみよう！"
      }
    ]
  },
  {
    "id": 74718,
    "label": "コメント機能",
    "value": [
      {
        "likes": 0,
        "author": "あ",
        "content": "あ",
        "createdAt": "2026/4/30 12:10"
      }
    ]
  }
]

const storage = window.localStorage;

const keys = {
  "検索機能": 'breadList',
  "コメント機能": 'comments',
  "診断機能": 'checkList',
  "予約機能": 'reservations',
};

function getData(key) {
  const storageKey = `${envKey}_${keys[key]}`;
  const item = storage.getItem(storageKey);
  const parsed = item ? JSON.parse(item) : [];
  return parsed;
}

function setData(key, data) {
  const storageKey = `${envKey}_${keys[key]}`;
  storage.setItem(storageKey, JSON.stringify(data));
}

function getBreadList() {
  return getData('検索機能');
}

function getComments() {
  return getData('コメント機能');
}

function postComment(comment) {
  const comments = getComments();
  comments.push({ ...comment, id: Date.now() });
  setData('コメント機能', comments);
}

function patchComment(index, value) {
  const comments = getComments();
  if (comments[index]) {
    comments[index] = { ...comments[index], ...value };
    setData('コメント機能', comments);
  } else {
    console.warn(`指定された index（${index}）に該当するコメントが見つかりません`);
  }
}

function getCheckList() {
  return getData('診断機能');
}

function getReservations() {
  return getData('予約機能');
}

function postReservation(reservation) {
  const reservations = getReservations();
  reservations.push({ ...reservation, id: Date.now() });
  setData('予約機能', reservations);
}

function patchReservation(index, value) {
  const reservations = getReservations();
  if (reservations[index]) {
    reservations[index] = { ...reservations[index], ...value };
    setData('予約機能', reservations);
  } else {
    console.warn(`指定された index（${index}）に該当する予約が見つかりません`);
  }
}

function hasInitializedData() {
  return Object.values(keys).some(key => storage.getItem(`${envKey}_${key}`) !== null);
}

function initialize() {
  try {
    // 既存データがある場合は初期化をスキップ
    if (hasInitializedData()) {
      console.log('既存のデータが存在するため、初期化をスキップします');
      return;
    }

    Object.entries(keys).forEach(([label, storageKey]) => {
      const tableData = dataTables.find(table => table.label === label);
      if (tableData) {
        setData(label, tableData.value);
      }
    });
  } catch (error) {
    console.error('データの初期化中にエラーが発生しました:', error);
  }
}

initialize();
