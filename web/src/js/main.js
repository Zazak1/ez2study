/**
 * Ez2Study - 主JavaScript文件
 * 处理页面交互、动画和用户认证
 */

// 全局状态管理
const AppState = {
  isLoggedIn: false,
  currentUser: null,
  currentPage: 'home'
};

// DOM元素缓存
const Elements = {
  loading: null,
  mainContent: null,
  loginModal: null,
  registerModal: null,
  navbar: null
};

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * 应用初始化
 */
function initializeApp() {
  // 缓存DOM元素
  cacheElements();
  
  // 设置事件监听器
  setupEventListeners();
  
  // 初始化动画
  initializeAnimations();
  
  // 模拟加载完成
  setTimeout(() => {
    hideLoadingScreen();
  }, 2000);
  
  // 检查用户登录状态
  checkAuthStatus();
}

/**
 * 缓存DOM元素
 */
function cacheElements() {
  Elements.loading = document.getElementById('loading');
  Elements.mainContent = document.getElementById('main-content');
  Elements.loginModal = document.getElementById('loginModal');
  Elements.registerModal = document.getElementById('registerModal');
  Elements.navbar = document.querySelector('.navbar');
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  // 滚动事件 - 导航栏样式
  window.addEventListener('scroll', handleScroll);
  
  // 窗口大小改变事件
  window.addEventListener('resize', handleResize);
  
  // 模态框外部点击关闭
  window.addEventListener('click', handleModalOutsideClick);
  
  // 键盘事件
  document.addEventListener('keydown', handleKeyDown);
  
  // 表单提交事件
  document.addEventListener('submit', handleFormSubmit);
}

/**
 * 初始化动画
 */
function initializeAnimations() {
  // 启动演示流程动画
  startDemoFlowAnimation();
  
  // 启动粒子动画
  initializeParticles();
  
  // 观察器用于滚动动画
  setupScrollAnimations();
}

/**
 * 隐藏加载屏幕
 */
function hideLoadingScreen() {
  if (Elements.loading) {
    Elements.loading.style.opacity = '0';
    Elements.loading.style.visibility = 'hidden';
    
    setTimeout(() => {
      Elements.loading.style.display = 'none';
      Elements.mainContent.style.display = 'block';
      
      // 触发入场动画
      animatePageEntry();
    }, 500);
  }
}

/**
 * 页面入场动画
 */
function animatePageEntry() {
  const heroElements = document.querySelectorAll('.hero-text > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

/**
 * 演示流程动画
 */
function startDemoFlowAnimation() {
  const steps = document.querySelectorAll('.flow-step');
  let currentStep = 0;
  
  function animateStep() {
    // 移除所有active类
    steps.forEach(step => step.classList.remove('active'));
    
    // 添加当前步骤的active类
    if (steps[currentStep]) {
      steps[currentStep].classList.add('active');
    }
    
    // 移动到下一步
    currentStep = (currentStep + 1) % steps.length;
  }
  
  // 每3秒切换一次
  setInterval(animateStep, 3000);
}

/**
 * 滚动处理
 */
function handleScroll() {
  const scrollY = window.scrollY;
  
  // 导航栏样式变化
  if (Elements.navbar) {
    if (scrollY > 50) {
      Elements.navbar.style.background = 'rgba(15, 15, 35, 0.95)';
      Elements.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      Elements.navbar.style.background = 'rgba(15, 15, 35, 0.9)';
      Elements.navbar.style.boxShadow = 'none';
    }
  }
  
  // 视差效果
  const heroParticles = document.querySelector('.hero-particles');
  if (heroParticles) {
    heroParticles.style.transform = `translateY(${scrollY * 0.5}px)`;
  }
}

/**
 * 窗口大小改变处理
 */
function handleResize() {
  // 重新计算布局
  updateLayout();
}

/**
 * 更新布局
 */
function updateLayout() {
  // 移动端菜单处理
  const isMobile = window.innerWidth <= 768;
  const navMenu = document.querySelector('.nav-menu');
  
  if (navMenu) {
    if (isMobile) {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'flex';
    }
  }
}

/**
 * 滚动动画设置
 */
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // 观察需要动画的元素
  const animateElements = document.querySelectorAll('.feature-card, .comparison-table');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
  
  // 添加CSS类
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * 模态框管理
 */

// 显示登录模态框
function showLogin() {
  closeAllModals();
  if (Elements.loginModal) {
    Elements.loginModal.classList.add('show');
    Elements.loginModal.style.display = 'flex';
    
    // 聚焦到邮箱输入框
    setTimeout(() => {
      const emailInput = document.getElementById('loginEmail');
      if (emailInput) emailInput.focus();
    }, 100);
  }
}

// 显示注册模态框
function showRegister() {
  closeAllModals();
  if (Elements.registerModal) {
    Elements.registerModal.classList.add('show');
    Elements.registerModal.style.display = 'flex';
    
    // 聚焦到用户名输入框
    setTimeout(() => {
      const nameInput = document.getElementById('registerName');
      if (nameInput) nameInput.focus();
    }, 100);
  }
}

// 关闭模态框
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}

// 关闭所有模态框
function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.remove('show');
    modal.style.display = 'none';
  });
}

