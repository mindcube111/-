// 科学计分系统核心算法
const ScoringSystem = {
    // 所有角色名称
    characters: [
        '霍珀', '南希', '史蒂夫', '达斯汀', '十一', '威尔', '卢卡斯', '麦克斯',
        '罗宾', '埃迪', '埃里卡', '乔伊斯', '乔纳森', '默里', '霍莉',
        '维克纳', '比利', '布伦纳', '达达', '迈克'
    ],

    /**
     * 计算测试结果
     * @param {Object} answers - 用户答案 {questionNum: label}
     * @returns {Object} 测试结果
     */
    calculateResult(answers) {
        // 初始化角色得分
        const scores = {};
        this.characters.forEach(char => {
            scores[char] = 0;
        });

        // 检查隐藏款触发
        const isHiddenTriggered = this.checkHiddenTrigger(answers);

        // 遍历所有答案并累加得分
        Object.keys(answers).forEach(questionNum => {
            const questionId = parseInt(questionNum);
            const selectedLabel = answers[questionNum];
            const question = TEST_DATA.questions.find(q => q.id === questionId);

            if (question) {
                const selectedOption = question.options.find(opt => opt.label === selectedLabel);
                if (selectedOption && selectedOption.characters) {
                    // 为对应角色加分
                    const weight = this.getQuestionWeight(question);
                    const scorePerCharacter = weight / selectedOption.characters.length;
                    
                    selectedOption.characters.forEach(char => {
                        scores[char] = (scores[char] || 0) + scorePerCharacter;
                    });
                }
            }
        });

        // 隐藏款加权
        if (isHiddenTriggered) {
            scores['达达'] = (scores['达达'] || 0) * 1.3;
        }

        // 归一化和概率转换
        const probabilities = this.calculateProbabilities(scores);

        // 排序获取前3名
        const sortedResults = Object.entries(probabilities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        return {
            coreCharacter: {
                name: sortedResults[0][0],
                probability: sortedResults[0][1]
            },
            secondaryCharacters: sortedResults.slice(1).map(item => ({
                name: item[0],
                probability: item[1]
            })),
            allProbabilities: probabilities,
            isHidden: isHiddenTriggered && sortedResults[0][0] === '达达'
        };
    },

    /**
     * 检查隐藏款触发条件
     * @param {Object} answers
     * @returns {boolean}
     */
    checkHiddenTrigger(answers) {
        // 第27题选A 且 第40题选A
        return answers['27'] === 'A' && answers['40'] === 'A';
    },

    /**
     * 获取题目权重
     * @param {Object} question
     * @returns {number}
     */
    getQuestionWeight(question) {
        // 反派题权重
        if (question.type === 'villain') {
            return 1.5;
        }
        // 反向题权重
        if (question.type === 'reverse') {
            return 0.8;
        }
        // 中性题权重
        if (question.type === 'neutral') {
            return 0.9;
        }
        // 普通题权重
        return 1.0;
    },

    /**
     * 计算概率分布（Z-score + Softmax）
     * @param {Object} scores - 原始得分
     * @returns {Object} 概率分布
     */
    calculateProbabilities(scores) {
        const characterNames = Object.keys(scores);
        const scoreValues = Object.values(scores);

        // 计算平均分和标准差
        const mean = scoreValues.reduce((sum, val) => sum + val, 0) / scoreValues.length;
        const variance = scoreValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / scoreValues.length;
        const stdDev = Math.sqrt(variance) || 1; // 避免除以0

        // Z-score 归一化
        const zScores = {};
        characterNames.forEach(char => {
            zScores[char] = (scores[char] - mean) / stdDev;
        });

        // Softmax 转换为概率
        const expScores = {};
        let expSum = 0;
        characterNames.forEach(char => {
            expScores[char] = Math.exp(zScores[char]);
            expSum += expScores[char];
        });

        const probabilities = {};
        characterNames.forEach(char => {
            probabilities[char] = expScores[char] / expSum;
        });

        return probabilities;
    },

    /**
     * 格式化概率为百分比
     * @param {number} probability
     * @returns {string}
     */
    formatProbability(probability) {
        return (probability * 100).toFixed(1) + '%';
    },

    /**
     * 获取匹配度等级
     * @param {number} probability
     * @returns {string}
     */
    getMatchLevel(probability) {
        if (probability >= 0.5) return '核心匹配';
        if (probability >= 0.3) return '次要匹配';
        if (probability >= 0.1) return '潜在特质';
        return '微量特质';
    }
};









