// 《怪奇物语》性格测试 - 主程序

// ==================== 角色数据 ====================
const characterData = {
  hopper: {
    id: 'hopper',
    name: '霍珀',
    subtitle: '粗犷的守护者',
    radar: {
      action: 8.5,
      cooperation: 6.0,
      guardianship: 9.0,
      achievement: 7.0,
      stability: 6.5,
      empathy: 8.0,
      logic: 7.0,
      intuition: 8.5
    },
    tags: ['#外冷内热', '#行动派', '#靠谱顶梁柱', '#守护本能'],
    analysis: '你像霍珀警长一样，表面粗犷随性，内心却有着强烈的责任感与守护欲。面对危机时，你是第一个挺身而出的人；在日常生活中，你习惯用行动而非言语表达关怀。你兼具乔纳森的默默付出和卢卡斯的谨慎思维，在守护他人时会理性评估风险，不做无谓的牺牲。就像霍珀独闯逆世界救威尔，为十一撑起一个家一样，你在生活中也常常是家人和朋友眼中的"主心骨"。',
    suggestions: {
      work: '项目负责人、危机处理者、团队守护者',
      relationships: '朋友眼中的"靠山"，家人心中的"顶梁柱"',
      growth: '学习更细腻的情感表达，平衡守护他人与自我关怀',
      challenges: '可能承担过多责任，导致自我压力过大'
    }
  },
  nancy: {
    id: 'nancy',
    name: '南希',
    subtitle: '理性的探索者',
    radar: {
      action: 7.5,
      cooperation: 8.5,
      guardianship: 7.0,
      achievement: 9.0,
      stability: 8.5,
      empathy: 6.5,
      logic: 9.0,
      intuition: 7.0
    },
    tags: ['#坚韧不拔', '#逻辑清晰', '#真相追寻者', '#团队智囊'],
    analysis: '从"乖乖女"蜕变为团队的领导者，你骨子里藏着不服输的劲儿。面对疑点会执着地追查真相，不被表面现象迷惑，擅长制定计划、分析问题，总能在混乱中找到关键突破口。如同南希为查芭芭拉失踪案对抗权威、主导制定对抗怪物的战略一样，你是大家信赖的"主心骨"，关键时刻从不掉链子。',
    suggestions: {
      work: '记者、研究员、项目经理、侦探',
      relationships: '朋友信赖的"分析师"，能提供理性建议',
      growth: '利用逻辑分析能力解决复杂问题',
      challenges: '适当关注情感需求，避免过于理性化'
    }
  },
  steve: {
    id: 'steve',
    name: '史蒂夫',
    subtitle: '成长型暖男',
    radar: {
      action: 7.0,
      cooperation: 9.0,
      guardianship: 8.0,
      achievement: 6.5,
      stability: 7.0,
      empathy: 9.0,
      logic: 6.5,
      intuition: 8.5
    },
    tags: ['#嘴硬心软', '#责任感爆棚', '#气氛担当', '#成长型人格'],
    analysis: '从自大校霸成长为可靠的"男妈妈"，你平时爱吐槽、爱耍帅，看似不靠谱，却总能在关键时刻站出来。同时你融合了达斯汀的技术思维和乐观特质，在照顾他人时会用巧妙的方法解决问题，比如用幽默化解矛盾，用小技巧提升效率。默默保护孩子们，陪南希查案，在危机中主动断后，这些都是你的真实写照。',
    suggestions: {
      work: '团队协调者、客户关系维护、新人导师',
      relationships: '朋友中的"开心果"，值得托付的"守护者"',
      growth: '利用共情力建立深厚人际关系',
      challenges: '避免因照顾他人而忽略自我需求'
    }
  },
  dustin: {
    id: 'dustin',
    name: '达斯汀',
    subtitle: '乐观的技术怪才',
    radar: {
      action: 6.5,
      cooperation: 8.5,
      guardianship: 7.0,
      achievement: 8.5,
      stability: 8.0,
      empathy: 7.0,
      logic: 8.5,
      intuition: 6.0
    },
    tags: ['#聪明幽默', '#技术担当', '#开心果', '#团队粘合剂'],
    analysis: '摆弄设备的"科学小达人"，你擅长用科学知识解决实际问题，好奇心强，永远保持乐观。就像达斯汀造通讯设备、用科学方法分析怪物、调解朋友矛盾一样，你在团队中是"技术支援"也是"粘合剂"，总能用奇思妙想和笑声为大家注入活力。你对朋友忠诚，对知识渴望，是团队中不可或缺的"智慧担当"。',
    suggestions: {
      work: '工程师、程序员、科研人员、技术顾问',
      relationships: '朋友中的"智囊团"，总能提供创新解决方案',
      growth: '将技术思维应用于实际问题解决',
      challenges: '乐观态度能感染团队，提升士气'
    }
  },
  eleven: {
    id: 'eleven',
    name: '十一',
    subtitle: '外冷内热的守护者',
    radar: {
      action: 8.5,
      cooperation: 6.0,
      guardianship: 9.0,
      achievement: 6.5,
      stability: 5.5,
      empathy: 8.0,
      logic: 5.0,
      intuition: 9.0
    },
    tags: ['#善良纯粹', '#力量强大', '#忠诚守护', '#直觉驱动'],
    analysis: '童年缺爱却始终保持纯真，你不擅长表达感情，习惯用行动证明在乎。面对危险时，会为了保护他人拼尽全力爆发潜能。如同十一为救朋友对抗怪物，在孤独中依然坚守善良一样，你在生活中看似安静甚至有点疏离，但只要被你认定为朋友，就会得到你毫无保留的守护。你凭借直觉而非逻辑行事，情感是你最强大的力量源泉。',
    suggestions: {
      work: '危机应对者、保镖、艺术家、直觉型决策者',
      relationships: '深度关系中的"守护天使"，情感联结深厚',
      growth: '学习社交技巧，适度表达情感',
      challenges: '避免因直觉冲动而忽略风险评估'
    }
  },
  will: {
    id: 'will',
    name: '威尔',
    subtitle: '敏感的共情者',
    radar: {
      action: 5.5,
      cooperation: 8.0,
      guardianship: 7.5,
      achievement: 6.0,
      stability: 6.0,
      empathy: 9.0,
      logic: 6.5,
      intuition: 8.0
    },
    tags: ['#温柔内向', '#创造力强', '#情绪雷达', '#危机感知'],
    analysis: '习惯隐藏自己的想法，通过绘画等爱好表达内心，你对朋友和家人有着强烈的共情力，能够感知危险和他人情绪。如同威尔用绘画传递逆世界信息、感知思维支配者的行动、默默包容朋友的小脾气一样，你在团队中是"情绪稳定剂"，用安静的方式温暖身边的人。日常中你可能显得被动，但在危机时刻却能爆发出惊人的感知力和行动力。',
    suggestions: {
      work: '艺术家、心理咨询师、创意工作者、观察员',
      relationships: '朋友倾诉的"树洞"，能敏锐感知他人情绪',
      growth: '利用共情力建立深度连接，艺术表达情感',
      challenges: '增强日常主动行动力，适度表达自我需求'
    }
  },
  lucas: {
    id: 'lucas',
    name: '卢卡斯',
    subtitle: '理性的怀疑者',
    radar: {
      action: 7.0,
      cooperation: 7.5,
      guardianship: 7.0,
      achievement: 8.0,
      stability: 8.5,
      empathy: 6.0,
      logic: 9.0,
      intuition: 6.0
    },
    tags: ['#务实谨慎', '#逻辑清晰', '#风险预警员', '#团队分析师'],
    analysis: '做决定前会充分评估风险，不相信直觉，擅长制定稳妥的计划。就像卢卡斯初期质疑十一、制定潜入路线、分析怪物弱点一样，你在团队中是"冷静派"，能及时提醒大家规避风险，用理性为团队保驾护航。你注重事实和数据，对未经证实的说法持怀疑态度，这种谨慎有时会被误解为冷漠，但实则是负责任的表现。',
    suggestions: {
      work: '风险评估师、数据分析师、工程师、项目经理',
      relationships: '朋友信赖的"理性声音"，能提供客观建议',
      growth: '利用逻辑分析能力预防潜在问题',
      challenges: '适当考虑情感因素，避免过于理性化'
    }
  },
  max: {
    id: 'max',
    name: '麦克斯',
    subtitle: '带刺的刺猬',
    radar: {
      action: 7.5,
      cooperation: 6.5,
      guardianship: 8.0,
      achievement: 6.5,
      stability: 5.5,
      empathy: 7.5,
      logic: 6.0,
      intuition: 8.0
    },
    tags: ['#外表叛逆', '#内心脆弱', '#忠诚执着', '#自我保护'],
    analysis: '因家暴经历变得警惕，习惯用毒舌和疏离保护自己，一旦被接纳就会极度忠诚。如同麦克斯初期抗拒交友、为对抗比利爆发勇气、被寄生时仍坚守自我一样，你在生活中看似不好接近，实则内心柔软，对认定的感情会拼尽全力去守护。你的防御机制让你在人际关系中显得矛盾——既渴望连接又害怕受伤。',
    suggestions: {
      work: '自由职业者、艺术家、独立工作者、危机应对者',
      relationships: '一旦建立信任，会成为极度忠诚的朋友',
      growth: '学习建立健康边界，而非完全封闭自我',
      challenges: '避免用攻击性言语伤害在乎的人'
    }
  },
  robin: {
    id: 'robin',
    name: '罗宾',
    subtitle: '毒舌的智囊',
    radar: {
      action: 6.5,
      cooperation: 8.0,
      guardianship: 6.0,
      achievement: 7.5,
      stability: 7.5,
      empathy: 8.5,
      logic: 8.5,
      intuition: 6.0
    },
    tags: ['#高智商', '#爱吐槽', '#细腻共情者', '#语言天才'],
    analysis: '语言天赋拉满的"隐形智囊"，你擅长发现细节、破解难题、逻辑思维突出，总能用幽默化解尴尬。如同罗宾破解苏联密码、精准看穿他人心思、用吐槽调和团队矛盾一样，你在生活中既能提供关键思路，又能在大家情绪低落时逗笑众人，是团队不可或缺的"调味剂"。你的毒舌背后是敏锐的洞察力和深厚的共情能力。',
    suggestions: {
      work: '翻译、心理咨询师、侦探、策略顾问',
      relationships: '朋友的"智慧锦囊"，能用幽默调节气氛',
      growth: '结合逻辑思维与共情力解决复杂人际问题',
      challenges: '多语言和密码破译能力（象征性）'
    }
  },
  eddie: {
    id: 'eddie',
    name: '埃迪',
    subtitle: '叛逆的理想主义者',
    radar: {
      action: 8.0,
      cooperation: 7.0,
      guardianship: 7.5,
      achievement: 8.0,
      stability: 6.5,
      empathy: 7.5,
      logic: 6.0,
      intuition: 8.5
    },
    tags: ['#外表不羁', '#内心善良', '#边缘者守护', '#重金属精神'],
    analysis: '重金属乐队主唱，被小镇视为"怪胎"，但你不在乎他人偏见，坚持做自己，对同频的人极度真诚。如同埃迪组建乐队接纳"异类"、为保护朋友主动吸引怪物牺牲一样，你在生活中敢于打破规则，会为弱者挺身而出，看似"叛逆"却有着最纯粹的正义和善良。你相信每个人都有自己的独特之处，拒绝被社会规范束缚。',
    suggestions: {
      work: '音乐人、创意总监、社会活动家、教师',
      relationships: '边缘群体的"守护者"，能接纳不同个体',
      growth: '在坚持自我的同时，学习策略性妥协',
      challenges: '避免因过度叛逆而忽视现实考量'
    }
  },
  erica: {
    id: 'erica',
    name: '艾瑞卡',
    subtitle: '古灵精怪的小大人',
    radar: {
      action: 7.0,
      cooperation: 6.5,
      guardianship: 6.5,
      achievement: 7.5,
      stability: 7.0,
      empathy: 6.5,
      logic: 7.5,
      intuition: 7.0
    },
    tags: ['#嘴毒心软', '#智商在线', '#小机灵鬼', '#谈判专家'],
    analysis: '年纪虽小却情商极高，你擅长谈判、不怯场，能用小聪明解决大问题，看似毒舌实则很护家人朋友。就像埃里卡用零食换信息、帮史蒂夫破解密码、毒舌吐槽却主动参与战斗一样，你在生活中总能用意想不到的方式化解危机，让人刮目相看。你的机智和早熟让你在同龄人中脱颖而出，但也可能让你显得不够"孩子气"。',
    suggestions: {
      work: '谈判专家、律师、销售、策略顾问',
      relationships: '家庭中的"小大人"，朋友中的"智多星"',
      growth: '利用机智解决实际问题，谈判能力突出',
      challenges: '保持童真一面，平衡成熟与天真'
    }
  },
  joyce: {
    id: 'joyce',
    name: '乔伊斯',
    subtitle: '偏执的母亲',
    radar: {
      action: 6.5,
      cooperation: 8.0,
      guardianship: 9.5,
      achievement: 7.0,
      stability: 5.5,
      empathy: 9.0,
      logic: 6.5,
      intuition: 8.5
    },
    tags: ['#情绪敏感', '#韧性极强', '#家庭支柱', '#直觉母亲'],
    analysis: '看似脆弱，却在孩子遇到危险时爆发出惊人的力量，对在乎的人有着绝对的信任。如同乔伊斯坚信威尔还活着、用灯光和墙画沟通、为救孩子闯入逆世界一样，你在生活中是"家庭的精神支柱"，哪怕被质疑"疯狂"，也会为守护所爱之人坚持到底。你的直觉异常敏锐，尤其在关乎家人安全时，这种直觉几乎从不出错。',
    suggestions: {
      work: '家庭主妇/夫、心理咨询师、危机干预者、直觉型决策者',
      relationships: '家人的"守护神"，能为所爱之人付出一切',
      growth: '在危机时刻爆发出惊人韧性和直觉力',
      challenges: '避免因过度担忧而情绪波动过大'
    }
  },
  jonathan: {
    id: 'jonathan',
    name: '乔纳森',
    subtitle: '沉默的守护者',
    radar: {
      action: 6.0,
      cooperation: 7.5,
      guardianship: 9.0,
      achievement: 6.5,
      stability: 7.0,
      empathy: 8.5,
      logic: 6.5,
      intuition: 7.5
    },
    tags: ['#内向独立', '#责任感强', '#隐形支撑', '#行动证明'],
    analysis: '不擅长表达感情，却会默默为家人和朋友付出，摄影是你情绪的出口。如同乔纳森打工照顾家人、用相机记录真相、默默守护南希和威尔一样，你在生活中是"隐形的顶梁柱"，虽然不显眼，却总能在别人需要时提供最坚实的帮助。你通过行动而非言语表达爱，这种沉默的守护有时会被忽视，但对你来说，行动就是最好的语言。',
    suggestions: {
      work: '摄影师、社工、护理人员、技术支持',
      relationships: '朋友信赖的"幕后支持者"，默默付出型',
      growth: '在危机中提供稳定支持，行动力强',
      challenges: '学习适度表达情感，让他人了解你的付出'
    }
  },
  murray: {
    id: 'murray',
    name: '默里',
    subtitle: '神经质的侦探',
    radar: {
      action: 6.0,
      cooperation: 6.5,
      guardianship: 6.0,
      achievement: 8.0,
      stability: 7.5,
      empathy: 5.5,
      logic: 9.0,
      intuition: 6.5
    },
    tags: ['#偏执多疑', '#逻辑缜密', '#真相挖掘机', '#阴谋论者'],
    analysis: '痴迷于阴谋论，擅长挖掘隐藏的秘密，虽然看似疯癫却总能精准戳破谎言。如同默里破解苏联阴谋，看穿南希和乔纳森的感情，用逻辑分析案件一样，你在生活中是"细节控"，能从蛛丝马迹中找到关键信息，是团队的"秘密武器"。你对真相的执着有时会让他人觉得你偏执，但正是这种执着让你能发现别人忽略的重要细节。',
    suggestions: {
      work: '侦探、研究员、数据分析师、调查记者',
      relationships: '朋友中的"真相揭露者"，能提供独到视角',
      growth: '利用逻辑分析能力破解复杂谜题',
      challenges: '避免因过度怀疑而影响人际关系'
    }
  },
  holly: {
    id: 'holly',
    name: '霍莉',
    subtitle: '懵懂的治愈小天使',
    radar: {
      action: 5.0,
      cooperation: 8.5,
      guardianship: 7.0,
      achievement: 5.5,
      stability: 7.0,
      empathy: 9.5,
      logic: 5.5,
      intuition: 7.5
    },
    tags: ['#天真单纯', '#温柔可爱', '#治愈小天使', '#纯粹善意'],
    analysis: '对复杂的危险懵懂无知，却总能用纯粹的善意温暖他人。如同霍莉无意中撞见怪事却不惊慌、默默给朋友塞零食一样，你在生活中是"调和剂"，虽然不参与核心决策，却能用简单的温暖化解矛盾，让大家感受到纯粹的美好。你的纯真有时会被误解为幼稚，但实际上，这种不加修饰的善良是复杂世界中最珍贵的存在。',
    suggestions: {
      work: '幼儿教师、艺术治疗师、客服、志愿者',
      relationships: '团队中的"治愈者"，能缓解紧张气氛',
      growth: '用纯真善意温暖他人，治愈心灵',
      challenges: '保持纯真的同时，学习必要的社会技能'
    }
  },
  vecna: {
    id: 'vecna',
    name: '维克纳',
    subtitle: '扭曲的理想主义者',
    radar: {
      action: 9.0,
      cooperation: 3.0,
      guardianship: 2.0,
      achievement: 9.5,
      stability: 9.0,
      empathy: 2.5,
      logic: 9.5,
      intuition: 6.0
    },
    tags: ['#高智商', '#偏执', '#毁灭欲望', '#理想主义者'],
    analysis: '拥有强大的精神力量，因童年创伤和对"平庸"的厌恶，走上毁灭与重塑世界的道路。你极度自信，认为自己掌握着"真理"，不屑于迎合世俗规则，会为了实现"理想世界"不择手段。如同维克纳清除"不完美"的人类，建立逆世界秩序一样，你在生活中可能过于自我，忽视他人感受，习惯用掌控力达成目标。你的智力和意志力非凡，但缺乏共情能力。',
    suggestions: {
      work: '科学家、战略家、极端创业者（警示）',
      relationships: '可能孤独，缺乏深层情感连接',
      growth: '极强的逻辑思维和目标执行力',
      challenges: '需警惕控制欲和缺乏共情带来的危害，学习尊重他人自主性，培养同理心'
    }
  },
  billy: {
    id: 'billy',
    name: '比利',
    subtitle: '暴力的迷失者',
    radar: {
      action: 8.5,
      cooperation: 4.0,
      guardianship: 4.5,
      achievement: 7.5,
      stability: 3.0,
      empathy: 3.5,
      logic: 5.0,
      intuition: 7.0
    },
    tags: ['#暴躁易怒', '#外强中干', '#渴望认同', '#迷失自我'],
    analysis: '长期受父亲家暴影响，养成用暴力掩饰内心脆弱的性格，被夺心魔寄生后更显残忍。你看似嚣张跋扈，实则极度缺乏安全感，渴望被关注却用错了方式。如同比利初期欺负同学，后期在亲情唤醒下牺牲自己一样，你在生活中可能习惯用强硬态度伪装自己，内心深处却渴望温暖与接纳。你的愤怒往往源于未被满足的情感需求。',
    suggestions: {
      work: '体力劳动者、安保人员（需情绪管理）',
      relationships: '可能具有攻击性，需要学习健康表达',
      growth: '在危机时刻可能爆发出强大行动力',
      challenges: '暴力倾向需专业心理干预，学习情绪管理，寻求心理支持，建立健康关系'
    }
  },
  brenner: {
    id: 'brenner',
    name: '布伦纳',
    subtitle: '冷酷的操控者',
    radar: {
      action: 7.5,
      cooperation: 3.5,
      guardianship: 2.5,
      achievement: 9.0,
      stability: 8.5,
      empathy: 2.0,
      logic: 9.0,
      intuition: 5.0
    },
    tags: ['#理性至上', '#冷酷无情', '#控制欲强', '#科学狂人'],
    analysis: '为了研究超能力，将十一等孩子视为实验品，无视伦理道德。你极度理智，将目标凌驾于一切之上，擅长用温情或威胁操控他人。如同布伦纳欺骗十一"保护"她、实则利用她的能力一样，你在生活中可能过于看重结果，忽视情感价值，习惯用策略和手段达成目的。你的智力卓越，但道德感薄弱，容易将他人工具化。',
    suggestions: {
      work: '科学家、管理者、战略顾问（需伦理约束）',
      relationships: '可能利用他人，缺乏真诚连接',
      growth: '极强的逻辑思维和战略规划能力',
      challenges: '需警惕将人物化的倾向，尊重他人自主权，培养同理心，建立道德底线'
    }
  },
  dart: {
    id: 'dart',
    name: '达达',
    subtitle: '忠诚的守护萌宠（隐藏款）',
    radar: {
      action: 6.0,
      cooperation: 9.0,
      guardianship: 9.5,
      achievement: 4.0,
      stability: 5.5,
      empathy: 8.5,
      logic: 4.0,
      intuition: 9.0
    },
    tags: ['#外萌内刚', '#绝对忠诚', '#情感联结', '#反差守护'],
    analysis: '恭喜触发隐藏款！你像达斯汀收养的宠物恶魔犬"达达"一样，外表可能看起来无害甚至可爱，但在守护重要的人时能爆发出惊人的力量。你对情感联结极度重视，一旦认定值得守护的对象，就会展现出无条件的忠诚与牺牲精神。你兼具霍莉的纯真温暖和乔纳森的默默守护，用最真诚的方式温暖他人。就像达达从被误解的"怪物"变成团队的守护者一样，你也能用真诚打破隔阂，成为身边人的"专属守护神"。',
    suggestions: {
      work: '专属助理、创意伙伴、情感支持者、治疗动物训练师',
      relationships: '深度关系中的"守护天使"，情感联结深厚',
      growth: '拓展社交圈，避免过度依赖单一关系',
      challenges: '能建立极其深厚的情感纽带，忠诚度极高'
    }
  },
  mike: {
    id: 'mike',
    name: '迈克',
    subtitle: '理想主义领导者',
    radar: {
      action: 8.0,
      cooperation: 7.5,
      guardianship: 7.5,
      achievement: 8.0,
      stability: 6.0,
      empathy: 7.0,
      logic: 6.0,
      intuition: 8.5
    },
    tags: ['#重情义', '#行动力强', '#团队灵魂', '#信念坚定'],
    analysis: '小团体的核心组织者，你对朋友极度忠诚，遇到困难会第一时间召集大家解决。虽然偶尔会因冲动犯错，但从不退缩，能用热情带动大家冲向目标。就像迈克为找威尔召集伙伴、连续353天联系十一、带头对抗怪物一样，你是天生的"组织者"，感染力十足。你的理想主义有时会与现实冲突，但正是这种信念让你在困境中坚持前行。',
    suggestions: {
      work: '团队领导、项目经理、活动策划、社群组织者',
      relationships: '朋友中的"核心人物"，能凝聚团队',
      growth: '利用领导力和感染力动员他人',
      challenges: '学习更理性的决策方法，平衡理想与现实'
    }
  }
};

