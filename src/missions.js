export function createId() {
  return Math.random().toString(36).substr(2, 9);
}

export const INITIAL_MISSIONS = [
  { flowerName: "개나리", pose: "팔을 'V'자로 벌려 노란 꽃잎 표현하기", selected: true, emoji: "🌼" },
  { flowerName: "벚꽃", pose: "손가락을 톡톡 튀기며 꽃잎이 떨어지는 모습", selected: true, emoji: "🌸" },
  { flowerName: "진달래", pose: "양손 볼에 대고 예쁜 꽃받침 만들기", selected: true, emoji: "🌺" },
  { flowerName: "목련", pose: "두 손을 모아 커다란 꽃봉오리 만들기", selected: true, emoji: "💮" },
  { flowerName: "민들레", pose: "후~ 하고 씨앗을 부는 자세", selected: true, emoji: "💨" },
  { flowerName: "튤립", pose: "손바닥을 합쳐 컵 모양 만들기", selected: false, emoji: "🌷" },
  { flowerName: "수선화", pose: "고개를 살짝 숙여 우아한 자세 취하기", selected: false, emoji: "🌼" },
  { flowerName: "철쭉", pose: "옆 사람과 손잡고 커다란 꽃밭 만들기", selected: false, emoji: "🌺" },
  { flowerName: "유채꽃", pose: "까치발을 들고 키가 큰 꽃 표현하기", selected: false, emoji: "🌼" },
  { flowerName: "제비꽃", pose: "바닥에 몸을 작게 웅크려 앉기", selected: false, emoji: "🐦" },
  { flowerName: "매화", pose: "나무처럼 곧게 서서 손가락으로 작은 꽃송이 표현", selected: false, emoji: "🌸" },
  { flowerName: "할미꽃", pose: "허리를 굽히고 구부정한 자세 하기", selected: false, emoji: "👵" },
  { flowerName: "산수유", pose: "손가락을 머리 위에서 반짝반짝 흔들기", selected: false, emoji: "✨" },
  { flowerName: "라일락", pose: "코를 킁킁거리며 향기를 맡는 포즈", selected: false, emoji: "👃" },
  { flowerName: "모란", pose: "세상에서 가장 화려하고 큰 꽃처럼 팔 벌리기", selected: false, emoji: "👑" },
  { flowerName: "팬지", pose: "얼굴 옆에 손바닥을 펼쳐 나비 모양 만들기", selected: false, emoji: "🦋" },
  { flowerName: "조팝나무", pose: "작은 꽃들이 뭉쳐있는 것처럼 몸 움츠리기", selected: false, emoji: "🍚" },
  { flowerName: "동백꽃", pose: "툭 떨어지는 꽃송이처럼 바닥에 털썩 앉기", selected: false, emoji: "🌺" },
  { flowerName: "아카시아", pose: "포도송이처럼 손을 아래로 늘어뜨리기", selected: false, emoji: "🍇" },
  { flowerName: "데이지", pose: "손가락을 펼쳐 햇님 모양 만들기", selected: false, emoji: "🌼" },
].map((mission) => ({ ...mission, id: createId() }));

export const STORAGE_KEY = "bloom-missions-data";
