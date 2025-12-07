// 测试题目数据
const TEST_DATA = {
    questions: [
        {
            id: 1,
            text: "发现朋友突然失踪，大家都猜测他去了某个危险的地方，你的第一反应是？",
            options: [
                { label: "A", text: "立刻拿起工具去搜寻，坚信能找到线索", characters: ["霍珀", "迈克"] },
                { label: "B", text: "召集大家分工，有人查轨迹有人联系警方", characters: ["南希", "罗宾"] },
                { label: "C", text: "嘴上抱怨情况糟糕，但还是第一个开车载大家去现场", characters: ["史蒂夫", "埃迪"] },
                { label: "D", text: "分析地图标注可疑区域，推测可能的入口位置", characters: ["卢卡斯", "默里"] },
                { label: "E", text: "一边喊朋友名字一边寻找，内心焦急但保持希望", characters: ["乔伊斯", "威尔"] }
            ]
        },
        {
            id: 2,
            text: "班级里新转来了一个被大家孤立的"怪同学"，你会？",
            options: [
                { label: "A", text: "主动过去搭话"要不要一起吃饭"，不管别人怎么说", characters: ["埃迪", "达斯汀"] },
                { label: "B", text: "观察几天，发现对方和自己有共同爱好再接触", characters: ["威尔", "乔纳森"] },
                { label: "C", text: "不主动但也不排斥，对方求助时会悄悄帮忙", characters: ["霍莉", "罗宾"] },
                { label: "D", text: "直接找那些孤立别人的人理论，然后拉着新同学加入自己圈子", characters: ["埃里卡", "卢卡斯"] },
                { label: "E", text: "默默坐在对方旁边，把自己的零食分一半过去", characters: ["迈克", "十一"] }
            ]
        },
        {
            id: 3,
            text: "团队要潜入一个危险场所获取重要资料，你的角色更可能是？",
            options: [
                { label: "A", text: "制定详细潜入路线，标注巡逻时间和监控盲区", characters: ["卢卡斯", "南希"] },
                { label: "B", text: "主动当先锋"我用诱饵引开守卫，你们去拿资料"", characters: ["十一", "霍珀"] },
                { label: "C", text: "负责改造通讯设备，确保团队内部联络不被干扰", characters: ["达斯汀", "罗宾"] },
                { label: "D", text: "一边吐槽"守卫这么严简直疯了"，一边破解电子门禁", characters: ["史蒂夫", "埃迪"] },
                { label: "E", text: "留在外面接应，用相机记录周围异常情况", characters: ["乔纳森", "默里"] }
            ]
        },
        {
            id: 4,
            text: "喜欢的人误会你不在乎TA，你会怎么做？",
            options: [
                { label: "A", text: "直接拉着对方说"我想在乎你，别瞎想"", characters: ["迈克", "埃迪"] },
                { label: "B", text: "不解释，默默为TA做很多事，比如帮TA解决麻烦", characters: ["乔纳森", "威尔"] },
                { label: "C", text: "假装不在乎"谁在乎你啊"，但会偷偷给TA准备喜欢的礼物", characters: ["麦克斯", "史蒂夫"] },
                { label: "D", text: "用逻辑推理清楚误会的关键点，一条条讲给TA听", characters: ["默里", "卢卡斯"] },
                { label: "E", text: "有点委屈，红着眼眶说"我真的在乎"，然后抱住对方", characters: ["十一", "霍莉"] }
            ]
        },
        {
            id: 5,
            text: "老师怀疑你和朋友偷偷调查危险事件，把你们叫到办公室质问，你会？",
            options: [
                { label: "A", text: "当场反驳"我们只是在做课外调查，有问题吗"，态度强硬", characters: ["埃里卡", "霍珀"] },
                { label: "B", text: "冷静说"我们会提交调查报告"，然后暗中把证据藏起来", characters: ["南希", "罗宾"] },
                { label: "C", text: "假装嬉皮笑脸"老师您想多了，我们就是瞎玩"，转移话题", characters: ["史蒂夫", "达斯汀"] },
                { label: "D", text: "表面顺从"我们知道错了"，私下让朋友把关键证据转移", characters: ["乔伊斯", "迈克"] },
                { label: "E", text: "很紧张但坚持说"我们没做错"，手不自觉擦紧口袋里的线索", characters: ["威尔", "乔纳森"] }
            ]
        },
        {
            id: 6,
            text: "家人遇到经济困难，你会采取什么行动？",
            options: [
                { label: "A", text: "偷偷找兼职，把赚的钱悄悄放在家里", characters: ["乔纳森", "迈克"] },
                { label: "B", text: "主动和家人商量，一起制定省钱计划和增收方案", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "嘴上说"别担心"，然后去找各种资源想办法", characters: ["霍珀", "史蒂夫"] },
                { label: "D", text: "用自己的特长赚钱，比如帮人画画、修东西", characters: ["威尔", "埃迪"] },
                { label: "E", text: "虽然帮不上大忙，但每天给家人打气，做些力所能及的家务", characters: ["霍莉", "达斯汀"] }
            ]
        },
        {
            id: 7,
            text: "周末独处时，你更倾向于哪种放松方式？",
            options: [
                { label: "A", text: "研究新的技术或冷门知识，比如组装设备、查阴谋论资料", characters: ["默里", "达斯汀"] },
                { label: "B", text: "画画、写日记，把心里的想法表达出来", characters: ["威尔", "麦克斯"] },
                { label: "C", text: "听重金属音乐、玩桌游，自己沉浸在爱好里", characters: ["埃迪", "卢卡斯"] },
                { label: "D", text: "整理房间，把东西分类放好，顺便规划下周的事", characters: ["南希", "罗宾"] },
                { label: "E", text: "窝在沙发上看剧，吃零食，什么都不想", characters: ["史蒂夫", "霍莉"] }
            ]
        },
        {
            id: 8,
            text: "朋友之间因为小事吵架，吵得很凶，你会？",
            options: [
                { label: "A", text: "拍桌子喊"别吵了！多大点事"，然后拉着两人和解", characters: ["霍珀", "埃里卡"] },
                { label: "B", text: "分别找两人聊天，帮他们分析对方的想法，化解矛盾", characters: ["罗宾", "乔伊斯"] },
                { label: "C", text: "拿出零食或游戏说"先别吵了，玩会儿再聊"，用气氛缓和关系", characters: ["达斯汀", "史蒂夫"] },
                { label: "D", text: "默默坐在旁边，等他们吵完递水，再慢慢劝", characters: ["乔纳森", "霍莉"] },
                { label: "E", text: "直接指出两人的问题"你不该这么说""你也有不对"，一针见血", characters: ["南希", "卢卡斯"] }
            ]
        },
        {
            id: 9,
            text: "在森林里露营时，突然看到像怪兽一样的怪异生物，你的反应是？",
            options: [
                { label: "A", text: "立刻挡住朋友前面，准备用身边的木棍对抗", characters: ["十一", "霍珀"] },
                { label: "B", text: "快速拉着朋友躲到树后，观察生物的行动规律", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "嘴上喊"我的天这是什么鬼"，但还是捡起石头砸向远处引开它", characters: ["史蒂夫", "埃迪"] },
                { label: "D", text: "拿出手机拍下证据，同时拉着朋友往草地跑并喊人", characters: ["达斯汀", "罗宾"] },
                { label: "E", text: "吓得手心冒汗，但还是跟着朋友一起撤退", characters: ["威尔", "霍莉"] }
            ]
        },
        {
            id: 10,
            text: "别人精心为你准备了生日礼物，你不喜欢，会怎么说？",
            options: [
                { label: "A", text: "开心地收下说"谢谢！我很喜欢"，过后好好珍藏", characters: ["霍莉", "威尔"] },
                { label: "B", text: "坦诚说"谢谢，但我更喜欢XX类型的"，同时夸礼物的细节", characters: ["达斯汀", "罗宾"] },
                { label: "C", text: "嘴硬"谁要你送礼物啊"，但转头就戴在身上", characters: ["麦克斯", "史蒂夫"] },
                { label: "D", text: "感动地说"你居然记得我喜欢这个风格"，然后回赠对方礼物", characters: ["乔纳森", "迈克"] },
                { label: "E", text: "认真说"谢谢，这个礼物很特别，我会好好用的"", characters: ["南希", "卢卡斯"] }
            ]
        },
        {
            id: 11,
            text: "领导让你做一件超出能力范围的紧急任务，你会？",
            options: [
                { label: "A", text: "一口答应"保证完成"，然后疯狂查资料请教别人", characters: ["迈克", "霍珀"] },
                { label: "B", text: "说"我需要XX帮助，但我会尽力"，然后制定详细步骤", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "吐槽"这任务也太离谱了"，但还是熬夜赶工", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "分析任务难点，告诉领导"哪些部分我能完成，哪些需要支援"", characters: ["达斯汀", "默里"] },
                { label: "E", text: "虽然没把握，但还是说"我试试"，然后默默努力", characters: ["乔纳森", "威尔"] }
            ]
        },
        {
            id: 12,
            text: "对于学校/公司的不合理规定，你会？",
            options: [
                { label: "A", text: "直接无视，该怎么做就怎么做，被抓了也不认错", characters: ["埃迪", "麦克斯"] },
                { label: "B", text: "收集大家的意见，写成建议书提交给管理员", characters: ["南希", "达斯汀"] },
                { label: "C", text: "嘴上吐槽不停，但该遵守还是遵守，偶尔偷偷违规", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "找到规定的漏洞，用合理方式规避，不被发现", characters: ["默里", "埃里卡"] },
                { label: "E", text: "虽然觉得不合理，但还是乖乖遵守", characters: ["威尔", "霍莉"] }
            ]
        },
        {
            id: 13,
            text: "发现信任的朋友被邪恶力量控制，行为异常，你会？",
            options: [
                { label: "A", text: "直接抓住朋友的手说"你清醒点"，尝试用熟悉的事唤醒TA", characters: ["十一", "迈克"] },
                { label: "B", text: "默默观察朋友的行为，记录异常表现，寻找规律", characters: ["乔纳森", "默里"] },
                { label: "C", text: "一边喊朋友的名字一边试图限制TA的行动，不让TA伤人", characters: ["史蒂夫", "霍珀"] },
                { label: "D", text: "立刻召集团队，分析控制的特点，制定唤醒方案", characters: ["罗宾", "南希"] },
                { label: "E", text: "很伤心但不放弃，每天给朋友讲以前的故事，试图唤醒回忆", characters: ["威尔", "乔伊斯"] }
            ]
        },
        {
            id: 14,
            text: "团队合作中，有个队友一直拖后腿，你会？",
            options: [
                { label: "A", text: "耐心教队友怎么做，把任务拆分成小步骤帮TA完成", characters: ["乔伊斯", "达斯汀"] },
                { label: "B", text: "直接说"你这样不行，我来做这部分，你做XX简单的"", characters: ["卢卡斯", "埃里卡"] },
                { label: "C", text: "吐槽"你能不能上点心"，但还是帮TA补漏洞", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "找队友聊天，了解TA拖后腿的原因，再一起解决", characters: ["南希", "迈克"] },
                { label: "E", text: "不说什么，自己多做一点，确保任务完成", characters: ["乔纳森", "霍莉"] }
            ]
        },
        {
            id: 15,
            text: "考试/考核失利，成绩很差，你会怎么调整？",
            options: [
                { label: "A", text: "不服输，把错题整理出来疯狂刷题，下次一定要赢", characters: ["迈克", "卢卡斯"] },
                { label: "B", text: "分析失利原因，制定学习计划，每天按计划执行", characters: ["南希", "罗宾"] },
                { label: "C", text: "吐槽"这题目出得太偏了"，但还是会订正错题", characters: ["史蒂夫", "埃迪"] },
                { label: "D", text: "默默地把试卷藏起来，然后偷偷努力，不让别人知道", characters: ["威尔", "乔纳森"] },
                { label: "E", text: "难过一会儿，然后找朋友出去玩散散心，再回来学习", characters: ["达斯汀", "霍莉"] }
            ]
        },
        {
            id: 16,
            text: "看到朋友被小镇居民误会是"怪物的帮凶"，你会？",
            options: [
                { label: "A", text: "立刻站出来喊"他不是帮凶，我可以证明"，哪怕被大家围攻", characters: ["埃迪", "霍珀"] },
                { label: "B", text: "收集朋友无辜的证据，比如不在场证明，偷偷贴在小镇公告栏", characters: ["达斯汀", "默里"] },
                { label: "C", text: "拉着朋友躲起来，嘴上骂"这群人疯了"，然后想办法澄清", characters: ["麦克斯", "史蒂夫"] },
                { label: "D", text: "分析居民误会的原因，找到关键人物解释清楚", characters: ["南希", "卢卡斯"] },
                { label: "E", text: "跟着大家一起保护朋友，不让他被居民伤害", characters: ["霍莉", "乔伊斯"] }
            ]
        },
        {
            id: 17,
            text: "被陌生人搭讪要联系方式，你不想给，会怎么拒绝？",
            options: [
                { label: "A", text: "直接说"不好意思，我不给陌生人联系方式"", characters: ["十一", "卢卡斯"] },
                { label: "B", text: "笑着说"我手机没带，不好意思"", characters: ["南希", "罗宾"] },
                { label: "C", text: "怼回去"你谁啊，凭什么给你"", characters: ["埃里卡", "麦克斯"] },
                { label: "D", text: "假装没听见，快步走开", characters: ["乔纳森", "威尔"] },
                { label: "E", text: "有点尴尬，说"我有对象了"，然后赶紧离开", characters: ["史蒂夫", "达斯汀"] }
            ]
        },
        {
            id: 18,
            text: "参加聚会时，你通常是哪种状态？",
            options: [
                { label: "A", text: "成为焦点，讲笑话带动气氛，和所有人都聊得来", characters: ["达斯汀", "埃迪"] },
                { label: "B", text: "和熟悉的人坐在一起聊天，不主动认识新朋友", characters: ["乔纳森", "威尔"] },
                { label: "C", text: "一边吐槽聚会无聊，一边和朋友玩游戏", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "观察在场的人，默默记住每个人的特点", characters: ["默里", "南希"] },
                { label: "E", text: "安静地吃零食，偶尔和别人搭话", characters: ["霍莉", "迈克"] }
            ]
        },
        {
            id: 19,
            text: "朋友借了你的贵重物品弄丢了，没提赔偿，你会？",
            options: [
                { label: "A", text: "直接说"那是我很重要的东西，你得赔偿我"", characters: ["埃里卡", "卢卡斯"] },
                { label: "B", text: "找朋友聊天，问清楚情况，再商量解决办法", characters: ["南希", "乔伊斯"] },
                { label: "C", text: "嘴上说"算了算了"，但心里有点不舒服", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "默默接受，觉得朋友不是故意的，以后不借贵重物品了", characters: ["乔纳森", "威尔"] },
                { label: "E", text: "有点难过，但说"没事，我再买一个就好"", characters: ["霍莉", "达斯汀"] }
            ]
        },
        {
            id: 20,
            text: "团队要制作对抗怪物的武器，你会怎么准备？",
            options: [
                { label: "A", text: "查资料找怪物的弱点，根据弱点设计武器结构", characters: ["卢卡斯", "默里"] },
                { label: "B", text: "用身边的材料动手制作，比如改造灭火器、钉枪", characters: ["达斯汀", "埃迪"] },
                { label: "C", text: "吐槽"这玩意儿能有用吗"，但还是帮忙打磨武器边缘", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "先测试武器的威力，根据测试结果调整改进", characters: ["南希", "霍珀"] },
                { label: "E", text: "虽然不知道怎么做，但还是帮大家找材料、递工具", characters: ["迈克", "乔伊斯"] }
            ]
        },
        {
            id: 21,
            text: "你发现家人用奇怪的方式给你发信号，你会？",
            options: [
                { label: "A", text: "立刻按照信号提示行动，哪怕要独自闯入危险区域", characters: ["十一", "霍珀"] },
                { label: "B", text: "仔细记录信号的规律，尝试解读背后的含义", characters: ["乔伊斯", "默里"] },
                { label: "C", text: "嘴上骂"搞什么神秘"，但还是立刻放下手头的事去回应", characters: ["史蒂夫", "埃迪"] },
                { label: "D", text: "分析信号可能的来源，判断家人是否处于危险中", characters: ["南希", "卢卡斯"] },
                { label: "E", text: "很担心，按照信号的方向慢慢寻找家人", characters: ["威尔", "乔纳森"] }
            ]
        },
        {
            id: 22,
            text: "朋友约你去做你不喜欢的极限运动，你会？",
            options: [
                { label: "A", text: "直接拒绝"我不喜欢，不去"", characters: ["十一", "麦克斯"] },
                { label: "B", text: "尝试玩一些简单的项目，然后在旁边为朋友加油", characters: ["霍莉", "达斯汀"] },
                { label: "C", text: "吐槽"这也太危险了"，但还是陪朋友去，在旁边看着", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "分析运动的风险，告诉朋友"哪些项目安全，我们可以玩那些"", characters: ["卢卡斯", "南希"] },
                { label: "E", text: "虽然不喜欢，但还是陪朋友玩，想尝试新事物", characters: ["迈克", "埃迪"] }
            ]
        },
        {
            id: 23,
            text: "朋友被邪恶力量盯上，开始出现幻觉，你会怎么做？",
            options: [
                { label: "A", text: "一直陪着朋友，让TA靠在自己肩上，说"我不会离开你"", characters: ["达斯汀", "乔伊斯"] },
                { label: "B", text: "收集朋友幻觉中的细节，分析邪恶力量的弱点", characters: ["默里", "南希"] },
                { label: "C", text: "帮朋友回忆开心的事，用熟悉的音乐唤醒TA的意识", characters: ["麦克斯", "威尔"] },
                { label: "D", text: "研究邪恶力量的能力，制定保护朋友的防御计划", characters: ["卢卡斯", "霍珀"] },
                { label: "E", text: "每天给朋友画开心的画，试图驱散TA的幻觉", characters: ["霍莉", "十一"] }
            ]
        },
        {
            id: 24,
            text: "别人夸你长得好看/能力强，你会怎么回应？",
            options: [
                { label: "A", text: "哈哈大笑说"那当然，我超厉害的"", characters: ["埃迪", "达斯汀"] },
                { label: "B", text: "不好意思地说"没有啦，你也很厉害"", characters: ["乔纳森", "威尔"] },
                { label: "C", text: "嘴硬"这不是基本操作吗"，但嘴角忍不住上扬", characters: ["麦克斯", "史蒂夫"] },
                { label: "D", text: "认真说"谢谢，我还有很多要学习的地方"", characters: ["南希", "卢卡斯"] },
                { label: "E", text: "笑着说"谢谢，你眼光真好"", characters: ["罗宾", "霍莉"] }
            ]
        },
        {
            id: 25,
            text: "做重要决定时，你更依赖什么？",
            options: [
                { label: "A", text: "直觉、感觉对就做", characters: ["迈克", "十一"] },
                { label: "B", text: "逻辑分析、权衡判断后决定", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "朋友或家人的意见", characters: ["乔伊斯", "霍莉"] },
                { label: "D", text: "自己的经验、以前怎么做就怎么做", characters: ["史蒂夫", "霍珀"] },
                { label: "E", text: "收集相关信息，再结合直觉判断", characters: ["罗宾", "达斯汀"] }
            ]
        },
        {
            id: 26,
            text: "实验室的人想带走你的超能力朋友，你会？",
            options: [
                { label: "A", text: "直接挡在朋友前面说"要带她走先过我这关"", characters: ["迈克", "霍珀"] },
                { label: "B", text: "立刻带朋友从秘密通道离开，自己留下引开追兵", characters: ["史蒂夫", "埃迪"] },
                { label: "C", text: "嘴上骂"你们这群疯子"，但还是和大家一起设置障碍", characters: ["罗宾", "达斯汀"] },
                { label: "D", text: "分析实验室人员的行动路线，制定转移方案", characters: ["南希", "卢卡斯"] },
                { label: "E", text: "默默给朋友塞上手电筒和零食，示意她跟着大家走", characters: ["霍莉", "乔伊斯"] }
            ]
        },
        {
            id: 27,
            text: "你捡到一只看起来很特别的小生物（类似外星生物），你会？",
            options: [
                { label: "A", text: "觉得它很有灵性，立刻取名收养，每天精心照料", characters: ["达斯汀", "霍莉"] },
                { label: "B", text: "立刻拍照发给朋友，查资料分析它的种类和潜在危险", characters: ["罗宾", "南希"] },
                { label: "C", text: "有点害怕但好奇，保持安全距离观察它的行为", characters: ["威尔", "乔纳森"] },
                { label: "D", text: "用盒子装好，联系相关机构确认是否为保护或危险生物", characters: ["卢卡斯", "默里"] },
                { label: "E", text: "担心它有攻击性，找偏僻安全的地方放生", characters: ["迈克", "十一"] }
            ],
            special: "hidden_trigger_1" // 隐藏款触发题1
        },
        {
            id: 28,
            text: "朋友因为失恋情绪低落，你会怎么安慰？",
            options: [
                { label: "A", text: "拉着朋友去打游戏、听音乐，用热闹驱散坏情绪", characters: ["埃迪", "达斯汀"] },
                { label: "B", text: "默默陪着朋友，递上纸巾，等TA愿意说话的时候认真倾听", characters: ["乔伊斯", "威尔"] },
                { label: "C", text: "吐槽"那种人不值得"，然后带朋友去吃好吃的", characters: ["麦克斯", "史蒂夫"] },
                { label: "D", text: "帮朋友分析感情问题，告诉TA"下一个更乖"", characters: ["罗宾", "卢卡斯"] },
                { label: "E", text: "给朋友画一张开心的画，或者送小礼物哄TA开心", characters: ["霍莉", "十一"] }
            ]
        },
        {
            id: 29,
            text: "团队要潜入异世界救被困的朋友，你会主动承担什么角色？",
            options: [
                { label: "A", text: "当先锋，用武器清理路上的怪物", characters: ["十一", "霍珀"] },
                { label: "B", text: "负责导航，标注安全路线和撤离点", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "带足补给品，照顾大家的安全，随时提供支援", characters: ["史蒂夫", "乔伊斯"] },
                { label: "D", text: "记录异世界的环境特征，为后续撤退做准备", characters: ["乔纳森", "默里"] },
                { label: "E", text: "用通讯设备保持和外界的联系，确保信息通畅", characters: ["达斯汀", "罗宾"] }
            ]
        },
        {
            id: 30,
            text: "同事剽窃了你的工作成果，在会议上邀功，你会？",
            options: [
                { label: "A", text: "当场拿出自己的原始资料，直接戳穿对方", characters: ["埃里卡", "霍珀"] },
                { label: "B", text: "会后找领导单独沟通，提交证据说明情况", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "嘴上骂对方"无耻"，但还是冷静收集证据处理", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "有点委屈，但不想把关系搞僵，默默忍了", characters: ["威尔", "乔纳森"] },
                { label: "E", text: "找同事私下谈话，让TA主动向领导澄清", characters: ["乔伊斯", "迈克"] }
            ]
        },
        {
            id: 31,
            text: "你和朋友被困在一个陌生地方，你会？",
            options: [
                { label: "A", text: "主动探索周围环境，寻找出口和可用资源", characters: ["霍珀", "十一"] },
                { label: "B", text: "安抚大家情绪，让每个人分工合作，保持秩序", characters: ["乔伊斯", "南希"] },
                { label: "C", text: "吐槽"怎么这么倒霉"，但还是带着一起找线索", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "观察守卫的换班规律，制定逃跑计划", characters: ["默里", "卢卡斯"] },
                { label: "E", text: "相信带头的人，认真完成分配的任务", characters: ["迈克", "达斯汀"] }
            ]
        },
        {
            id: 32,
            text: "家人反对你和朋友一起做一件有意义的事（比如组建乐队），你会？",
            options: [
                { label: "A", text: "坚持自己的想法，偷偷和朋友继续做，用成果说服家人", characters: ["埃迪", "麦克斯"] },
                { label: "B", text: "和家人沟通，说明这件事的意义，争取他们的理解", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "嘴上答应家人不做了，私下还是会参与", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "用自己的零花钱支持这件事，不告诉家人", characters: ["埃里卡", "达斯汀"] },
                { label: "E", text: "虽然难过，但还是听家人的话，暂时放弃", characters: ["威尔", "霍莉"] }
            ]
        },
        {
            id: 33,
            text: "在超市购物时，突然遇到停电，周围一片漆黑，你会？",
            options: [
                { label: "A", text: "立刻找到身边的朋友，拉着他们到安全区域", characters: ["十一", "霍珀"] },
                { label: "B", text: "拿出手机打开手电筒，观察周围情况，提醒大家别慌", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "嘴上喊"怎么回事啊"，但还是带着安抚身边的老人小孩", characters: ["史蒂夫", "乔伊斯"] },
                { label: "D", text: "分析停电原因，判断是电路问题还是其他异常", characters: ["默里", "达斯汀"] },
                { label: "E", text: "有点害怕，但紧紧跟着前面的人", characters: ["霍莉", "威尔"] }
            ]
        },
        {
            id: 34,
            text: "朋友要参加一场重要的比赛，很紧张，你会怎么鼓励？",
            options: [
                { label: "A", text: "拍着朋友的肩膀说"你超棒的，肯定能赢"", characters: ["埃迪", "霍珀"] },
                { label: "B", text: "帮朋友复盘比赛流程，指出注意事项，增强信心", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "吐槽"紧张有什么用，放松点"，然后陪TA练手", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "给朋友准备小礼物，说"不管输赢，你都是最棒的"", characters: ["乔伊斯", "霍莉"] },
                { label: "E", text: "用搞笑的方式逗朋友开心，缓解紧张情绪", characters: ["达斯汀", "迈克"] }
            ]
        },
        {
            id: 35,
            text: "你发现身边有件事疑点重重，你会？",
            options: [
                { label: "A", text: "立刻深入调查，哪怕会得罪人也要找到真相", characters: ["南希", "霍珀"] },
                { label: "B", text: "收集相关线索，整理成笔记，慢慢分析", characters: ["默里", "卢卡斯"] },
                { label: "C", text: "拉着信任的朋友一起查，分工合作提高效率", characters: ["迈克", "达斯汀"] },
                { label: "D", text: "虽然好奇，但怕惹麻烦，只在私下关注进展", characters: ["乔纳森", "威尔"] },
                { label: "E", text: "把自己的发现告诉长辈，让他们来处理", characters: ["霍莉", "乔伊斯"] }
            ]
        },
        {
            id: 36,
            text: "有人在背后说你的坏话，被你听到了，你会？",
            options: [
                { label: "A", text: "直接走过去问对方"你刚才说我什么"", characters: ["埃里卡", "麦克斯"] },
                { label: "B", text: "不搭理对方，做好自己的事，用实力证明自己", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "嘴硬"我才不在乎"，但心里还是有点不舒服", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "默默走开，过后问信任的朋友自己是不是在哪里做得不好", characters: ["威尔", "乔纳森"] },
                { label: "E", text: "笑着走过去打招呼，让对方不好意思再乱说", characters: ["达斯汀", "霍莉"] }
            ]
        },
        {
            id: 37,
            text: "团队要制作一张对抗怪物的战略地图，你会负责什么？",
            options: [
                { label: "A", text: "绘制地图框架，标注关键位置和怪物分布", characters: ["南希", "卢卡斯"] },
                { label: "B", text: "收集资料，标注怪物的弱点和攻击方式", characters: ["默里", "达斯汀"] },
                { label: "C", text: "吐槽地图太复杂，但还是帮忙上色，让地图更清晰", characters: ["罗宾", "史蒂夫"] },
                { label: "D", text: "用技术手段把地图做成电子版，方便大家查看修改", characters: ["达斯汀", "罗宾"] },
                { label: "E", text: "帮大家找绘制工具，给大家递水，做好后勤工作", characters: ["霍莉", "乔伊斯"] }
            ]
        },
        {
            id: 38,
            text: "过年回家，亲戚不停追问你的工作和感情状况，你会？",
            options: [
                { label: "A", text: "直接说"这是我的私事，就不聊了"", characters: ["十一", "麦克斯"] },
                { label: "B", text: "笑着打哈哈，转移话题聊亲戚感兴趣的事", characters: ["史蒂夫", "罗宾"] },
                { label: "C", text: "吐槽"你们怎么比我还关心"，然后简单说几句", characters: ["埃里卡", "达斯汀"] },
                { label: "D", text: "认真回答亲戚的问题，同时关心他们的生活", characters: ["乔伊斯", "南希"] },
                { label: "E", text: "有点尴尬，找个借口躲进房间", characters: ["乔纳森", "威尔"] }
            ]
        },
        {
            id: 39,
            text: "你和朋友陷入绝境，前面有怪物阻挡，你会？",
            options: [
                { label: "A", text: "主动吸引怪物注意，让朋友趁机逃跑", characters: ["埃迪", "十一"] },
                { label: "B", text: "快速想出脱身办法，带领大家一起反击", characters: ["霍珀", "迈克"] },
                { label: "C", text: "嘴上喊"拼了"，然后拿起身边的东西和怪物对抗", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "观察怪物的弱点，指挥大家集中攻击", characters: ["卢卡斯", "南希"] },
                { label: "E", text: "虽然害怕，但还是跟着大家一起战斗，不放弃", characters: ["威尔", "乔纳森"] }
            ]
        },
        {
            id: 40,
            text: "你养的小生物误伤人后变得胆怯缩起，朋友建议送走它，你会？",
            options: [
                { label: "A", text: "坚信它是受惊失控，先安抚它再向朋友道歉，坚持留下", characters: ["达斯汀", "乔伊斯"] },
                { label: "B", text: "暂时把它隔离，查资料找到饲养方法，解决攻击性问题", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "既心疼又愧疚，和朋友商量暂时寄养，观察后续情况", characters: ["威尔", "霍莉"] },
                { label: "D", text: "承认它的危险性，但先联系动物专家评估，不盲目送走", characters: ["默里", "罗宾"] },
                { label: "E", text: "先照顾受伤朋友，再和家人朋友一起投票决定它的去留", characters: ["迈克", "史蒂夫"] }
            ],
            special: "hidden_trigger_2" // 隐藏款触发题2
        },
        {
            id: 41,
            text: "你发现一种能控制他人意识的力量，有人劝你用它行善，有人让你用它满足私欲，你会？",
            options: [
                { label: "A", text: "用力量控制反对自己的人，建立绝对权威", characters: ["维克纳", "布伦纳"] },
                { label: "B", text: "先尝试用力量解决自己的麻烦，再考虑是否行善", characters: ["比利", "埃迪"] },
                { label: "C", text: "拒绝使用这种力量，担心失控伤害他人", characters: ["威尔", "霍莉"] },
                { label: "D", text: "用力量惩罚坏人，但偶尔会越界", characters: ["霍珀", "麦克斯"] },
                { label: "E", text: "研究力量的来源和限制，想办法掌控它为己所用", characters: ["达斯汀", "默里"] }
            ],
            type: "villain" // 反派题
        },
        {
            id: 42,
            text: "团队计划摧毁你的核心据点，你得知后会怎么做？",
            options: [
                { label: "A", text: "设下层层陷阱，让闯入者有来无回", characters: ["维克纳", "夺心魔"] },
                { label: "B", text: "亲自守在据点，用武力震慑对手", characters: ["比利", "霍珀"] },
                { label: "C", text: "转移核心资源，留下假据点诱骗对方", characters: ["布伦纳", "默里"] },
                { label: "D", text: "策反团队中的薄弱成员，从内部瓦解计划", characters: ["亨利·克里尔", "罗宾"] },
                { label: "E", text: "主动出击，在团队行动前先攻击他们的基地", characters: ["埃迪", "迈克"] }
            ],
            type: "villain" // 反派题
        },
        {
            id: 43,
            text: "有人发现了你的秘密，威胁要曝光你，你会？",
            options: [
                { label: "A", text: "消除对方的记忆或让其消失，永绝后患", characters: ["维克纳", "布伦纳"] },
                { label: "B", text: "用武力威胁对方，让其闭嘴", characters: ["比利", "霍珀"] },
                { label: "C", text: "假装妥协，暗中收集对方的把柄反制", characters: ["默里", "南希"] },
                { label: "D", text: "试图说服对方加入自己，共同实现"目标"", characters: ["亨利·克里尔", "埃迪"] },
                { label: "E", text: "暂时隐忍，等合适时机再报复", characters: ["麦克斯", "史蒂夫"] }
            ],
            type: "villain" // 反派题
        },
        {
            id: 44,
            text: "你认为"力量"的真正意义是什么？",
            options: [
                { label: "A", text: "掌控他人的资本，能让所有人服从自己", characters: ["维克纳", "布伦纳"] },
                { label: "B", text: "保护自己的武器，避免被他人伤害", characters: ["比利", "麦克斯"] },
                { label: "C", text: "同化一切的工具，让世界变成我想要的样子", characters: ["夺心魔", "亨利·克里尔"] },
                { label: "D", text: "守护他人的责任，用力量保护在乎的人", characters: ["霍珀", "十一"] },
                { label: "E", text: "解决问题的手段，仅在必要时使用", characters: ["卢卡斯", "南希"] }
            ],
            type: "villain" // 反派题
        },
        {
            id: 45,
            text: "当你的计划被人破坏，你会怎么做？",
            options: [
                { label: "A", text: "疯狂报复破坏者，让其付出惨痛代价", characters: ["比利", "埃里卡"] },
                { label: "B", text: "冷静分析漏洞，优化计划后卷土重来", characters: ["维克纳", "布伦纳"] },
                { label: "C", text: "同化破坏者，把对方的力量化为己用", characters: ["夺心魔", "亨利·克里尔"] },
                { label: "D", text: "接受失败，和团队一起总结经验", characters: ["迈克", "达斯汀"] },
                { label: "E", text: "暂时搁置计划，观察局势再决定", characters: ["威尔", "乔纳森"] }
            ],
            type: "villain" // 反派题
        },
        {
            id: 46,
            text: "你需要同时处理学业/工作和兴趣，会怎么做？",
            options: [
                { label: "A", text: "制定精确时间表，把时间分成小块，高效完成两边任务", characters: ["罗宾", "南希"] },
                { label: "B", text: "优先完成学业/工作，利用睡前、午休等碎片时间投入兴趣", characters: ["卢卡斯", "乔纳森"] },
                { label: "C", text: "吐槽"时间根本不够用"，但还是熬夜兼顾喜欢的事", characters: ["埃迪", "史蒂夫"] },
                { label: "D", text: "找同样有兴趣的朋友组队，边合作边完成，提高效率", characters: ["达斯汀", "迈克"] },
                { label: "E", text: "偶尔会顾此失彼，发现后赶紧调整重心补回来", characters: ["威尔", "霍莉"] }
            ]
        },
        {
            id: 47,
            text: "看到流浪动物在寒风中发抖，你会？",
            options: [
                { label: "A", text: "立刻去买食物和水，想办法联系救助站", characters: ["乔伊斯", "南希"] },
                { label: "B", text: "蹲下来轻轻安抚，观察是否有主人信息，没有就暂时带回家", characters: ["霍莉", "迈克"] },
                { label: "C", text: "吐槽"谁这么没责任心"，然后拍照发朋友圈求助", characters: ["史蒂夫", "罗宾"] },
                { label: "D", text: "分析附近是否有流浪动物聚集地，联系朋友一起做投喂点", characters: ["默里", "达斯汀"] },
                { label: "E", text: "有点犹豫但还是放下食物，怕自己照顾不好不敢带走", characters: ["威尔", "乔纳森"] }
            ]
        },
        {
            id: 48,
            text: "团队讨论对抗怪物的方案时，你提出的想法被所有人反对，你会？",
            options: [
                { label: "A", text: "坚持自己的观点，拿出具体依据逐条反驳，说服大家", characters: ["卢卡斯", "南希"] },
                { label: "B", text: "先认真听大家的反对理由，再结合意见优化自己的方案", characters: ["罗宾", "达斯汀"] },
                { label: "C", text: "嘟囔"你们根本不懂"，但会后会偷偷验证自己的想法", characters: ["麦克斯", "埃迪"] },
                { label: "D", text: "虽然不服气，但还是先按团队方案执行，找机会证明自己", characters: ["史蒂夫", "迈克"] },
                { label: "E", text: "直接放弃，觉得"大家都反对肯定是我错了"", characters: ["威尔", "霍莉"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 49,
            text: "你代表团队参加竞赛，赛前很紧张，会？",
            options: [
                { label: "A", text: "假装淡定地说"赢定了"，暗中反复练习薄弱环节", characters: ["埃里卡", "卢卡斯"] },
                { label: "B", text: "和团队互相加油打气，一起复盘战术，增强信心", characters: ["迈克", "乔伊斯"] },
                { label: "C", text: "吃点零食缓解紧张，告诉自己"尽力就好，输了也不丢人"", characters: ["史蒂夫", "霍莉"] },
                { label: "D", text: "分析对手的过往战绩，找到他们的弱点制定应对策略", characters: ["南希", "默里"] },
                { label: "E", text: "默默坐在角落深呼吸，反复回想练习时的成功经验", characters: ["威尔", "十一"] }
            ]
        },
        {
            id: 50,
            text: "当小镇出现奇怪的天气和植物变异，大家都很恐慌，你会？",
            options: [
                { label: "A", text: "立刻跑去野外收集变异植物样本，想找出原因", characters: ["达斯汀", "默里"] },
                { label: "B", text: "召集大家囤好物资，制定应急方案，安抚恐慌情绪", characters: ["霍珀", "南希"] },
                { label: "C", text: "翻出小镇历史资料，查看是否有类似异常记录", characters: ["默里", "乔伊斯"] },
                { label: "D", text: "一边安慰身边人"别慌，会有办法的"，一边关注官方消息", characters: ["乔伊斯", "史蒂夫"] },
                { label: "E", text: "相信有能力的人会解决，做好自己该做的事", characters: ["霍莉", "威尔"] }
            ]
        },
        {
            id: 51,
            text: "朋友夸你擅长规划时，你更倾向于？",
            options: [
                { label: "A", text: "立刻否认"我根本不会规划，全靠运气"", characters: ["霍珀", "麦克斯"] },
                { label: "B", text: "坦诚说"谢谢，我会提前列清单梳理步骤"", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "笑着说"其实是朋友帮我提了不少建议"", characters: ["史蒂夫", "达斯汀"] },
                { label: "D", text: "分享经验"我会分优先级，重要的事提前做"", characters: ["罗宾", "默里"] },
                { label: "E", text: "低头说"没有啦，只是随便弄弄"", characters: ["威尔", "乔纳森"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 52,
            text: "团队投票选组长，你更可能？",
            options: [
                { label: "A", text: "主动提名自己并说明优势", characters: ["埃迪", "迈克"] },
                { label: "B", text: "投票给有经验的人并支持其工作", characters: ["乔伊斯", "霍莉"] },
                { label: "C", text: "看朋友投给谁就跟着投", characters: ["威尔", "达斯汀"] },
                { label: "D", text: "分析候选人能力后投给最适配的", characters: ["南希", "卢卡斯"] },
                { label: "E", text: "觉得都差不多，随便投一个", characters: ["史蒂夫", "罗宾"] }
            ],
            type: "neutral" // 中性题
        },
        {
            id: 53,
            text: "别人说你做事冲动时，你会？",
            options: [
                { label: "A", text: "反驳"我才不冲动，是你们太胆小"", characters: ["十一", "埃迪"] },
                { label: "B", text: "反思"可能我没考虑周全，下次改进"", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "笑着说"确实有点，我会慢下来的"", characters: ["达斯汀", "史蒂夫"] },
                { label: "D", text: "不屑"成大事就要果断，想太多没用"", characters: ["维克纳", "比利"] },
                { label: "E", text: "记下来"下次做决定前先问下朋友意见"", characters: ["麦克斯", "霍莉"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 54,
            text: "周末突然下雨打乱出游计划，你会？",
            options: [
                { label: "A", text: "立刻改室内活动，提前订好场馆", characters: ["罗宾", "南希"] },
                { label: "B", text: "在家追剧，顺便整理房间", characters: ["史蒂夫", "乔纳森"] },
                { label: "C", text: "约朋友来家里聚餐聊天", characters: ["埃里卡", "达斯汀"] },
                { label: "D", text: "趁雨天看书，提升自己", characters: ["默里", "卢卡斯"] },
                { label: "E", text: "有点失落，但还是接受并休息", characters: ["威尔", "霍莉"] }
            ],
            type: "neutral" // 中性题
        },
        {
            id: 55,
            text: "朋友说你太在意别人看法时，你会？",
            options: [
                { label: "A", text: "急着辩解"我不在乎别人怎么说"", characters: ["埃迪", "麦克斯"] },
                { label: "B", text: "认真说"我会多考虑建议，但有自己的判断"", characters: ["南希", "卢卡斯"] },
                { label: "C", text: "笑着说"确实会在意，不过会分情况"", characters: ["乔伊斯", "史蒂夫"] },
                { label: "D", text: "分析"有用的意见就听，没用的就忽略"", characters: ["罗宾", "默里"] },
                { label: "E", text: "低头不说话，心里很在意", characters: ["乔纳森", "威尔"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 56,
            text: "买东西时遇到两个喜欢的款式，你会？",
            options: [
                { label: "A", text: "都买下来，难得喜欢", characters: ["埃迪", "霍莉"] },
                { label: "B", text: "对比性价比后选更实用的", characters: ["卢卡斯", "南希"] },
                { label: "C", text: "问朋友意见后再决定", characters: ["迈克", "达斯汀"] },
                { label: "D", text: "选更符合自己风格的，不纠结", characters: ["麦克斯", "罗宾"] },
                { label: "E", text: "先买一个，另一个以后再说", characters: ["史蒂夫", "威尔"] }
            ],
            type: "neutral" // 中性题
        },
        {
            id: 57,
            text: "别人说你做事太犹豫时，你会？",
            options: [
                { label: "A", text: "反驳"这叫谨慎，总比出错好"", characters: ["默里", "卢卡斯"] },
                { label: "B", text: "尝试"下次我会设定决策时间，不拖沓"", characters: ["罗宾", "南希"] },
                { label: "C", text: "笑着说"确实慢，我会加快速度的"", characters: ["史蒂夫", "达斯汀"] },
                { label: "D", text: "不屑"想清楚再做才对，急着做会错"", characters: ["布伦纳", "维克纳"] },
                { label: "E", text: "记下来"下次重要的事提前准备，减少犹豫"", characters: ["迈克", "埃里卡"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 58,
            text: "听到一首好听的歌，你会？",
            options: [
                { label: "A", text: "立刻查歌手信息，下载全专辑", characters: ["埃迪", "默里"] },
                { label: "B", text: "分享给朋友，一起讨论歌词", characters: ["迈克", "达斯汀"] },
                { label: "C", text: "单曲循环，直到听腻为止", characters: ["麦克斯", "十一"] },
                { label: "D", text: "记下歌名，以后慢慢听", characters: ["乔纳森", "威尔"] },
                { label: "E", text: "跟着哼唱，开心就好", characters: ["霍莉", "史蒂夫"] }
            ],
            type: "neutral" // 中性题
        },
        {
            id: 59,
            text: "朋友说你太固执时，你会？",
            options: [
                { label: "A", text: "反驳"我坚持的是对的，为什么要改"", characters: ["埃里卡", "霍珀"] },
                { label: "B", text: "倾听"你觉得我哪里固执，我听听看"", characters: ["南希", "罗宾"] },
                { label: "C", text: "笑着说"可能吧，我会多考虑别人意见"", characters: ["史蒂夫", "达斯汀"] },
                { label: "D", text: "分析"如果我的想法错了，我会改的"", characters: ["卢卡斯", "默里"] },
                { label: "E", text: "不说话，心里还是坚持自己的想法", characters: ["威尔", "乔纳森"] }
            ],
            type: "reverse" // 反向题
        },
        {
            id: 60,
            text: "收到陌生包裹，你会？",
            options: [
                { label: "A", text: "先检查寄件人信息，确认安全再拆", characters: ["乔伊斯", "南希"] },
                { label: "B", text: "直接拆开，好奇里面是什么", characters: ["达斯汀", "埃迪"] },
                { label: "C", text: "让家人帮忙拆，自己在旁边看", characters: ["霍莉", "迈克"] },
                { label: "D", text: "拍照留证，再慢慢拆开", characters: ["乔纳森", "默里"] },
                { label: "E", text: "觉得可能是寄错的，先放着", characters: ["史蒂夫", "威尔"] }
            ],
            type: "neutral" // 中性题
        }
    ]
};