// 切换到注册模态框
function switchToRegister() {
  closeModal('loginModal');
  setTimeout(() => showRegister(), 100);
}

// 切换到登录模态框
function switchToLogin() {
  closeModal('registerModal');
  setTimeout(() => showLogin(), 100);
}

// 模态框外部点击关闭
function handleModalOutsideClick(event) {
  if (event.target.classList.contains('modal')) {
    closeAllModals();
  }
}

/**
 * 键盘事件处理
 */
function handleKeyDown(event) {
  // ESC键关闭模态框
  if (event.key === 'Escape') {
    closeAllModals();
  }
  
  // Enter键提交表单
  if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
    const form = event.target.closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit'));
    }
  }
}

/**
 * 表单处理
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  if (form.classList.contains('auth-form')) {
    if (form.closest('#loginModal')) {
      handleLogin(event);
    } else if (form.closest('#registerModal')) {
      handleRegister(event);
    }
  }
}

// 处理登录
function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  // 表单验证
  if (!validateEmail(email)) {
    showNotification('请输入有效的邮箱地址', 'error');
    return;
  }
  
  if (password.length < 6) {
    showNotification('密码长度至少6位', 'error');
    return;
  }
  
  // 显示加载状态
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '登录中...';
  submitBtn.disabled = true;
  
  // 模拟API调用
  setTimeout(() => {
    // 模拟登录成功
    AppState.isLoggedIn = true;
    AppState.currentUser = {
      email: email,
      name: email.split('@')[0]
    };
    
    // 保存登录状态
    if (rememberMe) {
      localStorage.setItem('ez2study_user', JSON.stringify(AppState.currentUser));
    } else {
      sessionStorage.setItem('ez2study_user', JSON.stringify(AppState.currentUser));
    }
    
    // 恢复按钮状态
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // 关闭模态框
    closeModal('loginModal');
    
    // 显示成功消息
    showNotification('登录成功！正在跳转到控制台...', 'success');
    
    // 跳转到控制台
    setTimeout(() => {
      redirectToDashboard();
    }, 1500);
    
  }, 2000);
}

// 处理注册
function handleRegister(event) {
  event.preventDefault();
  
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  
  // 表单验证
  if (name.length < 2) {
    showNotification('用户名长度至少2位', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showNotification('请输入有效的邮箱地址', 'error');
    return;
  }
  
  if (password.length < 6) {
    showNotification('密码长度至少6位', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('两次输入的密码不一致', 'error');
    return;
  }
  
  if (!agreeTerms) {
    showNotification('请同意服务条款和隐私政策', 'error');
    return;
  }
  
  // 显示加载状态
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '注册中...';
  submitBtn.disabled = true;
  
  // 模拟API调用
  setTimeout(() => {
    // 模拟注册成功
    AppState.isLoggedIn = true;
    AppState.currentUser = {
      email: email,
      name: name
    };
    
    // 保存登录状态
    sessionStorage.setItem('ez2study_user', JSON.stringify(AppState.currentUser));
    
    // 恢复按钮状态
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // 关闭模态框
    closeModal('registerModal');
    
    // 显示成功消息
    showNotification('注册成功！正在跳转到控制台...', 'success');
    
    // 跳转到控制台
    setTimeout(() => {
      redirectToDashboard();
    }, 1500);
    
  }, 2000);
}

/**
 * 工具函数
 */

// 邮箱验证
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // 添加样式
  const style = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 9999;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  notification.style.cssText = style;
  
  // 设置背景色
  switch (type) {
    case 'success':
      notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      break;
    case 'error':
      notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      break;
    case 'warning':
      notification.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      break;
    default:
      notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
  }
  
  // 添加到页面
  document.body.appendChild(notification);
  
  // 显示动画
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // 自动移除
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// 检查认证状态
function checkAuthStatus() {
  const savedUser = localStorage.getItem('ez2study_user') || sessionStorage.getItem('ez2study_user');
  
  if (savedUser) {
    try {
      AppState.currentUser = JSON.parse(savedUser);
      AppState.isLoggedIn = true;
      updateUIForLoggedInUser();
    } catch (error) {
      console.error('Error parsing saved user data:', error);
      localStorage.removeItem('ez2study_user');
      sessionStorage.removeItem('ez2study_user');
    }
  }
}