// ==================== 完整的60道测试题目 ====================
const questions = [
  {
    id: 1,
    text: '发现朋友突然失踪，大家都猜测他去了某个危险的地方，你的第一反应是？',
    options: [
      { label: 'A', text: '立刻拿起工具去搜寻，坚信能找到线索', characters: ['hopper', 'max'] },
      { label: 'B', text: '召集大家分工，有人查轨迹有人联系警方', characters: ['nancy', 'dustin'] },
      { label: 'C', text: '嘴上抱怨情况糟糕，但还是第一个开车载大家去现场', characters: ['steve', 'max'] },
      { label: 'D', text: '分析地图标注可疑区域，推测可能的入口位置', characters: ['vecna'] },
      { label: 'E', text: '一边喊朋友名字一边寻找，内心焦急但保持希望', characters: ['joyce', 'will', 'jonathan'] }
    ]
  },
  {
    id: 2,
    text: '班级里新转来了一个被大家孤立的"怪同学"，你会？',
    options: [
      { label: 'A', text: '主动过去搭话"要不要一起吃饭"，不管别人怎么说', characters: ['eddie'] },
      { label: 'B', text: '观察几天，发现对方和自己有共同爱好再接触', characters: ['will', 'hopper', 'jonathan'] },
      { label: 'C', text: '不主动但也不排斥，对方求助时会悄悄帮忙', characters: ['holly'] },
      { label: 'D', text: '直接找那些孤立别人的人理论，然后拉着新同学加入自己圈子', characters: ['erica'] },
      { label: 'E', text: '默默坐在对方旁边，把自己的零食分一半过去', characters: ['mike', 'eleven'] }
    ]
  },
  {
    id: 3,
    text: '团队要潜入一个危险场所获取重要资料，你的角色更可能是？',
    options: [
      { label: 'A', text: '制定详细潜入路线，标注巡逻时间和监控盲区', characters: ['lucas', 'vecna', 'brenner', 'jonathan'] },
      { label: 'B', text: '主动当先锋"我用诱饵引开守卫，你们去拿资料"', characters: ['eleven', 'max'] },
      { label: 'C', text: '负责改造通讯设备，确保团队内部联络不被干扰', characters: ['dustin', 'jonathan'] },
      { label: 'D', text: '一边吐槽"守卫这么严简直疯了"，一边破解电子门禁', characters: ['steve', 'mike'] },
      { label: 'E', text: '留在外面接应，用相机记录周围异常情况', characters: ['jonathan', 'murray', 'robin'] }
    ]
  },
  {
    id: 4,
    text: '喜欢的人误会你不在乎TA，你会怎么做？',
    options: [
      { label: 'A', text: '直接拉着对方说"我想在乎你，别瞎想"', characters: ['mike', 'robin'] },
      { label: 'B', text: '不解释，默默为TA做很多事，比如帮TA解决麻烦', characters: ['joyce', 'jonathan'] },
      { label: 'C', text: '假装不在乎"谁在乎你啊"，但会偷偷给TA准备喜欢的礼物', characters: ['max', 'eleven'] },
      { label: 'D', text: '用逻辑推理清楚误会的关键点，一条条讲给TA听', characters: ['nancy', 'lucas', 'vecna'] },
      { label: 'E', text: '有点委屈，红着眼眶说"我真的在乎"，然后抱住对方', characters: ['eleven', 'robin'] }
    ]
  },
  {
    id: 5,
    text: '老师怀疑你和朋友偷偷调查危险事件，把你们叫到办公室质问，你会？',
    options: [
      { label: 'A', text: '当场反驳"我们只是在做课外调查，有问题吗"，态度强硬', characters: ['erica', 'hopper'] },
      { label: 'B', text: '冷静说"我们会提交调查报告"，然后暗中把证据藏起来', characters: ['nancy', 'dustin'] },
      { label: 'C', text: '假装嬉皮笑脸"老师您想多了，我们就是瞎玩"，转移话题', characters: ['billy'] },
      { label: 'D', text: '表面顺从"我们知道错了"，私下让朋友把关键证据转移', characters: ['joyce', 'mike'] },
      { label: 'E', text: '很紧张但坚持说"我们没做错"，手不自觉擦紧口袋里的线索', characters: ['will', 'max', 'murray'] }
    ]
  },
  {
    id: 6,
    text: '家人遇到经济困难，你会采取什么行动？',
    options: [
      { label: 'A', text: '偷偷找兼职，把赚的钱悄悄放在家里', characters: ['jonathan'] },
      { label: 'B', text: '主动和家人商量，一起制定省钱计划和增收方案', characters: ['erica', 'nancy'] },
      { label: 'C', text: '嘴上说"别担心"，然后去找各种资源想办法', characters: ['hopper', 'dustin'] },
      { label: 'D', text: '用自己的特长赚钱，比如帮人画画、修东西', characters: ['eddie'] },
      { label: 'E', text: '虽然帮不上大忙，但每天给家人打气，做些力所能及的家务', characters: ['dustin', 'joyce', 'holly'] }
    ]
  },
  {
    id: 7,
    text: '周末独处时，你更倾向于哪种放松方式？',
    options: [
      { label: 'A', text: '研究新的技术或冷门知识，比如组装设备、查阴谋论资料', characters: ['murray'] },
      { label: 'B', text: '画画、写日记，把心里的想法表达出来', characters: ['max', 'eleven'] },
      { label: 'C', text: '听重金属音乐、玩桌游，自己沉浸在爱好里', characters: ['eddie'] },
      { label: 'D', text: '整理房间，把东西分类放好，顺便规划下周的事', characters: ['erica', 'robin', 'lucas'] },
      { label: 'E', text: '窝在沙发上看剧，吃零食，什么都不想', characters: ['steve', 'mike'] }
    ]
  },
  {
    id: 8,
    text: '朋友之间因为小事吵架，吵得很凶，你会？',
    options: [
      { label: 'A', text: '拍桌子喊"别吵了！多大点事"，然后拉着两人和解', characters: ['hopper', 'erica'] },
      { label: 'B', text: '分别找两人聊天，帮他们分析对方的想法，化解矛盾', characters: ['robin', 'will'] },
      { label: 'C', text: '拿出零食或游戏说"先别吵了，玩会儿再聊"，用气氛缓和关系', characters: ['dustin', 'eddie'] },
      { label: 'D', text: '默默坐在旁边，等他们吵完递水，再慢慢劝', characters: ['jonathan', 'holly', 'vecna'] },
      { label: 'E', text: '直接指出两人的问题"你不该这么说""你也有不对"，一针见血', characters: ['nancy', 'hopper'] }
    ]
  },
  {
    id: 9,
    text: '在森林里露营时，突然看到像怪兽一样的怪异生物，你的反应是？',
    options: [
      { label: 'A', text: '立刻挡住朋友前面，准备用身边的木棍对抗', characters: ['eleven', 'hopper'] },
      { label: 'B', text: '快速拉着朋友躲到树后，观察生物的行动规律', characters: ['lucas', 'vecna', 'brenner', 'murray'] },
      { label: 'C', text: '嘴上喊"我的天这是什么鬼"，但还是捡起石头砸向远处引开它', characters: ['steve', 'dustin'] },
      { label: 'D', text: '拿出手机拍下证据，同时拉着朋友往草地跑并喊人', characters: ['dustin', 'mike'] },
      { label: 'E', text: '吓得手心冒汗，但还是跟着朋友一起撤退', characters: ['will', 'max', 'holly'] }
    ]
  },
  {
    id: 10,
    text: '别人精心为你准备了生日礼物，你不喜欢，会怎么说？',
    options: [
      { label: 'A', text: '开心地收下说"谢谢！我很喜欢"，过后好好珍藏', characters: ['holly'] },
      { label: 'B', text: '坦诚说"谢谢，但我更喜欢XX类型的"，同时夸礼物的细节', characters: ['robin', 'lucas'] },
      { label: 'C', text: '嘴硬"谁要你送礼物啊"，但转头就戴在身上', characters: ['max', 'eleven'] },
      { label: 'D', text: '感动地说"你居然记得我喜欢这个风格"，然后回赠对方礼物', characters: ['jonathan'] },
      { label: 'E', text: '认真说"谢谢，这个礼物很特别，我会好好用的"', characters: ['erica', 'lucas', 'vecna'] }
    ]
  },
  {
    id: 11,
    text: '领导让你做一件超出能力范围的紧急任务，你会？',
    options: [
      { label: 'A', text: '一口答应"保证完成"，然后疯狂查资料请教别人', characters: ['mike', 'hopper'] },
      { label: 'B', text: '说"我需要XX帮助，但我会尽力"，然后制定详细步骤', characters: ['nancy', 'hopper'] },
      { label: 'C', text: '吐槽"这任务也太离谱了"，但还是熬夜赶工', characters: ['billy'] },
      { label: 'D', text: '分析任务难点，告诉领导"哪些部分我能完成，哪些需要支援"', characters: ['lucas', 'dart', 'brenner', 'erica'] },
      { label: 'E', text: '虽然没把握，但还是说"我试试"，然后默默努力', characters: ['jonathan', 'will'] }
    ]
  },
  {
    id: 12,
    text: '对于学校/公司的不合理规定，你会？',
    options: [
      { label: 'A', text: '直接无视，该怎么做就怎么做，被抓了也不认错', characters: ['eddie'] },
      { label: 'B', text: '收集大家的意见，写成建议书提交给管理员', characters: ['nancy', 'mike'] },
      { label: 'C', text: '嘴上吐槽不停，但该遵守还是遵守，偶尔偷偷违规', characters: ['billy', 'steve'] },
      { label: 'D', text: '找到规定的漏洞，用合理方式规避，不被发现', characters: ['murray'] },
      { label: 'E', text: '虽然觉得不合理，但还是乖乖遵守', characters: ['will', 'dustin', 'eddie'] }
    ]
  },
  {
    id: 13,
    text: '发现信任的朋友被邪恶力量控制，行为异常，你会？',
    options: [
      { label: 'A', text: '直接抓住朋友的手说"你清醒点"，尝试用熟悉的事唤醒TA', characters: ['eleven', 'will'] },
      { label: 'B', text: '默默观察朋友的行为，记录异常表现，寻找规律', characters: ['jonathan', 'murray', 'brenner'] },
      { label: 'C', text: '一边喊朋友的名字一边试图限制TA的行动，不让TA伤人', characters: ['hopper', 'eleven'] },
      { label: 'D', text: '立刻召集团队，分析控制的特点，制定唤醒方案', characters: ['robin', 'nancy'] },
      { label: 'E', text: '很伤心但不放弃，每天给朋友讲以前的故事，试图唤醒回忆', characters: ['will', 'joyce'] }
    ]
  },
  {
    id: 14,
    text: '团队合作中，有个队友一直拖后腿，你会？',
    options: [
      { label: 'A', text: '耐心教队友怎么做，把任务拆分成小步骤帮TA完成', characters: ['joyce', 'murray'] },
      { label: 'B', text: '直接说"你这样不行，我来做这部分，你做XX简单的"', characters: ['erica', 'nancy'] },
      { label: 'C', text: '吐槽"你能不能上点心"，但还是帮TA补漏洞', characters: ['billy', 'steve'] },
      { label: 'D', text: '找队友聊天，了解TA拖后腿的原因，再一起解决', characters: ['mike', 'erica'] },
      { label: 'E', text: '不说什么，自己多做一点，确保任务完成', characters: ['jonathan', 'holly', 'dart'] }
    ]
  },
  {
    id: 15,
    text: '考试/考核失利，成绩很差，你会怎么调整？',
    options: [
      { label: 'A', text: '不服输，把错题整理出来疯狂刷题，下次一定要赢', characters: ['mike', 'nancy'] },
      { label: 'B', text: '分析失利原因，制定学习计划，每天按计划执行', characters: ['nancy', 'robin'] },
      { label: 'C', text: '吐槽"这题目出得太偏了"，但还是会订正错题', characters: ['billy', 'steve'] },
      { label: 'D', text: '默默地把试卷藏起来，然后偷偷努力，不让别人知道', characters: ['jonathan', 'will'] },
      { label: 'E', text: '难过一会儿，然后找朋友出去玩散散心，再回来学习', characters: ['dustin', 'mike'] }
    ]
  },
  {
    id: 16,
    text: '看到朋友被小镇居民误会是"怪物的帮凶"，你会？',
    options: [
      { label: 'A', text: '立刻站出来喊"他不是帮凶，我可以证明"，哪怕被大家围攻', characters: ['hopper', 'eleven'] },
      { label: 'B', text: '收集朋友无辜的证据，比如不在场证明，偷偷贴在小镇公告栏', characters: ['nancy', 'max'] },
      { label: 'C', text: '拉着朋友躲起来，嘴上骂"这群人疯了"，然后想办法澄清', characters: ['max', 'hopper'] },
      { label: 'D', text: '分析居民误会的原因，找到关键人物解释清楚', characters: ['lucas', 'murray', 'vecna'] },
      { label: 'E', text: '跟着大家一起保护朋友，不让他被居民伤害', characters: ['holly'] }
    ]
  },
  {
    id: 17,
    text: '被陌生人搭讪要联系方式，你不想给，会怎么拒绝？',
    options: [
      { label: 'A', text: '直接说"不好意思，我不给陌生人联系方式"', characters: ['eleven', 'max'] },
      { label: 'B', text: '笑着说"我手机没带，不好意思"', characters: ['erica', 'robin'] },
      { label: 'C', text: '怼回去"你谁啊，凭什么给你"', characters: ['erica', 'max'] },
      { label: 'D', text: '假装没听见，快步走开', characters: ['jonathan', 'will'] },
      { label: 'E', text: '有点尴尬，说"我有对象了"，然后赶紧离开', characters: ['steve', 'robin'] },
    ]
  },
  {
    id: 18,
    text: '参加聚会时，你通常是哪种状态？',
    options: [
      { label: 'A', text: '成为焦点，讲笑话带动气氛，和所有人都聊得来', characters: ['dart'] },
      { label: 'B', text: '和熟悉的人坐在一起聊天，不主动认识新朋友', characters: ['jonathan', 'will', 'hopper'] },
      { label: 'C', text: '一边吐槽聚会无聊，一边和朋友玩游戏', characters: ['billy', 'steve'] },
      { label: 'D', text: '观察在场的人，默默记住每个人的特点', characters: ['murray', 'brenner', 'vecna'] },
      { label: 'E', text: '安静地吃零食，偶尔和别人搭话', characters: ['holly'] }
    ]
  },
  {
    id: 19,
    text: '朋友借了你的贵重物品弄丢了，没提赔偿，你会？',
    options: [
      { label: 'A', text: '直接说"那是我很重要的东西，你得赔偿我"', characters: ['erica', 'nancy'] },
      { label: 'B', text: '找朋友聊天，问清楚情况，再商量解决办法', characters: ['joyce', 'robin'] },
      { label: 'C', text: '嘴上说"算了算了"，但心里有点不舒服', characters: ['billy', 'steve'] },
      { label: 'D', text: '默默接受，觉得朋友不是故意的，以后不借贵重物品了', characters: ['jonathan', 'will'] },
      { label: 'E', text: '有点难过，但说"没事，我再买一个就好"', characters: ['holly', 'dustin'] }
    ]
  },
  {
    id: 20,
    text: '团队要制作对抗怪物的武器，你会怎么准备？',
    options: [
      { label: 'A', text: '查资料找怪物的弱点，根据弱点设计武器结构', characters: ['lucas', 'murray', 'brenner'] },
      { label: 'B', text: '用身边的材料动手制作，比如改造灭火器、钉枪', characters: ['dart', 'eddie'] },
      { label: 'C', text: '吐槽地图太复杂，但还是帮忙上色，让地图更清晰', characters: ['billy', 'steve'] },
      { label: 'D', text: '先测试武器的威力，根据测试结果调整改进', characters: ['vecna', 'brenner'] },
      { label: 'E', text: '虽然不知道怎么做，但还是帮大家找材料、递工具', characters: ['mike', 'joyce'] }
    ]
  },
  {
    id: 21,
    text: '你发现家人用奇怪的方式给你发信号，你会？',
    options: [
      { label: 'A', text: '立刻按照信号提示行动，哪怕要独自闯入危险区域', characters: ['eleven', 'max'] },
      { label: 'B', text: '仔细记录信号的规律，尝试解读背后的含义', characters: ['joyce', 'lucas'] },
      { label: 'C', text: '嘴上骂"搞什么神秘"，但还是立刻放下手头的事去回应', characters: ['steve', 'eddie'] },
      { label: 'D', text: '分析信号可能的来源，判断家人是否处于危险中', characters: ['nancy', 'lucas', 'murray'] },
      { label: 'E', text: '很担心，按照信号的方向慢慢寻找家人', characters: ['will', 'hopper', 'lucas'] }
    ]
  },
  {
    id: 22,
    text: '朋友约你去做你不喜欢的极限运动，你会？',
    options: [
      { label: 'A', text: '直接拒绝"我不喜欢，不去"', characters: ['eleven', 'robin'] },
      { label: 'B', text: '尝试玩一些简单的项目，然后在旁边为朋友加油', characters: ['dart', 'robin'] },
      { label: 'C', text: '吐槽"这也太危险了"，但还是陪朋友去，在旁边看着', characters: ['billy', 'max'] },
      { label: 'D', text: '分析运动的风险，告诉朋友"哪些项目安全，我们可以玩那些"', characters: ['nancy', 'erica', 'lucas'] },
      { label: 'E', text: '虽然不喜欢，但还是陪朋友玩，想尝试新事物', characters: ['mike'] }
    ]
  },
  {
    id: 23,
    text: '朋友被邪恶力量盯上，开始出现幻觉，你会怎么做？',
    options: [
      { label: 'A', text: '一直陪着朋友，让TA靠在自己肩上，说"我不会离开你"', characters: ['joyce', 'jonathan'] },
      { label: 'B', text: '收集朋友幻觉中的细节，分析邪恶力量的弱点', characters: ['brenner', 'vecna', 'dart'] },
      { label: 'C', text: '帮朋友回忆开心的事，用熟悉的音乐唤醒TA的意识', characters: ['max', 'will'] },
      { label: 'D', text: '研究邪恶力量的能力，制定保护朋友的防御计划', characters: ['nancy', 'hopper'] },
      { label: 'E', text: '每天给朋友画开心的画，试图驱散TA的幻觉', characters: ['holly', 'eleven'] }
    ]
  },
  {
    id: 24,
    text: '别人夸你长得好看/能力强，你会怎么回应？',
    options: [
      { label: 'A', text: '哈哈大笑说"那当然，我超厉害的"', characters: ['eddie', 'dart'] },
      { label: 'B', text: '不好意思地说"没有啦，你也很厉害"', characters: ['jonathan', 'will'] },
      { label: 'C', text: '嘴硬"这不是基本操作吗"，但嘴角忍不住上扬', characters: ['max', 'eleven'] },
      { label: 'D', text: '认真说"谢谢，我还有很多要学习的地方"', characters: ['erica', 'nancy'] },
      { label: 'E', text: '笑着说"谢谢，你眼光真好"', characters: ['robin', 'holly'] }
    ]
  },
  {
    id: 25,
    text: '做重要决定时，你更依赖什么？',
    options: [
      { label: 'A', text: '直觉、感觉对就做', characters: ['eleven', 'will'] },
      { label: 'B', text: '逻辑分析、权衡判断后决定', characters: ['lucas', 'vecna', 'brenner'] },
      { label: 'C', text: '朋友或家人的意见', characters: ['joyce', 'holly'] },
      { label: 'D', text: '自己的经验、以前怎么做就怎么做', characters: ['steve', 'hopper'] },
      { label: 'E', text: '收集相关信息，再结合直觉判断', characters: ['robin', 'dustin'] }
    ]
  },
  {
    id: 26,
    text: '实验室的人想带走你的超能力朋友，你会？',
    options: [
      { label: 'A', text: '直接挡在朋友前面说"要带她走先过我这关"', characters: ['hopper', 'eleven'] },
      { label: 'B', text: '立刻带朋友从秘密通道离开，自己留下引开追兵', characters: ['steve', 'lucas'] },
      { label: 'C', text: '嘴上骂"你们这群疯子"，但还是和大家一起设置障碍', characters: ['robin', 'dart'] },
      { label: 'D', text: '分析实验室人员的行动路线，制定转移方案', characters: ['nancy', 'lucas', 'vecna'] },
      { label: 'E', text: '默默给朋友塞上手电筒和零食，示意她跟着大家走', characters: ['holly', 'joyce'] }
    ]
  },
  {
    id: 27,
    text: '你捡到一只看起来很特别的小生物（类似外星生物），你会？',
    options: [
      { label: 'A', text: '觉得它很有灵性，立刻取名收养，每天精心照料', characters: ['dart', 'dustin'] },
      { label: 'B', text: '立刻拍照发给朋友，查资料分析它的种类和潜在危险', characters: ['brenner', 'vecna', 'murray'] },
      { label: 'C', text: '有点害怕但好奇，保持安全距离观察它的行为', characters: ['will', 'max', 'erica'] },
      { label: 'D', text: '用盒子装好，联系相关机构确认是否为保护或危险生物', characters: ['murray', 'brenner'] },
      { label: 'E', text: '担心它有攻击性，找偏僻安全的地方放生', characters: ['mike', 'eleven'] }
    ]
  },
  {
    id: 28,
    text: '朋友因为失恋情绪低落，你会怎么安慰？',
    options: [
      { label: 'A', text: '拉着朋友去打游戏、听音乐，用热闹驱散坏情绪', characters: ['eddie', 'dart'] },
      { label: 'B', text: '默默陪着朋友，递上纸巾，等TA愿意说话的时候认真倾听', characters: ['joyce', 'will', 'jonathan'] },
      { label: 'C', text: '吐槽"那种人不值得"，然后带朋友去吃好吃的', characters: ['max', 'hopper'] },
      { label: 'D', text: '帮朋友分析感情问题，告诉TA"下一个更乖"', characters: ['robin', 'dustin'] },
      { label: 'E', text: '给朋友画一张开心的画，或者送小礼物哄TA开心', characters: ['holly', 'eleven'] }
    ]
  },
  {
    id: 29,
    text: '团队要潜入异世界救被困的朋友，你会主动承担什么角色？',
    options: [
      { label: 'A', text: '当先锋，用武器清理路上的怪物', characters: ['eleven', 'hopper'] },
      { label: 'B', text: '负责导航，标注安全路线和撤离点', characters: ['lucas', 'vecna', 'brenner'] },
      { label: 'C', text: '带足补给品，照顾大家的安全，随时提供支援', characters: ['steve', 'joyce', 'robin'] },
      { label: 'D', text: '记录异世界的环境特征，为后续撤退做准备', characters: ['jonathan', 'murray', 'robin'] },
      { label: 'E', text: '用通讯设备保持和外界的联系，确保信息通畅', characters: ['dustin'] }
    ]
  },
  {
    id: 30,
    text: '同事剽窃了你的工作成果，在会议上邀功，你会？',
    options: [
      { label: 'A', text: '当场拿出自己的原始资料，直接戳穿对方', characters: ['hopper', 'eleven'] },
      { label: 'B', text: '会后找领导单独沟通，提交证据说明情况', characters: ['brenner', 'nancy'] },
      { label: 'C', text: '嘴上骂对方"无耻"，但还是冷静收集证据处理', characters: ['billy', 'max'] },
      { label: 'D', text: '有点委屈，但不想把关系搞僵，默默忍了', characters: ['jonathan', 'will'] },
      { label: 'E', text: '找同事私下谈话，让TA主动向领导澄清', characters: ['joyce', 'mike', 'robin'] }
    ]
  },
  {
    id: 31,
    text: '你和朋友被困在一个陌生地方，你会？',
    options: [
      { label: 'A', text: '主动探索周围环境，寻找出口和可用资源', characters: ['hopper'] },
      { label: 'B', text: '安抚大家情绪，让每个人分工合作，保持秩序', characters: ['joyce', 'murray'] },
      { label: 'C', text: '吐槽"怎么这么倒霉"，但还是带着一起找线索', characters: ['billy', 'steve'] },
      { label: 'D', text: '观察守卫的换班规律，制定逃跑计划', characters: ['murray', 'brenner', 'vecna'] },
      { label: 'E', text: '相信带头的人，认真完成分配的任务', characters: ['mike', 'dustin'] }
    ]
  },
  {
    id: 32,
    text: '家人反对你和朋友一起做一件有意义的事（比如组建乐队），你会？',
    options: [
      { label: 'A', text: '坚持自己的想法，偷偷和朋友继续做，用成果说服家人', characters: ['eddie'] },
      { label: 'B', text: '和家人沟通，说明这件事的意义，争取他们的理解', characters: ['nancy', 'robin'] },
      { label: 'C', text: '嘴上答应家人不做了，私下还是会参与', characters: ['billy'] },
      { label: 'D', text: '用自己的零花钱支持这件事，不告诉家人', characters: ['erica', 'dustin'] },
      { label: 'E', text: '虽然难过，但还是听家人的话，暂时放弃', characters: ['will', 'dustin'] }
    ]
  },
  {
    id: 33,
    text: '在超市购物时，突然遇到停电，周围一片漆黑，你会？',
    options: [
      { label: 'A', text: '立刻找到身边的朋友，拉着他们到安全区域', characters: ['eleven', 'max'] },
      { label: 'B', text: '拿出手机打开手电筒，观察周围情况，提醒大家别慌', characters: ['nancy', 'erica'] },
      { label: 'C', text: '嘴上喊"怎么回事啊"，但还是帮着安抚身边的老人小孩', characters: ['steve', 'joyce', 'erica'] },
      { label: 'D', text: '分析停电原因，判断是电路问题还是其他异常', characters: ['murray', 'dart', 'brenner'] },
      { label: 'E', text: '有点害怕，但紧紧跟着前面的人', characters: ['holly', 'will'] }
    ]
  },
  {
    id: 34,
    text: '朋友要参加一场重要的比赛，很紧张，你会怎么鼓励？',
    options: [
      { label: 'A', text: '拍着朋友的肩膀说"你超棒的，肯定能赢"', characters: ['hopper', 'eleven'] },
      { label: 'B', text: '帮朋友复盘比赛流程，指出注意事项，增强信心', characters: ['lucas', 'nancy'] },
      { label: 'C', text: '吐槽"紧张有什么用，放松点"，然后陪TA练手', characters: ['robin', 'erica'] },
      { label: 'D', text: '给朋友准备小礼物，说"不管输赢，你都是最棒的"', characters: ['joyce'] },
      { label: 'E', text: '用搞笑的方式逗朋友开心，缓解紧张情绪', characters: ['dustin', 'mike'] }
    ]
  },
  {
    id: 35,
    text: '你发现身边有件事疑点重重，你会？',
    options: [
      { label: 'A', text: '立刻深入调查，哪怕会得罪人也要找到真相', characters: ['vecna', 'lucas', 'brenner'] },
      { label: 'B', text: '收集相关线索，整理成笔记，慢慢分析', characters: ['murray', 'lucas'] },
      { label: 'C', text: '拉着信任的朋友一起查，分工合作提高效率', characters: ['dart'] },
      { label: 'D', text: '虽然好奇，但怕惹麻烦，只在私下关注进展', characters: ['jonathan', 'will'] },
      { label: 'E', text: '把自己的发现告诉长辈，让他们来处理', characters: ['holly', 'joyce'] }
    ]
  },
  {
    id: 36,
    text: '有人在背后说你的坏话，被你听到了，你会？',
    options: [
      { label: 'A', text: '直接走过去问对方"你刚才说我什么"', characters: ['erica', 'max'] },
      { label: 'B', text: '不搭理对方，做好自己的事，用实力证明自己', characters: ['nancy', 'lucas'] },
      { label: 'C', text: '嘴硬"我才不在乎"，但心里还是有点不舒服', characters: ['billy', 'max'] },
      { label: 'D', text: '默默走开，过后问信任的朋友自己是不是在哪里做得不好', characters: ['jonathan', 'will'] },
      { label: 'E', text: '笑着走过去打招呼，让对方不好意思再乱说', characters: ['dustin'] }
    ]
  },
  {
    id: 37,
    text: '团队要制作一张对抗怪物的战略地图，你会负责什么？',
    options: [
      { label: 'A', text: '绘制地图框架，标注关键位置和怪物分布', characters: ['lucas', 'vecna', 'brenner', 'robin'] },
      { label: 'B', text: '收集资料，标注怪物的弱点和攻击方式', characters: ['murray', 'dart'] },
      { label: 'C', text: '吐槽地图太复杂，但还是帮忙上色，让地图更清晰', characters: ['billy', 'max'] },
      { label: 'D', text: '用技术手段把地图做成电子版，方便大家查看修改', characters: ['robin', 'murray'] },
      { label: 'E', text: '帮大家找绘制工具，给大家递水，做好后勤工作', characters: ['holly', 'joyce'] }
    ]
  },
  {
    id: 38,
    text: '过年回家，亲戚不停追问你的工作和感情状况，你会？',
    options: [
      { label: 'A', text: '直接说"这是我的私事，就不聊了"', characters: ['eleven', 'robin'] },
      { label: 'B', text: '笑着打哈哈，转移话题聊亲戚感兴趣的事', characters: ['billy', 'max'] },
      { label: 'C', text: '吐槽"你们怎么比我还关心"，然后简单说几句', characters: ['erica', 'dart'] },
      { label: 'D', text: '认真回答亲戚的问题，同时关心他们的生活', characters: ['joyce', 'nancy'] },
      { label: 'E', text: '有点尴尬，找个借口躲进房间', characters: ['jonathan', 'will'] }
    ]
  },
  {
    id: 39,
    text: '你和朋友陷入绝境，前面有怪物阻挡，你会？',
    options: [
      { label: 'A', text: '主动吸引怪物注意，让朋友趁机逃跑', characters: ['eddie', 'eleven'] },
      { label: 'B', text: '快速想出脱身办法，带领大家一起反击', characters: ['hopper'] },
      { label: 'C', text: '嘴上喊"拼了"，然后拿起身边的东西和怪物对抗', characters: ['billy', 'max'] },
      { label: 'D', text: '观察怪物的弱点，指挥大家集中攻击', characters: ['lucas', 'vecna', 'brenner'] },
      { label: 'E', text: '虽然害怕，但还是跟着大家一起战斗，不放弃', characters: ['will', 'mike'] }
    ]
  },
  {
    id: 40,
    text: '你养的小生物误伤人后变得胆怯缩起，朋友建议送走它，你会？',
    options: [
      { label: 'A', text: '坚信它是受惊失控，先安抚它再向朋友道歉，坚持留下', characters: ['dart', 'joyce'] },
      { label: 'B', text: '暂时把它隔离，查资料找到饲养方法，解决攻击性问题', characters: ['nancy', 'murray'] },
      { label: 'C', text: '既心疼又愧疚，和朋友商量暂时寄养，观察后续情况', characters: ['holly', 'lucas'] },
      { label: 'D', text: '承认它的危险性，但先联系动物专家评估，不盲目送走', characters: ['murray', 'brenner', 'dart'] },
      { label: 'E', text: '先照顾受伤朋友，再和家人朋友一起投票决定它的去留', characters: ['mike', 'steve', 'robin', 'jonathan'] }
    ]
  },
  // 反派题 41-45
  {
    id: 41,
    text: '你发现一种能控制他人意识的力量，有人劝你用它行善，有人让你用它满足私欲，你会？',
    options: [
      { label: 'A', text: '用力量控制反对自己的人，建立绝对权威', characters: ['vecna', 'brenner'] },
      { label: 'B', text: '先尝试用力量解决自己的麻烦，再考虑是否行善', characters: ['billy', 'eddie'] },
      { label: 'C', text: '拒绝使用这种力量，担心失控伤害他人', characters: ['holly'] },
      { label: 'D', text: '用力量惩罚坏人，但偶尔会越界', characters: ['hopper', 'eleven'] },
      { label: 'E', text: '研究力量的来源和限制，想办法掌控它为己所用', characters: ['dustin', 'murray'] }
    ]
  },
  {
    id: 42,
    text: '团队计划摧毁你的核心据点，你得知后会怎么做？',
    options: [
      { label: 'A', text: '设下层层陷阱，让闯入者有来无回', characters: ['vecna', 'brenner'] },
      { label: 'B', text: '亲自守在据点，用武力震慑对手', characters: ['billy', 'hopper'] },
      { label: 'C', text: '转移核心资源，留下假据点诱骗对方', characters: ['brenner', 'vecna'] },
      { label: 'D', text: '策反团队中的薄弱成员，从内部瓦解计划', characters: ['vecna', 'brenner'] },
      { label: 'E', text: '主动出击，在团队行动前先攻击他们的基地', characters: ['eddie', 'mike'] }
    ]
  },
  {
    id: 43,
    text: '有人发现了你的秘密，威胁要曝光你，你会？',
    options: [
      { label: 'A', text: '消除对方的记忆或让其消失，永绝后患', characters: ['vecna', 'brenner'] },
      { label: 'B', text: '用武力威胁对方，让其闭嘴', characters: ['billy', 'hopper'] },
      { label: 'C', text: '假装妥协，暗中收集对方的把柄反制', characters: ['murray', 'nancy'] },
      { label: 'D', text: '试图说服对方加入自己，共同实现"目标"', characters: ['vecna', 'brenner'] },
      { label: 'E', text: '暂时隐忍，等合适时机再报复', characters: ['max', 'steve', 'billy', 'vecna'] },
    ]
  },
  {
    id: 44,
    text: '你认为"力量"的真正意义是什么？',
    options: [
      { label: 'A', text: '掌控他人的资本，能让所有人服从自己', characters: ['vecna', 'brenner'] },
      { label: 'B', text: '保护自己的武器，避免被他人伤害', characters: ['billy', 'max'] },
      { label: 'C', text: '同化一切的工具，让世界变成我想要的样子', characters: ['vecna', 'brenner'] },
      { label: 'D', text: '守护他人的责任，用力量保护在乎的人', characters: ['hopper', 'eleven', 'will'] },
      { label: 'E', text: '解决问题的手段，仅在必要时使用', characters: ['lucas', 'nancy', 'dustin'] }
    ]
  },
  {
    id: 45,
    text: '当你的计划被人破坏，你会怎么做？',
    options: [
      { label: 'A', text: '疯狂报复破坏者，让其付出惨痛代价', characters: ['billy', 'erica'] },
      { label: 'B', text: '冷静分析漏洞，优化计划后卷土重来', characters: ['vecna', 'brenner'] },
      { label: 'C', text: '同化破坏者，把对方的力量化为己用', characters: ['vecna', 'brenner'] },
      { label: 'D', text: '接受失败，和团队一起总结经验', characters: ['mike', 'dart'] },
      { label: 'E', text: '暂时搁置计划，观察局势再决定', characters: ['will', 'jonathan'] }
    ]
  },
  // 中性题和反向题 46-60
  {
    id: 46,
    text: '你需要同时处理学业/工作和兴趣，会怎么做？',
    options: [
      { label: 'A', text: '制定精确时间表，把时间分成小块，高效完成两边任务', characters: ['brenner', 'lucas', 'vecna'] },
      { label: 'B', text: '优先完成学业/工作，利用睡前、午休等碎片时间投入兴趣', characters: ['nancy', 'jonathan'] },
      { label: 'C', text: '吐槽"时间根本不够用"，但还是熬夜兼顾喜欢的事', characters: ['eddie', 'steve'] },
      { label: 'D', text: '找同样有兴趣的朋友组队，边合作边完成，提高效率', characters: ['dart'] },
      { label: 'E', text: '偶尔会顾此失彼，发现后赶紧调整重心补回来', characters: ['will', 'hopper'] }
    ]
  },
  {
    id: 47,
    text: '看到流浪动物在寒风中发抖，你会？',
    options: [
      { label: 'A', text: '立刻去买食物和水，想办法联系救助站', characters: ['joyce'] },
      { label: 'B', text: '蹲下来轻轻安抚，观察是否有主人信息，没有就暂时带回家', characters: ['holly', 'mike'] },
      { label: 'C', text: '吐槽"谁这么没责任心"，然后拍照发朋友圈求助', characters: ['billy', 'max'] },
      { label: 'D', text: '分析附近是否有流浪动物聚集地，联系朋友一起做投喂点', characters: ['murray'] },
      { label: 'E', text: '有点犹豫但还是放下食物，怕自己照顾不好不敢带走', characters: ['will', 'jonathan'] }
    ]
  },
  {
    id: 48,
    text: '团队讨论对抗怪物的方案时，你提出的想法被所有人反对，你会？',
    options: [
      { label: 'A', text: '坚持自己的观点，拿出具体依据逐条反驳，说服大家', characters: ['lucas', 'vecna', 'brenner'] },
      { label: 'B', text: '先认真听大家的反对理由，再结合意见优化自己的方案', characters: ['nancy'] },
      { label: 'C', text: '嘟囔"你们根本不懂"，但会后会偷偷验证自己的想法', characters: ['max', 'eddie', 'dart', 'lucas'] },
      { label: 'D', text: '虽然不服气，但还是先按团队方案执行，找机会证明自己', characters: ['steve', 'mike', 'robin', 'erica'] },
      { label: 'E', text: '直接放弃，觉得"大家都反对肯定是我错了"', characters: ['will', 'max'] }
    ]
  },
  {
    id: 49,
    text: '你代表团队参加竞赛，赛前很紧张，会？',
    options: [
      { label: 'A', text: '假装淡定地说"赢定了"，暗中反复练习薄弱环节', characters: ['nancy', 'lucas'] },
      { label: 'B', text: '和团队互相加油打气，一起复盘战术，增强信心', characters: ['mike', 'joyce'] },
      { label: 'C', text: '吃点零食缓解紧张，告诉自己"尽力就好，输了也不丢人"', characters: ['steve', 'erica'] },
      { label: 'D', text: '分析对手的过往战绩，找到他们的弱点制定应对策略', characters: ['brenner', 'vecna'] },
      { label: 'E', text: '默默坐在角落深呼吸，反复回想练习时的成功经验', characters: ['will', 'eleven'] }
    ]
  },
  {
    id: 50,
    text: '当小镇出现奇怪的天气和植物变异，大家都很恐慌，你会？',
    options: [
      { label: 'A', text: '立刻跑去野外收集变异植物样本，想找出原因', characters: ['murray', 'brenner', 'vecna'] },
      { label: 'B', text: '召集大家囤好物资，制定应急方案，安抚恐慌情绪', characters: ['nancy', 'robin'] },
      { label: 'C', text: '翻出小镇历史资料，查看是否有类似异常记录', characters: ['murray', 'brenner'] },
      { label: 'D', text: '一边安慰身边人"别慌，会有办法的"，一边关注官方消息', characters: ['joyce', 'steve'] },
      { label: 'E', text: '相信有能力的人会解决，做好自己该做的事', characters: ['holly', 'will'] }
    ]
  },
  // 反向题
  {
    id: 51,
    text: '反向题：朋友夸你擅长规划时，你更倾向于？',
    options: [
      { label: 'A', text: '立刻否认"我根本不会规划，全靠运气"', characters: ['max', 'eleven', 'holly', 'murray'] },
      { label: 'B', text: '坦诚说"谢谢，我会提前列清单梳理步骤"', characters: ['nancy', 'lucas'] },
      { label: 'C', text: '笑着说"其实是朋友帮我提了不少建议"', characters: ['steve', 'jonathan'] },
      { label: 'D', text: '分享经验"我会分优先级，重要的事提前做"', characters: ['robin', 'dustin'] },
      { label: 'E', text: '低头说"没有啦，只是随便弄弄"', characters: ['will', 'dustin'] }
    ]
  },
  // 中性题
  {
    id: 52,
    text: '中性题：团队投票选组长，你更可能？',
    options: [
      { label: 'A', text: '主动提名自己并说明优势', characters: ['eddie', 'mike'] },
      { label: 'B', text: '投票给有经验的人并支持其工作', characters: ['joyce'] },
      { label: 'C', text: '看朋友投给谁就跟着投', characters: ['dart', 'holly'] },
      { label: 'D', text: '分析候选人能力后投给最适配的', characters: ['lucas', 'vecna', 'brenner'] },
      { label: 'E', text: '觉得都差不多，随便投一个', characters: ['steve', 'robin'] }
    ]
  },
  // 反向题
  {
    id: 53,
    text: '反向题：别人说你做事冲动时，你会？',
    options: [
      { label: 'A', text: '反驳"我才不冲动，是你们太胆小"', characters: ['eleven', 'eddie'] },
      { label: 'B', text: '反思"可能我没考虑周全，下次改进"', characters: ['brenner', 'nancy', 'lucas'] },
      { label: 'C', text: '笑着说"确实有点，我会慢下来的"', characters: ['dart', 'steve'] },
      { label: 'D', text: '不屑"成大事就要果断，想太多没用"', characters: ['vecna', 'brenner'] },
      { label: 'E', text: '记下来"下次做决定前先问下朋友意见"', characters: ['max', 'holly'] }
    ]
  },
  // 中性题
  {
    id: 54,
    text: '中性题：周末突然下雨打乱出游计划，你会？',
    options: [
      { label: 'A', text: '立刻改室内活动，提前订好场馆', characters: ['brenner', 'lucas', 'vecna'] },
      { label: 'B', text: '在家追剧，顺便整理房间', characters: ['steve'] },
      { label: 'C', text: '约朋友来家里聚餐聊天', characters: ['erica', 'dart'] },
      { label: 'D', text: '趁雨天看书，提升自己', characters: ['murray', 'brenner'] },
      { label: 'E', text: '有点失落，但还是接受并休息', characters: ['will', 'hopper'] }
    ]
  },
  // 反向题
  {
    id: 55,
    text: '反向题：朋友说你太在意别人看法时，你会？',
    options: [
      { label: 'A', text: '急着辩解"我不在乎别人怎么说"', characters: ['eddie', 'max'] },
      { label: 'B', text: '认真说"我会多考虑建议，但有自己的判断"', characters: ['nancy', 'lucas'] },
      { label: 'C', text: '笑着说"确实会在意，不过会分情况"', characters: ['joyce', 'steve'] },
      { label: 'D', text: '分析"有用的意见就听，没用的就忽略"', characters: ['robin', 'dustin'] },
      { label: 'E', text: '低头不说话，心里很在意', characters: ['jonathan', 'will'] }
    ]
  },
  // 中性题
  {
    id: 56,
    text: '中性题：买东西时遇到两个喜欢的款式，你会？',
    options: [
      { label: 'A', text: '都买下来，难得喜欢', characters: ['eddie', 'holly'] },
      { label: 'B', text: '对比性价比后选更实用的', characters: ['erica', 'lucas'] },
      { label: 'C', text: '问朋友意见后再决定', characters: ['mike', 'dart'] },
      { label: 'D', text: '选更符合自己风格的，不纠结', characters: ['robin', 'dustin'] },
      { label: 'E', text: '先买一个，另一个以后再说', characters: ['steve', 'will'] }
    ]
  },
  // 反向题
  {
    id: 57,
    text: '反向题：别人说你做事太犹豫时，你会？',
    options: [
      { label: 'A', text: '反驳"这叫谨慎，总比出错好"', characters: ['murray', 'brenner'] },
      { label: 'B', text: '尝试"下次我会设定决策时间，不拖沓"', characters: ['brenner', 'lucas', 'vecna', 'erica'] },
      { label: 'C', text: '笑着说"确实慢，我会加快速度的"', characters: ['steve'] },
      { label: 'D', text: '不屑"想清楚再做才对，急着做会错"', characters: ['brenner', 'lucas', 'robin'] },
      { label: 'E', text: '记下来"下次重要的事提前准备，减少犹豫"', characters: ['mike', 'erica'] }
    ]
  },
  // 中性题
  {
    id: 58,
    text: '中性题：听到一首好听的歌，你会？',
    options: [
      { label: 'A', text: '立刻查歌手信息，下载全专辑', characters: ['murray', 'brenner', 'vecna', 'jonathan'] },
      { label: 'B', text: '分享给朋友，一起讨论歌词', characters: ['mike', 'dart'] },
      { label: 'C', text: '单曲循环，直到听腻为止', characters: ['eleven', 'robin'] },
      { label: 'D', text: '记下歌名，以后慢慢听', characters: ['jonathan', 'will'] },
      { label: 'E', text: '跟着哼唱，开心就好', characters: ['holly', 'steve'] }
    ]
  },
  // 反向题
  {
    id: 59,
    text: '反向题：朋友说你太固执时，你会？',
    options: [
      { label: 'A', text: '反驳"我坚持的是对的，为什么要改"', characters: ['erica', 'hopper'] },
      { label: 'B', text: '倾听"你觉得我哪里固执，我听听看"', characters: ['robin', 'dustin'] },
      { label: 'C', text: '笑着说"可能吧，我会多考虑别人意见"', characters: ['steve'] },
      { label: 'D', text: '分析"如果我的想法错了，我会改的"', characters: ['nancy', 'murray', 'brenner', 'lucas'] },
      { label: 'E', text: '不说话，心里还是坚持自己的想法', characters: ['will', 'mike'] }
    ]
  },
  // 中性题
  {
    id: 60,
    text: '中性题：收到陌生包裹，你会？',
    options: [
      { label: 'A', text: '先检查寄件人信息，确认安全再拆', characters: ['joyce', 'nancy'] },
      { label: 'B', text: '直接拆开，好奇里面是什么', characters: ['dart', 'eddie'] },
      { label: 'C', text: '让家人帮忙拆，自己在旁边看', characters: ['holly', 'mike'] },
      { label: 'D', text: '拍照留证，再慢慢拆开', characters: ['jonathan', 'murray', 'brenner'] },
      { label: 'E', text: '觉得可能是寄错的，先放着', characters: ['steve', 'will'] }
    ]
  }
];

