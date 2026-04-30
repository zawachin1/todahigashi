    <script>
function showText(str) {
  document.getElementById("showText").innerText = str
}
// 検索ボタンをクリックしたときに動く関数
async function searchButton() {
  // 変数breadNameに入力された文字を入れる
  let breadName = document.getElementById("inputText").value;
  
  // データベースのデータを取得
  let breadList = await getBreadList();
  
  // くり返す
  for (let i = 0; i < 10; i = i + 1) {
    // もし、入力した内容がリストのパンの名前と同じだったら
    if (breadName == breadList[i]["name"]) {
      // リストのi行 × time列にある時間を表示する
      showText(breadList[i]["time"]);
      // 時間を表示したらくり返しを止める
      break;
    }
    // それ以外の場合
    else {
      // 文字を表示する
      showText("入力した文字を確認してね");
    }
  }
}
</script>