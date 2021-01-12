// 로그인, 회원 가입, (ex) 회원 탈퇴
import { http } from '@/system/api';

// 회원가입 API
function registerUser(userData) {
  return http.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return http.post('login', userData);
}

export { registerUser, loginUser };