// ==================== 状态管理 ====================
let currentIndex = 0;
const answers = new Array(questions.length).fill(null);

// ==================== DOM 元素 ====================
const introSectionEl = document.getElementById('intro-section');
const progressSectionEl = document.getElementById('progress-section');
const answerCardSectionEl = document.getElementById('answer-card-section');
const questionSectionEl = document.getElementById('question-section');
const resultSectionEl = document.getElementById('result-section');

const progressTextEl = document.getElementById('progress-text');
const progressPercentEl = document.getElementById('progress-percent');
const progressFillEl = document.getElementById('progress-fill');

const answerCardToggleEl = document.getElementById('answer-card-toggle');
const answerCardContentEl = document.getElementById('answer-card-content');
const answerCardGridEl = document.getElementById('answer-card-grid');

const questionTitleEl = document.getElementById('question-title');
const questionDescEl = document.getElementById('question-desc');
const optionsListEl = document.getElementById('options-list');

const btnPrevEl = document.getElementById('btn-prev');
const btnNextEl = document.getElementById('btn-next');
const btnRestartEl = document.getElementById('btn-restart');

const resultTypeEl = document.getElementById('result-type');
const resultAnalysisEl = document.getElementById('result-analysis');
const resultReportEl = document.getElementById('result-report');
const secondaryListEl = document.getElementById('secondary-list');

