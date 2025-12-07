// 结果页面渲染逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 检查邀请码是否有效
    const currentCode = Storage.getCurrentInviteCode();
    if (!currentCode) {
        alert('请先输入邀请码');
        window.location.href = 'index.html';
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
        alert('邀请码已失效，请重新获取');
        window.location.href = 'index.html';
        return;
    }

    // 检查是否有测试答案
    const answers = Storage.getTestAnswers();
    if (Object.keys(answers).length !== CONFIG.TOTAL_QUESTIONS) {
        alert('请先完成测试');
        window.location.href = 'test.html';
        return;
    }

    // 计算结果
    const result = ScoringSystem.calculateResult(answers);
    
    // 保存结果
    Storage.setTestResult(result);

    // 渲染结果
    renderResult(result);

    // 绑定按钮事件
    bindEvents();
});

/**
 * 渲染结果
 * @param {Object} result
 */
function renderResult(result) {
    const coreCharacter = result.coreCharacter;
    const characterData = CHARACTER_DATA.characters[coreCharacter.name];

    // 检查是否为隐藏款
    if (result.isHidden) {
        document.querySelector('.result-content').classList.add('hidden-character');
    }

    // 渲染核心匹配角色
    renderCoreCharacter(coreCharacter, characterData);

    // 渲染次要匹配角色
    renderSecondaryCharacters(result.secondaryCharacters);

    // 渲染雷达图
    renderRadarChart(characterData);

    // 渲染核心标签
    renderTags(characterData);

    // 渲染性格解析
    renderAnalysis(characterData);

    // 渲染生活建议
    renderSuggestions(characterData);
}

/**
 * 渲染核心匹配角色
 * @param {Object} coreCharacter
 * @param {Object} characterData
 */
function renderCoreCharacter(coreCharacter, characterData) {
    document.getElementById('coreName').textContent = 
        `${coreCharacter.name}：${characterData.subtitle}`;
    
    const probability = coreCharacter.probability * 100;
    document.getElementById('coreProbabilityText').textContent = 
        `匹配度：${probability.toFixed(1)}%`;

    // 动画填充进度条
    setTimeout(() => {
        document.getElementById('coreProbability').style.width = `${probability}%`;
    }, 300);
}

/**
 * 渲染次要匹配角色
 * @param {Array} secondaryCharacters
 */
function renderSecondaryCharacters(secondaryCharacters) {
    const container = document.getElementById('secondaryList');
    let html = '';

    secondaryCharacters.forEach((char, index) => {
        const characterData = CHARACTER_DATA.characters[char.name];
        const probability = char.probability * 100;

        html += `
            <div class="secondary-card" style="animation-delay: ${0.5 + index * 0.2}s">
                <h4>${char.name}：${characterData.subtitle}</h4>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: 0" data-width="${probability}"></div>
                </div>
                <p class="probability-text">${probability.toFixed(1)}%</p>
            </div>
        `;
    });

    container.innerHTML = html;

    // 动画填充次要角色进度条
    setTimeout(() => {
        document.querySelectorAll('.secondary-card .probability-fill').forEach(fill => {
            const width = fill.dataset.width;
            fill.style.width = `${width}%`;
        });
    }, 800);
}

/**
 * 渲染雷达图
 * @param {Object} characterData
 */
function renderRadarChart(characterData) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const dimensions = characterData.dimensions;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: CHARACTER_DATA.dimensionLabels,
            datasets: [{
                label: '性格维度',
                data: [
                    dimensions.action,
                    dimensions.cooperation,
                    dimensions.protection,
                    dimensions.achievement,
                    dimensions.stability,
                    dimensions.empathy,
                    dimensions.logic,
                    dimensions.intuition
                ],
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: '#ff0000',
                borderWidth: 2,
                pointBackgroundColor: '#ff0000',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff0000',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        color: '#999',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: '#333'
                    },
                    pointLabels: {
                        color: '#e0e0e0',
                        font: {
                            size: 14,
                            family: "'Courier New', monospace"
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ff0000',
                    bodyColor: '#e0e0e0',
                    borderColor: '#ff0000',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.r}/10`;
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

/**
 * 渲染核心标签
 * @param {Object} characterData
 */
function renderTags(characterData) {
    const container = document.getElementById('tagsList');
    let html = '';

    characterData.tags.forEach((tag, index) => {
        html += `<div class="tag" style="animation-delay: ${1.5 + index * 0.1}s">${tag}</div>`;
    });

    container.innerHTML = html;
}

/**
 * 渲染性格解析
 * @param {Object} characterData
 */
function renderAnalysis(characterData) {
    const container = document.getElementById('analysisContent');
    container.innerHTML = `<p>${characterData.analysis}</p>`;
}

/**
 * 渲染生活建议
 * @param {Object} characterData
 */
function renderSuggestions(characterData) {
    const container = document.getElementById('suggestionsContent');
    let html = '';

    characterData.suggestions.forEach(suggestion => {
        html += `<div class="suggestion-item">${suggestion}</div>`;
    });

    container.innerHTML = html;
}

/**
 * 绑定按钮事件
 */
function bindEvents() {
    const saveBtn = document.getElementById('saveBtn');
    const retestBtn = document.getElementById('retestBtn');

    // 保存结果
    saveBtn.addEventListener('click', function() {
        saveResultAsImage();
    });

    // 重新测试
    retestBtn.addEventListener('click', function() {
        if (confirm('确定要重新测试吗？当前结果将被清除。')) {
            // 清除答案
            Storage.clearTestAnswers();
            // 跳转到测试页面
            window.location.href = 'test.html';
        }
    });
}

/**
 * 保存结果为图片
 */
function saveResultAsImage() {
    const resultContent = document.getElementById('resultContent');
    
    saveBtn.textContent = '生成中...';
    saveBtn.disabled = true;

    html2canvas(resultContent, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        // 创建下载链接
        const link = document.createElement('a');
        const result = Storage.getTestResult();
        link.download = `怪奇物语性格测试-${result.coreCharacter.name}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        saveBtn.textContent = '保存结果';
        saveBtn.disabled = false;
    }).catch(error => {
        console.error('保存失败:', error);
        alert('保存失败，请重试');
        saveBtn.textContent = '保存结果';
        saveBtn.disabled = false;
    });
}