// 更新已登录用户的UI
function updateUIForLoggedInUser() {
  const navActions = document.querySelector('.nav-actions');
  if (navActions && AppState.currentUser) {
    navActions.innerHTML = `
      <span class="user-greeting">欢迎，${AppState.currentUser.name}</span>
      <button class="btn btn-primary" onclick="redirectToDashboard()">控制台</button>
      <button class="btn btn-outline" onclick="logout()">退出</button>
    `;
  }
}

// 退出登录
function logout() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  
  localStorage.removeItem('ez2study_user');
  sessionStorage.removeItem('ez2study_user');
  
  // 恢复原始导航
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    navActions.innerHTML = `
      <button class="btn btn-outline" onclick="showLogin()">登录</button>
      <button class="btn btn-primary" onclick="showRegister()">注册</button>
    `;
  }
  
  showNotification('已成功退出登录', 'info');
}

// 跳转到控制台
function redirectToDashboard() {
  if (!AppState.isLoggedIn) {
    showNotification('请先登录', 'warning');
    showLogin();
    return;
  }
  
  // 这里应该跳转到实际的控制台页面
  // 目前显示一个临时页面
  showDashboardPreview();
}

// 显示控制台预览
function showDashboardPreview() {
  const mainContent = Elements.mainContent;
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="dashboard-preview">
        <div class="container">
          <div class="dashboard-header">
            <h1>Ez2Study 控制台</h1>
            <p>欢迎回来，${AppState.currentUser.name}！</p>
          </div>
          
          <div class="dashboard-grid">
            <div class="dashboard-card" onclick="showFeaturePreview('video')">
              <div class="card-icon">🎬</div>
              <h3>拍照生成视频</h3>
              <p>上传题目图片，AI自动生成学习视频</p>
              <div class="card-status">即将推出</div>
            </div>
            
            <div class="dashboard-card" onclick="showFeaturePreview('chat')">
              <div class="card-icon">🤖</div>
              <h3>AI知识对话</h3>
              <p>与AI教师进行智能问答和学习指导</p>
              <div class="card-status">即将推出</div>
            </div>
            
            <div class="dashboard-card" onclick="showFeaturePreview('art')">
              <div class="card-icon">🎨</div>
              <h3>绘画教学助手</h3>
              <p>AI辅助的艺术技能培养和创意训练</p>
              <div class="card-status">开发中</div>
            </div>
          </div>
          
          <div class="dashboard-actions">
            <button class="btn btn-outline" onclick="location.reload()">返回首页</button>
            <button class="btn btn-primary" onclick="showNotification('功能开发中，敬请期待！', 'info')">开始使用</button>
          </div>
        </div>
      </div>
    `;
    
    // 添加控制台样式
    addDashboardStyles();
  }
}

// 添加控制台样式
function addDashboardStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .dashboard-preview {
      min-height: 100vh;
      padding: 100px 20px 40px;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: 60px;
      color: white;
    }
    
    .dashboard-header h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }
    
    .dashboard-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(59, 130, 246, 0.3);
    }
    
    .card-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    
    .dashboard-card h3 {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .dashboard-card p {
      color: #9ca3af;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .card-status {
      display: inline-block;
      padding: 6px 12px;
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .dashboard-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      .dashboard-header h1 {
        font-size: 2rem;
      }
      
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      
      .dashboard-actions {
        flex-direction: column;
        align-items: center;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// 显示功能预览
function showFeaturePreview(feature) {
  const features = {
    video: '拍照生成视频功能正在开发中，将支持OCR识别、知识点分析和智能视频生成。',
    chat: 'AI知识对话功能正在开发中，将提供个性化学习路径和智能问答服务。',
    art: '绘画教学助手功能正在规划中，将融合艺术技能培养和创意思维训练。'
  };
  
  showNotification(features[feature] || '功能开发中，敬请期待！', 'info');
}

/**
 * 导航功能
 */

// 滚动到功能区域
function scrollToFeatures() {
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// 移动端菜单切换
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  
  if (navMenu && menuBtn) {
    const isOpen = navMenu.style.display === 'flex';
    
    if (isOpen) {
      navMenu.style.display = 'none';
      menuBtn.classList.remove('active');
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'rgba(15, 15, 35, 0.95)';
      navMenu.style.padding = '20px';
      navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
      menuBtn.classList.add('active');
    }
  }
}

/**
 * 粒子系统初始化
 */
function initializeParticles() {
  // 这里可以添加更复杂的粒子效果
  // 目前使用CSS动画实现基础效果
}

// 导出全局函数供HTML调用
window.showLogin = showLogin;
window.showRegister = showRegister;
window.closeModal = closeModal;
window.switchToLogin = switchToLogin;
window.switchToRegister = switchToRegister;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.scrollToFeatures = scrollToFeatures;
window.toggleMobileMenu = toggleMobileMenu;
window.logout = logout;
window.redirectToDashboard = redirectToDashboard;
window.showFeaturePreview = showFeaturePreview;