// ==================== 答题卡渲染 ====================
function renderAnswerCard() {
  if (!answerCardGridEl) return;
  
  answerCardGridEl.innerHTML = '';
  
  questions.forEach((q, index) => {
    const item = document.createElement('div');
    item.className = 'answer-card-item';
    item.dataset.index = index;
    
    const answer = answers[index];
    if (answer !== null) {
      item.classList.add('answered');
    }
    
    if (index === currentIndex) {
      item.classList.add('current');
    }
    
    const numberSpan = document.createElement('span');
    numberSpan.className = 'answer-card-number';
    numberSpan.textContent = q.id;
    
    const answerSpan = document.createElement('span');
    answerSpan.className = 'answer-card-answer';
    if (answer !== null) {
      answerSpan.textContent = answer.label;
    } else {
      answerSpan.textContent = '未答';
    }
    
    item.appendChild(numberSpan);
    item.appendChild(answerSpan);
    
    item.addEventListener('click', () => {
      currentIndex = index;
      renderQuestion(currentIndex);
      updateAnswerCard();
    });
    
    answerCardGridEl.appendChild(item);
  });
}

// ==================== 更新答题卡 ====================
function updateAnswerCard() {
  if (!answerCardGridEl) return;
  
  const items = answerCardGridEl.querySelectorAll('.answer-card-item');
  items.forEach((item, index) => {
    item.classList.remove('current', 'answered');
    
    if (index === currentIndex) {
      item.classList.add('current');
    }
    
    const answer = answers[index];
    if (answer !== null) {
      item.classList.add('answered');
      const answerSpan = item.querySelector('.answer-card-answer');
      if (answerSpan) {
        answerSpan.textContent = answer.label;
      }
    }
  });
}

