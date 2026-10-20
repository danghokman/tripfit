/* TripFit 다국어(한국어 · English)
 * - 언어는 localStorage 'tripfit-lang' ('ko' | 'en') 에 저장, 모든 화면에 공통 적용
 * - 화면 글자 · placeholder · aria-label · alt 를 사전으로 바꾸고, 나중에 그려지는 내용도 자동 번역
 * - 번역 순서: ① 문장 전체 일치 → ② 숫자 패턴(시간 · 날짜 · 개수) → ③ 긴 단어부터 부분 치환
 */
(function () {
  const KEY = 'tripfit-lang';
  let lang = 'ko';
  try { lang = localStorage.getItem(KEY) === 'en' ? 'en' : 'ko'; } catch (e) { /* 기본 한국어 */ }
  window.TF_LANG = lang;

  // ───── ① 사전: 한국어 → English ─────
  const D = {
    // 문화 해설 (지도)
    '조선을 세운 태조 이성계의 어진(초상화)을 모시기 위해 1410년(태종 10년)에 지은 곳이에요. 지금 건물은 임진왜란 뒤인 1614년에 다시 지었고, 이곳에 모신 태조 어진은 국보로 지정돼 있어요. 전주가 조선 왕실의 뿌리인 고장임을 보여 주는 대표 문화유산이에요.': 'Built in 1410 (the 10th year of King Taejong) to enshrine the royal portrait of King Taejo, Yi Seong-gye, founder of the Joseon Dynasty. The current building was rebuilt in 1614 after the Imjin War, and the portrait kept here is a designated National Treasure. It shows that Jeonju is the ancestral home of the Joseon royal family.',
    '고려 말 이성계가 황산대첩에서 왜구를 물리치고 돌아가던 길에 승전 잔치를 열었다고 전해지는 언덕이에요. 고종이 직접 글씨를 쓴 비석이 남아 있고, 한옥마을 지붕이 한눈에 내려다보여요.': 'A hill where Yi Seong-gye is said to have held a victory feast in the late Goryeo period, after defeating Japanese raiders at the Battle of Hwangsan. A stone monument with calligraphy by Emperor Gojong remains, and the hanok rooftops spread out below.',
    '1908년 짓기 시작해 1914년에 완공된 로마네스크 양식의 성당이에요. 조선 시대 천주교 신자들이 순교한 자리 가까이에 세워져, 호남 지역 천주교 역사를 상징하는 건축물로 꼽혀요.': 'A Romanesque cathedral begun in 1908 and completed in 1914. Built near the site where Catholic believers were martyred in the Joseon era, it is a symbol of Catholic history in the Honam region.',
    '조선 시대 나라에서 세운 지방 교육기관이에요. 성현에게 제사를 지내던 대성전과 유생들이 공부하던 명륜당이 남아 있고, 마당을 지키는 오래된 은행나무가 가을마다 장관을 이뤄요.': 'A state-run regional school of the Joseon era. Daeseongjeon, where rites for sages were held, and Myeongnyundang, where Confucian scholars studied, still stand, and the old ginkgo trees in the courtyard are spectacular every autumn.',
    '한국전쟁 뒤 피란민들이 산비탈에 모여 살며 생긴 마을이에요. 골목마다 벽화가 그려지면서 새롭게 알려졌고, 지금도 주민이 사는 곳이라 조용히 둘러보는 배려가 필요해요.': 'A village formed by refugees who settled on the hillside after the Korean War. It became known for the murals in its alleys. Residents still live here, so please look around quietly.',
    '대하소설 『혼불』을 쓴 작가 최명희를 기리는 길이에요. 근처 최명희문학관에서 작가의 원고와 유품을 만날 수 있어, 한옥마을을 문학 여행지로도 즐길 수 있어요.': 'A street honoring Choi Myeong-hee, author of the epic novel "Honbul". At the nearby Choi Myeong-hee Literary Museum you can see her manuscripts and belongings, making the village a literary destination too.',
    '전주천을 건너는 남천교 위에 세운 한옥 누각이에요. 전주천 물길과 한옥마을 지붕선이 함께 보이는 쉼터로, 해 질 무렵 풍경이 특히 아름다워요.': 'A hanok pavilion built on Namcheongyo Bridge over the Jeonjucheon Stream. A resting spot with views of the stream and hanok rooftops, especially beautiful at sunset.',
    // 한복 배우기
    '상체에 입는 짧은 윗옷이에요. 시대에 따라 길이와 품이 달라졌고, 지금의 짧은 저고리는 조선 후기에 자리 잡은 모양이에요.': 'A short upper garment. Its length and fit changed over time; today\'s short jeogori took shape in the late Joseon period.',
    '음양오행에서 나온 다섯 가지 기본 색이에요. 다섯 방위와 계절을 뜻하며, 색동저고리나 노리개처럼 한복 곳곳에 담겨 있어요.': 'The five basic colors from the theory of yin-yang and the five elements. They represent the five directions and seasons, and appear throughout hanbok, such as in striped sleeves and norigae.',
    '남자 한복의 윗옷이에요. 여자 저고리보다 길고 품이 넉넉해 활동하기 편해요. 사진에서는 흰 소매 부분이 저고리예요.': 'The upper garment of men\'s hanbok. Longer and roomier than women\'s jeogori, it is comfortable to move in. In the photo, the white sleeves are the jeogori.',
    '저고리 앞을 여며 매는 끈이에요. 긴 고름과 짧은 고름을 묶으며, 길게 늘어진 고름이 단아한 멋을 더해요.': 'The ribbon that ties the front of the jeogori. A long and a short ribbon are tied together, and the long trailing end adds graceful elegance.',
    '저고리 위에 덧입는 소매 없는 옷이에요. 길이와 모양에 따라 조끼 · 배자 · 전복 등으로 불러요.': 'A sleeveless garment worn over the jeogori. Depending on length and shape it is called jokki, baeja or jeonbok.',
    '학습용 요약 콘텐츠예요. 지역·가문·시대에 따라 한복을 입는 방식과 명칭은 조금씩 다를 수 있어요.': 'This is a learning summary. How hanbok is worn and named can vary by region, family and era.',
    '가슴 위에서부터 발목까지 감싸는 아래옷이에요. 넓은 치마폭을 둘러 입어 걸을 때 풍성하게 퍼져요.': 'A skirt that wraps from above the chest down to the ankles. Its wide panels flow beautifully as you walk.',
    '소매 아랫선의 완만한 곡선을 배래라고 해요. 한복 특유의 부드러운 선을 만들어 주는 부분이에요.': 'The gentle curve along the bottom of the sleeve is called baerae. It creates hanbok\'s signature soft lines.',
    '깃 위에 덧대는 흰 헝겊이에요. 얼굴을 환하게 보이게 하고, 깃이 더러워지는 것을 막아 줘요.': 'A white strip attached over the collar. It brightens the face and keeps the collar clean.',
    '목둘레를 감싸 앞으로 여미는 띠 모양 부분이에요. 깃의 곡선이 한복 윗옷의 인상을 좌우해요.': 'The band that wraps around the neck and closes at the front. Its curve defines the look of the jacket.',
    '깃 위에 덧대는 흰 헝겊이에요. 남자 한복에서도 얼굴선을 깔끔하게 정리해 줘요.': 'A white strip over the collar. In men\'s hanbok, too, it neatly frames the face.',
    '바지 발목을 감아 묶는 끈이에요. 바짓단을 정리해 걷기 편하게 하고 맵시를 살려 줘요.': 'Bands tied around the trouser ankles. They tidy the hems, make walking easier and add style.',
    '통이 넓은 아래옷이에요. 넉넉한 품 덕분에 좌식 생활과 움직임이 편해요.': 'Wide trousers. Their roomy fit makes sitting on the floor and moving comfortable.',
    '옷 앞을 여며 매는 끈이에요. 남자 한복 고름은 비교적 단정하게 매요.': 'The ribbon that ties the front. In men\'s hanbok it is tied fairly simply.',
    '긴 고름으로 고리를 만들어 짧은 고름과 묶고, 긴 쪽이 아래로 길게 늘어지게 정리해요.': 'Make a loop with the long ribbon, tie it with the short one, and let the long end hang down neatly.',
    '치마의 트인 쪽이 뒤로 가게 두르고, 끈은 흘러내리지 않게 단단히 매요.': 'Wrap it so the opening is at the back, and tie the straps firmly so it won\'t slip.',
    '치마 길이는 발등을 살짝 덮게, 저고리 앞선이 비뚤지 않게 다듬어요.': 'Let the skirt just cover the top of your feet, and straighten the front of the jeogori.',
    '치마가 풍성하고 단정하게 퍼지도록 모양을 잡아 줘요.': 'It shapes the skirt so it flares full and neat.',
    '동정이 목에 들뜨지 않고 가지런히 닿는지 확인해요.': 'Check that the dongjeong lies flat against your neck.',
    '동정은 깃 위에 덧대는 흰 헝겊으로, 깃이 더러워지는 것도 막아 줘요.': 'The dongjeong is a white strip over the collar that also keeps it clean.',
    '고름은 저고리를 여미는 끈이에요. 대님은 바지 발목을 묶는 끈이에요.': 'Goreum ties the jeogori. Daenim ties the trouser ankles.',
    '황색은 중앙을 뜻해 예부터 귀하게 여긴 색이에요.': 'Yellow stands for the center and has long been a precious color.',
    '대님은 바짓단을 정리해 걷기 편하게 해 줘요.': 'Daenim tidies the trouser hems so walking is easier.',
    '문화유산은 모두의 것이에요. 관람 규칙을 지켜 함께 지켜 가요.': 'Heritage belongs to everyone. Follow the rules and protect it together.',
    '깨끗함과 순수함을 뜻해요. 흰옷을 즐겨 입은 우리 민족과도 닮았어요.': 'It means cleanliness and purity, like the white clothes Koreans have long loved.',
    '생명력과 정열을 뜻하며, 나쁜 기운을 막는 색으로도 쓰였어요.': 'It means vitality and passion, and was used to ward off bad energy.',
    '지혜와 깊이를 뜻하며, 만물이 쉬어 가는 기운을 담고 있어요.': 'It means wisdom and depth, the energy of all things at rest.',
    '세상의 중심을 뜻해, 예부터 귀하게 여긴 색이에요.': 'It means the center of the world and has long been precious.',
    '만물이 생겨나는 기운, 희망과 젊음을 뜻해요.': 'The energy of new life, meaning hope and youth.',
    '깃 위에 덧대어 얼굴을 환하게 보이게 하는 흰 헝겊의 이름은?': 'What is the white strip over the collar that brightens the face?',
    '저고리 앞을 여며 묶는 끈을 무엇이라고 할까요?': 'What is the ribbon that ties the front of the jeogori called?',
    '오방색 중 "세상의 중심(중앙)"을 뜻하는 색은?': 'Which of the five colors means "the center of the world"?',
    '남자 한복에서 바지 발목을 감아 묶는 끈은?': 'In men\'s hanbok, what ties the trouser ankles?',
    '한복을 입고 고궁을 관람할 때 바른 행동은?': 'What is the right thing to do when visiting a palace in hanbok?',
    '담장에 올라가 사진 찍기': 'Climb the walls for photos', '출입 금지 구역 들어가기': 'Enter restricted areas', '건물에 기대 쉬기': 'Lean on buildings to rest',
    '관람 규칙을 지키며 문화유산 아끼기': 'Follow the rules and care for heritage',
    '5문제를 모두 맞혔어요. 배지가 내 정보에 저장됐어요.': 'You got all 5 right. The badge is saved to My Page.',
    '5문제를 모두 맞히면 수료 배지를 받을 수 있어요.': 'Answer all 5 correctly to earn the badge.',
    '위 내용을 한 번 더 읽어 볼까요?': 'Want to read the lessons above again?',
    "'한복 문화 지킴이' 수료!": 'You\'re a "Hanbok Culture Keeper"!',
    '부위별 이름부터 입는 순서, 오방색의 의미까지.': 'From part names to how to dress and the meaning of the five colors.',
    '5분이면 한복이 훨씬 더 특별해져요.': 'Five minutes makes hanbok much more special.',
    '한복, 제대로 알고': 'Get to know hanbok', '입어 볼까요?': 'before you wear it',
    '사진 위 번호를 눌러 부위 이름을 알아보세요': 'Tap the numbers on the photo to learn each part',
    '분홍 치마와 미색 저고리를 입은 여자 한복': 'Women\'s hanbok with a pink skirt and ivory jeogori',
    '회색 조끼와 바지를 입은 남자 한복': 'Men\'s hanbok with a gray vest and trousers',
    '1. 한복의 구성': '1. Parts of Hanbok', '2. 여자 한복 입는 순서': '2. How to Wear Women\'s Hanbok', '3. 오방색(五方色)': '3. Obangsaek (Five Colors)',
    '4. 한복 입고 고궁 관람 예절': '4. Palace Etiquette in Hanbok', '5. 한복 퀴즈': '5. Hanbok Quiz',
    '속치마(또는 속바지)를 입어요': 'Put on the underskirt (or underpants)', '치마를 가슴 위쪽에 두르고 끈을 묶어요': 'Wrap the skirt above the chest and tie it',
    '저고리를 입고 깃을 바르게 여며요': 'Put on the jeogori and close the collar neatly', '고름을 매요': 'Tie the goreum', '매무새를 마무리해요': 'Finish your look',
    '문화유산을 아껴요': 'Care for heritage', '촬영 규정을 확인해요': 'Check photo rules', '다른 관람객을 배려해요': 'Be considerate of others', '쓰레기는 되가져가요': 'Take your trash with you',
    '· 건물·담장에 기대거나 오르지 말고, 출입 금지 구역은 지켜요.': '· Don\'t lean on or climb buildings and walls, and respect restricted areas.',
    '· 상업 촬영이나 일부 장비는 사전 허가가 필요할 수 있어요.': '· Commercial shoots or some equipment may need prior permission.',
    '· 좁은 길이나 문 앞에서 오래 머무르지 않아요.': '· Don\'t linger in narrow paths or doorways.',
    '· 깨끗한 고궁이 모두의 추억을 지켜요.': '· A clean palace keeps memories beautiful for all.',
    '저고리': 'Jeogori', '동정': 'Dongjeong', '깃': 'Collar (git)', '고름': 'Goreum', '소매(배래)': 'Sleeve (baerae)', '치마': 'Chima (skirt)',
    '조끼(덧옷)': 'Vest (overgarment)', '바지': 'Baji (trousers)', '대님': 'Daenim (ankle ties)', '끝동': 'Kkeutdong',
    '청(靑)': 'Blue', '적(赤)': 'Red', '황(黃)': 'Yellow', '백(白)': 'White', '흑(黑)': 'Black',
    '청색': 'Blue', '적색': 'Red', '황색': 'Yellow', '흑색': 'Black',
    '동쪽': 'East', '서쪽': 'West', '남쪽': 'South', '북쪽': 'North', '중앙': 'Center', '봄': 'Spring', '여름': 'Summer', '가을': 'Autumn', '겨울': 'Winter',
    '방위 ·': 'Direction ·', '계절 ·': 'Season ·',
    '구성': 'Parts', '입는 순서': 'How to wear', '오방색': 'Five colors', '퀴즈': 'Quiz', '목차': 'Contents',
    '약 5분': '~5 min', '퀴즈 5문제': '5 questions', '수료 배지': 'Badge', '✓ 수료 완료': '✓ Completed',
    '한복 배우기': 'Learn Hanbok', '정답이에요!': 'Correct!', '아쉬워요': 'Not quite', '다음 문제': 'Next', '결과 보기': 'See results',
    '다시 풀기': 'Try again', '다시 도전하기': 'Try again', '배지 보러 가기': 'View badge', '한복 문화 지킴이': 'Hanbok Culture Keeper',
    '여자': 'Women', '남자': 'Men', '전체': 'All', '수료 배지 받기': 'Earn the badge',
    '한복이 처음이라면? 5분 한복 배우기': 'New to hanbok? Learn it in 5 minutes',
    '부위별 이름 · 입는 순서 · 오방색 · 퀴즈 수료 배지': 'Part names · How to wear · Five colors · Quiz badge',
    '부위별 이름 · 입는 순서 · 오방색 · 퀴즈': 'Part names · How to wear · Five colors · Quiz',
    '입기 전 5분, 한복 배우기': '5 minutes before you wear it: Learn Hanbok',
    // 공공 혜택
    '한복 입으면 이런 혜택이 있어요': 'Perks of wearing hanbok', '공공 혜택': 'Public benefit',
    '고궁 · 종묘 · 조선왕릉 무료 관람': 'Free entry to palaces, Jongmyo & royal tombs',
    '한복을 입으면 경복궁 · 창덕궁 · 창경궁 · 덕수궁과 종묘, 조선왕릉을 무료로 관람할 수 있어요.': 'In hanbok, you can visit Gyeongbokgung, Changdeokgung, Changgyeonggung, Deoksugung, Jongmyo Shrine and the Joseon royal tombs for free.',
    '전주 경기전 무료 입장': 'Free entry to Gyeonggijeon, Jeonju',
    '전주 한옥마을의 경기전도 한복을 입고 방문하면 무료로 입장할 수 있어요.': 'Gyeonggijeon in Jeonju Hanok Village is also free when you visit in hanbok.',
    '한복문화주간': 'Hanbok Culture Week',
    '문화체육관광부가 매년 가을 여는 한복 문화 행사 기간이에요. 전국에서 한복 체험 · 공연 · 할인 행사가 열려요.': 'An annual autumn hanbok festival by the Ministry of Culture, Sports and Tourism, with hanbok experiences, performances and discounts nationwide.',
    '무료 관람으로 인정하는 한복 기준과 운영 정책은 바뀔 수 있어요. 방문 전 각 기관의 공식 안내를 확인해 주세요.': 'Eligibility rules for free entry may change. Please check each site\'s official notice before visiting.',
    // 홈
    '고궁, 한옥마을, 추천 한복 스타일 검색': 'Search palaces, hanok villages, hanbok styles',
    '3초 만에 찾는': 'Find your perfect hanbok', '나의 인생 한복': 'in just 3 seconds',
    'AI 체형 정밀 분석 & 퍼스널 컬러 진단으로 나에게 가장 어울리는 실루엣과 오방색 조합을 확인하세요.': 'AI body analysis and personal color diagnosis reveal the silhouette and color combination that suit you best.',
    '# 3D 페이스 스캔': '# 3D face scan', '# 체형 골격 진단': '# Body frame analysis', '# 퍼스널컬러 매칭 99.8%': '# Personal color match 99.8%',
    'AI 진단 시작하기': 'Start AI diagnosis', 'AI 가상 피팅': 'AI fitting', '스냅 작가 예약': 'Book a photographer', '고궁 무료관람': 'Free palace entry',
    'PERSONALIZED COLLECTION': 'PERSONALIZED COLLECTION', '오늘의 추천 한복 스타일': 'Today\'s Picks', '더보기': 'More',
    '쿨뮤트 추천': 'Cool mute pick', '웜톤 인기': 'Warm tone favorite', '전통 캐주얼': 'Casual traditional',
    '궁중 예복 컬렉션': 'Royal Court Collection', '클래식 전통 라인': 'Classic Traditional', '모던 개량 한복': 'Modern Hanbok',
    '청자 옥빛 은박 당의': 'Celadon Jade Silver-Foil Dangui', '연보라 명주 비단 한복': 'Lavender Silk Hanbok', '달빛 흑단 모던 철릭': 'Moonlight Ebony Modern Cheollik',
    '피팅 예약': 'Book fitting', '실시간 인기 한복 투어 코스': 'Trending Hanbok Tour Courses', '실시간 트렌드': 'Live trends',
    '경복궁 향원정 & 경회루 골든아워 코스': 'Gyeongbokgung Hyangwonjeong & Gyeonghoeru Golden Hour',
    '한복 대여점 도보 3분 · 고궁 프리패스 자동 연동': '3 min walk from rental shop · Palace pass linked',
    '포토존 5곳': '5 photo spots', '노을 스냅 특화': 'Sunset shots', '전주 한옥마을 경기전 대나무숲 스냅 투어': 'Jeonju Gyeonggijeon Bamboo Grove Photo Tour',
    '전통 처마 그늘길 · 인스타 감성 청년몰 카페 연계': 'Shaded eave lanes · Trendy youth-mall cafés',
    '인생샷 99+': 'Best shots 99+', '숲길 힐링 코스': 'Healing forest walk',
    'K-POP 성지 한복 투어': 'K-POP Hanbok Pilgrimage', '아이돌 화보 골목 · K-POP 화보 촬영 한옥 · 포즈 가이드 제공': 'Idol photo alley · K-POP shoot hanok · Pose guide',
    'K-POP 성지': 'K-POP Pilgrimage', '팬 인증샷 3,410+': '3,410+ fan photos', '전주 왕실 역사 코스': 'Jeonju Royal History Course',
    '경기전 대나무숲 · 전주향교 · 오목대 전망 티타임': 'Gyeonggijeon bamboo · Hyanggyo · Omokdae tea with a view',
    '추천 1위 루트': '#1 Recommended', '역사 스냅 특화': 'History shots', '한옥마을 핵심 최단 코스': 'Hanok Village Express Course',
    '최명희길 한옥골목 · 오목대 쉼터 · 짧게 핵심만': 'Choi Myeong-hee hanok lane · Omokdae rest · Just the highlights',
    '가볍게 2시간': 'Easy 2 hours', '초보 여행자 추천': 'Great for first-timers',
    'HANBOK CULTURE CLASS': 'HANBOK CULTURE CLASS', 'LIVE RECOMMENDATION': 'LIVE RECOMMENDATION',
    '경복궁 · 종로': 'Gyeongbokgung · Jongno', '북촌 / 서촌': 'Bukchon / Seochon', '전주 한옥마을': 'Jeonju Hanok Village', '경주 황리단길': 'Gyeongju Hwangnidan-gil',
    // 헤더 · 공통
    '경복궁 · 서울': 'Gyeongbokgung · Seoul', '한옥마을 · 전주': 'Hanok Village · Jeonju', '지역 선택': 'Select region',
    '서울': 'Seoul', '전주': 'Jeonju', '경주': 'Gyeongju', '안동': 'Andong',
    '경복궁 · 북촌 한옥마을': 'Gyeongbokgung · Bukchon Hanok Village', '한옥마을 · 경기전': 'Hanok Village · Gyeonggijeon',
    '황리단길 · 대릉원': 'Hwangnidan-gil · Daereungwon', '하회마을 · 월영교': 'Hahoe Village · Woryeonggyo',
    '지역 코스는 곧 열려요': 'region courses are coming soon',
    '알림': 'Notifications', '알림 (새 알림 있음)': 'Notifications (new)', '내 정보': 'My Page',
    '새 알림': 'New', '모두 읽음': 'All read',
    '예약이 확정됐어요': 'Your booking is confirmed', '청자 옥빛 은박 당의 · 10월 18일 오전 10:00 픽업': 'Celadon Jade Dangui · Pickup Oct 18, 10:00 AM',
    'AI 체형 분석 완료': 'AI body analysis done', '나에게 맞는 실루엣 추천이 업데이트됐어요': 'Your silhouette picks have been updated',
    '쿠폰이 도착했어요': 'You got a coupon', '경복궁 별빛야행 한복 대여 20% 할인 쿠폰': '20% off hanbok rental for Gyeongbokgung Starlight Tour',
    '5분 전': '5 min ago', '1시간 전': '1 hour ago', '어제': 'Yesterday',
    '홈': 'Home', 'AI 분석': 'AI Analysis', '지도': 'Map', '상품': 'Shop',
    '위시리스트 저장': 'Save to wishlist', '위시리스트에서 빼기': 'Remove from wishlist', '위시리스트에 담았어요 · 찜': 'Added to wishlist · Saved',
    '위시리스트에서 뺐어요': 'Removed from wishlist', '북마크 저장': 'Save course', '북마크 해제': 'Unsave course',
    "' 코스를 저장했어요": "' course saved", '저장을 취소했어요': 'Removed from saved', '뒤로 가기': 'Back', '닫기': 'Close', '취소': 'Cancel',
    // 검색
    '한복, 코스, 장소, 기능 검색': 'Search hanbok, courses, places, features', '검색어 지우기': 'Clear', '최근 검색어': 'Recent', '전체 삭제': 'Clear all',
    '인기 검색어': 'Popular searches', '한복 · 상품': 'Hanbok & Shop', '코스 · 장소': 'Courses & Places', '기능': 'Features',
    "' 에 대한 결과가 없어요": "'", "'에 대한 결과가 없어요": "' – no results", '다른 검색어나 인기 검색어를 이용해 보세요': 'Try another or a popular search',
    '음성 · 이미지 검색은 준비 중이에요': 'Voice & image search coming soon', '음성 검색은 준비 중이에요': 'Voice search coming soon',
    '음성 검색': 'Voice search', '음성 또는 카메라 검색': 'Voice or camera search', '상세 필터': 'Filters', '곧 오픈': 'Coming soon',
    '경복궁': 'Gyeongbokgung', '당의': 'Dangui', '스냅': 'Photo shoot', '체형 분석': 'Body analysis', '패키지': 'Package',
    'AI 체형 · 퍼스널 컬러 분석': 'AI Body & Personal Color Analysis', '나에게 어울리는 실루엣 찾기': 'Find the silhouette that suits you',
    '체형 스캔 (카메라 촬영)': 'Body Scan (Camera)', '얼굴 · 전신 사진, 키 · 성별 입력': 'Face & full-body photos, height & gender',
    '전주 코스 지도': 'Jeonju Course Map', '경유지 편집 · 이동 수단 · 예상 비용': 'Edit stops · Transport · Estimated cost',
    '내 정보 · 예약 내역': 'My Page · Bookings', '예약 · 찜 · 쿠폰 · 알림 설정': 'Bookings · Wishlist · Coupons · Notifications',
    '한복 배우기 · 문화 클래스': 'Learn Hanbok · Culture Class',
    // AI 분석
    '김서연 님의 AI 정밀 체형 분석': 'Seoyeon Kim\'s AI Body Analysis', '신뢰도 99.8%': 'Confidence 99.8%', '방금 분석 완료': 'Just analyzed',
    '체형 골격 타입': 'Body type', '얼굴형 & 퍼스널컬러': 'Face shape & color', '깃 · 목선 조화율': 'Collar · neckline fit', '추천 치마 실루엣': 'Recommended skirt', '추천 실루엣': 'Recommended silhouette',
    '슬림 내추럴': 'Slim Natural', '쁘띠 내추럴': 'Petite Natural', '롱라인 스트레이트': 'Long-line Straight', '스탠다드 스트레이트': 'Standard Straight', '컴팩트 스트레이트': 'Compact Straight',
    '계란형 · 쿨뮤트': 'Oval · Cool mute', '98% 최적': '98% optimal', '95% 우수': '95% great', '99% 맞춤': '99% perfect',
    '풀 A라인 96%': 'Full A-line 96%', '소프트 벨라인 94%': 'Soft bell-line 94%', '슬림 H라인 97%': 'Slim H-line 97%',
    '하이웨스트 A라인': 'High-waist A-line', '풀 A라인': 'Full A-line', '롱 H라인': 'Long H-line', '짧은 철릭': 'Short cheollik', '도포 스트레이트': 'Straight dopo', '롱 도포': 'Long dopo',
    '분석하기': 'Analyze', '다시 분석하기': 'Analyze again', '분석 중…': 'Analyzing…', '결과 반영 중…': 'Applying results…',
    '체형 골격 스캔 중…': 'Scanning body frame…', '얼굴형 · 퍼스널 컬러 매칭 중…': 'Matching face shape & color…', '깃 · 치마 실루엣 계산 중…': 'Calculating collar & skirt fit…',
    '분석 완료 · 결과가 업데이트됐어요': 'Done · Results updated',
    'AI 착용 렌더링 피팅 모델': 'AI fitting model', '360도 회전 뷰 토글': 'Toggle 360° view', '360° 회전': '360° view',
    '실시간 조명: 고궁 자연광 (오전 10:30)': 'Live lighting: palace daylight (10:30 AM)', '원단 디테일 확대보기': 'Zoom fabric detail',
    '궁중 예복': 'Court Robes', '전통 한복': 'Traditional', '모던 개량한복': 'Modern Hanbok', '총 3종': '3 items',
    '경복궁 미담한복 대여점 보유': 'Available at Midam Hanbok, Gyeongbokgung', '경복궁 한복남 본점 보유': 'Available at Hanboknam, Gyeongbokgung',
    '인사동 도담한복 스튜디오 보유': 'Available at Dodam Hanbok Studio, Insadong', '현장 수령 시 추가 피팅 수선 무료 지원': 'Free alterations when you pick up in store',
    '이 착장으로 일정 예약하기': 'Book this outfit', '흑단 모던 캐주얼 한복': 'Ebony Modern Casual Hanbok', '연보라 명주 비단 한복 세트': 'Lavender Silk Hanbok Set',
    'FOR YOU': 'FOR YOU', '김서연 님의 추천 PICK': 'Picks for Seoyeon', '슬림 내추럴 · 쿨뮤트 기준': 'Based on Slim Natural · Cool mute',
    '입어보기': 'Try on', '상품 보기': 'View', 'AI 피팅에 적용했어요': 'Applied to AI fitting',
    'TODAY': 'TODAY', '오늘의 PICK': 'Today\'s PICK', '매일 오전 10시 업데이트': 'Updated daily at 10 AM', '👑 오늘의 PICK': '👑 Today\'s PICK',
    '경복궁 체험 패키지 · 2인 추천': 'Gyeongbokgung Experience · Best for 2', '경복궁 공주체험 묶음팩': 'Gyeongbokgung Princess Package',
    '오늘 128명 예약': '128 booked today', '· 남은 수량 7': '· 7 left',
    'SPECIAL DEAL': 'SPECIAL DEAL', '김서연 님을 위한 특가': 'Deals for Seoyeon', '남음': 'left',
    '쿨뮤트 당의 대여 30% 할인': '30% off Cool-mute Dangui rental', '청자 옥빛 은박 당의 · 내 체형 매칭 99%': 'Celadon Jade Dangui · 99% body match',
    'BTS 투어 팩 20% 할인': '20% off BTS Tour Pack', 'K-POP 성지 한복 투어 · 포즈 가이드 포함': 'K-POP Hanbok Pilgrimage · Pose guide included',
    '지역 굿즈 2+1': 'Local goods 2+1', '노리개 키링 · 단청 책갈피 · 마그넷': 'Norigae keyring · Dancheong bookmark · Magnet', '3개 담으면 1개 무료': 'Buy 3, get 1 free',
    '내 체형 맞춤': 'Your fit', '인기 급상승': 'Trending', '오늘만': 'Today only', '쿠폰 받기': 'Get coupon', '받음': 'Got it',
    '쿠폰을 받았어요 · 내 정보 › 쿠폰함': 'Coupon saved · My Page › Coupons',
    '받은 쿠폰은 내 정보 › 쿠폰함에서 확인할 수 있어요 · 오늘 자정 종료': 'Find coupons in My Page › Coupons · Ends at midnight',
    // 체형 스캔
    'AI 정밀 체형 스캔': 'AI Body Scan', '사진 2장 · 신체 정보 입력': '2 photos · Body info', '촬영 도움말': 'Photo tips',
    '얼굴 사진': 'Face photo', '전신 사진': 'Full-body photo', '촬영 모드': 'Mode', '카메라 꺼짐': 'Camera off', '정면 · 밝은 곳': 'Face front · bright light',
    '머리~발끝 · 2m 거리': 'Head to toe · 2 m away', '카메라 켜기': 'Turn on camera', '앨범': 'Album', '샘플로 체험': 'Try a sample',
    '앨범에서 선택': 'Choose from album', '카메라 전환': 'Switch camera', '촬영': 'Capture', '다시 찍기': 'Retake',
    '전신 사진 찍기': 'Take full-body photo', '얼굴 사진 보기': 'View face photo', '전신 사진 보기': 'View full-body photo',
    '등록된 사진': 'Your photos', '미등록': 'Not added', '등록 완료': 'Added', '신체 정보': 'Body info', '더 정확한 핏 추천에 사용돼요': 'Used for more accurate fit',
    '성별': 'Gender', '여성': 'Female', '남성': 'Male', '키': 'Height', '몸무게': 'Weight', '(선택)': '(optional)',
    '키 1cm 줄이기': 'Height −1 cm', '키 1cm 늘리기': 'Height +1 cm', '몸무게 1kg 줄이기': 'Weight −1 kg', '몸무게 1kg 늘리기': 'Weight +1 kg',
    '아바타 미리보기': 'Avatar preview', 'AVATAR PREVIEW': 'AVATAR PREVIEW',
    '사진은 서버로 전송되지 않고 이 기기 안에서만 사용돼요. 분석이 끝나면 언제든 삭제할 수 있어요.': 'Photos never leave this device. You can delete them anytime after analysis.',
    '얼굴 · 전신 사진을 모두 등록해 주세요': 'Please add both face and full-body photos', '준비 완료! 분석은 약 3초 걸려요': 'Ready! Analysis takes about 3 seconds',
    '사진을 등록해 주세요': 'photo needed', '체형 분석 시작': 'Start body analysis', '체형 분석 중': 'Analyzing body',
    '얼굴 랜드마크 추출 중…': 'Extracting face landmarks…', '어깨 · 허리 · 골반 비율 측정 중…': 'Measuring shoulder, waist & hip ratios…',
    'cm 기준 비율 보정 중…': 'cm: adjusting proportions…', '퍼스널 컬러 톤 분석 중…': 'Analyzing personal color tone…', '분석 완료!': 'Analysis complete!',
    'TripFit AI가 체형과 퍼스널 컬러를 분석하고 있어요': 'TripFit AI is analyzing your body type and personal color',
    '얼굴을 타원 안에 맞춰 주세요': 'Fit your face in the oval', '몸 전체를 실루엣에 맞춰 주세요': 'Fit your whole body in the outline',
    '얼굴 인식됨 · 98%': 'Face detected · 98%', '전신 인식됨 · 96%': 'Body detected · 96%', '카메라 권한 요청 중…': 'Requesting camera access…',
    '얼굴 사진 등록 완료': 'Face photo added', '전신 사진 등록 완료': 'Full-body photo added', '얼굴 사진을 찍었어요': 'Face photo taken', '전신 사진을 찍었어요': 'Full-body photo taken',
    '앨범 사진을 등록했어요': 'Photo added from album', '샘플 사진 2장을 등록했어요': '2 sample photos added', '이미지를 열 수 없어요': 'Can\'t open the image',
    '카메라 권한이 거부됐어요. 앨범이나 샘플을 이용해 주세요': 'Camera access denied. Use the album or a sample.',
    '카메라를 찾을 수 없어요. 앨범이나 샘플을 이용해 주세요': 'No camera found. Use the album or a sample.',
    '이 브라우저에서는 카메라를 쓸 수 없어요. 앨범이나 샘플을 이용해 주세요': 'This browser can\'t use the camera. Use the album or a sample.',
    '모자·안경을 벗고 정면을 바라봐 주세요': 'Remove hat and glasses and look straight ahead', '몸에 붙는 옷을 입고 2m 떨어져 촬영해 주세요': 'Wear fitted clothes and stand 2 m away',
    'AI 분석으로 돌아가기': 'Back to AI Analysis',
    // 지도
    '전국 한옥 & 고궁 코스 검색': 'Search hanok & palace courses', '전주 한옥마을 고궁 & 스냅 코스': 'Jeonju Hanok Village Palace & Photo Course',
    '서울 (경복궁·북촌)': 'Seoul (Gyeongbokgung·Bukchon)', '전주 (한옥마을)': 'Jeonju (Hanok Village)', '경주 (황리단길)': 'Gyeongju (Hwangnidan-gil)', '안동 (하회마을)': 'Andong (Hahoe Village)',
    '현재 위치': 'My location', '확대': 'Zoom in', '축소': 'Zoom out', '코스 옵션': 'Course options', '현재 위치: 온한복 본점 근처': 'Your location: near Onhanbok main store',
    '왕실 역사 코스': 'Royal History', '인생샷 스팟': 'Photo Spots', '최단 도보': 'Shortest Walk',
    '전주 한옥마을 최적 루트': 'Jeonju Hanok Village Best Route', '경기전 & 한옥 골목 한복 스냅 맞춤 도보 코스': 'Gyeonggijeon & hanok lanes walking photo course',
    '인생샷 스냅 투어': 'Best-Shot Photo Tour', '성당 · 대나무숲 · 벽화마을 포토존 집중 코스': 'Cathedral · bamboo grove · mural village photo spots',
    '걷는 시간을 줄인 핵심 스팟 압축 코스': 'Just the highlights, less walking', '한복 입고 아이돌 화보 촬영지 따라 걷는 코스': 'Walk the idol photo-shoot spots in hanbok',
    '스냅 인기 루트': 'Popular for photos', '팬 성지 루트': 'Fan favorite',
    '총 거리': 'Distance', '소요 시간': 'Duration', '예상 비용': 'Est. cost', '코스 일정': 'Itinerary', '경유지 편집': 'Edit stops',
    'TripFit 프리미엄 패키지: 프리미엄 한복 3시간 대여 + 경기전 입장료 자동 연동': 'TripFit Premium: 3-hour premium hanbok rental + Gyeonggijeon entry included',
    '코스 패키지 지금 예약하기': 'Book this course package', '다음 장소까지': 'To next stop:',
    '온한복 본점': 'Onhanbok Main Store', '전동성당': 'Jeondong Cathedral', '경기전 대나무숲': 'Gyeonggijeon Bamboo Grove', '최명희길 한옥골목': 'Choi Myeong-hee Hanok Lane',
    '전주향교': 'Jeonju Hyanggyo', '남천교 청연루': 'Cheongyeollu Pavilion', '자만벽화마을': 'Jaman Mural Village', '오목대 쉼터': 'Omokdae Rest Area',
    '아이돌 화보 골목': 'Idol Photo Alley', 'K-POP 화보 촬영 한옥': 'K-POP Photo Shoot Hanok',
    '한복 대여': 'Hanbok rental', '역사 건축': 'Historic architecture', '포토 스팟': 'Photo spot', '한옥 골목': 'Hanok lane', '문화재': 'Cultural heritage',
    '전망 누각': 'View pavilion', '전망 · 휴식': 'View · Rest', 'K-POP 명소': 'K-POP spot', 'K-POP 촬영지': 'K-POP location',
    '전통 왕실 궁중 한복 맞춤 피팅 & 헤어스타일링': 'Royal court hanbok fitting & hair styling',
    '1914년 완공된 로마네스크 양식 성당. 붉은 벽돌 정면이 한복과 잘 어울려요.': 'A Romanesque cathedral completed in 1914. Its red-brick facade goes beautifully with hanbok.',
    '태조 어진 역사 관람 및 돌담길 한복 스냅 최적 촬영': 'King Taejo\'s portrait shrine and perfect stone-wall hanbok photos',
    '기와 담장이 이어지는 조용한 골목. 사람이 적어 단독 스냅을 찍기 좋아요.': 'A quiet lane of tiled walls. Few people, great for solo shots.',
    '조선시대 지방 교육기관. 명륜당 앞 400년 은행나무가 유명해요.': 'A Joseon-era regional school famous for its 400-year-old ginkgo tree.',
    '전주천 위 한옥 누각. 해 질 무렵 물빛과 함께 담기는 한복 실루엣이 아름다워요.': 'A hanok pavilion over the stream. Hanbok silhouettes glow against the water at sunset.',
    '언덕을 따라 이어지는 알록달록한 벽화 골목. 한옥마을 전경도 함께 담겨요.': 'Colorful mural alleys up the hill, with views over the hanok village.',
    '마을 전체 파노라마 조망 및 전통 다과 티타임': 'Panoramic village views and traditional tea',
    '아이돌 그룹이 한복 화보를 찍었다는 돌담 골목. 팬들이 같은 포즈로 인증샷을 남기는 곳이에요.': 'A stone-wall alley where an idol group is said to have shot hanbok photos. Fans recreate the poses here.',
    '글로벌 아이돌 그룹의 서머 화보 촬영지로 알려진 한옥. 대청마루와 마당이 화보 속 모습 그대로예요.': 'A hanok known as a global idol group\'s summer photo-shoot location. The wooden hall and yard look just like the photos.',
    '09:00 – 20:00': '09:00 – 20:00', '상시 개방': 'Always open', '무료': 'Free', '대여 ₩25,000~': 'Rental from ₩25,000', '관람 ₩5,000': 'Admission ₩5,000', '다과 ₩8,000': 'Tea ₩8,000',
    'TripFit 예약 시 헤어 장식 무료': 'Free hair accessories with TripFit booking', '정면 계단 앞 스냅 명소': 'Photo spot by the front steps',
    '한복 착용 시 입장료 무료': 'Free entry in hanbok', '골목 끝 한옥 카페 음료 10% 할인': '10% off at the hanok café at the end of the lane',
    '명륜당 은행나무 포토존': 'Myeongnyundang ginkgo photo zone', '누각 위 바람맞이 스냅': 'Breezy pavilion shots', '벽화 골목 컬러 스냅': 'Colorful mural shots',
    '전망대 티켓 포함': 'Observatory ticket included', '화보 같은 포즈 가이드 카드 제공': 'Pose guide cards provided', '한복 착용 시 마당 포토존 입장 무료': 'Free yard photo zone in hanbok',
    '피팅 30분': '30-min fitting', '예약 대기 없음': 'No waiting', '외관 촬영': 'Exterior photos', '무료 입장': 'Free entry', '한복 무료입장': 'Free in hanbok',
    '스냅 명소': 'Photo hotspot', '한적한 골목': 'Quiet lane', '오전 추천': 'Best in the morning', '은행나무 명소': 'Ginkgo spot', '노을 명소': 'Sunset spot',
    '강변 산책': 'Riverside walk', '컬러 배경': 'Colorful backdrop', '오르막 있음': 'Uphill', 'K-POP 성지': 'K-POP pilgrimage', '인증샷 명소': 'Photo hotspot', '한복 착용 추천': 'Hanbok recommended',
    '대나무 숲길 포토존': 'Bamboo path photo zone', '경기전 돌담길': 'Gyeonggijeon stone wall',
    '참고 이미지 · IDOL 뮤직비디오': 'Reference · IDOL music video', '참고 이미지 · 경복궁 공연': 'Reference · Gyeongbokgung performance',
    '운영시간': 'Hours', '요금': 'Fee', '한복 혜택': 'Hanbok perk', '문화 해설': 'Cultural guide', '해설 듣기': 'Listen', '멈추기': 'Stop',
    '문화 해설 음성으로 듣기': 'Listen to the cultural guide', '이 기기에서는 음성 해설을 지원하지 않아요': 'Audio guide isn\'t supported on this device',
    '코스 출발지': 'Course start', '코스 도착지': 'Course end', '코스에서 빼기': 'Remove from course', '이 코스에 추가': 'Add to course',
    '현재 코스에 포함되지 않은 장소예요': 'This place isn\'t in the current course', '지도에서 보기': 'Show on map', '코스로 보기': 'course',
    '이동 수단': 'Transport', '도보': 'Walk', '자전거': 'Bike', '택시': 'Taxi', '경유지': 'Stops', '기본 코스로 되돌리기': 'Reset to default',
    '지도 표시': 'Map display', '다른 코스 미리보기': 'Show other courses', '기본': 'Standard', '차분하게': 'Muted', '야간': 'Night', '완료': 'Done',
    '코스': 'Course', '거리가 멀어 이동 수단을 택시로 바꿨어요': 'Switched to taxi due to distance',
    '전주 한옥마을 코스 지도. 드래그로 이동, 휠·핀치로 확대': 'Jeonju Hanok Village course map. Drag to move, pinch or scroll to zoom',
    '상세 보기': 'details', '추가': 'added', '제외': 'removed',
    // 상품
    '한복 & 올인원 상품': 'Hanbok & All-in-One', '총 161개': '161 items',
    '엄선된 프리미엄 부티크와 AI 가상 피팅 지원 패키지 컬렉션': 'Curated premium boutiques and packages with AI virtual fitting',
    '원하는 한복 스타일, 샵, 패키지 검색': 'Search styles, shops, packages', '음성 또는 카메라 검색 ': 'Voice or camera search',
    '추천순': 'Recommended', '인기순': 'Popular', '가격순': 'Price', '평점순': 'Rating', '가격 낮은순': 'Price: low', '가격 높은순': 'Price: high', '상세필터': 'Filters',
    '올인원 패키지': 'All-in-One', '모던 개량': 'Modern', '스냅 포토팩': 'Photo Pack', '소품 & 헤어': 'Accessories & Hair', '지역 굿즈': 'Local Goods',
    '내 체형 & 퍼스널컬러 맞춤 필터': 'My body & color filter', '쿨뮤트 · 슬림핏': 'Cool mute · Slim fit', '인공지능 진단 기반 최적 매칭 아이템만 표시': 'Show only AI-matched items', 'AI 맞춤 필터 토글': 'Toggle AI filter',
    '이달의 얼리버드 묶음 특가': 'Early-bird bundle of the month', 'D-3 한정 수량': 'D-3 · Limited',
    '한복 종일 대여 + 패스트트랙 QR + 전문 스냅 60분': 'All-day hanbok rental + fast-track QR + 60-min pro photo shoot',
    '기다림 없는 경복궁 우선입장과 보정본 15장 포함 역대 최저가 번들': 'Priority Gyeongbokgung entry with 15 edited photos – our best price ever', '혜택 받기': 'Get deal',
    '인기 추천 큐레이션': 'Curated Picks', '실시간 랭킹 전체보기': 'See live ranking', 'BEST': 'BEST', 'AI 체형 연동 무료': 'Free AI fit',
    '즉시 예약 확정': 'Instant confirmation', '올인원 풀패키지 · 경복궁 본점': 'All-in-one package · Gyeongbokgung main store',
    '로열 시그니처: 경복궁 궁궐 풀데이 프리미엄 패키지': 'Royal Signature: Gyeongbokgung Full-Day Premium Package',
    '프리미엄 한복': 'Premium hanbok', '고궁 무료입장': 'Free palace entry', '1:1 인생샷 스냅': '1:1 photo shoot', '왕실 댕기머리 연출': 'Royal braid styling', '날짜 선택': 'Select date',
    '🔥 인기 급상승': '🔥 Trending', 'K-POP 팬 투어 · 전주 한옥마을': 'K-POP fan tour · Jeonju Hanok Village', 'BTS 투어 팩: 한복 입고 K-POP 성지 따라 걷기': 'BTS Tour Pack: Walk the K-POP Spots in Hanbok',
    '팬 투어 · 비공식 · 사진은 참고 이미지': 'Fan tour · Unofficial · Reference images', '한복 3시간 대여': '3-hour hanbok rental', 'K-POP 성지 코스 가이드': 'K-POP course guide',
    '포즈 가이드 스냅 20장': '20 photos with pose guide', '코스 보기': 'View course', 'K-POP 한복 뮤직비디오 참고 이미지': 'K-POP hanbok music video reference image',
    '쿨뮤트 최적 매칭': 'Best for cool mute', '청자 옥빛 은박 당의 풀세트': 'Celadon Jade Dangui Full Set', '속치마·노리개·꽃신·현장 피팅 무료': 'Underskirt · norigae · flower shoes · free fitting',
    '대여 24h': '24h rental', '소프트 웜톤 추천': 'Soft warm-tone pick', '전통 배씨댕기 & 자수 핸드백 포함': 'Traditional hair ribbon & embroidered bag included',
    '셀럽 스타일 한복': 'Celeb-Style Hanbok', '무대 · 화보 스타일 참고': 'Inspired by stage & photo shoots', '셀럽 스타일': 'Celeb style',
    '남녀 공용 · 인기 급상승': 'Unisex · Trending', '지민 st 블랙 실크 모던 철릭': 'Jimin-style Black Silk Modern Cheollik', '자수 포인트 · 와이드 팬츠 세트': 'Embroidered · wide-pants set',
    '스타일 참고 · 실제 착용 상품 아님': 'Style inspired · not the actual worn item', '봄웜 · 쿨톤 모두 추천': 'Great for spring-warm & cool tones',
    '장원영 st 핑크 공주 당의': 'Wonyoung-style Pink Princess Dangui', '진주 노리개 · 꽃 헤어핀 포함': 'Pearl norigae & flower hairpin included',
    '전주 지역 인기 1위': '#1 in Jeonju', '전주 한옥마을 투어 패키지': 'Jeonju Hanok Village tour package', '전주 한옥마을 고궁 & 인생샷 스냅 묶음팩': 'Jeonju Hanok Village Palace & Photo Bundle',
    '올데이 대여': 'All-day rental', '경기전 입장권': 'Gyeonggijeon ticket', '전통 찻집 다과 쿠폰': 'Tea house coupon', '상세 일정 확인': 'View itinerary',
    '👑 공주체험': '👑 Princess', '프리미엄 공주 한복': 'Premium princess hanbok', '댕기 · 헤어 연출': 'Ribbon & hair styling', '경복궁 무료입장': 'Free Gyeongbokgung entry', '궁궐 스냅 30분': '30-min palace photo shoot',
    'BUY & KEEP': 'BUY & KEEP', '소장용 한복 구매': 'Hanbok to Keep', '대여 말고 내 것으로': 'Own it instead of renting',
    '구매': 'Buy', '소장용 · 치수 맞춤 제작': 'To keep · made to measure', '맞춤 제작 청자 옥빛 당의': 'Made-to-measure Celadon Jade Dangui', '제작 2주': '2 weeks to make',
    '소장용 · 명주 100%': 'To keep · 100% silk', '무료배송': 'Free shipping', '데일리 · 상하의 세트': 'Daily · top & bottom set', '흑단 모던 생활한복 셋업': 'Ebony Modern Daily Hanbok Set', '담기': 'Add',
    'LOCAL GOODS': 'LOCAL GOODS', '전주 · 서울 기념품': 'Jeonju & Seoul souvenirs',
    '전주 수제 초코파이 6입': 'Jeonju Handmade Choco Pie (6)', '전주 한지 합죽선 부채': 'Jeonju Hanji Folding Fan', '오방색 노리개 키링': 'Five-color Norigae Keyring',
    '경복궁 단청 자개 책갈피': 'Gyeongbokgung Mother-of-pearl Bookmark', '근정전 미니어처 마그넷': 'Geunjeongjeon Miniature Magnet', '한옥 기와 디퓨저': 'Hanok Roof-tile Diffuser',
    '전주 명물': 'Jeonju specialty', '전주 · 전통 공예': 'Jeonju · Traditional craft', '전주 · 한복 소품': 'Jeonju · Hanbok accessory', '서울 · 궁궐 굿즈': 'Seoul · Palace goods', '전주 · 한옥 인테리어': 'Jeonju · Hanok interior',
    '100% 안심 무료 피팅 & 변경 보장': '100% free fitting & exchange guarantee', '현장에서 실물 확인 후 다른 디자인으로 무상 변경 가능합니다.': 'Swap for another design for free after trying it on in store.',
    '친환경 살균 프리미엄 케어': 'Eco-friendly sanitized care', '모든 의복은 대여 직후 고온 스팀과 에코 살균 세탁을 거칩니다.': 'Every garment is steam-cleaned and eco-sanitized after each rental.',
    '장바구니': 'Cart', '장바구니 보기': 'View cart', '상품 금액': 'Subtotal', '배송비': 'Shipping', '결제 예정 금액': 'Total', '구매하기': 'Checkout',
    '5만원 이상 구매 시 무료배송 · 한복은 치수 확인 후 출고돼요': 'Free shipping over ₩50,000 · Hanbok ships after size check',
    '장바구니가 비어 있어요': 'Your cart is empty', '장바구니에 담았어요 ·': 'Added to cart ·', '데모 버전이라 실제 결제는 진행되지 않아요': 'This is a demo, so no real payment is made',
    '조건에 맞는 상품': 'Matching items', '개 상품': ' items', '구분': 'Type', '대여': 'Rental', '굿즈': 'Goods', '가격대': 'Price', '5만원 이하': 'Under ₩50k', '5~10만원': '₩50k–100k', '10만원 이상': 'Over ₩100k',
    '평점 4.9 이상만': 'Rating 4.9+ only', '평점 4.9+': 'Rating 4.9+', '결과 보기 ': 'See results', '초기화': 'Reset', '필터 초기화': 'Reset filters',
    '조건에 맞는 상품이 없어요': 'No items match', '체험 패키지': 'Experience package', '여행 코스 패키지': 'Travel course package',
    // 예약
    '예약하기': 'Book', '날짜': 'Date', '시간': 'Time', '인원': 'Guests', '추가 옵션': 'Add-ons', '(1인 기준)': '(per person)', '결제 수단': 'Payment',
    '주말은 ₩5,000이 추가돼요 · 회색 날짜는 예약 마감': 'Weekends +₩5,000 · Gray dates are full', '날짜를 먼저 골라 주세요': 'Pick a date first',
    '최대 6명 · 2인 이상 5% 할인': 'Up to 6 · 5% off for 2+', '헤어 · 댕기 연출': 'Hair & ribbon styling', '전문 스타일리스트 15분': '15 min with a stylist',
    '스냅 사진 추가': 'Add photo shoot', '보정본 10장 · 30분 동행': '10 edited photos · 30 min', '노리개 · 꽃신 세트': 'Norigae & flower shoes', '한복 소품 풀세트': 'Full accessory set',
    '카드': 'Card', '카카오페이': 'KakaoPay', '네이버페이': 'Naver Pay', '토스페이': 'Toss Pay',
    '방문 2일 전까지 무료 취소 · 현장에서 실물 확인 후 다른 디자인으로 무료 변경 가능해요.': 'Free cancellation up to 2 days before · Swap designs for free in store.',
    '날짜와 시간을 골라 주세요': 'Pick a date and time', '시간을 골라 주세요': 'Pick a time', '결제하기': 'Pay',
    '주말 추가 요금': 'Weekend surcharge', '2인 이상 할인 5%': '5% group discount', '결제 금액': 'Total',
    '결제를 진행하고 있어요…': 'Processing payment…', '로 결제하고 있어요…': ': processing payment…', '예약을 확정하고 있어요…': 'Confirming your booking…',
    '예약이 완료됐어요': 'Booking complete', '방문 당일 아래 QR을 매장에 보여 주세요': 'Show this QR at the store on the day',
    '입장 QR 코드': 'Entry QR code', '홈으로': 'Home', '내 예약 보기': 'My bookings', '데모 버전이라 실제 결제는 이루어지지 않았어요': 'Demo only – no real payment was made',
    '한 번에 최대 6명까지 예약할 수 있어요': 'You can book up to 6 people at once', '내일': 'Tmrw', '마감': 'Full', '+5천': '+5k',
    '경복궁 미담한복 · 현장 수령': 'Midam Hanbok, Gyeongbokgung · In-store pickup', '전주 한옥마을 · 온한복 본점 출발': 'Jeonju Hanok Village · Starts at Onhanbok',
    '결제': 'payment', '예약 가능': 'Available', '회색은 마감': 'gray = full',
    // 내 정보
    '김서연': 'Seoyeon Kim', '서연': 'SK', '2024년 3월 가입 · 카카오 로그인': 'Joined Mar 2024 · Kakao login', '프로필 수정': 'Edit profile', '프로필 사진 변경': 'Change photo',
    '예약': 'Bookings', '찜': 'Wishlist', '쿠폰': 'Coupons', '다가오는 예약 ·': 'Upcoming ·', '오전 10:00 픽업 · 3시간 대여': '10:00 AM pickup · 3-hour rental',
    '청자 옥빛 은박 당의 · 경복궁 미담한복': 'Celadon Jade Dangui · Midam Hanbok', '예약 상세': 'Booking details',
    '내 체형 분석': 'My Body Analysis', '최근 분석': 'Latest', '체형': 'Body type', '퍼스널 컬러': 'Personal color', '쿨뮤트': 'Cool mute', '추천 ·': 'Pick ·',
    '내 활동': 'My Activity', '예약 내역': 'Bookings', '찜한 한복': 'Saved Hanbok', '저장한 코스': 'Saved Courses', '내 리뷰': 'My Reviews',
    '계정': 'Account', '개인정보 수정': 'Edit personal info', '예약 · 혜택 알림': 'Booking & deal alerts', '결제 수단 ': 'Payment methods', '카드 1개': '1 card', '언어': 'Language', '한국어': '한국어',
    '고객지원': 'Support', '공지사항': 'Notices', '고객센터': 'Help center', '약관 및 정책': 'Terms & Policies', '로그아웃': 'Log out', 'TripFit 버전 1.0.0': 'TripFit version 1.0.0',
    '로그아웃할까요?': 'Log out?', '저장한 코스와 체형 분석 결과는 그대로 남아 있어요.': 'Your saved courses and body analysis will be kept.',
    '데모 버전이라 로그아웃은 실제로 되지 않아요': 'This is a demo, so you can\'t actually log out',
    '예약 · 혜택 알림을 켰어요': 'Booking & deal alerts on', '예약 · 혜택 알림을 껐어요': 'Booking & deal alerts off', '화면은 준비 중이에요': 'screen is coming soon',
    '설정': 'Settings', '새 예약': 'New', '아직 찜한 한복이 없어요': 'No saved hanbok yet', '마음에 드는 한복의 하트를 눌러 보세요': 'Tap the heart on hanbok you like',
    '상품 보러 가기': 'Browse shop', '아직 저장한 코스가 없어요': 'No saved courses yet', '지도에서 코스 옆 북마크를 눌러 저장해 보세요': 'Tap the bookmark next to a course on the map',
    '지도 보러 가기': 'Open map', '찜 해제': 'Remove', '저장 해제': 'Unsave', '없음': 'None', '다시 분석': 'Analyze again',
    // 기타
    'TripFit 시작 화면': 'TripFit launch screen', 'TripFit 로고': 'TripFit logo', '검색': 'Search',
    '경복궁에서 한복을 입은 두 사람': 'Two people in hanbok at Gyeongbokgung', '블랙 실크 모던 철릭': 'Black silk modern cheollik', '핑크 파스텔 당의 한복': 'Pink pastel dangui hanbok',
    'AI 착용 렌더링': 'AI rendering', '일치': 'match', '매칭': 'Match',
    '출발 ·': 'Start ·', '도착 ·': 'Arrive ·', '출발': 'Start', '도착': 'Arrive', '예약 완료': 'Booked', '체험': 'Experience', '한복': 'Hanbok',
    "' 예약하기": "' – Book", '시간 선택': 'Pick a time', '날짜 선택 ': 'Pick a date', '인원 늘리기': 'Add guest', '인원 줄이기': 'Remove guest',
    '수량 줄이기': 'Decrease', '수량 늘리기': 'Increase', '삭제': 'Delete', '전체 보기': 'Full view', '전체': 'All',
    '검색어': 'Search term', '쿨뮤트 기준': 'cool mute basis', '기준': 'basis', '장바구니에 담기': '– add to cart',
    '미담한복': 'Midam Hanbok', '경복궁 미담한복': 'Midam Hanbok, Gyeongbokgung', '신체 정보 입력': 'Body info',
    '얼굴 사진을 등록해 주세요': 'Please add a face photo', '전신 사진을 등록해 주세요': 'Please add a full-body photo',
    '· 봄': '· Spring', '다가오는 예약': 'Upcoming', '일 분석': 'analyzed', '경유': '(stop)',
  };
  // 한 글자 단어는 문장 전체가 일치할 때만 바꿈 (부분 치환하면 다른 단어를 망가뜨림)
  const EXACT_ONLY = { '일': 'Sun', '월': 'Mon', '화': 'Tue', '수': 'Wed', '목': 'Thu', '금': 'Fri', '토': 'Sat', '홈': 'Home', '찜': 'Wishlist', '키': 'Height', '깃': 'Collar (git)' };
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAY = { '일': 'Sun', '월': 'Mon', '화': 'Tue', '수': 'Wed', '목': 'Thu', '금': 'Fri', '토': 'Sat' };

  // ───── ② 숫자 패턴 ─────
  const RULES = [
    [/(\d{1,2})월 (\d{1,2})일 분석/g, (m, mo, d) => `Analyzed ${MONTHS[mo - 1]} ${d}`],
    [/^(\d+)\. (.)$/g, (m, i, w) => `${i}. ${EXACT_ONLY[w] || w}`],
    [/(\d{4})년 (\d{1,2})월/g, (m, y, mo) => `${MONTHS[mo - 1]} ${y}`],
    [/(\d{1,2})월 (\d{1,2})일\s*\((.)\)/g, (m, mo, d, w) => `${MONTHS[mo - 1]} ${d} (${DAY[w] || w})`],
    [/(\d{1,2})월 (\d{1,2})일/g, (m, mo, d) => `${MONTHS[mo - 1]} ${d}`],
    [/(\d{1,2})\.(\d{1,2})\((.)\)/g, (m, mo, d, w) => `${MONTHS[mo - 1]} ${d} (${DAY[w] || w})`],
    [/^(\d{1,2})월$/g, (m, mo) => MONTHS[mo - 1]],
    [/\(([\d,]+)개 리뷰\)/g, '($1 reviews)'], [/\(([\d,]+)명 완주\)/g, '($1 completed)'],
    [/총 ([\d,]+)개/g, '$1 items'], [/총 (\d+)종/g, '$1 items'], [/([\d,]+)개 상품/g, '$1 items'],
    [/찜 (\d+)개/g, 'Saved $1'], [/(\d+)문제 맞혔어요/g, 'You got $1 right'], [/(\d+) \/ (\d+) 정답/g, '$1 / $2 correct'],
    [/새 알림 (\d+)개/g, '$1 new'], [/예약 가능 (\d+)개/g, '$1 available'], [/사진 (\d)\/2/g, 'Photos $1/2'],
    [/(\d+)분 전/g, '$1 min ago'], [/약 (?=\d)/g, '~'], [/(\d+)시간 (\d+)분/g, '$1h $2m'], [/(\d+)시간/g, '$1h'], [/(\d+)분 머무름/g, '$1 min stay'], [/(\d+)분/g, '$1 min'],
    [/(\d+)곳/g, '$1 stops'], [/명소 (\d+) stops/g, '$1 sights'], [/(^|[^\d,])1명/g, '$11 guest'], [/(\d+)명/g, '$1 guests'], [/(\d+)건/g, '$1'], [/(\d+)장/g, '$1 photos'], [/([\d,]+)개/g, '$1'],
    [/의 (\d+)번째 장소/g, ' · stop $1'], [/(\d+)번째 장소/g, 'stop $1'], [/ 도착/g, ' arrival'],
    [/오전 (\d{1,2}:\d{2})/g, '$1 AM'], [/오후 (\d{1,2}:\d{2})/g, '$1 PM'],
    [/\/일/g, '/day'], [/\/인/g, '/person'], [/(\d+)인 /g, '$1 people '], [/D-DAY/g, 'D-DAY'],
    [/ 님의 /g, '\'s '], [/ 님을 위한 /g, ' for '],
  ];

  // ───── ③ 부분 치환용 (긴 단어부터) ─────
  const PHRASES = Object.keys(D).filter((k) => k.length >= 2).sort((a, b) => b.length - a.length);
  const HANGUL = /[가-힣]/;

  function t(src) {
    if (lang !== 'en' || !src || !HANGUL.test(src)) return src;
    const lead = src.match(/^\s*/)[0], trail = src.match(/\s*$/)[0];
    let s = src.trim().replace(/\s+/g, ' ');
    if (D[s] !== undefined) return lead + D[s] + trail;
    if (EXACT_ONLY[s]) return lead + EXACT_ONLY[s] + trail;
    for (const [re, rep] of RULES) s = s.replace(re, rep);
    if (D[s] !== undefined) return lead + D[s] + trail;
    if (HANGUL.test(s)) for (const p of PHRASES) if (s.includes(p)) s = s.split(p).join(D[p]);
    return lead + s + trail;
  }
  window.TF_T = t;

  // ───── 화면 적용 ─────
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA']);
  const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  function translateNode(node) {
    if (node.nodeType === 3) {
      const p = node.parentElement;
      if (!p || SKIP.has(p.tagName) || p.closest('.material-symbols-outlined, [data-no-i18n]')) return;
      const v = node.nodeValue;
      if (HANGUL.test(v)) { const n = t(v); if (n !== v) node.nodeValue = n; }
      return;
    }
    if (node.nodeType !== 1 || SKIP.has(node.tagName)) return;
    for (const a of ATTRS) { const v = node.getAttribute && node.getAttribute(a); if (v && HANGUL.test(v)) node.setAttribute(a, t(v)); }
    if (node.tagName === 'INPUT' && node.value && HANGUL.test(node.value) && node.type !== 'search' && node.getAttribute('value')) node.value = t(node.value);
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n = walker.nextNode();
    while (n) {
      if (n.nodeType === 3) translateNode(n);
      else for (const a of ATTRS) { const v = n.getAttribute(a); if (v && HANGUL.test(v)) n.setAttribute(a, t(v)); }
      if (n.nodeType === 1 && n.tagName === 'INPUT' && n.getAttribute('value') && HANGUL.test(n.value)) n.value = t(n.value);
      n = walker.nextNode();
    }
  }

  // 언어 전환 버튼 (헤더 알림 버튼 옆) · 내 정보 > 언어
  function setLang(next) { try { localStorage.setItem(KEY, next); } catch (e) { /* 무시 */ } location.reload(); }
  function addToggle() {
    const bell = document.getElementById('notifBtn');
    if (bell && !document.getElementById('langBtn')) {
      const b = document.createElement('button');
      b.type = 'button'; b.id = 'langBtn'; b.setAttribute('data-no-i18n', '');
      b.setAttribute('aria-label', lang === 'en' ? '한국어로 보기' : 'View in English');
      b.className = 'h-7 px-2 rounded-full bg-black/[0.05] text-[11px] font-semibold text-[#1d1d1f] tracking-tight active:scale-95 transition-transform mr-0.5';
      b.textContent = lang === 'en' ? '한국어' : 'EN';
      b.addEventListener('click', (e) => { e.stopPropagation(); setLang(lang === 'en' ? 'ko' : 'en'); });
      bell.parentNode.insertBefore(b, bell);
    }
    // 내 정보 > 언어 메뉴
    const row = document.querySelector('[data-soon="언어 설정"]');
    if (row) {
      const val = [...row.querySelectorAll('span')].find((s) => s.textContent.trim() === '한국어');
      if (val) { val.setAttribute('data-no-i18n', ''); val.textContent = lang === 'en' ? 'English' : '한국어'; }
      document.addEventListener('click', (e) => {
        if (e.target.closest('[data-soon="언어 설정"]')) { e.stopPropagation(); e.preventDefault(); setLang(lang === 'en' ? 'ko' : 'en'); }
      }, true);
    }
  }

  function apply() {
    addToggle();
    if (lang !== 'en') return;
    document.documentElement.lang = 'en';
    if (HANGUL.test(document.title)) document.title = 'TripFit';
    translateNode(document.body);
    // 나중에 그려지는 내용(시트 · 목록 · 토스트 등)도 번역
    new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'characterData') { if (HANGUL.test(m.target.nodeValue)) translateNode(m.target); }
        else if (m.type === 'attributes') { const v = m.target.getAttribute(m.attributeName); if (v && HANGUL.test(v)) m.target.setAttribute(m.attributeName, t(v)); }
        else m.addedNodes.forEach((n) => translateNode(n));
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
