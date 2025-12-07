// 测试页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const questionsContainer = document.getElementById('questionsContainer');
    const submitBtn = document.getElementById('submitBtn');
    const submitHint = document.getElementById('submitHint');

    // 检查邀请码
    checkInviteCode();

    // 加载或初始化答案
    let answers = Storage.getTestAnswers();

    // 初始化
    init();

    function init() {
        // 设置总题数
        totalQuestionsSpan.textContent = CONFIG.TOTAL_QUESTIONS;
        
        // 渲染所有题目
        renderQuestions();
        
        // 更新进度
        updateProgress();
        
        // 滚动到第一个未答的题目
        scrollToFirstUnanswered();
    }

    /**
     * 检查邀请码
     */
    function checkInviteCode() {
        const currentCode = Storage.getCurrentInviteCode();
        if (!currentCode) {
            alert('请先输入邀请码');
            window.location.href = 'index.html';
            return;
        }

        // 验证邀请码是否有效
        const inviteCodes = Storage.getInviteCodes();
        const deviceId = DeviceManager.getDeviceId();
        const invite = inviteCodes.find(item => 
            item.code === currentCode && 
            item.deviceId === deviceId &&
            item.usedCount < CONFIG.MAX_USE_COUNT
        );

        if (!invite) {
            alert('邀请码已失效，请重新获取');
            window.location.href = 'index.html';
        }
    }

    /**
     * 渲染所有题目
     */
    function renderQuestions() {
        let html = '';
        
        TEST_DATA.questions.forEach((question, index) => {
            const questionNum = index + 1;
            const answer = answers[questionNum];
            const isAnswered = !!answer;

            html += `
                <div class="question-card ${isAnswered ? 'answered' : ''}" data-question="${questionNum}">
                    <div class="question-header">
                        <div class="question-number">第 ${questionNum} 题</div>
                        <div class="question-text">${question.text}</div>
                    </div>
                    <div class="options-list">
                        ${question.options.map(option => `
                            <div class="option ${answer === option.label ? 'selected' : ''}" 
                                 data-question="${questionNum}" 
                                 data-label="${option.label}">
                                <div class="option-label">${option.label}</div>
                                <div class="option-text">${option.text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        questionsContainer.innerHTML = html;

        // 绑定选项点击事件
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const questionNum = parseInt(this.dataset.question);
                const label = this.dataset.label;
                selectOption(questionNum, label);
            });
        });
    }

    /**
     * 选择选项
     * @param {number} questionNum
     * @param {string} label
     */
    function selectOption(questionNum, label) {
        // 保存答案
        answers[questionNum] = label;
        Storage.setTestAnswers(answers);

        // 更新UI
        const card = document.querySelector(`.question-card[data-question="${questionNum}"]`);
        card.classList.add('answered');

        // 清除该题目的其他选项的选中状态
        card.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // 选中当前选项
        const selectedOption = card.querySelector(`.option[data-label="${label}"]`);
        selectedOption.classList.add('selected');

        // 更新进度
        updateProgress();

        // 自动滚动到下一题
        setTimeout(() => {
            scrollToNextQuestion(questionNum);
        }, 300);
    }

    /**
     * 更新进度
     */
    function updateProgress() {
        const answeredCount = Object.keys(answers).length;
        const progress = (answeredCount / CONFIG.TOTAL_QUESTIONS) * 100;

        progressFill.style.width = `${progress}%`;
        currentQuestionSpan.textContent = answeredCount;

        // 检查是否全部答完
        if (answeredCount === CONFIG.TOTAL_QUESTIONS) {
            submitBtn.style.display = 'block';
            submitHint.textContent = '已完成所有题目，点击提交查看结果';
            submitHint.classList.remove('error');
            
            // 滚动到提交按钮
            setTimeout(() => {
                submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        } else {
            submitBtn.style.display = 'none';
            submitHint.textContent = `还有 ${CONFIG.TOTAL_QUESTIONS - answeredCount} 题未完成`;
            submitHint.classList.add('error');
        }
    }

    /**
     * 滚动到下一题
     * @param {number} currentQuestionNum
     */
    function scrollToNextQuestion(currentQuestionNum) {
        if (currentQuestionNum < CONFIG.TOTAL_QUESTIONS) {
            const nextCard = document.querySelector(`.question-card[data-question="${currentQuestionNum + 1}"]`);
            if (nextCard && !answers[currentQuestionNum + 1]) {
                nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    /**
     * 滚动到第一个未答的题目
     */
    function scrollToFirstUnanswered() {
        for (let i = 1; i <= CONFIG.TOTAL_QUESTIONS; i++) {
            if (!answers[i]) {
                const card = document.querySelector(`.question-card[data-question="${i}"]`);
                if (card) {
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }
                break;
            }
        }
    }

    /**
     * 提交测试
     */
    submitBtn.addEventListener('click', function() {
        const answeredCount = Object.keys(answers).length;
        
        if (answeredCount < CONFIG.TOTAL_QUESTIONS) {
            alert(`还有 ${CONFIG.TOTAL_QUESTIONS - answeredCount} 题未完成，请完成所有题目后再提交`);
            return;
        }

        // 确认提交
        if (!confirm('确定提交测试吗？提交后将无法修改答案。')) {
            return;
        }

        // 显示加载动画
        showLoadingAnimation();
    });

    /**
     * 显示加载动画
     */
    function showLoadingAnimation() {
        if (typeof Logger !== 'undefined') Logger.log('开始显示加载动画');
        
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        // 检查元素是否存在
        if (!loadingOverlay) {
            console.error('加载动画元素未找到，直接跳转');
            window.location.href = 'result.html';
            return;
        }
        
        if (typeof Logger !== 'undefined') Logger.log('找到加载动画元素');
        
        const loadingText = loadingOverlay.querySelector('.loading-text');
        
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
        
        // 显示加载层 - 使用多种方式确保显示
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.visibility = 'visible';
        loadingOverlay.style.opacity = '1';
        loadingOverlay.classList.add('show');
        
        // 强制重绘
        void loadingOverlay.offsetHeight;
        
        if (typeof Logger !== 'undefined') Logger.log('加载动画已显示');
        
        // 更新加载文本
        const loadingMessages = [
            '计算匹配度...',
            '生成角色报告...',
            '准备结果...'
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < loadingMessages.length && loadingText) {
                loadingText.textContent = loadingMessages[messageIndex];
                messageIndex++;
            }
        }, 1000);
        
        // 3秒后跳转到结果页面
        setTimeout(() => {
            clearInterval(messageInterval);
            document.body.style.overflow = '';
            if (typeof Logger !== 'undefined') Logger.log('跳转到结果页面');
            window.location.href = 'result.html';
        }, 3000);
    }

    // 防止页面刷新丢失数据的提示
    window.addEventListener('beforeunload', function(e) {
        const answeredCount = Object.keys(answers).length;
        if (answeredCount > 0 && answeredCount < CONFIG.TOTAL_QUESTIONS) {
            e.preventDefault();
            e.returnValue = '您的答题进度尚未保存完成，确定要离开吗？';
        }
    });
});