// ==================== 渲染题目 ====================
function renderQuestion(index) {
  const q = questions[index];
  if (!q) return;
  
  questionTitleEl.textContent = `Q${q.id} · ${q.text}`;
  questionDescEl.textContent = '请根据第一直觉选择最符合你的一项，没有"对"或"错"。';
  
  optionsListEl.innerHTML = '';
  
  q.options.forEach((opt, idx) => {
    const optionId = `q${q.id}-opt${idx}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'option-item';
    
    const radioWrapper = document.createElement('div');
    radioWrapper.className = 'option-radio-wrapper';
    
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `q-${q.id}`;
    input.id = optionId;
    input.value = opt.label;
    
    const isSelected = answers[index] && answers[index].label === opt.label;
    if (isSelected) {
      input.checked = true;
      wrapper.classList.add('selected');
    }
    
    radioWrapper.appendChild(input);
    
    const labelWrapper = document.createElement('label');
    labelWrapper.className = 'option-label';
    labelWrapper.setAttribute('for', optionId);
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'option-title';
    titleSpan.textContent = `${opt.label}. ${opt.text}`;
    
    labelWrapper.appendChild(titleSpan);
    
    wrapper.appendChild(radioWrapper);
    wrapper.appendChild(labelWrapper);
    
    wrapper.addEventListener('click', () => {
      input.checked = true;
      handleSelectOption(index, opt);
    });
    
    input.addEventListener('change', () => {
      handleSelectOption(index, opt);
    });
    
    optionsListEl.appendChild(wrapper);
  });
  
  updateProgress(index);
  updateButtonsState();
  updateAnswerCard();
}

// ==================== 处理选项选择 ====================
function handleSelectOption(qIndex, option) {
  answers[qIndex] = option;
  
  Array.from(optionsListEl.children).forEach((node) => {
    node.classList.remove('selected');
  });
  
  const q = questions[qIndex];
  const selectedOptIndex = q.options.findIndex((o) => o.label === option.label);
  const selectedDom = optionsListEl.children[selectedOptIndex];
  if (selectedDom) {
    selectedDom.classList.add('selected');
  }
  
  currentIndex = qIndex;
  
  updateButtonsState();
  updateAnswerCard();
  
  // 自动跳转到下一题
  setTimeout(() => {
    const isLast = qIndex === questions.length - 1;
    if (isLast) {
      const allAnswered = answers.every((a) => a !== null);
      if (allAnswered) {
        renderResult();
      }
    } else {
      currentIndex = qIndex + 1;
      renderQuestion(currentIndex);
    }
  }, 500);
}

// ==================== 更新进度 ====================
function updateProgress(index) {
  const current = index + 1;
  const total = questions.length;
  progressTextEl.textContent = `第 ${current} / ${total} 题`;
  
  const answeredCount = answers.filter((v) => v !== null).length;
  const percent = Math.round((answeredCount / total) * 100);
  progressPercentEl.textContent = `${percent}%`;
  progressFillEl.style.width = `${percent}%`;
}

// ==================== 更新按钮状态 ====================
function updateButtonsState() {
  btnPrevEl.disabled = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  btnNextEl.textContent = isLast ? '查看结果' : '下一题';
  
  const currentAnswer = answers[currentIndex];
  btnNextEl.disabled = currentAnswer === null;
}

// ==================== 计算结果 ====================
function calculateResult() {
  const scores = {};
  
  // 初始化所有角色分数
  Object.keys(characterData).forEach(charId => {
    scores[charId] = 0;
  });
  
  // 计算每个角色的得分
  answers.forEach((answer, index) => {
    if (answer && answer.characters) {
      const weight = 1 / answer.characters.length; // 如果选项对应多个角色，平均分配分数
      answer.characters.forEach(charId => {
        if (scores[charId] !== undefined) {
          scores[charId] += weight;
        }
      });
    }
  });
  
  // 检查隐藏款触发条件（第39题选A 且 第52题选A）
  // 注意：题目索引从0开始，所以第39题是index 38，第52题是index 51
  if (answers[38] && answers[38].label === 'A' && 
      answers[51] && answers[51].label === 'A') {
    scores['dart'] *= 1.3; // 提升达达的分数
  }
  
  // 将分数转换为概率
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const probabilities = {};
  
  Object.keys(scores).forEach(charId => {
    probabilities[charId] = totalScore > 0 ? (scores[charId] / totalScore) * 100 : 0;
  });
  
  // 排序并获取前3个角色
  const sortedChars = Object.keys(probabilities)
    .map(charId => ({
      id: charId,
      name: characterData[charId].name,
      probability: probabilities[charId]
    }))
    .sort((a, b) => b.probability - a.probability);
  
  const coreCharacter = sortedChars[0];
  const secondaryCharacters = sortedChars.slice(1, 3);
  
  return {
    coreCharacter,
    secondaryCharacters,
    allCharacters: sortedChars,
    probabilities
  };
}

// ==================== 角色图片映射 ====================
// 将角色名称映射到图片文件名
function getCharacterImagePath(characterName) {
  const imageMap = {
    '霍珀': '霍博.png',
    '南希': '南希.png',  // 如果图片不存在，会使用默认占位符
    '史蒂夫': '史蒂夫.png',
    '达斯汀': '达斯汀.png',
    '十一': '十一.png',
    '威尔': '威尔.png',
    '卢卡斯': '卢卡斯.png',
    '麦克斯': '麦克斯.png',
    '罗宾': '罗宾.png',
    '埃迪': '埃迪.png',
    '艾瑞卡': '艾瑞卡.png',  // 修正：代码中是"艾瑞卡"不是"埃里卡"
    '乔伊斯': '乔伊斯.png',
    '乔纳森': '乔纳森.png',
    '默里': '默里.png',
    '霍莉': '霍莉.png',
    '维克纳': '威克纳.png',
    '比利': '比利.png',
    '布伦纳': '布伦纳.png',
    '达达': '达达.png',
    '迈克': '麦克.png'
  };
  
  const imageName = imageMap[characterName] || `${characterName}.png`;
  return `assets/images/${imageName}`;
}

// ==================== 获取评级 ====================
function getRating(value) {
  if (value >= 9) return { text: '极强', class: 'rating-extreme' };
  if (value >= 7.5) return { text: '较强', class: 'rating-strong' };
  if (value >= 5) return { text: '一般', class: 'rating-average' };
  if (value >= 3) return { text: '较弱', class: 'rating-weak' };
  return { text: '很弱', class: 'rating-very-weak' };
}

// ==================== 绘制树状图（水平进度条） ====================
function drawRadarChart(charId) {
  const dimensionChartEl = document.getElementById('dimension-chart');
  if (!dimensionChartEl) return;
  
  const charData = characterData[charId];
  if (!charData) return;
  
  const radar = charData.radar;
  const dimensions = ['action', 'cooperation', 'guardianship', 'achievement', 'stability', 'empathy', 'logic', 'intuition'];
  const dimensionLabels = {
    action: '行动力',
    cooperation: '合作性',
    guardianship: '守护欲',
    achievement: '成就欲',
    stability: '稳定性',
    empathy: '共情力',
    logic: '逻辑性',
    intuition: '直觉性'
  };
  
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const maxValue = 10;
  
  // 清空容器
  dimensionChartEl.innerHTML = '';
  
  // 创建标题
  const titleEl = document.createElement('div');
  titleEl.className = 'dimension-chart-title';
  titleEl.textContent = '各项性格维度分值';
  dimensionChartEl.appendChild(titleEl);
  
  // 创建维度列表
  dimensions.forEach((dim, index) => {
    const value = radar[dim] || 0;
    const maxScoreAll = 10; // 最大值为10
    const percentage = (value / maxScoreAll) * 100;
    const rating = getRating(value);
    
    const itemEl = document.createElement('div');
    itemEl.className = 'chart-bar';
    itemEl.setAttribute('data-type', dim);
    
    itemEl.innerHTML = `
      <div class="chart-bar-header">
        <span class="chart-label">${labels[index]}. ${dimensionLabels[dim]}</span>
        <span class="chart-score">${value.toFixed(1)}分</span>
      </div>
      <div class="chart-track">
        <div class="chart-fill" style="width: 0%"></div>
      </div>
      <span class="chart-assessment">${rating.text}</span>
    `;
    
    dimensionChartEl.appendChild(itemEl);
    
    // 添加进度条动画
    setTimeout(() => {
      const barFillEl = itemEl.querySelector('.chart-fill');
      if (barFillEl) {
        barFillEl.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        barFillEl.style.width = `${percentage}%`;
      }
    }, index * 100);
  });
}

// ==================== 渲染结果 ====================
function renderResult() {
  try {
    const result = calculateResult();
    const coreChar = characterData[result.coreCharacter.id];
    
    if (!coreChar) {
      throw new Error('角色数据未找到');
    }
    
    // 更新核心角色图片
    const coreImageEl = document.getElementById('core-character-img');
    if (coreImageEl) {
      const imagePath = getCharacterImagePath(coreChar.name);
      coreImageEl.src = imagePath;
      coreImageEl.alt = `${coreChar.name} - ${coreChar.subtitle}`;
      coreImageEl.onerror = function() {
        // 图片加载失败时显示占位符
        this.style.display = 'none';
        const wrapper = this.parentElement;
        if (wrapper && !wrapper.querySelector('.image-placeholder')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'image-placeholder';
          placeholder.innerHTML = `<span>${coreChar.name.charAt(0)}</span>`;
          wrapper.appendChild(placeholder);
        }
      };
      coreImageEl.onload = function() {
        // 图片加载成功时隐藏占位符
        const wrapper = this.parentElement;
        if (wrapper) {
          const placeholder = wrapper.querySelector('.image-placeholder');
          if (placeholder) {
            placeholder.remove();
          }
        }
        this.style.display = 'block';
      };
    }
    
    // 更新核心角色信息
    resultTypeEl.textContent = `${coreChar.name} - ${coreChar.subtitle}`;
    
    // 更新分析文本
    const analysisHTML = `
      <p class="analysis-text">
        你最接近 <strong style="color: #ff0000">${coreChar.name}</strong> 的性格特质，
        核心标签包括：${coreChar.tags.join(' ')}
      </p>
    `;
    resultAnalysisEl.innerHTML = analysisHTML;
    
    // 更新次要角色
    secondaryListEl.innerHTML = '';
    result.secondaryCharacters.forEach(secChar => {
      const secCharData = characterData[secChar.id];
      if (secCharData) {
        const item = document.createElement('div');
        item.className = 'secondary-item';
        const imagePath = getCharacterImagePath(secCharData.name);
        item.innerHTML = `
          <div class="secondary-character-image-wrapper">
            <img class="secondary-character-image" src="${imagePath}" alt="${secCharData.name}" onerror="this.style.display='none'; const placeholder = document.createElement('div'); placeholder.className='image-placeholder'; placeholder.innerHTML='<span>${secCharData.name.charAt(0)}</span>'; this.parentElement.appendChild(placeholder);" onload="const placeholder = this.parentElement.querySelector('.image-placeholder'); if(placeholder) placeholder.remove(); this.style.display='block';">
          </div>
          <h4>${secCharData.name}</h4>
          <p>匹配度: ${secChar.probability.toFixed(2)}%</p>
        `;
        secondaryListEl.appendChild(item);
      }
    });
    
    // 更新性格解析
    const reportHTML = `
      <div class="report-content">
        <p>${coreChar.analysis}</p>
        <h4 style="margin-top: 20px; color: #ff0000;">生活应用建议</h4>
        <p style="margin: 8px 0;">💼 职场角色：${coreChar.suggestions.work}</p>
        <p style="margin: 8px 0;">👥 人际关系：${coreChar.suggestions.relationships}</p>
        <p style="margin: 8px 0;">🌟 成长方向：${coreChar.suggestions.growth}</p>
        <p style="margin: 8px 0;">⚠️ 潜在挑战：${coreChar.suggestions.challenges}</p>
      </div>
    `;
    resultReportEl.innerHTML = reportHTML;
    
    // 切换到结果页面
    questionSectionEl.classList.add('hidden');
    progressSectionEl.classList.add('hidden');
    answerCardSectionEl.classList.add('hidden');
    resultSectionEl.classList.remove('hidden');
    
    // 测试完成，更新邀请码使用记录并同步到管理员系统
    updateInviteCodeUsage();
    
    // 绘制雷达图
    setTimeout(() => {
      drawRadarChart(result.coreCharacter.id);
    }, 0);
    
  } catch (error) {
    console.error('渲染结果时出错:', error);
    alert('显示结果时出现错误，请刷新页面重试。');
  }
}

// ==================== 更新邀请码使用记录 ====================

/**
 * 带指数退避的重试机制
 * @param {Function} fn - 要重试的异步函数
 * @param {Object} options - 重试选项
 * @param {number} options.maxRetries - 最大重试次数（默认3）
 * @param {number} options.initialDelay - 初始延迟（毫秒，默认1000）
 * @param {number} options.maxDelay - 最大延迟（毫秒，默认10000）
 * @param {Function} options.shouldRetry - 判断是否应该重试的函数 (error, attempt) => boolean
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = (error, attempt) => {
      // 默认重试网络错误和5xx错误
      if (error.name === 'TypeError' && error.message.includes('fetch')) return true;
      if (error.status >= 500 && error.status < 600) return true;
      return false;
    }
  } = options;

  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 如果是最后一次尝试，直接抛出错误
      if (attempt === maxRetries) {
        throw error;
      }
      
      // 判断是否应该重试
      if (!shouldRetry(error, attempt)) {
        throw error;
      }
      
      // 计算延迟时间（指数退避）
      const delay = Math.min(initialDelay * Math.pow(2, attempt), maxDelay);
      const jitter = Math.random() * 0.3 * delay; // 添加随机抖动，避免雷群效应
      const finalDelay = delay + jitter;
      
      console.warn(`[retryWithBackoff] 第 ${attempt + 1} 次尝试失败，${Math.round(finalDelay)}ms 后重试...`, error);
      await new Promise(resolve => setTimeout(resolve, finalDelay));
    }
  }
  
  throw lastError;
}

/**
 * 调用更新邀请码使用记录的 API（带重试机制）
 * @param {string} code - 邀请码
 * @param {number} usedCount - 使用次数
 * @param {string} lastUsedAt - 最后使用时间
 * @param {string} deviceId - 设备ID
 * @returns {Promise<Object>} API 响应结果
 */
async function updateInviteUsageAPI(code, usedCount, lastUsedAt, deviceId) {
  const requestBody = {
    code,
    usedCount,
    lastUsedAt,
    deviceId
  };

  return await retryWithBackoff(async () => {
    const response = await fetch('/api/update-invite-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // 对于非 200 响应，抛出错误以便重试机制处理
    if (!response.ok) {
      let errorMessage = '未知错误';
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorMessage = errorJson.message || errorJson.error || JSON.stringify(errorJson);
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        console.error('[updateInviteUsageAPI] 解析错误响应失败:', e);
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.response = response;
      throw error;
    }

    return await response.json().catch(() => ({}));
  }, {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    shouldRetry: (error, attempt) => {
      // 重试网络错误和5xx服务器错误，不重试4xx客户端错误
      if (error.name === 'TypeError' && error.message.includes('fetch')) return true;
      if (error.status >= 500 && error.status < 600) return true;
      if (error.status >= 400 && error.status < 500) return false; // 4xx 不重试
      return false;
    }
  });
}

/**
 * 回滚 API 操作（如果本地保存失败但 API 成功）
 * 注意：由于 API 可能不支持回滚，这里只是标记数据不一致
 * @param {string} code - 邀请码
 * @param {number} previousUsedCount - 之前的 usedCount 值
 * @returns {Promise<void>}
 */
async function markDataInconsistency(code, previousUsedCount) {
  try {
    // 将不一致标记存储到 localStorage，供后续恢复使用
    const inconsistencyKey = `invite_inconsistency_${code}`;
    const inconsistencyData = {
      code,
      previousUsedCount,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    localStorage.setItem(inconsistencyKey, JSON.stringify(inconsistencyData));
    console.warn(`[updateInviteCodeUsage] 数据不一致已标记: ${code}，之前的 usedCount: ${previousUsedCount}`);
  } catch (error) {
    console.error('[updateInviteCodeUsage] 标记数据不一致失败:', error);
  }
}

/**
 * 批量更新邀请码使用记录（为将来扩展准备）
 * @param {Array<Object>} updates - 更新列表，每个对象包含 {code, usedCount, lastUsedAt, deviceId}
 * @returns {Promise<Array<Object>>} 更新结果列表
 */
async function batchUpdateInviteUsage(updates) {
  if (!Array.isArray(updates) || updates.length === 0) {
    return [];
  }

  // 如果只有一个更新，使用单个更新逻辑
  if (updates.length === 1) {
    const update = updates[0];
    try {
      await updateInviteUsageAPI(update.code, update.usedCount, update.lastUsedAt, update.deviceId);
      return [{ code: update.code, success: true }];
    } catch (error) {
      return [{ code: update.code, success: false, error: error.message }];
    }
  }

  // 批量更新：并发执行，但限制并发数
  const BATCH_SIZE = 5; // 每批处理5个
  const results = [];

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const batch = updates.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(async (update) => {
      try {
        await updateInviteUsageAPI(update.code, update.usedCount, update.lastUsedAt, update.deviceId);
        return { code: update.code, success: true };
      } catch (error) {
        return { code: update.code, success: false, error: error.message };
      }
    });

    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: r.reason }));
  }

  return results;
}

async function updateInviteCodeUsage() {
  try {
    // 防御性检查：验证 Storage 和 DeviceManager 是否存在
    if (typeof Storage === 'undefined' || Storage === null) {
      console.warn('Storage 未定义，跳过更新邀请码使用记录');
      return;
    }
    
    if (typeof DeviceManager === 'undefined' || DeviceManager === null) {
      console.warn('DeviceManager 未定义，跳过更新邀请码使用记录');
      return;
    }
    
    // 验证必需的方法是否存在且为函数
    if (typeof Storage.getCurrentInviteCode !== 'function') {
      console.warn('Storage.getCurrentInviteCode 不是函数，跳过更新邀请码使用记录');
      return;
    }
    
    if (typeof Storage.getInviteCodes !== 'function') {
      console.warn('Storage.getInviteCodes 不是函数，跳过更新邀请码使用记录');
      return;
    }
    
    if (typeof DeviceManager.getDeviceId !== 'function') {
      console.warn('DeviceManager.getDeviceId 不是函数，跳过更新邀请码使用记录');
      return;
    }
    
    // 获取当前使用的邀请码
    const currentCode = Storage.getCurrentInviteCode();
    if (!currentCode) {
      console.log('未找到当前邀请码，跳过更新');
      return;
    }

    // 使用安全访问获取邀请码列表，确保返回的是数组
    const inviteCodesRaw = Storage.getInviteCodes();
    const inviteCodes = Array.isArray(inviteCodesRaw) ? inviteCodesRaw : [];
    const deviceId = DeviceManager.getDeviceId();
    const invite = inviteCodes.find(item => item && item.code === currentCode);
    
    if (!invite) {
      console.log('邀请码记录不存在，跳过更新');
      return;
    }

    // 更新最后使用时间
    const now = new Date().toISOString();
    invite.lastUsedAt = now;
    
    // 确保使用记录数组存在
    if (!invite.usageHistory) {
      invite.usageHistory = [];
    }
    
    // 检查是否已有本次测试的使用记录（避免重复添加）
    // 查找最近的验证记录（testCompleted: false）并标记为完成
    let hasUpdatedRecord = false;
    if (invite.usageHistory && invite.usageHistory.length > 0) {
      // 从后往前查找最近的未完成测试记录
      for (let i = invite.usageHistory.length - 1; i >= 0; i--) {
        const record = invite.usageHistory[i];
        if (record.testCompleted === false && record.deviceId === deviceId) {
          // 找到最近的验证记录，标记为测试完成
          record.testCompleted = true;
          record.usedAt = now; // 更新为测试完成时间
          hasUpdatedRecord = true;
          break;
        }
      }
    }
    
    // 如果没有找到未完成的记录，添加新的测试完成记录
    if (!hasUpdatedRecord) {
      invite.usageHistory.push({
        deviceId: deviceId,
        usedAt: now,
        userAgent: navigator.userAgent || 'unknown',
        ip: 'unknown',
        testCompleted: true // 标记为测试完成
      });
    }
    
    // 增加使用次数（测试完成时）
    // 每次测试完成都应该递增使用次数，无论是否找到了未完成的记录
    // 确保 usedCount 存在且为数字类型
    const parseUsedCount = (value) => {
      if (value === undefined || value === null) return 0;
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 0 : Math.max(0, parsed); // 确保非负数
    };
    
    const currentUsedCount = parseUsedCount(invite.usedCount);
    const maxCount = CONFIG?.MAX_USE_COUNT || 3;
    
    // 只有在未达到上限时才增加
    if (currentUsedCount < maxCount) {
      invite.usedCount = currentUsedCount + 1;
      console.log(`[updateInviteCodeUsage] 邀请码使用次数已递增: ${currentUsedCount} -> ${invite.usedCount} (上限: ${maxCount})`);
    } else {
      console.warn(`[updateInviteCodeUsage] 邀请码使用次数已达上限 (${currentUsedCount}/${maxCount})，无法继续增加`);
      // 即使达到上限，也确保 usedCount 字段存在
      invite.usedCount = currentUsedCount;
    }
    
    // 验证 usedCount 是有效数字
    if (typeof invite.usedCount !== 'number' || isNaN(invite.usedCount) || invite.usedCount < 0) {
      console.error(`[updateInviteCodeUsage] 无效的 usedCount 值: ${invite.usedCount}，使用当前值: ${currentUsedCount}`);
      invite.usedCount = currentUsedCount;
    }
    
    // 保存更新前的状态，用于数据一致性检查
    const previousUsedCount = currentUsedCount;
    const previousInviteCodes = JSON.parse(JSON.stringify(inviteCodes)); // 深拷贝
    
    // 保存到本地存储
    const saved = Storage.setInviteCodes(inviteCodes);
    if (!saved) {
      console.error('[updateInviteCodeUsage] 保存邀请码到本地存储失败');
      // 标记本地保存失败，但继续尝试同步到服务器
    } else {
      console.log('[updateInviteCodeUsage] 邀请码已保存到本地存储');
    }
    
    // 同步到后端API（如果使用API验证）
    // 使用带重试机制的 API 调用
    console.log(`[updateInviteCodeUsage] 准备发送到API: code=${currentCode}, usedCount=${invite.usedCount}, lastUsedAt=${now}`);
    
    let apiSuccess = false;
    let apiResult = null;
    
    try {
      apiResult = await updateInviteUsageAPI(currentCode, invite.usedCount, now, deviceId);
      apiSuccess = true;
      console.log('[updateInviteCodeUsage] 邀请码使用记录已同步到服务器', apiResult);
      
      // 如果服务器返回了更新后的 usedCount，可以用于验证
      if (apiResult.usedCount !== undefined && apiResult.usedCount !== invite.usedCount) {
        console.warn(`[updateInviteCodeUsage] 服务器返回的 usedCount (${apiResult.usedCount}) 与发送的值 (${invite.usedCount}) 不一致`);
        // 可以选择使用服务器返回的值来同步本地数据
        invite.usedCount = apiResult.usedCount;
        // 重新保存到本地存储
        Storage.setInviteCodes(inviteCodes);
      }
    } catch (apiError) {
      apiSuccess = false;
      console.error('[updateInviteCodeUsage] 同步到服务器失败（已重试）:', apiError);
      
      // 如果本地保存成功但 API 失败，数据仍然在本地，这是可接受的
      // 但如果本地保存失败且 API 也失败，需要处理
      if (!saved) {
        console.error('[updateInviteCodeUsage] 本地保存和 API 同步都失败，数据可能丢失');
        // 可以尝试恢复之前的状态
        try {
          Storage.setInviteCodes(previousInviteCodes);
          console.log('[updateInviteCodeUsage] 已尝试恢复到之前的状态');
        } catch (recoverError) {
          console.error('[updateInviteCodeUsage] 恢复状态失败:', recoverError);
        }
      }
    }
    
    // 数据一致性检查：如果本地保存失败但 API 成功，标记不一致
    if (!saved && apiSuccess) {
      console.warn('[updateInviteCodeUsage] 数据不一致：本地保存失败但 API 同步成功');
      await markDataInconsistency(currentCode, previousUsedCount);
      
      // 尝试重新保存到本地（使用服务器返回的数据）
      if (apiResult && apiResult.usedCount !== undefined) {
        invite.usedCount = apiResult.usedCount;
        const retrySaved = Storage.setInviteCodes(inviteCodes);
        if (retrySaved) {
          console.log('[updateInviteCodeUsage] 已使用服务器数据重新保存到本地');
        }
      }
    }
    
    // 触发管理员面板数据刷新（如果打开的话）
    if (typeof window.adminPanel !== 'undefined' && window.adminPanel.refresh) {
      try {
        window.adminPanel.refresh();
      } catch (e) {
        console.log('刷新管理员面板失败:', e);
      }
    }
    
    // 发送自定义事件，通知管理员面板刷新
    const refreshEvent = new CustomEvent('inviteCodeUsageUpdated', {
      detail: {
        code: currentCode,
        usedCount: invite.usedCount,
        lastUsedAt: now
      }
    });
    document.dispatchEvent(refreshEvent);
    
    console.log('邀请码使用记录已更新:', {
      code: currentCode,
      usedCount: invite.usedCount,
      lastUsedAt: now
    });
    
  } catch (error) {
    console.error('更新邀请码使用记录时出错:', error);
    // 错误不影响结果展示
  }
}

// ==================== 事件监听 ====================
btnPrevEl.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion(currentIndex);
  }
});

btnNextEl.addEventListener('click', () => {
  const currentAnswer = answers[currentIndex];
  if (currentAnswer === null) {
    alert('请先选择一项再继续。');
    return;
  }
  
  const isLast = currentIndex === questions.length - 1;
  if (isLast) {
    const allAnswered = answers.every((a) => a !== null);
    if (allAnswered) {
      renderResult();
    } else {
      alert('请完成所有题目后再查看结果。');
    }
  } else {
    currentIndex += 1;
    renderQuestion(currentIndex);
  }
});

// 开始测试函数（现在由邀请码验证成功后调用）
function startTestAfterInviteCode() {
  // 验证邀请码是否有效
  const currentCode = Storage.getCurrentInviteCode();
  if (!currentCode) {
    alert('请先验证邀请码');
    return;
  }

  const inviteCodes = Storage.getInviteCodes();
  const deviceId = DeviceManager.getDeviceId();
  const invite = inviteCodes.find(item => 
    item.code === currentCode && 
    item.deviceId === deviceId &&
    item.usedCount < CONFIG.MAX_USE_COUNT
  );

  if (!invite) {
    alert('邀请码已失效，请重新验证');
    // 重新显示邀请码输入区域
    const inviteCodeSection = document.getElementById('invite-code-section');
    if (inviteCodeSection) inviteCodeSection.style.display = 'block';
    return;
  }

  // 确保DOM元素存在
  if (!introSectionEl || !progressSectionEl || !answerCardSectionEl || !questionSectionEl) {
    console.error('测试页面元素未找到');
    return;
  }

  introSectionEl.classList.add('hidden');
  progressSectionEl.classList.remove('hidden');
  answerCardSectionEl.classList.remove('hidden');
  questionSectionEl.classList.remove('hidden');
  currentIndex = 0;
  renderQuestion(currentIndex);
  renderAnswerCard();
}

// 将函数暴露到全局作用域，以便 invite-code.js 调用
window.startTestAfterInviteCode = startTestAfterInviteCode;

// 确保介绍页面默认显示的函数
function ensureIntroSectionVisible() {
  if (introSectionEl) introSectionEl.classList.remove('hidden');
  if (progressSectionEl) progressSectionEl.classList.add('hidden');
  if (answerCardSectionEl) answerCardSectionEl.classList.add('hidden');
  if (questionSectionEl) questionSectionEl.classList.add('hidden');
  if (resultSectionEl) resultSectionEl.classList.add('hidden');
}

window.ensureIntroSectionVisible = ensureIntroSectionVisible;

// 页面加载时确保显示介绍页面
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行，确保所有脚本都加载完成
  setTimeout(() => {
    ensureIntroSectionVisible();
  }, 50);
});

// 监听邀请码验证成功事件（备用方案）
document.addEventListener('inviteCodeVerified', (event) => {
  startTestAfterInviteCode();
});


btnRestartEl.addEventListener('click', () => {
  for (let i = 0; i < answers.length; i += 1) {
    answers[i] = null;
  }
  currentIndex = 0;
  introSectionEl.classList.remove('hidden');
  progressSectionEl.classList.add('hidden');
  answerCardSectionEl.classList.add('hidden');
  questionSectionEl.classList.add('hidden');
  resultSectionEl.classList.add('hidden');
  if (answerCardContentEl) {
    answerCardContentEl.classList.add('hidden');
    answerCardSectionEl.classList.remove('expanded');
  }
});

// 答题卡折叠/展开
if (answerCardToggleEl && answerCardContentEl) {
  answerCardToggleEl.addEventListener('click', () => {
    const isHidden = answerCardContentEl.classList.contains('hidden');
    if (isHidden) {
      answerCardContentEl.classList.remove('hidden');
      answerCardSectionEl.classList.add('expanded');
    } else {
      answerCardContentEl.classList.add('hidden');
      answerCardSectionEl.classList.remove('expanded');
    }
  });
}

